// Timeline - a horizontal "product line". The section pins while you scroll,
// the track slides sideways, the line draws itself, and each milestone grows
// its stem and reveals its copy line by line as it reaches the middle.
//
// Ported from the Hyperiux Vault TSX original (https://vault.hyperiux.com) for
// this JS project. Changes: milestones come from an `items` prop and alternate
// above/below the line, so any number of them lays out correctly; the slide
// distance is measured instead of hard-coded; the section is pinned with
// ScrollTrigger; colours are Tailwind classes so light/dark mode just works.
import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, SplitText);

/**
 * @typedef {object} TimelineItem
 * @property {string} id
 * @property {string} title
 * @property {string} [subtitle]
 * @property {string} content
 */

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback) {
  const mql = window.matchMedia(REDUCED_MOTION_QUERY);
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function usePrefersReducedMotion() {
  return useSyncExternalStore(subscribeToReducedMotion, () => window.matchMedia(REDUCED_MOTION_QUERY).matches);
}

// Layout of the line area, in CSS variables so phones get roomier spacing:
// --lead  title column before the first milestone
// --step  distance between neighbouring milestones (they alternate sides)
// --item  width of a milestone's text
// --tail  line left over after the last milestone
const LAYOUT_VARS =
  "[--lead:22vw] [--step:19vw] [--item:26vw] [--tail:22vw] " +
  "max-[600px]:[--lead:62vw] max-[600px]:[--step:52vw] max-[600px]:[--item:78vw] max-[600px]:[--tail:72vw]";

/**
 * @param {object} props
 * @param {TimelineItem[]} props.items
 * @param {string} [props.title]
 * @param {string} [props.periodLabel]
 * @param {string} [props.imageUrl]
 * @param {string} [props.imageAlt]
 * @param {string} [props.id]
 * @param {string} [props.className]  Section classes, e.g. the background.
 */
export default function Timeline({ items, title, periodLabel, imageUrl, imageAlt = "", id, className }) {
  const sectionRef = useRef(null);
  const pinRef = useRef(null);
  const trackRef = useRef(null);
  const reducedMotion = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const track = trackRef.current;
    const q = gsap.utils.selector(sectionRef);
    const splits = [];
    let cancelled = false;

    // The track is pinned at x = 0, so its own left edge is the viewport's
    const offsetInTrack = (el) => el.getBoundingClientRect().left - track.getBoundingClientRect().left;
    const viewportWidth = () => document.documentElement.clientWidth;
    // offsetWidth, not scrollWidth: the last milestone's text may hang past the line's end
    const shift = () => Math.max(0, track.offsetWidth - viewportWidth());

    const ctx = gsap.context(() => {
      // Pin the section and slide the track by exactly its overflow, 1px per 1px scrolled
      gsap.to(track, {
        x: () => -shift(),
        ease: "none",
        scrollTrigger: {
          id: "timeline-slide",
          trigger: pinRef.current,
          pin: true,
          start: "top top",
          end: () => `+=${shift()}`,
          scrub: true,
          invalidateOnRefresh: true,
        },
      });
    }, sectionRef);

    // Reveals split text into lines, so wait for the web fonts or the breaks land in the wrong place
    const buildReveals = () => {
      if (cancelled || reducedMotion) return;

      ctx.add(() => {
        const slide = ScrollTrigger.getById("timeline-slide");
        const area = q("[data-line-area]")[0];
        // The "drawing point": milestones reveal as they slide past it
        const focus = () => viewportWidth() * 0.85;
        const revealLength = () => viewportWidth() * 0.3;

        // The line is drawn up to the drawing point and is complete before the last milestone reveals
        gsap.fromTo(
          q("[data-line]"),
          { scaleX: () => gsap.utils.clamp(0, 1, (focus() - offsetInTrack(area)) / area.offsetWidth) },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: pinRef.current,
              start: () => slide.start,
              end: () => slide.end - revealLength(),
              scrub: true,
              invalidateOnRefresh: true,
            },
          },
        );

        q("[data-item]").forEach((item, i) => {
          const title = new SplitText(item.querySelector("[data-title]"), { type: "lines", mask: "lines" });
          const body = new SplitText(item.querySelectorAll("[data-body]"), { type: "lines", mask: "lines" });
          splits.push(title, body);

          // Starts when the milestone reaches the drawing point; ones already on screen
          // when the pin starts go one after another, and the last one finishes with the slide
          const start = () => {
            const reach = offsetInTrack(item) - focus();
            const stagger = i * window.innerHeight * 0.15;
            return Math.min(slide.start + Math.max(reach, stagger), slide.end - revealLength());
          };

          gsap
            .timeline({
              scrollTrigger: {
                trigger: pinRef.current,
                start,
                end: () => start() + revealLength(),
                scrub: true,
              },
            })
            .fromTo(item.querySelector("[data-stem]"), { scaleY: 0 }, { scaleY: 1, duration: 0.4, ease: "none" })
            .fromTo(item.querySelector("[data-dot]"), { scale: 0 }, { scale: 1, duration: 0.4, ease: "none" }, "<")
            .fromTo(title.lines, { yPercent: 100 }, { yPercent: 0, duration: 1, stagger: 0.05, ease: "power2.out" }, "-=0.2")
            .fromTo(body.lines, { yPercent: 100 }, { yPercent: 0, duration: 1, stagger: 0.05, ease: "power2.out" }, "<0.1");
        });
      });
      ScrollTrigger.refresh();
    };
    document.fonts.ready.then(buildReveals);

    return () => {
      cancelled = true;
      ctx.revert();
      splits.forEach((s) => s.revert());
    };
  }, [items, reducedMotion]);

  return (
    <section ref={sectionRef} id={id} className={cn("relative w-full", className)}>
      <div ref={pinRef} className="flex h-screen w-full items-start overflow-hidden pt-16 max-[600px]:pt-24">
        <div
          ref={trackRef}
          className="flex h-[clamp(320px,min(34vw,calc(100svh_-_12rem)),600px)] w-max items-center gap-[5vw] px-[5vw] will-change-transform max-[600px]:h-[72vh] max-[600px]:px-[7vw]"
        >
          {imageUrl && (
            <div className="h-full w-[30vw] shrink-0 overflow-hidden rounded-2xl max-[600px]:h-[65vw] max-[600px]:w-[80vw]">
              <img src={imageUrl} alt={imageAlt} draggable={false} className="h-full w-full object-cover" />
            </div>
          )}

          <div
            data-line-area
            className={cn("relative h-full shrink-0", LAYOUT_VARS)}
            style={{ width: `calc(var(--lead) + ${Math.max(items.length - 1, 0)} * var(--step) + var(--tail))` }}
          >
            {/* The line, with a dot at each end */}
            <div className="absolute inset-x-0 top-1/2 flex -translate-y-1/2 items-center">
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-500" />
              <span data-line className="h-0.5 flex-1 origin-left bg-brand-500" />
              <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-brand-500" />
            </div>

            <h2 className="absolute left-0 top-[6%] w-[calc(var(--lead)*0.8)] font-display text-[clamp(2rem,3.2vw,3.5rem)] font-extrabold leading-[0.95] tracking-tight text-navy-900 dark:text-white max-[600px]:text-[9vw]">
              {title}
            </h2>
            <p className="absolute left-0 top-[calc(50%+1.5rem)] w-[calc(var(--lead)*0.8)] text-[clamp(0.95rem,1.3vw,1.25rem)] text-slate-500 dark:text-slate-400 max-[600px]:text-[4.2vw]">
              {periodLabel}
            </p>

            {items.map((item, i) => {
              const top = i % 2 === 0;
              return (
                <div
                  key={item.id}
                  data-item
                  className={cn("absolute w-[var(--item)]", top ? "bottom-1/2 top-12" : "bottom-0 top-1/2")}
                  style={{ left: `calc(var(--lead) + ${i} * var(--step))` }}
                >
                  {/* Stem from the line to the dot */}
                  <span
                    data-stem
                    className={cn(
                      "absolute -left-px w-0.5 bg-brand-500",
                      top ? "bottom-0 top-1.5 origin-bottom" : "bottom-1.5 top-0 origin-top",
                    )}
                  />
                  <span
                    data-dot
                    className={cn("absolute -left-1.5 h-3 w-3 rounded-full bg-brand-500", top ? "top-0" : "bottom-0")}
                  />

                  <div
                    className={cn(
                      "flex h-full flex-col pl-[clamp(1.25rem,2.5vw,2.5rem)]",
                      top ? "-mt-2 justify-start" : "mt-2 justify-end",
                    )}
                  >
                    <h3
                      data-title
                      className="font-display text-[clamp(1.6rem,2.6vw,2.75rem)] font-bold leading-none tracking-tight text-navy-900 dark:text-white max-[600px]:text-[7vw]"
                    >
                      {item.title}
                    </h3>
                    {item.subtitle && (
                      <p
                        data-body
                        className="mt-2 text-[clamp(0.7rem,0.85vw,0.85rem)] font-semibold uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400 max-[600px]:text-[3.2vw]"
                      >
                        {item.subtitle}
                      </p>
                    )}
                    <p
                      data-body
                      className="mt-3 w-[90%] text-[clamp(0.95rem,1.3vw,1.3rem)] leading-snug text-slate-600 dark:text-slate-300 max-[600px]:text-[4.4vw]"
                    >
                      {item.content}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
