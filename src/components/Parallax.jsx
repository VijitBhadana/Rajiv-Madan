import { useEffect, useRef } from "react";

// Section wrapper: puts an optional decorative backdrop behind the content.
export function ParallaxSection({ as: Tag = "section", className = "", backdrop, children, ...rest }) {
  return (
    <Tag className={`relative isolate overflow-hidden ${className}`} {...rest}>
      {backdrop && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          {backdrop}
        </div>
      )}
      <div className="relative">{children}</div>
    </Tag>
  );
}

// Layer that drifts slower than the page scroll (speed 0 = static, 1 = fixed in place).
export function ParallaxBackdrop({ speed = 0.3, className = "", children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const update = () => {
      frame = 0;
      const host = el.parentElement;
      if (!host) return;
      const rect = host.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      // Offset relative to the viewport centre, so the layer is neutral mid-screen
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * -speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [speed]);

  return (
    <div ref={ref} className={`absolute inset-x-0 -inset-y-[20%] will-change-transform ${className}`}>
      {children}
    </div>
  );
}

// Soft blurred colour blob; position, size and colour come from className.
export function Glow({ className = "" }) {
  return <div aria-hidden="true" className={`absolute rounded-full blur-3xl ${className}`} />;
}
