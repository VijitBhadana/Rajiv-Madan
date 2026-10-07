import { Phone, MapPin } from "lucide-react";
import SocialLinks from "./SocialLinks";
import { topBar, contact } from "../data/siteData";

export default function TopBar() {
  return (
    <div className="bg-navy-900 text-[12px] text-slate-300">
      <div className="container-x flex flex-col items-center justify-between gap-2 py-2 sm:flex-row">
        <div className="flex flex-wrap items-center justify-center gap-2">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-600/20 px-2.5 py-0.5 font-medium text-brand-400 ring-1 ring-brand-500/30">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-400" />
            {topBar.badge}
          </span>
          <span className="hidden text-slate-500 xl:inline">|</span>
          <span className="hidden xl:inline">{topBar.message}</span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={contact.phoneHref}
            className="inline-flex items-center gap-1.5 whitespace-nowrap font-semibold text-white hover:text-brand-400"
          >
            <Phone className="h-3.5 w-3.5 text-brand-400" />
            {contact.phone}
          </a>
          <span className="hidden items-center gap-1.5 lg:inline-flex">
            <MapPin className="h-3.5 w-3.5 text-brand-400" />
            {contact.region}
          </span>
          <SocialLinks
            size="sm"
            className="hidden gap-1 border-l border-white/10 pl-4 sm:flex"
            linkClassName="text-slate-400 hover:bg-white/10 hover:text-brand-400"
          />
        </div>
      </div>
    </div>
  );
}
