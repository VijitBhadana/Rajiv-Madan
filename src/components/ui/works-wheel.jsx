// A portfolio index built as a wheel you turn.
//
// At rest the work sits in a ring around a title, each card tangent to the
// circle. The first notch of scroll blows the ring open into a vertical drum:
// the card at the front lies flat and full size, the ones above and below
// rotate away into hard perspective and run off the top and bottom of the
// frame. Keep turning and the drum carries the next piece round to the front.
//
// The whole thing is one number - `turn` - read by a single rAF pass that writes
// transforms straight to the DOM. 0 is the ring, 1 is the drum with item 0 at
// the front, and every whole number after that is one more item turned past.
//
// Ported from the TSX original for this JS project. Additions: `renderItem`
// (any card face instead of an image), `geometry` overrides, `showTitle` /
// `showIndex`, `onChange`, an imperative handle (`next`, `prev`, `goTo`, `set`)
// so a parent can draw its own controls, and `interactive` so the parent can
// drive the wheel alone - from the page's scroll, say.
import * as React from "react";

import { cn } from "@/lib/utils";

/**
 * @typedef {object} WorksWheelItem
 * @property {string} title  Shown beside the front card and in the index.
 * @property {string} [image] Cover art. Any src an <img> takes. Unused with `renderItem`.
 * @property {string} [href]  Where the card links to. Omit for a wheel that only browses.
 */

/* Geometry. The card is measured against the stage; everything else is measured
   against the card, so a narrow stage - where the card is capped by width, not
   height - scales the whole wheel down with it instead of leaving a small card
   swinging on a huge drum. The three that matter are tuned together: step
   against drum sets how hard the neighbours rotate away, and drum against lens
   decides whether they land inside the frame or run off it.
   The drum alone hangs the work on a plumb line. It isn't one: the strip curves
   away round an arc whose centre sits off to the LEFT, so the piece at the front
   is at the arc's near point - dead centre - and its neighbours have already
   swung back left as well as up and down. `bow` is that arc's radius. */
const GEOMETRY = {
  cardHeight: 0.38, // front card height, of the stage
  cardMaxWidth: 0.34, // ... but never wider than this much of the stage
  cardRatio: 1.45, // card width / height
  step: 40, // degrees between cards on the drum
  drum: 2.22, // drum radius, in card heights - and everything below likewise
  lens: 2.7, // perspective distance
  ringRadius: 1.14, // ring radius
  bow: 1.82,
};
const TITLE = 0.124; // ring label and front-card title
const INDEX = 0.04; // the index down the right-hand side
/** Items either side of the front still worth drawing. Past this a card is
    edge-on, and further round it would stack up on the vanishing point. */
const CULL = 1.6;

/** How much of a wheel-notch or a dragged pixel counts as one item. */
const WHEEL_UNITS = 900;
const DRAG_UNITS = 420;
/** Quiet time after the last wheel event before the wheel settles on an item. */
const SETTLE = 140;
/** Fraction of the remaining distance closed each frame. 1 = no smoothing. */
const EASE = 0.12;

const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const lerp = (a, b, t) => a + (b - a) * t;
const rad = (deg) => (deg * Math.PI) / 180;

/** How far left the arc has carried something that has turned `drumDeg` off the
    front. Zero at the front, so the piece being read stays centred. */
const bowAt = (drumDeg, bow) => -bow * (1 - Math.cos(rad(drumDeg)));

/** Both states in one chain: the ring terms fall away as `m` reaches the drum,
    and the drum terms are still zero while the ring is up. The bow is applied
    first, in the wheel's own plane, so it slides the card sideways rather than
    turning with it - and perspective still shrinks it with distance. */
function place(ringDeg, drumDeg, ringR, drumR, bow, m) {
  return (
    `translateX(${m * bowAt(drumDeg, bow)}px)` +
    ` rotateZ(${(1 - m) * ringDeg}deg) translateY(${-(1 - m) * ringR}px)` +
    ` rotateX(${m * drumDeg}deg) translateZ(${m * drumR}px)`
  );
}

/**
 * @param {object} props
 * @param {WorksWheelItem[]} props.items
 * @param {string} [props.label] Sits in the middle of the ring.
 * @param {string} [props.action] Label on the card's hover affordance. Omit to drop it.
 * @param {(item: any, info: { index: number, active: boolean, width: number, height: number }) => React.ReactNode} [props.renderItem]
 *   Draws the card face. Defaults to the item's cover image.
 * @param {Partial<typeof GEOMETRY>} [props.geometry] Overrides for the wheel's proportions.
 * @param {boolean} [props.showTitle] Front card's title beside it. @default true
 * @param {boolean} [props.showIndex] Item index down the right-hand side. @default true
 * @param {(state: { index: number, open: boolean }) => void} [props.onChange]
 *   Fires when the front item changes or the ring opens / closes.
 * @param {boolean} [props.interactive] Turn on wheel, drag and arrow keys. Off,
 *   the wheel only moves through its handle. @default true
 * @param {boolean} [props.ring] Start as the ring around the label. Off, the
 *   wheel opens straight onto the drum and never folds back up. @default true
 */
export const WorksWheel = React.forwardRef(function WorksWheel(
  {
    items,
    label = "Works '26",
    action = "View",
    renderItem,
    geometry: geometryOverrides,
    showTitle = true,
    showIndex = true,
    onChange,
    interactive = true,
    ring = true,
    className,
    ...props
  },
  ref,
) {
  const stageRef = React.useRef(null);
  const wheelRef = React.useRef(null);
  const cardRefs = React.useRef([]);
  const labelRef = React.useRef(null);
  const titleRef = React.useRef(null);

  // The wheel's position, and where it is heading. Only `active` and `open` are
  // state - everything else is written to the DOM, so turning is not a render.
  // Without the ring, the lowest the wheel goes is item 0 at the front.
  const floor = ring ? 0 : 1;
  const turn = React.useRef(floor);
  const target = React.useRef(floor);
  const [active, setActive] = React.useState(0);
  const [open, setOpen] = React.useState(!ring);
  const [stage, setStage] = React.useState({ w: 0, h: 0 });

  const count = items.length;
  const last = Math.max(count - 1, 0);

  const g = React.useMemo(
    () => ({ ...GEOMETRY, ...geometryOverrides }),
    // Callers usually pass an inline object; compare by value.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [JSON.stringify(geometryOverrides ?? {})],
  );

  // Reduced motion drops the easing, so the wheel lands where it is put
  // instead of gliding there.
  const [reduced, setReduced] = React.useState(false);
  React.useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const read = () => setReduced(query.matches);
    read();
    query.addEventListener("change", read);
    return () => query.removeEventListener("change", read);
  }, []);

  React.useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const read = () => setStage({ w: el.clientWidth, h: el.clientHeight });
    read();
    const ro = new ResizeObserver(read);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const metrics = React.useMemo(() => {
    const { w, h } = stage;
    const cardW = Math.min(h * g.cardHeight * g.cardRatio, w * g.cardMaxWidth);
    const cardH = cardW / g.cardRatio;
    const drumR = cardH * g.drum;
    // Shrink the ring's cards until the circle reads as a closed loop rather
    // than beads on a wire, however many pieces the wheel is given. A card on
    // the ring reaches R + its scaled half-height = R * (1 + 0.82π / (n·ratio))
    // out from the centre - keep that inside the stage so a narrow or squat
    // stage doesn't crop the ring.
    const reach = count ? 1 + (0.82 * Math.PI) / (count * g.cardRatio) : 1;
    const ringR = Math.min(cardH * g.ringRadius, (0.5 * Math.min(w, h)) / reach);
    const ringScale = count
      ? clamp((((2 * Math.PI * ringR) / count) * 0.82) / (cardW || 1), 0.16, 1)
      : 1;
    const title = cardH * TITLE;
    return {
      cardW,
      cardH,
      ringR,
      ringScale,
      drumR,
      bow: cardH * g.bow,
      depth: cardH * g.lens,
      title,
      // The label has to fit inside the ring as well as read at a distance.
      label: Math.min(title, ringR * 0.17),
      index: cardH * INDEX,
    };
  }, [stage, count, g]);

  // One pass per frame: ease toward the target, then write every transform.
  React.useEffect(() => {
    if (!stage.h) return;
    let frame = 0;
    const { ringR, ringScale, drumR, bow } = metrics;

    const draw = () => {
      frame = requestAnimationFrame(draw);
      const gap = target.current - turn.current;
      if (Math.abs(gap) < 0.0005) turn.current = target.current;
      else turn.current += gap * (reduced ? 1 : EASE);

      const t = turn.current;
      const m = clamp(t, 0, 1);
      const pos = Math.max(0, t - 1);

      // The drum is pulled back so its front face lands on the picture plane.
      // That set-back has to arrive with the drum, or the ring would sit at the
      // far side of the perspective and render at half its size.
      if (wheelRef.current) {
        wheelRef.current.style.transform = `translateZ(${-m * drumR}px)`;
      }

      for (let i = 0; i < count; i++) {
        const d = i - pos;
        const drumDeg = d * g.step;
        const card = cardRefs.current[i];
        if (card) {
          card.style.transform = place(
            d * (360 / count),
            drumDeg,
            ringR,
            drumR,
            bow,
            m,
          );
          // Culled by distance, not by angle: at a full turn the far side comes
          // back round to face us, and everything past the neighbours lands on
          // the vanishing point in a heap.
          card.style.opacity = m > 0.5 && Math.abs(d) > CULL ? "0" : "1";
          card.style.zIndex = String(Math.round(100 - Math.abs(d) * 2));
        }
        const face = card?.firstElementChild;
        if (face) face.style.transform = `scale(${lerp(ringScale, 1, m)})`;
      }

      if (labelRef.current) labelRef.current.style.opacity = String(1 - m);
      if (titleRef.current) titleRef.current.style.opacity = String(m);
      const near = clamp(Math.round(pos), 0, last);
      setActive((prev) => (prev === near ? prev : near));
      const isOpen = m > 0.5;
      setOpen((prev) => (prev === isOpen ? prev : isOpen));
    };

    frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [metrics, stage.h, count, last, reduced, g.step]);

  const onChangeRef = React.useRef(onChange);
  onChangeRef.current = onChange;
  React.useEffect(() => {
    onChangeRef.current?.({ index: active, open });
  }, [active, open]);

  const to = React.useCallback(
    (next) => {
      target.current = clamp(next, floor, last + 1);
    },
    [last, floor],
  );

  React.useImperativeHandle(
    ref,
    () => ({
      /** Bring item `i` to the front. */
      goTo: (i) => to(i + 1),
      /** Turn one item on - from the ring, this opens onto the first item. */
      next: () => to(Math.round(target.current) + 1),
      /** Turn one item back - from the first item, this closes to the ring. */
      prev: () => to(Math.round(target.current) - 1),
      /** Head for any position on the `turn` scale: 0 is the ring, i + 1 is
          item i at the front, and fractions sit between. */
      set: (t) => to(t),
    }),
    [to],
  );

  const drag = React.useRef(null);
  const settling = React.useRef(0);

  // Native listener, because the wheel has to be cancellable - and it only
  // cancels while it still has somewhere to go, so the page scrolls on at
  // either end instead of trapping the reader.
  React.useEffect(() => {
    const el = stageRef.current;
    if (!el || !interactive) return;
    const onWheel = (event) => {
      const next = target.current + event.deltaY / WHEEL_UNITS;
      if (next > floor && next < last + 1) event.preventDefault();
      to(next);
      // A wheel gesture arrives as a burst of events with no end of its own, so
      // the rest position is whatever notch it happened to stop on. Settle onto
      // an item - the next one in the direction of travel, so even a single
      // notch of a mouse wheel moves the wheel on instead of rounding back to
      // where it started (which would swallow the page scroll for nothing).
      const settle = event.deltaY > 0 ? Math.ceil : Math.floor;
      window.clearTimeout(settling.current);
      settling.current = window.setTimeout(
        () => to(settle(target.current - Math.sign(event.deltaY) * 0.001)),
        SETTLE,
      );
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => {
      el.removeEventListener("wheel", onWheel);
      window.clearTimeout(settling.current);
    };
  }, [to, last, floor, interactive]);

  // Handlers for driving the wheel by hand; left off when the parent drives it.
  const handlers = interactive
    ? {
        onPointerDown: (event) => {
          const touch = event.pointerType === "touch";
          drag.current = { touch, at: touch ? event.clientX : event.clientY };
          event.currentTarget.setPointerCapture(event.pointerId);
        },
        onPointerMove: (event) => {
          if (drag.current === null) return;
          const at = drag.current.touch ? event.clientX : event.clientY;
          to(target.current + (drag.current.at - at) / DRAG_UNITS);
          drag.current.at = at;
        },
        onPointerUp: () => {
          // Land on an item rather than between two.
          drag.current = null;
          if (target.current > 1) to(Math.round(target.current));
        },
        onPointerCancel: () => {
          // The page took the gesture over to scroll.
          drag.current = null;
          if (target.current > 1) to(Math.round(target.current));
        },
        onKeyDown: (event) => {
          if (event.key === "ArrowDown") to(Math.round(target.current) + 1);
          else if (event.key === "ArrowUp") to(Math.round(target.current) - 1);
          else return;
          event.preventDefault();
        },
      }
    : {};

  return (
    <section
      aria-label={label}
      className={cn(
        "relative h-full min-h-[24rem] w-full select-none overflow-hidden text-navy-900 dark:text-white",
        className,
      )}
      {...props}
    >
      {/* Mouse and pen turn the wheel by dragging up and down. Touch leaves the
          vertical axis to the page (touch-pan-y) so a phone can still scroll
          past, and turns the wheel with a sideways swipe instead. */}
      <div
        ref={stageRef}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`works-wheel-${active}`}
        className={cn(
          "absolute inset-0 touch-pan-y outline-none focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-brand-500",
          interactive && "cursor-grab active:cursor-grabbing",
        )}
        style={{ perspective: `${metrics.depth}px` }}
        {...handlers}
      >
        <div
          ref={wheelRef}
          className="absolute left-1/2 top-1/2 [transform-style:preserve-3d]"
        >
          {items.map((item, i) => {
            const Tag = item.href ? "a" : "div";
            return (
              <Tag
                key={i}
                id={`works-wheel-${i}`}
                role="option"
                aria-selected={i === active}
                href={item.href}
                ref={(node) => {
                  cardRefs.current[i] = node;
                }}
                className="group absolute [backface-visibility:hidden]"
                style={{
                  width: metrics.cardW,
                  height: metrics.cardH,
                  marginLeft: -metrics.cardW / 2,
                  marginTop: -metrics.cardH / 2,
                }}
              >
                {renderItem ? (
                  <span className="relative block size-full">
                    {renderItem(item, {
                      index: i,
                      active: i === active,
                      width: metrics.cardW,
                      height: metrics.cardH,
                    })}
                  </span>
                ) : (
                  <span className="relative block size-full overflow-hidden rounded-lg bg-slate-100 dark:bg-navy-800 shadow-[0_18px_40px_-18px_rgba(11,26,46,0.12)]">
                    <img
                      src={item.image}
                      alt={item.title}
                      draggable={false}
                      className="size-full object-cover"
                    />
                    {action && item.href ? (
                      <span className="pointer-events-none absolute bottom-3 right-3 flex translate-y-1 items-center gap-1 rounded-full bg-white/80 px-2.5 py-1 text-[0.7rem] text-navy-900 opacity-0 backdrop-blur-sm transition group-hover:translate-y-0 group-hover:opacity-100">
                        <svg viewBox="0 0 12 12" className="size-2.5" aria-hidden="true">
                          <path
                            d="M3 9 9 3M4 3h5v5"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="1.4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        {action}
                      </span>
                    ) : null}
                  </span>
                )}
              </Tag>
            );
          })}
        </div>
      </div>

      {/* Ring title and front-card title trade places across the transition.
          Type is sized off the measured stage, not vh, so the wheel keeps its
          proportions inside a card as well as at full bleed. */}
      {ring ? (
        <div
          ref={labelRef}
          className="pointer-events-none absolute inset-0 grid place-items-center tracking-tight"
          style={{ fontSize: metrics.label }}
        >
          {label}
        </div>
      ) : null}
      {showTitle ? (
        <div
          ref={titleRef}
          className="pointer-events-none absolute left-[8%] top-1/2 -translate-y-1/2 tracking-tight opacity-0"
          style={{ fontSize: metrics.title }}
        >
          {items[active]?.title}
        </div>
      ) : null}

      {showIndex ? (
        <ol
          className="absolute right-[2.5%] top-[7.5%] text-right leading-[1.75] text-slate-500 dark:text-slate-400"
          style={{ fontSize: metrics.index }}
        >
          {items.map((item, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => to(i + 1)}
                className={cn(
                  "cursor-pointer outline-none transition-colors focus-visible:outline-1 focus-visible:outline-brand-500",
                  i === active && "font-medium text-navy-900 dark:text-white",
                )}
              >
                {item.title}
              </button>
            </li>
          ))}
        </ol>
      ) : null}
    </section>
  );
});

export default WorksWheel;
