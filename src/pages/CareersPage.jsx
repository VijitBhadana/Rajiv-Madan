import { useEffect, useRef, useState } from "react";
import {
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Briefcase,
  Landmark,
  Calculator,
  ReceiptText,
  FileSpreadsheet,
  BookOpen,
  Wallet,
  GraduationCap,
  Sparkles,
  Award,
  TrendingUp,
  Laptop,
  HeartHandshake,
  Check,
} from "lucide-react";
import SmartLink from "../components/SmartLink";
import { careers, contact } from "../data/siteData";

// Unsplash photo URL at a given width
const unsplash = (id, w) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`;

const jobIcons = {
  briefcase: Briefcase,
  landmark: Landmark,
  calculator: Calculator,
  receipt: ReceiptText,
  file: FileSpreadsheet,
  book: BookOpen,
  wallet: Wallet,
  graduate: GraduationCap,
  sparkles: Sparkles,
};

const perkIcons = {
  mentor: Award,
  growth: TrendingUp,
  tools: Laptop,
  people: HeartHandshake,
};

const mailto = (subject) => `mailto:${careers.email}?subject=${encodeURIComponent(subject)}`;

// Fades and lifts its children in the first time they scroll into view
function InView({ as: Tag = "div", delay = 0, className = "", children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`transition duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none ${
        visible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0 motion-reduce:translate-y-0 motion-reduce:opacity-100"
      } ${className}`}
    >
      {children}
    </Tag>
  );
}

function JobCard({ job, index }) {
  const JobIcon = jobIcons[job.icon] || Briefcase;

  return (
    <article
      className="careers-card-in group relative h-full rounded-3xl p-px"
      style={{ animationDelay: `${(index % 3) * 110}ms` }}
    >
      {/* Border: plain at rest, animated gradient on hover */}
      <div className="absolute inset-0 rounded-3xl bg-slate-200/80 dark:bg-white/10" />
      <div className="careers-gradient absolute inset-0 rounded-3xl bg-gradient-to-br from-brand-400 via-teal-200 to-gold-400 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="careers-shine relative flex h-full flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-white p-6 shadow-card transition duration-500 dark:bg-navy-800 group-hover:-translate-y-1 group-hover:shadow-panel">
        <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-brand-100/0 blur-2xl transition duration-500 group-hover:bg-brand-100/80 dark:group-hover:bg-brand-500/15" />

        <div className="relative flex items-start justify-between gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 text-brand-400 shadow-lg ring-white/10 transition duration-500 dark:bg-navy-950 dark:ring-1 group-hover:-rotate-6 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">
            <JobIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="rounded-full bg-brand-50 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.12em] text-brand-700 ring-1 ring-brand-200 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/30">
            {job.category}
          </span>
        </div>

        <h3 className="relative mt-5 font-display text-xl font-extrabold leading-snug tracking-tight text-navy-900 dark:text-white">
          {job.title}
        </h3>

        <ul className="relative mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400">
          <li className="flex items-center gap-1.5">
            <MapPin className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" aria-hidden="true" />
            Mississauga, ON
          </li>
          <li className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" aria-hidden="true" />
            {job.type}
          </li>
          <li className="flex items-center gap-1.5">
            <Briefcase className="h-3.5 w-3.5 text-brand-600 dark:text-brand-400" aria-hidden="true" />
            {job.experience}
          </li>
        </ul>

        <p className="relative mt-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">{job.text}</p>

        <ul className="relative mt-5 flex flex-wrap gap-2">
          {job.skills.map((skill) => (
            <li
              key={skill}
              className="rounded-lg bg-slate-50 px-2.5 py-1 text-[11px] font-semibold text-slate-600 ring-1 ring-slate-200 transition group-hover:bg-white dark:bg-white/5 dark:text-slate-300 dark:ring-white/10 dark:group-hover:bg-white/10"
            >
              {skill}
            </li>
          ))}
        </ul>

        <div className="relative mt-auto pt-6">
          <a
            href={mailto(`Application - ${job.title}`)}
            className="flex items-center justify-between rounded-2xl bg-surface px-4 py-3 text-sm font-bold text-navy-900 ring-1 ring-slate-200 transition hover:bg-navy-900 hover:text-white hover:ring-navy-900 dark:bg-navy-900 dark:text-white dark:ring-white/10 dark:hover:bg-brand-500 dark:hover:text-navy-950 dark:hover:ring-brand-500"
          >
            Apply for this role
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-brand-600 shadow-sm transition duration-300 group-hover:rotate-45 dark:bg-navy-800 dark:text-brand-400">
              <ArrowUpRight className="h-4 w-4" />
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default function CareersPage() {
  const { banner, perks, filters, jobs, process, apply } = careers;
  const [filter, setFilter] = useState(filters[0]);
  const shown = filter === filters[0] ? jobs : jobs.filter((job) => job.category === filter);
  const countFor = (f) => (f === filters[0] ? jobs.length : jobs.filter((job) => job.category === f).length);

  useEffect(() => {
    const previous = document.title;
    document.title = "Careers | Rajiv Madan CPA";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <>
      {/* ===== Banner ===== */}
      <section className="relative isolate overflow-hidden bg-navy-950">
        <img
          src={unsplash(banner.image, 1920)}
          alt=""
          className="careers-zoom absolute inset-0 -z-20 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy-950 via-navy-950/90 to-navy-900/60" />
        <div className="bg-dot-grid-light mask-fade pointer-events-none absolute inset-0 -z-10" />
        <div className="careers-float pointer-events-none absolute -right-20 -top-24 -z-10 h-80 w-80 rounded-full bg-brand-500/20 blur-3xl" />
        <div
          className="careers-float pointer-events-none absolute -bottom-24 left-1/3 -z-10 h-64 w-64 rounded-full bg-gold-400/15 blur-3xl"
          style={{ animationDelay: "-3s" }}
        />

        <div className="container-x grid items-center gap-12 py-16 sm:py-20 lg:grid-cols-[1.25fr_1fr] lg:py-28">
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
                href={mailto("Career Application")}
                className="group inline-flex items-center gap-2.5 rounded-full bg-brand-500 py-2 pl-2 pr-5 text-sm font-bold text-navy-950 transition hover:bg-brand-400"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-navy-950 text-brand-400">
                  <Mail className="h-4 w-4" />
                </span>
                {apply.button}
              </a>
              <a
                href="#open-roles"
                className="inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/10"
              >
                {banner.secondaryCta}
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Floating glass cards */}
          <div className="relative hidden h-80 lg:block">
            <div
              className="absolute right-6 top-0 w-64 animate-slide-in-right rounded-3xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur-xl motion-reduce:animate-none"
              style={{ animationDelay: "300ms" }}
            >
              <div className="careers-float">
                <p className="font-display text-5xl font-extrabold leading-none text-brand-400">{jobs.length}</p>
                <p className="mt-2 text-sm font-semibold text-white">Open positions</p>
                <p className="mt-1 text-xs text-slate-400">Accounting, tax, bookkeeping & students</p>
              </div>
            </div>
            <div
              className="absolute bottom-6 left-0 w-72 animate-slide-in-right rounded-3xl bg-white p-5 shadow-panel dark:bg-navy-800 dark:ring-1 dark:ring-white/10 motion-reduce:animate-none"
              style={{ animationDelay: "480ms" }}
            >
              <div className="careers-float flex items-center gap-4" style={{ animationDelay: "-2s" }}>
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 ring-1 ring-brand-200 dark:bg-brand-500/10 dark:text-brand-400 dark:ring-brand-500/30">
                  <HeartHandshake className="h-6 w-6" />
                </span>
                <div>
                  <p className="font-display text-base font-extrabold text-navy-900 dark:text-white">Equal Opportunity</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Excellence in the workplace</p>
                </div>
              </div>
            </div>
            <div
              className="absolute bottom-0 right-0 animate-slide-in-right rounded-full bg-navy-900 px-4 py-2.5 text-xs font-bold text-white ring-1 ring-white/15 motion-reduce:animate-none"
              style={{ animationDelay: "620ms" }}
            >
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-brand-400" />
                Mississauga, Ontario
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ===== Why join ===== */}
      <section className="bg-white py-16 dark:bg-navy-950 lg:py-24">
        <div className="container-x">
          <InView className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">Why Join Us</p>
            <h2 className="mt-3 font-display text-[34px] font-extrabold tracking-tight text-navy-900 dark:text-white sm:text-5xl">
              Grow With Our Practice
            </h2>
            <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
              A close-knit public accounting practice where your work matters from day one.
            </p>
          </InView>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((perk, i) => {
              const PerkIcon = perkIcons[perk.icon] || Award;
              return (
                <InView key={perk.title} delay={i * 100} className="h-full">
                  <div className="group relative h-full overflow-hidden rounded-3xl bg-surface p-6 ring-1 ring-slate-200/70 transition duration-500 hover:-translate-y-1.5 hover:bg-white hover:shadow-panel dark:bg-navy-900 dark:ring-white/10 dark:hover:bg-navy-800">
                    <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-brand-600 shadow-sm ring-1 ring-slate-200 transition duration-500 dark:bg-navy-800 dark:text-brand-400 dark:ring-white/10 group-hover:rotate-[8deg] group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">
                      <PerkIcon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <h3 className="mt-5 font-display text-lg font-extrabold text-navy-900 dark:text-white">{perk.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">{perk.text}</p>
                    <span className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-brand-500 to-gold-400 transition-all duration-500 group-hover:w-full" />
                  </div>
                </InView>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== Open roles ===== */}
      <section id="open-roles" className="relative overflow-hidden bg-surface py-16 dark:bg-navy-900 lg:py-24">
        <div className="pointer-events-none absolute -left-32 top-20 h-72 w-72 rounded-full bg-brand-100/60 blur-3xl dark:bg-brand-500/10" />
        <div className="container-x relative">
          <InView className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-2xl">
              <p className="eyebrow">Open Positions</p>
              <h2 className="mt-3 font-display text-[34px] font-extrabold tracking-tight text-navy-900 dark:text-white sm:text-5xl">
                Find Your Role
              </h2>
              <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
                Accounting, CA / CPA, tax and bookkeeping roles at our Mississauga office.
              </p>
            </div>

            <div role="group" aria-label="Filter roles" className="flex flex-wrap gap-2">
              {filters.map((f) => {
                const active = f === filter;
                return (
                  <button
                    key={f}
                    type="button"
                    onClick={() => setFilter(f)}
                    aria-pressed={active}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${
                      active
                        ? "bg-navy-900 text-white shadow-lg shadow-navy-900/20 dark:bg-white dark:text-navy-900 dark:shadow-black/30"
                        : "bg-white text-slate-600 ring-1 ring-slate-200 hover:-translate-y-0.5 hover:text-navy-900 hover:ring-brand-400 dark:bg-navy-800 dark:text-slate-300 dark:ring-white/10 dark:hover:text-white dark:hover:ring-brand-400"
                    }`}
                  >
                    {f}
                    <span
                      className={`rounded-full px-1.5 text-[11px] font-bold ${
                        active ? "bg-brand-500 text-navy-950" : "bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-300"
                      }`}
                    >
                      {countFor(f)}
                    </span>
                  </button>
                );
              })}
            </div>
          </InView>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {shown.map((job, index) => (
              // Keyed by filter so the entry animation replays when the filter changes
              <JobCard key={`${filter}-${job.title}`} job={job} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* ===== Hiring process ===== */}
      <section className="bg-white py-16 dark:bg-navy-950 lg:py-24">
        <div className="container-x">
          <InView className="mx-auto max-w-2xl text-center">
            <p className="eyebrow">{process.eyebrow}</p>
            <h2 className="mt-3 font-display text-[34px] font-extrabold tracking-tight text-navy-900 dark:text-white sm:text-5xl">
              {process.title}
            </h2>
          </InView>

          <ol className="relative mt-12 grid gap-8 sm:grid-cols-2 sm:gap-10 md:mt-14 md:grid-cols-4 md:gap-6">
            <span
              aria-hidden="true"
              className="absolute left-[12.5%] right-[12.5%] top-6 hidden h-0.5 bg-gradient-to-r from-brand-400 via-teal-200 to-gold-400 md:block"
            />
            {process.steps.map((step, i) => (
              <InView as="li" key={step.title} delay={i * 140} className="group relative text-center">
                <span className="relative z-10 mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-navy-900 font-display text-lg font-extrabold text-brand-400 shadow-lg ring-4 ring-white transition duration-500 dark:ring-navy-950 group-hover:-translate-y-1 group-hover:scale-110 group-hover:bg-brand-600 group-hover:text-white">
                  {i + 1}
                </span>
                <h3 className="mt-5 font-display text-lg font-extrabold text-navy-900 dark:text-white">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-slate-500 dark:text-slate-400">{step.text}</p>
              </InView>
            ))}
          </ol>
        </div>
      </section>

      {/* ===== Apply CTA ===== */}
      <section className="bg-white pb-16 dark:bg-navy-950 lg:pb-24">
        <div className="container-x">
          <InView>
            <div className="careers-gradient relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-navy-950 via-navy-800 to-brand-700 px-5 py-10 text-center dark:ring-1 dark:ring-white/10 sm:px-12 sm:py-12 lg:py-16">
              <div className="bg-dot-grid-light mask-fade pointer-events-none absolute inset-0" />
              <div className="careers-float pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-brand-400/25 blur-3xl" />

              <div className="relative mx-auto max-w-2xl">
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1.5 text-xs font-semibold text-brand-200 ring-1 ring-white/15">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                  We are an equal opportunity employer
                </span>
                <h2 className="mt-5 font-display text-3xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
                  {apply.title}
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-[15px]">{apply.text}</p>

                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={mailto("Career Application")}
                    className="careers-shine relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-brand-500 px-6 py-3.5 text-sm font-bold text-navy-950 shadow-lg shadow-brand-500/30 transition hover:-translate-y-0.5 hover:bg-brand-400"
                  >
                    <Mail className="h-4 w-4" />
                    {apply.button}
                  </a>
                  <a
                    href={contact.phoneHref}
                    className="inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold text-white ring-1 ring-white/25 transition hover:bg-white/10"
                  >
                    <Phone className="h-4 w-4 text-brand-400" />
                    Call {contact.phone}
                  </a>
                </div>
                <p className="mt-5 text-xs text-slate-400">{careers.email}</p>
              </div>
            </div>
          </InView>
        </div>
      </section>
    </>
  );
}
