import { forwardRef } from "react";
import { Link, useLocation } from "react-router-dom";

// One link for both kinds of targets:
// - "#section": a plain in-page anchor on the home page, or "/#section" from any other page
// - "/path": a client-side route change
const SmartLink = forwardRef(function SmartLink({ href, ...props }, ref) {
  const { pathname } = useLocation();

  if (href.startsWith("#")) {
    if (pathname === "/") return <a ref={ref} href={href} {...props} />;
    return <Link ref={ref} to={`/${href}`} {...props} />;
  }
  return <Link ref={ref} to={href} {...props} />;
});

export default SmartLink;
