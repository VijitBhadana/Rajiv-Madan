import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, ChevronDown, ChevronUp, Star } from "lucide-react";
import { WorksWheel } from "@/components/ui/works-wheel";
import WoodBoard from "@/components/WoodBoard";
import { cn } from "@/lib/utils";
import { advantages, testimonials } from "../data/siteData";
import { unsplash } from "../lib/unsplash";

// The wheel's cards are portrait - a cover photo over the quote - and much
// bigger than its default image tiles, on a tighter drum so the neighbours
// still peek in at the top and bottom. Phones get a slightly narrower card.
const WHEEL = { cardHeight: 0.95, cardMaxWidth: 1, cardRatio: 0.74, drum: 1.55, bow: 1 };
const WHEEL_NARROW = { ...WHEEL, cardRatio: 0.68 };
// Pinned, the stage is short: the front card takes nearly all of its height.
const WHEEL_PINNED = { ...WHEEL, cardHeight: 0.98, cardMaxWidth: 0.98, cardRatio: 0.86 };

// On desktop the section pins under the navbar and the page's scroll plays it
// like a timeline: first the advantage cards come in one by one, then the
// wheel turns through every testimonial, then the section lets go. Lengths are in
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

// Below desktop the cards stack above the wheel as normal, and the wheel alone
// pins once it reaches the top: the page's scroll turns it through every
// testimonial, then it lets go and the next section scrolls in. Uses the
// same TURN_STEP / HOLD_END lengths as the desktop timeline.
const MOBILE_QUERY = "(max-width: 1023px)";

// Where each board's two posts stand, and so where its hinges or ropes meet it.
const PLANK_ANCHORS = ["16%", "84%"];

const clamp01 =(v) => Math.min(1, Math.max(0, v));

/** Scroll position (in testimonials) on the wheel's `turn` scale, where item i
    sits at i + 1, with a dwell at every item so a testimonial sits still long
    enough to be read instead of always moving. */
function dwell(units) {
  const i = Math.floor(units);
  const k = clamp01((units - i - 0.3) / 0.4);
  return 1 + i + k * k * (3 - 2 * k);
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

/** Corner fillet: card colour outside a quarter circle, so the photo's edge
    curves smoothly into the notch instead of meeting it at a hard corner. */
const FILLET = 18;
const filletStyle = {
  width: FILLET,
  height: FILLET,
  background: `radial-gradient(circle at 0 0, transparent ${FILLET - 0.5}px, var(--card) ${FILLET}px)`,
};

/** Share of the card's inner height the cover photo aims for. */
const PHOTO = 0.62;

function TestimonialCard({ item, width, height }) {
  // Sized off the measured card so it reads the same at every breakpoint.
  const titleSize = Math.max(16, Math.min(26, width / 17));
  const quoteSize = Math.max(12.5, Math.min(16.5, width / 28));
  const notch = Math.round(Math.max(60, Math.min(92, width * 0.2)));
  // The quote gets as many whole lines as fit beside the photo's share once
  // the padding, title and tag row are taken out - but never fewer than three;
  // on a short card the photo gives up the difference.
  const inner = height - 24;
  const textRoom = inner * (1 - PHOTO) - (20 + titleSize * 1.25 + 8 + 40);
  const lines = Math.max(3, Math.min(4, Math.floor(textRoom / (quoteSize * 1.6))));

  return (
    <div className="flex size-full flex-col rounded-[28px] bg-navy-900 p-2.5 font-sans shadow-panel [--card:theme(colors.navy.900)] dark:bg-navy-800 dark:ring-1 dark:ring-white/10 dark:[--card:theme(colors.navy.800)] sm:p-3">
      {/* Cover photo, with a notch cut from its bottom-right corner for the
          arrow button. It takes whatever height the text below leaves. */}
      <div className="relative min-h-0 flex-1 overflow-hidden rounded-[22px]">
        <img
          src={unsplash(item.image, 900)}
          alt=""
          draggable={false}
          loading="lazy"
          className="absolute inset-0 size-full object-cover"
        />
        <span
          className="absolute left-1/2 top-3 flex -translate-x-1/2 items-center gap-1 rounded-full bg-black/45 px-3 py-1 text-xs font-bold text-white ring-1 ring-white/20 backdrop-blur-md"
          aria-label={`${item.rating} out of 5 stars`}
        >
          <Star className="h-3 w-3 fill-amber-400 text-amber-400" />
          {item.rating}.0
        </span>
        <span
          aria-hidden="true"
          className="absolute bottom-0 right-0 rounded-tl-[40%] bg-[var(--card)]"
          style={{ width: notch, height: notch }}
        />
        <span aria-hidden="true" className="absolute right-0" style={{ ...filletStyle, bottom: notch }} />
        <span aria-hidden="true" className="absolute bottom-0" style={{ ...filletStyle, right: notch }} />
        <a
          href="#contact"
          aria-label="Talk to Rajiv about your business"
          className="absolute bottom-0 right-0 flex items-center justify-center rounded-full bg-brand-400 text-navy-900 transition hover:bg-brand-200"
          style={{ width: notch - 10, height: notch - 10 }}
        >
          <ArrowUpRight className="h-1/3 w-1/3" strokeWidth={2.25} />
        </a>
      </div>

      <div className="shrink-0 px-1.5 pb-1 pt-4 sm:px-2">
        <h3 className="font-semibold leading-tight text-white" style={{ fontSize: titleSize }}>
          {item.author}
        </h3>
        <blockquote
          className="mt-2 overflow-hidden leading-[1.6] text-slate-400 [-webkit-box-orient:vertical] [display:-webkit-box]"
          style={{ fontSize: quoteSize, WebkitLineClamp: lines }}
        >
          {item.quote}
        </blockquote>
        {/* One row only: a tag that would wrap onto a second row is hidden. */}
        <div className="mt-3 flex h-7 flex-wrap gap-x-2 gap-y-4 overflow-hidden">
          {[item.location.split(",")[0], ...item.tags].map((tag) => (
            <span
              key={tag}
              className="flex h-7 shrink-0 items-center whitespace-nowrap rounded-lg bg-white/10 px-2.5 text-[10px] font-bold uppercase tracking-wide text-white sm:text-[11px]"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Advantages() {
  const wheel = useRef(null);
  const sectionRef = useRef(null);
  const itemRefs = useRef([]);
  const listRef = useRef(null);
  const contentRef = useRef(null);
  const stripRef = useRef(null);
  const [state, setState] = useState({ index: 0, open: true });
  const wide = useMediaQuery("(min-width: 640px)");
  const pinned = useMediaQuery(PIN_QUERY);
  const mobile = useMediaQuery(MOBILE_QUERY);
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
        height: stage + revealEnd + ((count - 1) * TURN_STEP + HOLD_END) * vh,
        revealEnd,
        turnPx: TURN_STEP * vh,
        wheel: Math.max(384, Math.min(760, stage - 72)), // leaves room for the caption row; the wheel's own floor is 24rem
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [pinned, cards, count]);

  // Pixel lengths of the mobile wheel pin. A phone's innerHeight changes as its
  // URL bar slides in and out on scroll; only re-measure when the width changes
  // or the height jumps (rotation), or the pin would lurch mid-scroll.
  const [strip, setStrip] = useState(null);
  useEffect(() => {
    if (!mobile) {
      setStrip(null);
      return;
    }
    let last = null;
    const measure = () => {
      const vh = window.innerHeight;
      const w = window.innerWidth;
      if (last && last.w === w && Math.abs(last.vh - vh) < 150) return;
      last = { w, vh };
      const header = document.querySelector("header")?.offsetHeight ?? 0;
      const stage = vh - header;
      const wheelH = Math.max(384, Math.min(700, stage - 64)); // leaves room for the caption row
      setStrip({
        vh,
        header,
        stage,
        height: stage + ((count - 1) * TURN_STEP + HOLD_END) * vh,
        turnPx: TURN_STEP * vh,
        wheel: wheelH,
      });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [mobile, count]);

  // Turn the mobile wheel off the scroll position while it is pinned.
  useEffect(() => {
    if (!strip) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const el = stripRef.current;
      if (!el) return;
      const scrolled = strip.header - el.getBoundingClientRect().top; // 0 when the pin engages
      wheel.current?.set(dwell(Math.min(count - 1, Math.max(0, scrolled / strip.turnPx))));
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
  }, [strip, count]);

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
    const list = listRef.current;
    if (!layout) {
      items.forEach((el) => {
        if (el) el.style.opacity = el.style.transform = "";
      });
      list?.classList.add("is-floating"); // nothing to wait for: the boards are all there
      return;
    }
    let frame = 0;
    const update = () => {
      frame = 0;
      const section = sectionRef.current;
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const scrolled = layout.header - rect.top; // 0 when the pin engages

      const reveal = items.map((el, i) => {
        const from = (REVEAL_FROM + i * REVEAL_STEP) * layout.vh;
        const t = clamp01((scrolled - from) / (REVEAL_STEP * layout.vh));
        if (el) {
          el.style.opacity = String(t);
          el.style.transform = `translateY(${(1 - t) * 28}px)`;
        }
        return t;
      });
      // The boards start floating once the last one has arrived, and only
      // settle again once they are all gone, so they never snap still in view.
      if (reveal[reveal.length - 1] >= 1) list?.classList.add("is-floating");
      else if (reveal[0] <= 0) list?.classList.remove("is-floating");

      const units = Math.min(count - 1, Math.max(0, (scrolled - layout.revealEnd) / layout.turnPx));
      wheel.current?.set(dwell(units));
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

  // Arrows bring testimonial i to the front. Pinned, they scroll the page to
  // that stop on the timeline rather than turning the wheel behind the
  // scroll's back.
  const goTo = (i) => {
    if (strip) {
      const top = window.scrollY + stripRef.current.getBoundingClientRect().top;
      window.scrollTo({ top: top - strip.header + i * strip.turnPx, behavior: "smooth" });
      return;
    }
    if (!layout) {
      wheel.current?.goTo(i);
      return;
    }
    const top = window.scrollY + sectionRef.current.getBoundingClientRect().top;
    window.scrollTo({
      top: top - layout.header + layout.revealEnd + i * layout.turnPx,
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

            {/* Rustic wooden boards: the first hangs from a beam on two hinges,
                each one below from the board above on a pair of ropes tied
                round its posts. Later boards sit lower in the stack so their
                ropes run up behind the board above. */}
            <ul
              ref={listRef}
              className="plank-list mt-8 flex flex-col gap-[var(--plank-gap)] lg:mt-[clamp(1rem,3.5vh,2.5rem)]"
            >
              {advantages.items.map((item, i) => (
                <li
                  key={item.title}
                  ref={(node) => {
                    itemRefs.current[i] = node;
                  }}
                  className={cn("relative", i === 0 && "pt-[calc(var(--stub)+30px)]")}
                  style={{ zIndex: cards - i }}
                >
                  {i === 0 && (
                    <span aria-hidden="true" className="plank-beam">
                      <WoodBoard beam seed={11} />
                      {["2.5%", "97.5%"].map((left) => (
                        <span key={left} className="plank-screw" style={{ left }} />
                      ))}
                    </span>
                  )}
                  <div
                    className={cn(
                      "plank flex gap-4 px-6 py-5 sm:px-8 sm:py-6 lg:gap-5 lg:px-10 lg:py-[clamp(1rem,2.8vh,1.875rem)]",
                      i === 0 && "plank-hinged",
                    )}
                    style={{ "--i": i }}
                  >
                    {PLANK_ANCHORS.map((left) => (
                      <span key={left} aria-hidden="true">
                        {i > 0 && <span className="plank-rope" style={{ left }} />}
                        <span className="plank-stub" style={{ left }} />
                        {i > 0 && <span className="plank-tie" style={{ left }} />}
                      </span>
                    ))}
                    <WoodBoard seed={i * 7 + 3} className="plank-wood" />
                    <span className="plank-badge relative mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full lg:h-9 lg:w-9">
                      <Check className="h-4 w-4 lg:h-5 lg:w-5" strokeWidth={2.75} />
                    </span>
                    <div className="relative">
                      <h3 className="plank-title text-sm font-bold lg:text-[clamp(1rem,2.4vh,1.375rem)]">{item.title}</h3>
                      <p className="plank-text mt-1 text-[13px] font-medium leading-relaxed lg:text-[clamp(0.875rem,2vh,1.125rem)]">{item.text}</p>
                    </div>
                  </div>
                  {i === 0 &&
                    PLANK_ANCHORS.map((left) => (
                      <span key={left} aria-hidden="true" className="plank-hinge" style={{ left }}>
                        <span className="plank-hinge-leaf" />
                        <span className="plank-hinge-knuckle" />
                        <span className="plank-hinge-leaf" />
                      </span>
                    ))}
                </li>
              ))}
            </ul>
          </div>

          {/* Testimonials, on a drum turned by the page's scroll when pinned
              (the whole section on desktop, the wheel alone on mobile) -
              otherwise by scrolling over it, dragging or the arrows. */}
          <div
            id="testimonials"
            ref={stripRef}
            className="w-full max-w-xl scroll-mt-24 justify-self-center lg:max-w-none lg:justify-self-stretch"
            style={strip ? { height: strip.height } : undefined}
          >
            <div
              className={cn(strip && "sticky flex flex-col justify-center")}
              style={strip ? { top: strip.header, height: strip.stage } : undefined}
            >
              <WorksWheel
                ref={wheel}
                items={testimonials.items.map((item) => ({ ...item, title: item.author }))}
                label={testimonials.wheelLabel}
                geometry={layout ? WHEEL_PINNED : wide ? WHEEL : WHEEL_NARROW}
                showTitle={false}
                showIndex={false}
                interactive={!layout && !strip}
                ring={false}
                onChange={setState}
                renderItem={(item, { width, height }) => <TestimonialCard item={item} width={width} height={height} />}
                className="h-[500px] font-serif min-[400px]:h-[540px] sm:h-[600px]"
                style={layout ? { height: layout.wheel } : strip ? { height: strip.wheel } : undefined}
              />

              <div className="mt-2 flex items-center justify-between px-1">
                <p className="text-xs text-slate-500 dark:text-slate-400" aria-live="polite">
                  <span className="font-semibold text-navy-900 dark:text-white">{String(state.index + 1).padStart(2, "0")}</span>
                  {" / "}
                  {String(count).padStart(2, "0")}
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => goTo(state.index - 1)}
                    disabled={state.index === 0}
                    aria-label="Previous testimonial"
                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 bg-white text-navy-900 shadow-card transition hover:border-brand-400 hover:text-brand-600 dark:border-white/10 dark:bg-navy-800 dark:text-white dark:hover:border-brand-400 dark:hover:text-brand-400 disabled:pointer-events-none disabled:opacity-40"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => goTo(state.index + 1)}
                    disabled={state.index === count - 1}
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
      </div>
    </section>
  );
}
