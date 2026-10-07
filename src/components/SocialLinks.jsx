import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube, FaTiktok } from "react-icons/fa6";
import { cn } from "../lib/utils";
import { socials } from "../data/siteData";

// react-icons keyed by the `icon` field in siteData.socials
const icons = {
  facebook: FaFacebookF,
  instagram: FaInstagram,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
  tiktok: FaTiktok,
};

const sizes = {
  sm: { link: "h-6 w-6", icon: "h-3 w-3" },
  md: { link: "h-9 w-9", icon: "h-4 w-4" },
};

export default function SocialLinks({ size = "md", className, linkClassName }) {
  const s = sizes[size];

  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {socials.map(({ label, href, icon }) => {
        const Cmp = icons[icon];
        return (
          <li key={label}>
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Rajiv Madan CPA on ${label}`}
              title={label}
              className={cn(
                "inline-flex items-center justify-center rounded-full transition",
                s.link,
                linkClassName
              )}
            >
              <Cmp className={s.icon} aria-hidden="true" />
            </a>
          </li>
        );
      })}
    </ul>
  );
}
