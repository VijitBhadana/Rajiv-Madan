import { ArrowRight } from "lucide-react";
import Icon, { softTile } from "./Icon";
import { coreServices } from "../data/siteData";

export default function CoreServices() {
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

        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {coreServices.items.map((item) => (
            <article
              key={item.title}
              className="flex flex-col rounded-2xl border border-slate-200/80 bg-white p-6 shadow-card transition hover:border-brand-200 dark:border-white/10 dark:bg-navy-800 dark:hover:border-brand-500/40"
            >
              <span
                className={`flex h-11 w-11 items-center justify-center rounded-xl ring-1 ${softTile[item.color]}`}
              >
                <Icon name={item.icon} className="h-5 w-5" />
              </span>
              <h3 className="mt-6 text-[17px] font-semibold leading-snug text-navy-900 dark:text-white">{item.title}</h3>
              <p className="mt-3 flex-1 text-[13px] leading-relaxed text-slate-500 dark:text-slate-400">{item.text}</p>
              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 dark:hover:text-brand-200"
              >
                {item.link}
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
