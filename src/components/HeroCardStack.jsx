import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import { unsplash } from "../lib/unsplash";

// Fanned deck of image cards; the front card changes every few seconds
const INTERVAL = 2000;

// Pose of a card by its distance from the front one (0 = front, 1 = right, -1 = left)
function pose(offset) {
  if (offset === 0) return { transform: "translateX(0) rotate(0deg) scale(1)", zIndex: 30, opacity: 1 };
  if (offset === 1) return { transform: "translateX(30%) rotate(9deg) scale(0.88)", zIndex: 20, opacity: 1 };
  if (offset === -1) return { transform: "translateX(-30%) rotate(-9deg) scale(0.88)", zIndex: 20, opacity: 1 };
  return { transform: "translateX(0) rotate(0deg) scale(0.75)", zIndex: 10, opacity: 0 };
}

export default function HeroCardStack({ cards }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const n = cards.length;

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setActive((a) => (a + 1) % n), INTERVAL);
    return () => clearInterval(id);
  }, [paused, n]);

  return (
    <div
      className="animate-slide-in-right motion-reduce:animate-none"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="relative mx-auto h-[400px] w-full max-w-[420px] sm:h-[460px]">
        {cards.map((c, i) => {
          // Signed distance from the active card, wrapped to the shortest way round
          let offset = (i - active + n) % n;
          if (offset > n / 2) offset -= n;

          return (
            <button
              key={c.title}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show ${c.title}`}
              tabIndex={offset === 0 ? -1 : 0}
              className="absolute inset-y-4 left-[17%] w-[66%] overflow-hidden rounded-3xl border-4 border-white bg-navy-900 text-left shadow-[0_25px_50px_-12px_rgba(15,23,42,0.45)] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] dark:border-navy-700 motion-reduce:transition-none"
              style={pose(offset)}
            >
              <img
                src={unsplash(c.image, 800)}
                alt={c.alt || ""}
                loading={i === 0 ? "eager" : "lazy"}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-navy-950/20 to-navy-950/95" />
              {offset !== 0 && <div className="absolute inset-0 bg-navy-950/35" />}

              <span className="absolute left-4 top-4 rounded-full bg-amber-300 px-3 py-1 font-mono text-[11px] font-bold uppercase tracking-wider text-navy-900">
                #{String(i + 1).padStart(2, "0")} · {c.tag}
              </span>

              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="font-display text-2xl font-extrabold leading-tight tracking-tight text-white">{c.title}</h3>
                <p className="mt-1 text-xs leading-snug text-slate-300">{c.text}</p>
                <div className="mt-3 flex items-center gap-2 border-t border-white/20 pt-3 font-display text-lg font-bold text-amber-300">
                  <TrendingUp className="h-5 w-5 shrink-0" />
                  {c.stat}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      {/* Dots */}
      <div className="mt-2 flex justify-center gap-2">
        {cards.map((c, i) => (
          <button
            key={c.title}
            type="button"
            onClick={() => setActive(i)}
            aria-label={`Show ${c.title}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === active ? "w-6 bg-brand-600 dark:bg-brand-400" : "w-2 bg-slate-300 hover:bg-slate-400 dark:bg-white/20"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
