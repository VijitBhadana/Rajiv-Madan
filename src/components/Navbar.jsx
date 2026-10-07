import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Phone, Menu, X, ArrowUpRight } from "lucide-react";
import { useLocation } from "react-router-dom";
import Logo from "./Logo";
import SmartLink from "./SmartLink";
import ThemeToggle from "./ThemeToggle";
import { navLinks, contact } from "../data/siteData";

// Distance from the top of the viewport at which a section counts as "current"
const SPY_OFFSET = 140;
// Links that point at sections of the home page (the rest are separate pages)
const sectionLinks = navLinks.filter((link) => link.href.startsWith("#"));

export default function Navbar() {
  const { pathname } = useLocation();
  const isHome = pathname === "/";
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(navLinks[0].href);
  const [scrolled, setScrolled] = useState(false);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, visible: false });
  const linkRefs = useRef({});
  // While a nav click is smooth-scrolling, the scroll-spy must not override the clicked link
  const clickLock = useRef(false);

  // Header style on scroll + scroll-spy for the active link
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 12);
      // On a separate page, its own link stays active (/blog/post -> /blog)
      if (!isHome) return setActive(`/${pathname.split("/")[1]}`);
      if (clickLock.current) return;

      let current = sectionLinks[0].href;
      for (const link of sectionLinks) {
        const section = document.querySelector(link.href);
        if (section && section.getBoundingClientRect().top <= SPY_OFFSET) current = link.href;
      }
      setActive(current);
    };
    onScroll();
    const unlock = () => (clickLock.current = false);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("scrollend", unlock);
    window.addEventListener("wheel", unlock, { passive: true });
    window.addEventListener("touchstart", unlock, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("scrollend", unlock);
      window.removeEventListener("wheel", unlock);
      window.removeEventListener("touchstart", unlock);
    };
  }, [isHome, pathname]);

  // Slide the pill indicator under the active desktop link
  useLayoutEffect(() => {
    const measure = () => {
      const el = linkRefs.current[active];
      if (!el) return setIndicator((s) => ({ ...s, visible: false }));
      setIndicator({ left: el.offsetLeft, width: el.offsetWidth, visible: true });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  // Close the mobile menu with Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const handleClick = (href) => {
    clickLock.current = true;
    // Fallback for browsers without the scrollend event
    setTimeout(() => (clickLock.current = false), 1200);
    setActive(href);
    setOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? "bg-transparent" : "bg-white dark:bg-navy-950"
      }`}
    >
      <div className="container-x py-2.5">
        <nav
          className={`rounded-2xl transition-all duration-300 ${
            scrolled
              ? "bg-white/80 px-3 shadow-[0_8px_30px_-12px_rgba(11,26,46,0.25)] ring-1 ring-slate-200/70 backdrop-blur-xl dark:bg-navy-900/80 dark:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.7)] dark:ring-white/10 sm:px-4"
              : "bg-white px-0 ring-1 ring-transparent dark:bg-navy-950"
          }`}
        >
          <div className="flex h-16 items-center justify-between gap-3">
            <Logo />

            {/* Desktop links */}
            <ul className="relative hidden items-center rounded-full bg-slate-100/80 p-1 ring-1 ring-slate-200/60 dark:bg-white/5 dark:ring-white/10 lg:flex">
              <span
                aria-hidden="true"
                className={`absolute top-1 bottom-1 rounded-full bg-white shadow-sm ring-1 ring-slate-200/80 transition-all dark:bg-navy-700 dark:ring-white/10 duration-300 ease-out ${
                  indicator.visible ? "opacity-100" : "opacity-0"
                }`}
                style={{ left: indicator.left, width: indicator.width }}
              />
              {navLinks.map((link) => {
                const isActive = active === link.href;
                return (
                  <li key={link.href}>
                    <SmartLink
                      ref={(el) => (linkRefs.current[link.href] = el)}
                      href={link.href}
                      onClick={() => handleClick(link.href)}
                      aria-current={isActive ? "page" : undefined}
                      className={`relative z-10 block whitespace-nowrap rounded-full px-3.5 py-2 text-sm font-medium transition-colors xl:px-4 ${
                        isActive ? "text-brand-700 dark:text-brand-400" : "text-slate-600 hover:text-navy-900 dark:text-slate-300 dark:hover:text-white"
                      }`}
                    >
                      {link.label}
                    </SmartLink>
                  </li>
                );
              })}
            </ul>

            <div className="flex shrink-0 items-center gap-2">
            <ThemeToggle />

            {/* Desktop CTA: just the phone icon at lg, the number from xl */}
            <a
              href={contact.phoneHref}
              aria-label={`Call us at ${contact.phone}`}
              className="group hidden items-center gap-2.5 rounded-full bg-navy-900 p-1.5 text-sm font-semibold text-white shadow-[0_6px_20px_-8px_rgba(11,26,46,0.6)] transition hover:-translate-y-0.5 hover:bg-navy-800 dark:bg-white dark:text-navy-900 dark:shadow-[0_6px_20px_-8px_rgba(0,0,0,0.8)] dark:hover:bg-slate-200 lg:inline-flex xl:pr-5"
            >
              <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-brand-500 text-navy-950">
                <span className="absolute inset-0 animate-ping rounded-full bg-brand-400/40" />
                <Phone className="relative h-4 w-4" />
              </span>
              <span className="hidden xl:inline">{contact.phone}</span>
            </a>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-100 text-navy-900 ring-1 ring-slate-200 transition hover:bg-slate-200 dark:bg-white/5 dark:text-white dark:ring-white/10 dark:hover:bg-white/10 sm:h-11 sm:w-11 lg:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            </div>
          </div>

          {/* Mobile menu */}
          <div
            id="mobile-menu"
            className={`grid transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
              open ? "grid-rows-[1fr] opacity-100" : "pointer-events-none grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden">
              <ul className="flex max-h-[calc(100svh-7rem)] flex-col gap-1 overflow-y-auto overscroll-contain border-t border-slate-100 pb-4 pt-3 dark:border-white/10">
                {navLinks.map((link) => {
                  const isActive = active === link.href;
                  return (
                    <li key={link.href}>
                      <SmartLink
                        href={link.href}
                        onClick={() => handleClick(link.href)}
                        tabIndex={open ? 0 : -1}
                        className={`flex items-center justify-between rounded-xl px-3 py-3 text-[15px] font-medium transition ${
                          isActive
                            ? "bg-brand-50 text-brand-700 dark:bg-brand-500/10 dark:text-brand-400"
                            : "text-slate-700 hover:bg-slate-50 hover:text-navy-900 dark:text-slate-200 dark:hover:bg-white/5 dark:hover:text-white"
                        }`}
                      >
                        {link.label}
                        <ArrowUpRight
                          className={`h-4 w-4 ${isActive ? "text-brand-600 dark:text-brand-400" : "text-slate-400 dark:text-slate-500"}`}
                        />
                      </SmartLink>
                    </li>
                  );
                })}
                <li className="pt-2">
                  <a
                    href={contact.phoneHref}
                    tabIndex={open ? 0 : -1}
                    className="flex items-center justify-center gap-2 rounded-xl bg-navy-900 px-4 py-3.5 text-sm font-semibold text-white dark:bg-white dark:text-navy-900"
                  >
                    <Phone className="h-4 w-4 text-brand-400 dark:text-brand-600" />
                    Call {contact.phone}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}
