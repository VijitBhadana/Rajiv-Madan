import { useEffect, useRef, useState } from "react";

// A hanging tube light that blinks three times, switches on for good on the
// fourth try, and then lights up a headline word by word.
// Plays once, the first time it scrolls into view. Always sits on its own dark
// backdrop, whatever the theme. Styles live in index.css (.tube-*).
const FLICKER_MS = 2600; // keep in sync with the tube-flicker animation duration

export default function TubeLight({ text }) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setOn(true);
          observer.disconnect();
        }
      },
      { threshold: 0.35 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = text.split(" ");

  return (
    <div ref={ref} className={`tube-scene relative overflow-hidden bg-navy-950 pb-16 pt-14 lg:pb-24 lg:pt-20 ${on ? "is-on" : ""}`}>
      {/* light falling from the tube */}
      <div className="tube-beam" aria-hidden="true" />

      {/* fixture */}
      <div className="relative mx-auto w-[min(640px,84%)]" aria-hidden="true">
        <span className="tube-wire left-[16%]" />
        <span className="tube-wire right-[16%]" />
        <div className="tube-batten" />
        <div className="tube-lamp">
          <span className="tube-cap" />
          <div className="tube-glass">
            <div className="tube-glow" />
          </div>
          <span className="tube-cap" />
        </div>
      </div>

      {/* headline */}
      <p className="relative mt-16 text-center font-display text-[44px] font-extrabold leading-[1.05] tracking-tight sm:text-6xl lg:mt-24 lg:text-8xl">
        <span className="sr-only">{text}</span>
        <span aria-hidden="true">
          {words.map((word, i) => (
            <span
              key={i}
              className="tube-word mx-[0.14em] inline-block"
              style={{ animationDelay: `${FLICKER_MS + 150 + i * 220}ms` }}
            >
              {word}
            </span>
          ))}
        </span>
      </p>
    </div>
  );
}
