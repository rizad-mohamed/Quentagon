"use client";

import { useEffect, useRef } from "react";
import { useQuietMotion } from "./use-quiet-motion";

export default function AmbientMotion() {
  const quiet = useQuietMotion();
  const revealed = useRef(new WeakSet<Element>());
  useEffect(() => {
    if (quiet) return;
    const animations = new Set<Animation>();
    const items = document.querySelectorAll<HTMLElement>(
      ".section-heading, .service-card, .service-feature, .work-reference, .founder, .product-panel, .contact-intro, .global-panel",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          if (revealed.current.has(entry.target) || entry.target.closest(".motion-reveal")) {
            observer.unobserve(entry.target);
            continue;
          }
          const item = entry.target as HTMLElement;
          if (document.documentElement.dataset.motion !== "paused") {
            const animation = item.animate(
              [
                { opacity: 0.65, transform: "translateY(22px)" },
                { opacity: 1, transform: "translateY(0)" },
              ],
              { duration: 320, easing: "cubic-bezier(.16,1,.3,1)", fill: "none" },
            );
            animations.add(animation);
            void animation.finished.then(
              () => animations.delete(animation),
              () => animations.delete(animation),
            );
          }
          revealed.current.add(item);
          observer.unobserve(item);
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -24px 0px" },
    );
    items.forEach((item) => observer.observe(item));
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
    };
  }, [quiet]);
  return null;
}
