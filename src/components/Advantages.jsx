import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Check, ChevronDown, ChevronUp, Quote, Star } from "lucide-react";
import { WorksWheel } from "@/components/ui/works-wheel";
import { cn } from "@/lib/utils";
import { advantages, testimonials } from "../data/siteData";

// The wheel's cards are text, not artwork: bigger and squarer than its default
// image tiles, on a slightly tighter drum so the neighbours still peek in at the
// top and bottom. Phones get an almost square card so a long quote still fits.
const WHEEL = { cardHeight: 0.54, cardMaxWidth: 0.94, cardRatio: 1.3, drum: 1.9, bow: 1 };
const WHEEL_NARROW = { ...WHEEL, cardRatio: 1.05 };
// Pinned, the wheel is a wide, short stage: a taller and wider front card fills
// it, with the neighbours only peeking in at the edges.
const WHEEL_PINNED = { ...WHEEL, cardHeight: 0.72, cardMaxWidth: 0.96, cardRatio: 1.5 };

// On desktop the section pins under the navbar and the page's scroll plays it
// like a timeline: first the advantage cards come in one by one, then the
// wheel opens and turns through every testimonial, then the section lets go
// and the wheel folds back into its ring on the way down. Lengths are in
// viewport heights of scrolling. On desktop the type and spacing grow with the
// viewport's height (vh clamps) so the section fills the pinned stage; short
// viewports (a laptop at 125-150% zoom) still pin, and if the stage runs out of
// room the advantages column is scaled down to fit rather than dropping the
// effect (the wheel sizes itself to the stage, so it never needs to).
const PIN_QUERY = "(min-width: 1024px) and (min-height: 480px)";
const REVEAL_FROM = -0.35; // the first card starts arriving before the pin...
const REVEAL_STEP = 0.2; // ...and each card takes this long to come in
const TURN_STEP = 0.45; // one testimonial
const HOLD_END = 0.35; // the last testimonial stays put before the pin lets go
const RESET_AT = 0.5; // fold the wheel up once the section's bottom rises above this much of the viewport

const clamp01 = (v) => Math.min(1, Math.max(0, v));

/** Scroll position on the wheel's `turn` scale, with a dwell at every item so a
    testimonial sits still long enough to be read instead of always moving. */
function dwell(units) {
  const i = Math.floor(units);
  const k = clamp01((units - i - 0.3) / 0.4);
  return i + k * k * (3 - 2 * k);
}

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => window.matchMedia(query).matches);
  useEffect(() => {
    const list = window.matchMedia(query);
    const read = () => setMatches(list.matches);
    read();
    list.addEventListener("change", read);
    return () => list.removeEventListener("change", read);
  }, [query]);
  return matches;
}

function TestimonialCard({ item, width }) {
  // Sized off the measured card so the quote fits at every breakpoint.
  const quoteSize = Math.max(12.5, Math.min(19, width / 27));
  return (
    <div className="flex size-full flex-col rounded-2xl bg-navy-900 p-4 font-sans shadow-panel dark:bg-navy-800 dark:ring-1 dark:ring-white/10 sm:p-6">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-400">{testimonials.label}</p>
        <div className="flex gap-1" aria-label={`${item.rating} out of 5 stars`}>
          {Array.from({ length: item.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>

      <blockquote
        className="mt-4 min-h-0 flex-1 overflow-hidden italic leading-relaxed text-white"
        style={{ fontSize: quoteSize }}
      >
        {item.quote}
      </blockquote>

      <div className="mt-4 flex items-end justify-between border-t border-white/10 pt-4">
        <div>
          <p className="font-serif text-base text-white">{item.author}</p>
          <p className="text-xs text-brand-400">{item.location}</p>
        </div>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/5 text-slate-400 ring-1 ring-white/10">
          <Quote className="h-4 w-4" />
        </span>
      </div>
    </div>
  );
}

export default function Advantages() {
  const wheel = useRef(null);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);
  const contentRef = useRef(null);
  const [state, setState] = useState({ index: 0, open: false });
  const wide = useMediaQuery("(min-width: 640px)");
  const pinned = useMediaQuery(PIN_QUERY);
  const count = testimonials.items.length;
  const cards = advantages.items.length;

  // Pixel lengths of the pinned timeline, measured off the viewport.
  const [layout, setLayout] = useState(null);
  useEffect(() => {
    if (!pinned) {
      setLayout(null);
      return;
    }
    const measure = () => {
      const vh = window.innerHeight;
      const header = document.querySelector("header")?.offsetHeight ?? 0;
      const stage = vh - header;
      const revealEnd = (REVEAL_FROM + cards * REVEAL_STEP) * vh;
      setLayout({
        vh,
        header,
        stage,
        height: stage + revealEnd + (count * TURN_STEP + HOLD_END) * vh,
        revealEnd,
        turnPx: TURN_STEP * vh,
        wheel: Math.max(384, Math.min(760, stage - 72)), // leaves room for the caption row; the wheel's own floor is 24rem
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned, cards, count]);

  // Scale the advantages column down when it is taller than the stage.
  // offsetHeight ignores the transform, so this reads its natural height.
  const [fit, setFit] = useState(1);
  useLayoutEffect(() => {
    const el = contentRef.current;
    if (!layout || !el) {
      setFit(1);
      return;
    }
    const read = () => setFit(Math.min(1, (layout.stage - 24) / el.offsetHeight));
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, [layout]);

  // Play the timeline off the scroll position. Writes straight to the DOM and
  // the wheel's handle, so scrolling is not a render.
  useEffect(() => {
    const items = itemRefs.current;
    if (!layout) {
      items.forEach((el) => {
        if (el) el.style.opacity = el.style.transform = "";
      });
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrolled = layout.header - rect.top; // 0 when the pin engages

      items.forEach((el, i) => {
        if (!el) return;
        const from = (REVEAL_FROM + i * REVEAL_STEP) * layout.vh;
        const t = clamp01((scrolled - from) / (REVEAL_STEP * layout.vh));
        el.style.opacity = String(t);
        el.style.transform = `translateY(${(1 - t) * 28}px)`;
      });

      if (rect.bottom < layout.vh * RESET_AT) wheel.current?.set(0);
      else {
        const units = Math.min(count, Math.max(0, (scrolled - layout.revealEnd) / layout.turnPx));
        wheel.current?.set(dwell(units));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [layout, count]);

  // Arrows go to a position on the wheel's `turn` scale (0 = ring, i + 1 =
  // testimonial i). Pinned, they scroll the page to that stop on the timeline
  // rather than turning the wheel behind the scroll's back.
  const goTo = (turn) => {
    if (!layout) {
      wheel.current?.set(turn);
      return;
    }
    const top = window.scrollY + sectionRef.current.getBoundingClientRect().top;
    window.scrollTo({
      top: top - layout.header + layout.revealEnd + turn * layout.turnPx,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="advantages"
      ref={sectionRef}
      className={cn("bg-surface dark:bg-navy-900", !layout && "py-16 sm:py-20 lg:py-24")}
      style={layout ? { height: layout.height } : undefined}
    >
      <div
        className={cn(layout && "sticky flex items-center")}
        style={layout ? { top: layout.header, height: layout.stage } : undefined}
      >
        <div className="container-x grid w-full items-center gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Advantages list */}
          <div
            ref={contentRef}
            style={layout && fit < 1 ? { transform: `scale(${fit})`, transformOrigin: "left center" } : undefined}
          >
            <p className="eyebrow">{advantages.eyebrow}</p>
            <h2 className="heading-serif mt-3 text-3xl sm:text-4xl lg:mt-2 lg:text-[clamp(2.25rem,6vh,3.5rem)]">{advantages.title}</h2>

            <ul className="mt-8 space-y-3 lg:mt-[clamp(1rem,3.5vh,2.5rem)] lg:space-y-[clamp(0.5rem,1.5vh,1rem)]">
              {advantages.items.map((item, i) => (
                <li
                  key={item.title}
                  ref={(node) => {
                    itemRefs.current[i] = node;
                  }}
                  className="flex gap-4 rounded-xl border border-slate-200/80 bg-white p-4 shadow-card dark:border-white/10 dark:bg-navy-800 sm:p-5 lg:gap-5 lg:px-7 lg:py-[clamp(0.75rem,2.2vh,1.5rem)]"
                >
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-200 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/30 lg:h-9 lg:w-9">
                    <Check className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={2.5} />
                  </span>
                  <div>
                    <h3 className="text-sm font-semibold text-navy-900 dark:text-white lg:text-[clamp(1rem,2.4vh,1.375rem)]">{item.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400 lg:text-[clamp(0.875rem,2vh,1.125rem)]">{item.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonials, on a wheel: a ring at rest, opened into a drum by the
              page's scroll when pinned - otherwise by scrolling over it,
              dragging (swiping sideways on touch) or the arrows. */}
          <div id="testimonials" className="w-full max-w-xl scroll-mt-24 justify-self-center lg:max-w-none lg:justify-self-stretch">
            <WorksWheel
              ref={wheel}
              items={testimonials.items.map((item) => ({ ...item, title: item.author }))}
              label={testimonials.wheelLabel}
              geometry={layout ? WHEEL_PINNED : wide ? WHEEL : WHEEL_NARROW}
              showTitle={false}
              showIndex={false}
              interactive={!layout}
              onChange={setState}
              renderItem={(item, { width }) => <TestimonialCard item={item} width={width} />}
              className="h-[500px] font-serif min-[400px]:h-[540px] sm:h-[600px]"
              style={layout ? { height: layout.wheel } : undefined}
            />

            <div className="mt-2 flex items-center justify-between px-1">
              <p className="text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
                {state.open ? (
                  <>
                    <span className="font-semibold text-navy-900 dark:text-white">{String(state.index + 1).padStart(2, "0")}</span>
                    {" / "}
                    {String(count).padStart(2, "0")}
                  </>
                ) : layout ? (
                  "Keep scrolling to read"
                ) : (
                  "Scroll, drag or tap the arrows to read"
                )}
              </p>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => goTo(state.index)}
                  disabled={!state.open}
                  aria-label="Previous testimonial"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-navy-900 shadow-card transition hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:bg-navy-800 dark:text-white dark:hover:border-brand-400 dark:hover:text-brand-400 disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronUp className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(state.open ? state.index + 2 : 1)}
                  disabled={state.open && state.index === count - 1}
                  aria-label="Next testimonial"
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-navy-900 shadow-card transition hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:bg-navy-800 dark:text-white dark:hover:border-brand-400 dark:hover:text-brand-400 disabled:pointer-events-none disabled:opacity-40"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
