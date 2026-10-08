import { Phone, ArrowDown } from "lucide-react";
import Icon from "./Icon";
import Typewriter from "./Typewriter";
import HeroCardStack from "./HeroCardStack";
import { hero, contact } from "../data/siteData";

export default function Hero() {
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
          </div>

          {/* Right: rotating card stack */}
          <HeroCardStack cards={hero.cards} />
        </div>
      </div>
    </section>
  );
}
