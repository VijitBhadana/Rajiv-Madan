// Featured services on a vertical "product line". The line grows down from a
// start node as you scroll; when its tip reaches a service, the service's node
// pops, two branches reach out left and right, and the photo and copy slide in.
// On phones the line runs down the left edge with a single branch per service.
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight, BadgeCheck, Check, Layers } from "lucide-react";
import { unsplash } from "../lib/unsplash";
import { cn } from "../lib/utils";

gsap.registerPlugin(ScrollTrigger);

// Where on screen the line's tip sits while scrolling (fraction of viewport height)
const TIP = "80%";

export default function ServiceTree({ items, phoneHref }) {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);

  useLayoutEffect(() => {
    const q = gsap.utils.selector(sectionRef);
    const mm = gsap.matchMedia();

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const base = q("[data-line-base]")[0];
      const half = q("[data-start-node]")[0].offsetHeight / 2;

      // Grow the line so its tip stays at TIP on screen, from the start node to the end node
      gsap.fromTo(
        q("[data-line-fill]"),
        { height: 0 },
        {
          height: () => base.offsetHeight,
          ease: "none",
          scrollTrigger: {
            trigger: trackRef.current,
            start: () => `top+=${half} ${TIP}`,
            end: () => `bottom-=${half} ${TIP}`,
            scrub: true,
            invalidateOnRefresh: true,
          },
        }
      );

      q("[data-row]").forEach((row) => {
        const flip = row.dataset.flip === "true";
        gsap
          .timeline({
            scrollTrigger: {
              trigger: row.querySelector("[data-node]"),
              start: `center ${TIP}`,
              toggleActions: "play none none reverse",
            },
          })
          .from(row.querySelector("[data-node]"), { scale: 0, duration: 0.35, ease: "back.out(2.5)" })
          .from(row.querySelectorAll("[data-branch]"), { scaleX: 0, duration: 0.5, ease: "power2.out" }, "-=0.1")
          .from(row.querySelectorAll("[data-branch-end]"), { scale: 0, duration: 0.25 }, "-=0.15")
          .from(
            row.querySelector("[data-image]"),
            { autoAlpha: 0, x: flip ? 80 : -80, scale: 0.94, duration: 0.8, ease: "power3.out" },
            "-=0.3"
          )
          .from(
            row.querySelectorAll("[data-copy]"),
            { autoAlpha: 0, y: 28, duration: 0.6, stagger: 0.08, ease: "power3.out" },
            "<0.1"
          );
      });

      gsap.from(q("[data-end-fill]"), {
        scale: 0,
        duration: 0.5,
        ease: "back.out(2)",
        scrollTrigger: {
          trigger: q("[data-end-node]")[0],
          start: `center ${TIP}`,
          toggleActions: "play none none reverse",
        },
      });
    });

    // Web fonts change the copy's height, which moves every trigger
    document.fonts.ready.then(() => ScrollTrigger.refresh());

    return () => mm.revert();
  }, [items]);

  return (
    <section ref={sectionRef} className="overflow-x-clip bg-white pb-16 pt-8 dark:bg-navy-950 lg:pb-24 lg:pt-10">
      <div className="container-x">
        <p className="mb-4 flex justify-start pl-14 lg:justify-center lg:pl-0">
          <span className="rounded-full bg-brand-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700 ring-1 ring-brand-200 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/30">
            Our core services
          </span>
        </p>

        <div ref={trackRef} className="relative">
          {/* The line: a faint track and the part drawn so far, from the start node to the end node */}
          <span
            data-line-base
            className="absolute bottom-7 left-5 top-7 w-0.5 -translate-x-1/2 bg-slate-200 dark:bg-white/10 lg:left-1/2"
          />
          <span
            data-line-fill
            className="absolute bottom-7 left-5 top-7 w-0.5 -translate-x-1/2 bg-gradient-to-b from-brand-400 to-brand-600 lg:left-1/2"
          >
            <span className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-brand-400 shadow-[0_0_18px_5px_rgba(45,212,191,0.55)]" />
          </span>

          {/* Start node */}
          <div className="relative h-14">
            <span
              data-start-node
              className="absolute left-5 top-0 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-navy-900 text-brand-400 shadow-lg ring-4 ring-white dark:bg-navy-800 dark:ring-navy-950 lg:left-1/2"
            >
              <span className="absolute inset-0 animate-ping rounded-full bg-brand-500/30 motion-reduce:hidden" />
              <Layers className="relative h-6 w-6" aria-hidden="true" />
            </span>
          </div>

          <div className="space-y-16 pb-16 pt-10 sm:space-y-20 lg:space-y-28 lg:pb-24 lg:pt-12">
            {items.map((item, i) => {
              const flip = i % 2 === 1;
              return (
                <article
                  key={item.title}
                  data-row
                  data-flip={flip}
                  className="relative grid items-center gap-8 pl-14 lg:grid-cols-[1fr_7rem_1fr] lg:gap-0 lg:pl-0"
                >
                  {/* Node on the line (beside the photo on phones, centred on the row on desktop) */}
                  <span className="absolute left-5 top-10 z-10 h-5 w-5 -translate-x-1/2 -translate-y-1/2 lg:left-1/2 lg:top-1/2">
                    <span data-node className="absolute inset-0 rounded-full bg-brand-500 ring-4 ring-white dark:ring-navy-950">
                      <span className="absolute inset-1.5 rounded-full bg-white dark:bg-navy-950" />
                    </span>
                  </span>

                  {/* Phone: one branch to the right */}
                  <span
                    data-branch
                    className="absolute left-5 top-[39px] h-0.5 w-9 origin-left bg-brand-500 lg:hidden"
                  />

                  {/* Desktop: two branches, out to the photo and to the copy */}
                  <div className="relative row-start-1 hidden self-stretch lg:col-start-2 lg:block">
                    <span
                      data-branch
                      className="absolute left-0 right-1/2 top-[calc(50%-1px)] h-0.5 origin-right bg-gradient-to-l from-brand-500 to-brand-400"
                    />
                    <span
                      data-branch
                      className="absolute left-1/2 right-0 top-[calc(50%-1px)] h-0.5 origin-left bg-gradient-to-r from-brand-500 to-brand-400"
                    />
                    <span
                      data-branch-end
                      className="absolute -left-[5px] top-[calc(50%-5px)] h-2.5 w-2.5 rounded-full bg-brand-400"
                    />
                    <span
                      data-branch-end
                      className="absolute -right-[5px] top-[calc(50%-5px)] h-2.5 w-2.5 rounded-full bg-brand-400"
                    />
                  </div>

                  <div data-image className={cn("lg:row-start-1", flip ? "lg:col-start-3" : "lg:col-start-1")}>
                    <div className="group relative">
                      <div
                        className={cn(
                          "absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand-200 to-gold-400/30 opacity-60 blur-xl dark:from-brand-500/30 dark:to-gold-400/20",
                          flip ? "rotate-2" : "-rotate-2"
                        )}
                      />
                      <div className="relative overflow-hidden rounded-3xl shadow-panel">
                        <img
                          src={unsplash(item.image, 900)}
                          alt={item.imageAlt}
                          loading="lazy"
                          className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
                        <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-navy-900 backdrop-blur">
                          <BadgeCheck className="h-3.5 w-3.5 text-brand-600" />
                          {item.badge}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={cn("lg:row-start-1", flip ? "lg:col-start-1" : "lg:col-start-3")}>
                    <span
                      data-copy
                      className="block font-display text-5xl font-extrabold leading-none text-slate-100 dark:text-white/10 sm:text-6xl"
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p
                      data-copy
                      className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400"
                    >
                      {item.tag}
                    </p>
                    <h2
                      data-copy
                      className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight text-navy-900 dark:text-white sm:text-4xl"
                    >
                      {item.title}
                    </h2>
                    <p data-copy className="mt-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
                      {item.text}
                    </p>
                    {item.points && (
                      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                        {item.points.map((point) => (
                          <li
                            key={point}
                            data-copy
                            className="flex items-start gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-200"
                          >
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-200 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/30">
                              <Check className="h-3 w-3" strokeWidth={3} />
                            </span>
                            {point}
                          </li>
                        ))}
                      </ul>
                    )}
                    <a
                      data-copy
                      href={phoneHref}
                      className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-navy-900 dark:text-white"
                    >
                      <span className="border-b-2 border-brand-400 pb-0.5 transition group-hover:border-navy-900 dark:group-hover:border-white">
                        Talk to Rajiv about this
                      </span>
                      <ArrowRight className="h-4 w-4 text-brand-600 transition group-hover:translate-x-1 dark:text-brand-400" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>

          {/* End node - fills in when the line reaches it */}
          <div className="relative h-14">
            <span
              data-end-node
              className="absolute left-5 top-0 flex h-14 w-14 -translate-x-1/2 items-center justify-center rounded-full bg-white ring-2 ring-slate-200 dark:bg-navy-950 dark:ring-white/10 lg:left-1/2"
            >
              <span
                data-end-fill
                className="absolute inset-0 flex items-center justify-center rounded-full bg-brand-500 text-navy-950 shadow-[0_0_24px_rgba(20,184,166,0.45)]"
              >
                <Check className="h-6 w-6" strokeWidth={3} aria-hidden="true" />
              </span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
