import { useRef } from "react";
import { Phone } from "lucide-react";
import logo from "../assets/logo.webp";
import SocialLinks from "./SocialLinks";
import CardCourier from "./CardCourier";
import { whatWeDo, contact } from "../data/siteData";

export default function WhatWeDo() {
  const { profile } = whatWeDo;
  const cardRef = useRef(null);

  return (
    <section id="what-we-do" className="bg-surface py-16 dark:bg-navy-900 lg:py-20">
      <div className="container-x">
        <div className="relative overflow-hidden rounded-3xl bg-navy-900 px-5 py-10 shadow-panel dark:bg-navy-950 dark:ring-1 dark:ring-white/10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
          {/* subtle glow */}
          <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-brand-500/10 blur-3xl" />

          <div className="relative grid items-center gap-10 lg:grid-cols-[1.5fr_1fr]">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-500/15 px-3 py-1 text-[11px] font-semibold text-brand-400 ring-1 ring-brand-500/30">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
                {whatWeDo.badge}
              </span>
              <h2 className="mt-5 font-serif text-[34px] text-white sm:text-[44px]">{whatWeDo.title}</h2>
              <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-slate-300">{whatWeDo.description}</p>

              <div className="mt-8 rounded-xl border border-white/10 bg-navy-950/60 p-4 sm:p-5">
                <p className="text-sm font-semibold text-brand-400">{whatWeDo.promiseLabel}</p>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-200">{whatWeDo.promise}</p>
              </div>
            </div>

            <div ref={cardRef} className="relative z-20 min-w-0 rounded-2xl border border-white/10 bg-navy-800 p-5 sm:p-7">
              <div className="flex items-center gap-3">
                <img src={logo} alt="" width="48" height="48" className="h-12 w-12 rounded-full ring-2 ring-white/10" />
                <div>
                  <p className="font-semibold text-white">{profile.name}</p>
                  <p className="text-xs text-brand-400">{profile.role}</p>
                </div>
              </div>
              <p className="mt-6 text-sm italic leading-relaxed text-slate-300">{profile.quote}</p>
              <a
                href={contact.phoneHref}
                className="mt-6 flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-brand-500"
              >
                <Phone className="h-4 w-4" />
                Direct Call: {contact.phone}
              </a>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-white/10 pt-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-400">Follow Rajiv</p>
                <SocialLinks
                  size="sm"
                  className="gap-1.5"
                  linkClassName="h-8 w-8 bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-brand-600 hover:text-white"
                />
              </div>
            </div>
          </div>

          {/* Walks the card in and sets it down in its place */}
          <CardCourier cardRef={cardRef} />
        </div>
      </div>
    </section>
  );
}
