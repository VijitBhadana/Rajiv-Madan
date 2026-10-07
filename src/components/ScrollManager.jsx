import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// After a route change: scroll to the #section in the URL, or to the top of the new page.
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      // Wait a tick so the target section has rendered
      const id = setTimeout(() => document.querySelector(hash)?.scrollIntoView(), 50);
      return () => clearTimeout(id);
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);

  return null;
}
