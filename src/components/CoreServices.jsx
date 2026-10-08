import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import PolaroidLineCarousel from "@/components/ui/polaroid-line-carousel";
import { coreServices } from "../data/siteData";
import { unsplash } from "../lib/unsplash";

// 1200px HD source for each print, so the small card stays sharp on retina screens
const slides = coreServices.slides.map((s) => ({ ...s, image: unsplash(s.image, 1200) }));

const CAROUSEL_HEIGHT = 560;

const { backdropWords } = coreServices;
// Background word rows, bottom first, alternating direction
const BACKDROP_ROWS = [
  { reverse: false, duration: "60s" }, // right to left
  { reverse: true, duration: "70s" }, // left to right
  { reverse: false, duration: "55s" }, // right to left
  { reverse: true, duration: "65s" }, // left to right
];
// reverse runs the -50% loop backwards: left to right
const rowAnimation = (row) => ({ animationDuration: row.duration, animationDirection: row.reverse ? "reverse" : "normal" });
// Page scroll spent on each print while the carousel is pinned
const SCROLL_PER_CARD = 160;

export default function CoreServices() {
  const trackRef = useRef(null);
  // Title text before the highlighted word, e.g. "Core Accounting &"
  const lead = coreServices.title.replace(coreServices.highlight, "").trim();

  return (
    <section id="services" className="bg-white pb-16 pt-12 dark:bg-navy-950 lg:pb-20 lg:pt-14">
      <div className="container-x">
        <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr] lg:items-end lg:gap-12">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700 ring-1 ring-brand-200 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/30">
              <span className="relative flex h-2 w-2">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand-400 opacity-75" />
                <span className="relative h-2 w-2 rounded-full bg-brand-500" />
              </span>
              {coreServices.eyebrow}
            </span>
            <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.1] tracking-tight text-navy-900 dark:text-white sm:text-4xl lg:text-5xl">
              {lead}{" "}
              <span className="relative inline-block whitespace-nowrap">
                <span className="bg-gradient-to-r from-brand-600 to-teal-400 bg-clip-text text-transparent dark:from-brand-400 dark:to-teal-200">
                  {coreServices.highlight}
                </span>
                {/* Hand-drawn style underline */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 220 14"
                  preserveAspectRatio="none"
                  className="absolute -bottom-2 left-0 h-3 w-full text-brand-400"
                >
                  <path d="M2 10 C 60 2, 150 2, 218 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h2>
          </div>

          <div className="border-l-2 border-brand-500 pl-5">
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">{coreServices.description}</p>
            <a
              href="#contact"
              className="group mt-4 inline-flex items-center gap-2 rounded-full bg-navy-900 py-2 pl-5 pr-2.5 text-sm font-semibold text-white transition hover:bg-navy-800 dark:bg-white dark:text-navy-900 dark:hover:bg-slate-200"
            >
              {coreServices.cta}
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand-500 text-navy-950 transition group-hover:translate-x-0.5">
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>
        </div>

        <div className="mt-8 h-px bg-gradient-to-r from-brand-400/60 via-slate-200 to-transparent dark:via-white/10" />

        {/* Services hung on a line. The carousel pins below the navbar while the page scrolls through
            this track, running the prints right to left, and lets go after the last one. */}
        <div ref={trackRef} className="mt-8" style={{ height: CAROUSEL_HEIGHT + (slides.length - 1) * SCROLL_PER_CARD }}>
          <PolaroidLineCarousel
            slides={slides}
            height={CAROUSEL_HEIGHT}
            cardWidth={260}
            // String ends 72px from the top (default would be 20% = 112px)
            stringTop={72}
            autoplay={0}
            scrollLinked
            scrollTrack={trackRef}
            backdrop={
              // Giant faint words: dark ink on light, light ink on dark. Four equal rows fill the
              // carousel (bottom row first), each looping on its own and alternating direction; the
              // whole stack also drifts at a third of the line's speed as the page scrolls.
              <div
                className="absolute inset-0 grid grid-rows-4 font-display text-[clamp(92px,13vw,185px)] font-extrabold uppercase leading-[0.8] tracking-tight text-navy-900/[0.11] dark:text-white/[0.09]"
                style={{ transform: "translateX(calc(var(--pl-off, 0) * -0.33px))" }}
              >
                {BACKDROP_ROWS.map((row, r) => (
                  <div
                    key={r}
                    className="marquee-x flex w-max items-center whitespace-nowrap"
                    style={{ gridRow: BACKDROP_ROWS.length - r, ...rowAnimation(row) }}
                  >
                    {/* Each row starts at a different word; doubled for a seamless loop */}
                    {[0, 1].flatMap((copy) =>
                      backdropWords.map((_, i) => (
                        <span key={copy + "-" + i} className="pr-[0.3em]">
                          {backdropWords[(i + r * 2) % backdropWords.length]}
                        </span>
                      )),
                    )}
                  </div>
                ))}
              </div>
            }
            ariaLabel="Our services"
            background="var(--svc-bg)"
            ink="var(--svc-ink)"
            // Centred in the space under the sticky navbar (~6rem)
            style={{ position: "sticky", top: `max(6.5rem, calc((100svh - ${CAROUSEL_HEIGHT}px + 6rem) / 2))` }}
            className="rounded-2xl ring-1 ring-slate-200/80 [--svc-bg:#f6f8f9] [--svc-ink:#0b1a2e] dark:ring-white/10 dark:[--svc-bg:#0b1a2e] dark:[--svc-ink:#ffffff] sm:[&_.pl-sub]:whitespace-pre-line max-sm:[&_.pl-count]:hidden max-sm:[&_.pl-note]:text-[12px] max-sm:[&_.pl-title]:whitespace-normal [&_.pl-sub]:font-display [&_.pl-sub]:font-bold [&_.pl-sub]:text-[15px] [&_.pl-sub]:text-[color:var(--pl-ink)] sm:[&_.pl-sub]:text-[17px] [&_.pl-title]:font-display [&_.pl-title]:font-bold [&_.pl-title]:text-[clamp(24px,2.8vw,34px)] [&_.pl-note]:font-bold [&_.pl-note]:text-navy-900 max-sm:[&_.pl-note]:whitespace-normal max-sm:[&_.pl-note]:text-center max-sm:[&_.pl-note]:leading-tight"
          />
        </div>
      </div>
    </section>
  );
}
