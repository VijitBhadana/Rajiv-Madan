import { Phone, MapPin, Plane, Quote } from "lucide-react";
import photo from "../assets/rajiv-madan.webp";
import SocialLinks from "./SocialLinks";
import { about, contact } from "../data/siteData";

export default function About() {
  return (
    <section id="about" className="relative overflow-hidden bg-white py-16 dark:bg-navy-950 lg:py-24">
      {/* soft background accents */}
      <div className="pointer-events-none absolute -left-32 top-10 h-80 w-80 rounded-full bg-brand-100/60 blur-3xl dark:bg-brand-500/10" />
      <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-gold-400/10 blur-3xl" />

      <div className="container-x relative grid items-center gap-12 sm:gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        {/* ===== Circular portrait ===== */}
        <div className="relative mx-auto w-full max-w-[420px] px-3 sm:px-0">
          <div className="relative aspect-square">
            {/* slowly rotating dashed orbit */}
            <div className="absolute -inset-5 animate-[spin_40s_linear_infinite] rounded-full border-2 border-dashed border-brand-200 dark:border-brand-500/30 motion-reduce:animate-none" />
            {/* gradient ring */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-brand-400 via-navy-700 to-gold-400 p-[6px] shadow-panel">
              <div className="h-full w-full overflow-hidden rounded-full bg-white p-2 dark:bg-navy-950">
                <img
                  src={photo}
                  alt={`${about.name}, ${about.role}`}
                  width="640"
                  height="640"
                  loading="lazy"
                  className="h-full w-full rounded-full object-cover object-[45%_35%]"
                />
              </div>
            </div>

            {/* floating experience badge */}
            <div className="absolute -left-2 bottom-6 rounded-2xl bg-navy-900 px-4 py-3 text-white shadow-panel dark:bg-navy-800 dark:ring-1 dark:ring-white/10 sm:-left-6 sm:px-5 sm:py-4">
              <p className="font-display text-2xl font-extrabold leading-none text-brand-400 sm:text-3xl">{about.experience}</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-300">
                Years of Practice
              </p>
            </div>

            {/* floating credentials badge */}
            <div className="absolute -right-2 top-8 rounded-2xl bg-white px-4 py-3 shadow-panel ring-1 ring-slate-100 dark:bg-navy-800 dark:ring-white/10 sm:-right-6">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-slate-400">Designations</p>
              <p className="mt-0.5 font-display text-base font-extrabold text-navy-900 dark:text-white">{about.designations}</p>
            </div>
          </div>
        </div>

        {/* ===== Story ===== */}
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-700 ring-1 ring-brand-200 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/30">
            <span className="h-2 w-2 rounded-full bg-brand-500" />
            {about.eyebrow}
          </span>
          <h2 className="mt-4 font-display text-[32px] font-extrabold leading-[1.1] tracking-tight text-navy-900 dark:text-white sm:text-4xl lg:text-5xl">
            {about.title}
          </h2>

          <div className="mt-6 space-y-4 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">
            {about.paragraphs.map((text) => (
              <p key={text.slice(0, 24)}>{text}</p>
            ))}
          </div>

          {/* quick facts */}
          <div className="mt-6 flex flex-wrap gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-navy-800 dark:text-slate-300">
              <MapPin className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
              {about.office}
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 dark:border-white/10 dark:bg-navy-800 dark:text-slate-300">
              <Plane className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" />
              {about.airport}
            </span>
          </div>

          {/* promise */}
          <figure className="mt-7 flex gap-4 rounded-2xl border-l-4 border-brand-500 bg-surface p-5 dark:bg-navy-900">
            <Quote className="h-6 w-6 shrink-0 text-brand-500" aria-hidden="true" />
            <blockquote className="font-display text-lg font-bold leading-snug text-navy-900 dark:text-white">{about.promise}</blockquote>
          </figure>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href={contact.phoneHref}
              className="group inline-flex items-center gap-2.5 rounded-full bg-navy-900 py-2 pl-2 pr-5 text-sm font-semibold text-white transition hover:bg-navy-800 dark:bg-white dark:text-navy-900 dark:hover:bg-slate-200"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-navy-950">
                <Phone className="h-4 w-4" />
              </span>
              Talk to Rajiv: {contact.phone}
            </a>
            <SocialLinks linkClassName="bg-slate-100 text-slate-600 hover:bg-brand-600 hover:text-white dark:bg-white/5 dark:text-slate-300 dark:ring-1 dark:ring-white/10 dark:hover:bg-brand-600 dark:hover:text-white" />
          </div>
        </div>
      </div>
    </section>
  );
}
