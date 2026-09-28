"use client";
import { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";
export function useQuietMotion() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const root = document.documentElement;
    const update = () => setPaused(root.dataset.motion === "paused");
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["data-motion"] });
    return () => observer.disconnect();
  }, []);
  return Boolean(reduced || paused);
}
