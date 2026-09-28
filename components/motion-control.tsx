"use client";
import { useState } from "react";
import { Pause, Play } from "@phosphor-icons/react";
export default function MotionControl() {
  const [paused, setPaused] = useState(false);
  return (
    <button
      className="motion-control"
      aria-label={paused ? "Resume decorative animation" : "Pause decorative animation"}
      aria-pressed={paused}
      onClick={() => {
        document.documentElement.dataset.motion = paused ? "active" : "paused";
        setPaused(!paused);
      }}
    >
      {paused ? <Play size={14} /> : <Pause size={14} />}
      <span>{paused ? "Motion paused" : "Pause motion"}</span>
    </button>
  );
}
