"use client";
import { useEffect, useState } from "react";
export function useQuietMotion() {
  const [reduced, setReduced] = useState(false);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setReduced(preference.matches);
    updatePreference();
    preference.addEventListener("change", updatePreference);
    const root = document.documentElement;
    const update = () => setPaused(root.dataset.motion === "paused");
    update();
    const observer = new MutationObserver(update);
    observer.observe(root, { attributes: true, attributeFilter: ["data-motion"] });
    return () => {
      preference.removeEventListener("change", updatePreference);
      observer.disconnect();
    };
  }, []);
  return reduced || paused;
}
