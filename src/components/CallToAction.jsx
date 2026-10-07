import { Phone } from "lucide-react";
import { cta, contact } from "../data/siteData";

export default function CallToAction() {
  return (
    <section id="contact" className="bg-white py-12 dark:bg-navy-950 sm:py-16">
      <div className="container-x">
        <div className="flex flex-col items-start justify-between gap-6 rounded-2xl border border-brand-200/70 bg-gradient-to-r from-brand-50 via-emerald-50/60 to-sky-50 px-5 py-8 dark:border-brand-500/20 dark:from-brand-500/10 dark:via-emerald-500/5 dark:to-sky-500/10 sm:px-10 sm:py-10 md:flex-row md:items-center">
          <div>
            <p className="eyebrow">{cta.eyebrow}</p>
            <h2 className="heading-serif mt-2 text-2xl sm:text-3xl">{cta.title}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{cta.description}</p>
          </div>
          <a
            href={contact.phoneHref}
            className="inline-flex w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-brand-700 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-brand-700/20 transition hover:bg-brand-600 dark:bg-brand-500 dark:text-navy-950 dark:shadow-brand-500/20 dark:hover:bg-brand-400 md:w-auto"
          >
            <Phone className="h-4 w-4" />
            Call {contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
