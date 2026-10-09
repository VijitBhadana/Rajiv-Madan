import { useId, useMemo } from "react";

/** Small seeded RNG, so every board keeps the same edges and knots on each render. */
function rng(seed) {
  let a = seed * 9301 + 49297;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const between = (r, lo, hi) => lo + r() * (hi - lo);

/** A rough, hand-cut outline: a near-straight top, jagged ends and a wavy bottom. */
function outline(r, w, h, inset, amp) {
  const pts = [];
  for (let x = inset; x < w - inset; x += between(r, 28, 50)) pts.push([x, inset + r() * amp.top]);
  for (let y = inset; y < h - inset; y += between(r, 6, 14)) pts.push([w - inset - r() * amp.side, y]);
  for (let x = w - inset; x > inset; x -= between(r, 18, 42)) pts.push([x, h - inset - r() * amp.bottom]);
  for (let y = h - inset; y > inset; y -= between(r, 6, 14)) pts.push([inset + r() * amp.side, y]);
  return "M" + pts.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join("L") + "Z";
}

const BOARD = { w: 600, h: 160, inset: 6, amp: { top: 4, side: 11, bottom: 9 }, grain: "0.004 0.08", fine: "0.015 0.7", burn: 26, blur: 8, depth: 5 };
const BEAM = { w: 600, h: 24, inset: 1, amp: { top: 1.2, side: 3, bottom: 1.5 }, grain: "0.004 0.35", fine: "0.015 1.6", burn: 8, blur: 2.5, depth: 0 };

/**
 * A rustic plank of wood drawn in SVG, stretched to fill its parent: grain,
 * knots and checks over a burnt, rough-cut edge. `beam` draws a plain,
 * narrow batten instead of the two-plank sign board.
 */
export default function WoodBoard({ seed = 1, beam = false, className }) {
  const uid = useId().replace(/:/g, "");
  const g = beam ? BEAM : BOARD;
  const { w, h } = g;

  const art = useMemo(() => {
    const r = rng(seed);
    const d = outline(r, w, h, g.inset, g.amp);
    if (beam) return { d, knots: [], cracks: [], seam: null };
    const knots = Array.from({ length: 2 }, (_, i) => ({
      x: between(r, i ? 0.84 : 0.05, i ? 0.93 : 0.13) * w, // out at the ends, clear of the text
      y: between(r, i ? 0.25 : 0.68, i ? 0.4 : 0.8) * h,
      s: between(r, 0.7, 1.25),
    }));
    // Short drying checks running in from the ends.
    const cracks = [0, 1, 2].map((i) => {
      const left = i % 2 === 0;
      const x0 = left ? g.inset + 4 : w - g.inset - 4;
      const y0 = between(r, 0.2, 0.85) * h;
      const len = between(r, 25, 70) * (left ? 1 : -1);
      return `M${x0} ${y0}q${len / 2} ${between(r, -3, 3)} ${len} ${between(r, -4, 4)}`;
    });
    const sy = h * between(r, 0.47, 0.53);
    const seam = `M0 ${sy}` + Array.from({ length: 6 }, (_, i) => `L${(i + 1) * (w / 6)} ${sy + between(r, -2, 2)}`).join("");
    return { d, knots, cracks, seam };
  }, [seed, beam, w, h, g.inset, g.amp]);

  const id = (name) => `${uid}-${name}`;
  const url = (name) => `url(#${id(name)})`;

  return (
    <svg className={className} viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <defs>
        <clipPath id={id("clip")}>
          <path d={art.d} />
        </clipPath>
        <linearGradient id={id("base")} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={beam ? "#7a4622" : "#80482a"} />
          <stop offset="0.3" stopColor={beam ? "#64391b" : "#9b5d32"} />
          <stop offset="0.6" stopColor={beam ? "#55301a" : "#8b522b"} />
          <stop offset="1" stopColor={beam ? "#3e2211" : "#6a3b1d"} />
        </linearGradient>
        <radialGradient id={id("glow")} cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#d08a4e" stopOpacity="0.6" />
          <stop offset="1" stopColor="#d08a4e" stopOpacity="0" />
        </radialGradient>
        <radialGradient id={id("knot")}>
          <stop offset="0" stopColor="#1c0b03" />
          <stop offset="0.45" stopColor="#3b1c0a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#3b1c0a" stopOpacity="0" />
        </radialGradient>
        <filter id={id("grain")} x="0" y="0" width={w} height={h} filterUnits="userSpaceOnUse">
          <feTurbulence type="fractalNoise" baseFrequency={g.grain} numOctaves="4" seed={seed} />
          <feColorMatrix values="0 0 0 0 0.16  0 0 0 0 0.07  0 0 0 0 0.02  1.7 0 0 0 -0.6" />
        </filter>
        <filter id={id("light")} x="0" y="0" width={w} height={h} filterUnits="userSpaceOnUse">
          <feTurbulence type="fractalNoise" baseFrequency={g.grain} numOctaves="3" seed={seed + 40} />
          <feColorMatrix values="0 0 0 0 0.87  0 0 0 0 0.58  0 0 0 0 0.33  0 1.6 0 0 -0.72" />
        </filter>
        <filter id={id("fine")} x="0" y="0" width={w} height={h} filterUnits="userSpaceOnUse">
          <feTurbulence type="fractalNoise" baseFrequency={g.fine} numOctaves="2" seed={seed + 80} />
          <feColorMatrix values="0 0 0 0 0.12  0 0 0 0 0.05  0 0 0 0 0.01  1.4 0 0 0 -0.58" />
        </filter>
        <filter id={id("blur")} x="-10%" y="-10%" width="120%" height="120%">
          <feGaussianBlur stdDeviation={g.blur} />
        </filter>
      </defs>

      {/* the board's thickness, showing under its bottom edge */}
      {g.depth > 0 && <path d={art.d} transform={`translate(0 ${g.depth})`} fill="#2a1307" />}

      <g clipPath={url("clip")}>
        <rect width={w} height={h} fill={url("base")} />
        <rect width={w} height={h} fill={url("glow")} />
        <rect width={w} height={h} filter={url("grain")} />
        <rect width={w} height={h} filter={url("light")} opacity="0.55" />
        <rect width={w} height={h} filter={url("fine")} opacity="0.5" />

        {art.knots.map((k, i) => (
          <g key={i} transform={`translate(${k.x} ${k.y}) scale(${k.s})`}>
            <ellipse rx="26" ry="11" fill="none" stroke="#3b1c0a" strokeOpacity="0.28" strokeWidth="1.5" />
            <ellipse rx="17" ry="7.5" fill="none" stroke="#3b1c0a" strokeOpacity="0.4" strokeWidth="1.5" />
            <ellipse rx="10" ry="5.5" fill={url("knot")} />
            <ellipse rx="4" ry="2.6" fill="#140701" />
          </g>
        ))}

        {art.cracks.map((c, i) => (
          <path key={i} d={c} fill="none" stroke="#170802" strokeOpacity="0.75" strokeWidth="1.3" strokeLinecap="round" />
        ))}

        {art.seam && (
          <>
            <path d={art.seam} fill="none" stroke="#1a0a02" strokeWidth="6" opacity="0.35" filter={url("blur")} />
            <path d={art.seam} fill="none" stroke="#1a0a02" strokeWidth="1.6" opacity="0.5" />
            <path d={art.seam} transform="translate(0 2.5)" fill="none" stroke="#e0a26a" strokeWidth="1" opacity="0.3" />
          </>
        )}

        {/* scorched, darker edges */}
        <path d={art.d} fill="none" stroke="#1a0902" strokeWidth={g.burn} opacity="0.9" filter={url("blur")} />
      </g>

      <path d={art.d} fill="none" stroke="#f0b47a" strokeOpacity="0.16" strokeWidth="1.2" />
    </svg>
  );
}
