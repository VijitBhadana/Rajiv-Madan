import { useEffect } from "react";
import { ChevronRight } from "lucide-react";
import SmartLink from "../components/SmartLink";
import About from "../components/About";
import CallToAction from "../components/CallToAction";
import { about } from "../data/siteData";

export default function AboutPage() {
  useEffect(() => {
    const previous = document.title;
    document.title = "About Us | Rajiv Madan CPA";
    return () => {
      document.title = previous;
    };
  }, []);

  return (
    <>
      {/* Page banner */}
      <section className="relative overflow-hidden bg-navy-950 py-14 lg:py-20">
        <div className="bg-dot-grid-light mask-fade pointer-events-none absolute inset-0" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-brand-500/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-gold-400/10 blur-3xl" />

        <div className="container-x relative text-center">
          <nav aria-label="Breadcrumb" className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-400">
            <SmartLink href="#home" className="transition hover:text-brand-400">
              Home
            </SmartLink>
            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
            <span className="text-brand-400" aria-current="page">
              {about.pageTitle}
            </span>
          </nav>
          <h1 className="mt-4 font-display text-[34px] font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            {about.pageTitle}
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-slate-300 sm:text-[15px]">
            {about.pageSubtitle}
          </p>
        </div>
      </section>

      <About />
      <CallToAction />
    </>
  );
}
