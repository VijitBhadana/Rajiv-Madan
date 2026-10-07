import { Phone } from "lucide-react";
import Logo from "./Logo";
import SmartLink from "./SmartLink";
import SocialLinks from "./SocialLinks";
import { ParallaxSection, ParallaxBackdrop, Glow } from "./Parallax";
import { footer, contact } from "../data/siteData";

export default function Footer() {
  return (
    <ParallaxSection
      as="footer"
      className="bg-navy-950 text-slate-400 dark:border-t dark:border-white/10"
      backdrop={
        <ParallaxBackdrop speed={0.2}>
          <div className="bg-dot-grid-light mask-fade absolute inset-0" />
          <Glow className="-right-24 top-[30vh] h-80 w-80 bg-brand-500/10" />
        </ParallaxBackdrop>
      }
    >
      <div className="footer-columns container-x grid gap-10 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-4">
        <div>
          <Logo dark size="lg" />
          <p className="mt-5 max-w-xs text-[13px] leading-relaxed">{footer.about}</p>
          <a
            href={contact.phoneHref}
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-brand-400"
          >
            <Phone className="h-4 w-4 text-brand-400" />
            {contact.phone}
          </a>
          <SocialLinks
            className="mt-5"
            linkClassName="bg-white/5 text-slate-300 ring-1 ring-white/10 hover:bg-brand-600 hover:text-white hover:ring-brand-500"
          />
        </div>

        {footer.columns.map((col) => (
          <div key={col.title}>
            <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">{col.title}</h3>
            <ul className="mt-5 space-y-2.5">
              {col.links.map((link) => (
                <li key={link}>
                  <SmartLink href="/services" className="text-[13px] transition hover:text-brand-400">
                    {link}
                  </SmartLink>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
            {footer.governance.title}
          </h3>
          <p className="mt-5 text-[13px] leading-relaxed">{footer.governance.text}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {footer.governance.chips.map((chip) => (
              <span
                key={chip}
                className="rounded-md bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300 ring-1 ring-white/10"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom border-t border-white/10">
        <div className="container-x flex flex-col items-center justify-between gap-3 py-6 text-[12px] md:flex-row">
          <p>{footer.copyright}</p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            {footer.legal.map((item) => (
              <SmartLink key={item} href="#home" className="hover:text-white">
                {item}
              </SmartLink>
            ))}
            <a href={contact.phoneHref} className="font-semibold text-brand-400">
              Contact: {contact.phone}
            </a>
          </div>
        </div>
      </div>
    </ParallaxSection>
  );
}
