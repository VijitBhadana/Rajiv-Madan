import logo from "../assets/logo.webp";
import SmartLink from "./SmartLink";
import { brand } from "../data/siteData";

export default function Logo({ dark = false, size = "md" }) {
  const emblem = size === "lg" ? "h-16 w-16" : "h-11 w-11 sm:h-14 sm:w-14";

  return (
    <SmartLink href="#home" className="group flex min-w-0 items-center gap-2.5 sm:gap-3" aria-label={`${brand.name}, ${brand.legalName}`}>
      <img
        src={logo}
        alt=""
        width="56"
        height="56"
        className={`${emblem} shrink-0 rounded-full transition duration-300 group-hover:-rotate-6 group-hover:scale-105 ${
          dark ? "ring-2 ring-white/10" : "shadow-[0_6px_16px_-6px_rgba(11,26,46,0.45)] dark:ring-2 dark:ring-white/10"
        }`}
      />

      <span className="min-w-0 leading-none">
        <span
          className={`block font-serif text-[17px] uppercase tracking-[0.08em] sm:text-[20px] ${
            dark ? "text-white" : "text-navy-900 dark:text-white"
          }`}
        >
          {brand.name}
        </span>
        {/* The legal name is dropped on the narrowest phones so the navbar buttons fit */}
        <span className={`mt-1.5 items-center gap-2 ${size === "lg" ? "flex" : "flex max-[359px]:hidden"}`}>
          <span className="hidden h-px w-3 bg-gold-500 sm:block" />
          <span
            className={`text-[9px] font-semibold uppercase tracking-[0.14em] sm:text-[9.5px] sm:tracking-[0.18em] ${
              dark ? "text-slate-300" : "text-slate-500 dark:text-slate-400"
            }`}
          >
            {brand.legalName}
          </span>
          <span className="hidden h-px w-3 bg-gold-500 sm:block" />
        </span>
      </span>
    </SmartLink>
  );
}
