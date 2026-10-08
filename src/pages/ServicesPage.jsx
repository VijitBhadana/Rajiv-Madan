import { useEffect } from "react";
import { ChevronRight, Phone, ArrowRight, Check, MapPin, BadgeCheck } from "lucide-react";
import SmartLink from "../components/SmartLink";
import Reveal from "../components/Reveal";
import { CapabilityCard } from "../components/Capabilities";
import CallToAction from "../components/CallToAction";
import { unsplash } from "../lib/unsplash";
import { servicesPage, capabilities, contact } from "../data/siteData";

export default function ServicesPage() {
  const { banner, featured, offer, areas } = servicesPage;

  useEffect(() => {
    const previous = document.title;
    document.title = "Services | Rajiv Madan CPA";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <>
      {/* ===== Banner with photo ===== */}
      <section className="relative isolate overflow-hidden bg-navy-950">
        <img
          src={unsplash(banner.image, 1920)}
          alt=""
          className="absolute inset-0 -z-20 h-full w-full animate-[banner-zoom_18s_ease-out_both] object-cover motion-reduce:animate-none"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/60" />

        <div className="container-x py-16 sm:py-20 lg:py-28">
          <div className="max-w-2xl">
            <nav
              aria-label="Breadcrumb"
              className="flex animate-slide-in-left items-center gap-1.5 text-xs font-semibold text-slate-400 motion-reduce:animate-none"
            >
              <SmartLink href="#home" className="transition hover:text-brand-400">
                Home
              </SmartLink>
              <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span className="text-brand-400" aria-current="page">
                {banner.title}
              </span>
            </nav>
            <h1
              className="mt-5 animate-slide-in-left font-display text-[34px] font-extrabold leading-[1.05] tracking-tight text-white motion-reduce:animate-none sm:text-5xl lg:text-6xl"
              style={{ animationDelay: "120ms" }}
            >
              {banner.heading}{" "}
              <span className="bg-gradient-to-r from-brand-400 to-teal-200 bg-clip-text text-transparent">
                {banner.highlight}
              </span>
            </h1>
            <p
              className="mt-5 max-w-xl animate-slide-in-left text-[15px] leading-relaxed text-slate-300 motion-reduce:animate-none"
              style={{ animationDelay: "240ms" }}
            >
              {banner.text}
            </p>
            <div
              className="mt-8 flex animate-slide-in-left flex-wrap gap-3 motion-reduce:animate-none"
              style={{ animationDelay: "360ms" }}
            >
              <a
                href={contact.phoneHref}
                className="group inline-flex items-center gap-2.5 rounded-full bg-brand-500 py-2 pl-2 pr-5 text-sm font-bold text-navy-950 transition hover:bg-brand-400"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-950 text-brand-400">
                  <Phone className="h-4 w-4" />
                </span>
                Call {contact.phone}
              </a>
              <a
                href="#all-services"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/10"
              >
                {banner.secondaryCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Featured services (alternating rows) ===== */}
      <section className="overflow-x-clip bg-white py-16 dark:bg-navy-950 lg:py-24">
        <div className="container-x space-y-16 sm:space-y-20 lg:space-y-28">
          {featured.map((item, i) => {
            const flip = i % 2 === 1;
            return (
              <article key={item.title} className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
                <Reveal from={flip ? "right" : "left"} className={flip ? "lg:order-2" : ""}>
                  <div className="group relative">
                    <div
                      className={`absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand-200 to-gold-400/30 opacity-60 blur-xl dark:from-brand-500/30 dark:to-gold-400/20 ${
                        flip ? "rotate-2" : "-rotate-2"
                      }`}
                    />
                    <div className="relative overflow-hidden rounded-3xl shadow-panel">
                      <img
                        src={unsplash(item.image, 900)}
                        alt={item.imageAlt}
                        loading="lazy"
                        className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-navy-950/50 via-transparent to-transparent" />
                      <span className="absolute bottom-5 left-5 inline-flex items-center gap-1.5 rounded-full bg-white/90 px-3 py-1.5 text-xs font-bold text-navy-900 backdrop-blur">
                        <BadgeCheck className="h-3.5 w-3.5 text-brand-600" />
                        {item.badge}
                      </span>
                    </div>
                  </div>
                </Reveal>

                <Reveal from={flip ? "left" : "right"} delay={120}>
                  <span className="font-display text-5xl font-extrabold leading-none text-slate-100 dark:text-white/10 sm:text-6xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p className="mt-2 text-[11px] font-bold uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">{item.tag}</p>
                  <h2 className="mt-2 font-display text-3xl font-extrabold leading-tight tracking-tight text-navy-900 dark:text-white sm:text-4xl">
                    {item.title}
                  </h2>
                  <p className="mt-5 text-[15px] leading-relaxed text-slate-600 dark:text-slate-300">{item.text}</p>
                  {item.points && (
                    <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
                      {item.points.map((point) => (
                        <li key={point} className="flex items-start gap-2.5 text-sm font-medium text-slate-700 dark:text-slate-200">
                          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-brand-600 ring-1 ring-brand-200 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/30">
                            <Check className="h-3 w-3" strokeWidth={3} />
                          </span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  )}
                  <a
                    href={contact.phoneHref}
                    className="group mt-8 inline-flex items-center gap-2 text-sm font-bold text-navy-900 dark:text-white"
                  >
                    <span className="border-b-2 border-brand-400 pb-0.5 transition group-hover:border-navy-900 dark:group-hover:border-white">
                      Talk to Rajiv about this
                    </span>
                    <ArrowRight className="h-4 w-4 text-brand-600 transition group-hover:translate-x-1 dark:text-brand-400" />
                  </a>
                </Reveal>
              </article>
            );
          })}
        </div>
      </section>

      {/* ===== All services grid ===== */}
      <section id="all-services" className="bg-surface py-16 dark:bg-navy-900 lg:py-24">
        <div className="container-x">
          <Reveal className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{offer.eyebrow}</p>
            <h2 className="mt-3 font-display text-[34px] font-extrabold tracking-tight text-navy-900 dark:text-white sm:text-5xl">
              {offer.title}
            </h2>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{offer.text}</p>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {capabilities.items.slice(0, 8).map((item, index) => (
              <Reveal key={item.title} from="up" delay={(index % 4) * 90} className="h-full [&>article]:h-full">
                <CapabilityCard item={item} index={index} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Areas we serve (scrolling strip) ===== */}
      <section className="relative isolate overflow-hidden bg-navy-950 py-16">
        <img
          src={unsplash(areas.image, 1920)}
          alt=""
          loading="lazy"
          className="absolute inset-0 -z-20 h-full w-full object-cover opacity-30"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-navy-950/80 via-navy-950/60 to-navy-950/90" />

        <Reveal className="container-x text-center">
          <p className="eyebrow text-brand-400">{areas.eyebrow}</p>
          <h2 className="mt-3 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {areas.title}
          </h2>
        </Reveal>

        <div className="ticker-mask-x mt-10 overflow-hidden">
          <div className="marquee-x flex w-max">
            {[0, 1].map((copy) => (
              <ul key={copy} aria-hidden={copy === 1 || undefined} className="flex gap-4 pr-4">
                {areas.cities.map((city) => (
                  <li
                    key={city}
                    className="flex items-center gap-2 whitespace-nowrap rounded-full bg-white/10 px-4 py-2.5 font-display text-base font-bold sm:px-5 sm:py-3 sm:text-lg text-white ring-1 ring-white/15 backdrop-blur"
                  >
                    <MapPin className="h-4 w-4 text-brand-400" />
                    {city}
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </section>

      <CallToAction />
    </>
  );
}
