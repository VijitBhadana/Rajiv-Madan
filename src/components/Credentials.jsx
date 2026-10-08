import Timeline from "@/components/ui/timeline";
import { credentials } from "../data/siteData";
import { unsplash } from "../lib/unsplash";

// Credentials as a horizontal product line, pinned while it scrolls past
export default function Credentials() {
  return (
    <Timeline
      id="credentials"
      className="bg-surface dark:bg-navy-900"
      title={credentials.title}
      periodLabel={credentials.periodLabel}
      items={credentials.items}
      imageUrl={unsplash(credentials.image, 1000)}
      imageAlt={credentials.imageAlt}
    />
  );
}
