"use client";

import { useEffect } from "react";
import { motion, useScroll, useSpring, useTransform } from "motion/react";
import { useQuietMotion } from "./use-quiet-motion";

export default function SignalRail() {
  const { scrollYProgress } = useScroll();
  const smooth = useSpring(scrollYProgress, { stiffness: 90, damping: 28 });
  const top = useTransform(smooth, [0, 1], ["4%", "94%"]);
  const quiet = useQuietMotion();
  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>(
      ".hero-journey, .service-feature, .service-card, .global-panel",
    );
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          (entry.target as HTMLElement).dataset.motionViewport = entry.isIntersecting
            ? "visible"
            : "hidden";
        }
      },
      { rootMargin: "120px 0px" },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);
  return (
    <div className="signal-rail" aria-hidden="true">
      <div className="signal-wire" />
      <motion.div className="signal-core" style={{ top: quiet ? "4%" : top }}>
        <span />
      </motion.div>
    </div>
  );
}
