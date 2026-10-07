import { Phone, ArrowDown } from "lucide-react";
import Icon from "./Icon";
import Typewriter from "./Typewriter";
import { hero, contact } from "../data/siteData";

export default function Hero() {
  const { card } = hero;

  return (
    <section id="home" className="overflow-x-clip bg-surface pb-16 pt-8 dark:bg-navy-900 sm:pb-20 sm:pt-10 lg:pb-24">
      <div className="container-x">
        {/* Trust badges */}
        <div className="flex flex-wrap gap-2.5">
          {hero.badges.map((b) => (
            <span
              key={b.label}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 text-[11px] font-medium text-slate-600 dark:border-white/10 dark:bg-navy-800 dark:text-slate-300"
            >
              <Icon name={b.icon} className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
              {b.label}
            </span>
          ))}
        </div>

        <div className="mt-8 grid items-start gap-10 sm:mt-12 sm:gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-14">
          {/* Left content */}
          <div className="sm:pt-4">
            <p className="eyebrow">{hero.eyebrow}</p>
            <h1 className="mt-4 font-display text-[clamp(1.75rem,8.4vw,2.125rem)] font-extrabold leading-[1.08] tracking-tight text-navy-900 dark:text-white sm:text-4xl md:text-5xl lg:text-[calc(4.3vw-6px)] xl:text-[48px]">
              <span className="sr-only">
                {hero.title} {hero.titleLead} {hero.typedWords.join(", ")}
              </span>
              <span aria-hidden="true">
                {hero.title} <br className="hidden sm:block" />
                {hero.titleLead} <Typewriter words={hero.typedWords} className="text-brand-600 dark:text-brand-400" />
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{hero.description}</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={contact.phoneHref}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-navy-900 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-navy-900/20 transition hover:bg-navy-800 dark:bg-white dark:text-navy-900 dark:shadow-black/30 dark:hover:bg-slate-200 sm:w-auto"
              >
                <Phone className="h-4 w-4 text-brand-400 dark:text-brand-600" />
                Direct Call: {contact.phone}
              </a>
              <a
                href="#services"
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-6 py-3.5 text-sm font-semibold text-navy-900 transition hover:border-slate-300 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:border-white/30 sm:w-auto"
              >
                {hero.secondaryCta}
                <ArrowDown className="h-4 w-4 text-brand-600 dark:text-brand-400" />
              </a>
            </div>

            <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {hero.credentials.map((c, i) => (
                <div
                  key={c.title}
                  className="animate-slide-in-left rounded-lg border border-slate-200 bg-white px-4 py-3 dark:border-white/10 dark:bg-navy-800 motion-reduce:animate-none"
                  style={{ animationDelay: `${300 + i * 120}ms` }}
                >
                  <p className="text-sm font-semibold text-navy-900 dark:text-white">{c.title}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">{c.subtitle}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right profile card */}
          <div className="animate-slide-in-right rounded-2xl border border-slate-100 bg-white p-5 font-display shadow-panel dark:border-white/10 dark:bg-navy-800 dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] motion-reduce:animate-none sm:p-7">
            <div className="flex flex-wrap-reverse items-start justify-between gap-3">
              <div className="min-w-[12rem] flex-1">
                <h2 className="text-lg font-extrabold leading-tight tracking-tight text-navy-900 dark:text-white">{card.title}</h2>
                <p className="mt-1 text-xs font-semibold text-slate-500 dark:text-slate-400">{card.subtitle}</p>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold text-brand-700 ring-1 ring-brand-200 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-500" />
                {card.status}
              </span>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {card.stats.map((s, i) => (
                <div
                  key={s.label}
                  className="animate-slide-in-right rounded-xl border border-slate-100 bg-slate-50/60 p-3.5 dark:border-white/5 dark:bg-white/5 motion-reduce:animate-none sm:p-4"
                  style={{ animationDelay: `${250 + i * 120}ms` }}
                >
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">{s.label}</p>
                  <p
                    className={`mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl ${
                      s.accent ? "text-brand-600 dark:text-brand-400" : "text-navy-900 dark:text-white"
                    }`}
                  >
                    {s.value}
                  </p>
                  <p className="mt-1 text-xs font-semibold leading-snug text-slate-500 dark:text-slate-400">{s.note}</p>
                </div>
              ))}
            </div>

            <div
              className="mt-4 flex animate-slide-in-right flex-wrap items-center justify-between gap-3 rounded-xl bg-navy-900 px-4 py-4 dark:bg-navy-950 dark:ring-1 dark:ring-white/10 motion-reduce:animate-none sm:px-5"
              style={{ animationDelay: `${250 + card.stats.length * 120}ms` }}
            >
              <div>
                <p className="text-xs font-semibold text-slate-300">{card.footerLabel}</p>
                <a href={contact.phoneHref} className="text-base font-extrabold tracking-tight text-brand-400">
                  {contact.phone}
                </a>
              </div>
              <a
                href={contact.phoneHref}
                className="rounded-md bg-brand-600 px-4 py-2 text-sm font-bold text-white transition hover:bg-brand-500"
              >
                {card.footerButton}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
