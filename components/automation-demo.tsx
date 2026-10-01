"use client";

import { useEffect, useRef, useState } from "react";
import { CheckCircle, GitBranch, Sparkle } from "@phosphor-icons/react";
import { useQuietMotion } from "./use-quiet-motion";

type Scenario = "Invoice" | "Service request";
const workflows: Record<Scenario, string[]> = {
  Invoice: ["Trigger", "Extract", "Validate", "Match", "Route", "ERP sync", "Approve", "Log"],
  "Service request": [
    "Trigger",
    "Classify",
    "Priority",
    "CRM match",
    "Route",
    "Draft",
    "Review",
    "Log",
  ],
};

function RobotHead() {
  return (
    <div
      className="robot-head"
      role="img"
      aria-label="Futuristic robotic head with cursor tracking eyes"
    >
      <svg viewBox="0 0 200 220" aria-hidden="true">
        <defs>
          <linearGradient id="robot-face-metal" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="var(--demo-banner-muted)" />
            <stop offset=".42" stopColor="var(--demo-banner-end)" />
            <stop offset="1" stopColor="var(--demo-banner-start)" />
          </linearGradient>
          <linearGradient id="robot-face-plate" x1="0" y1="0" x2="1" y2="1">
            <stop stopColor="var(--demo-banner-muted)" />
            <stop offset="1" stopColor="var(--demo-banner-end)" />
          </linearGradient>
        </defs>
        <path
          d="M63 178 L67 207 Q100 221 133 207 L137 178"
          fill="var(--demo-banner-start)"
          stroke="var(--demo-accent)"
          strokeWidth="3"
        />
        <path
          d="M35 78 Q35 22 100 13 Q165 22 165 78 L159 150 Q149 182 100 197 Q51 182 41 150Z"
          fill="url(#robot-face-metal)"
          stroke="var(--demo-accent)"
          strokeWidth="3"
        />
        <path
          d="M42 92 L29 86 L24 104 L30 135 L42 140 M158 92 L171 86 L176 104 L170 135 L158 140"
          fill="var(--demo-banner-start)"
          stroke="var(--demo-accent)"
          strokeWidth="3"
        />
        <path
          d="M54 47 Q100 20 146 47 L156 82 L137 91 L100 79 L63 91 L44 82Z"
          fill="var(--demo-banner-start)"
          stroke="var(--demo-accent)"
          strokeWidth="2"
        />
        <path
          d="M48 111 L68 98 L132 98 L152 111 L145 154 L124 179 L100 189 L76 179 L55 154Z"
          fill="url(#robot-face-plate)"
          stroke="var(--demo-accent)"
          strokeWidth="2"
        />
        <path
          d="M59 130 L76 138 L76 164 L91 176 M141 130 L124 138 L124 164 L109 176"
          fill="none"
          stroke="var(--demo-banner-start)"
          strokeWidth="3"
        />
        <path
          d="M86 154 L100 145 L114 154 L109 164 L91 164Z"
          fill="var(--demo-banner-start)"
          stroke="var(--demo-accent)"
          strokeWidth="2"
        />
        <path
          d="M77 176 Q100 185 123 176"
          fill="none"
          stroke="var(--demo-banner-start)"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M50 78 L66 88 M150 78 L134 88 M48 145 L61 158 M152 145 L139 158"
          stroke="var(--demo-accent)"
          strokeWidth="2"
        />
        <circle cx="56" cy="117" r="3" fill="var(--demo-accent)" />
        <circle cx="144" cy="117" r="3" fill="var(--demo-accent)" />
      </svg>
      <div className="robot-eyes" aria-hidden="true">
        <span>
          <i />
        </span>
        <span>
          <i />
        </span>
      </div>
    </div>
  );
}

export default function AutomationDemo() {
  const [scenario, setScenario] = useState<Scenario>("Invoice");
  const [step, setStep] = useState(0);
  const quiet = useQuietMotion();
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (quiet) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setStep((current) => (current + 1) % 8);
    }, 1050);
    return () => window.clearInterval(id);
  }, [quiet]);
  function trackEyes(event: React.PointerEvent<HTMLDivElement>) {
    if (quiet || !root.current) return;
    const rect = root.current.getBoundingClientRect();
    const x = Math.max(-5, Math.min(5, ((event.clientX - rect.left) / rect.width - 0.5) * 10));
    const y = Math.max(-3, Math.min(3, ((event.clientY - rect.top) / rect.height - 0.5) * 6));
    root.current.style.setProperty("--eye-x", x + "px");
    root.current.style.setProperty("--eye-y", y + "px");
  }
  function resetEyes() {
    root.current?.style.setProperty("--eye-x", "0px");
    root.current?.style.setProperty("--eye-y", "0px");
  }
  const activeStep = step;
  return (
    <div
      className="flow-demo automation-demo interactive-visual"
      ref={root}
      onPointerMove={trackEyes}
      onPointerLeave={resetEyes}
    >
      <div className="demo-top">
        <span>
          <Sparkle size={15} /> Workflow editor / sample automation
        </span>
        <span className="automation-live">
          <i /> Running
        </span>
      </div>
      <div className="flow-inputs" role="group" aria-label="Choose automation scenario">
        {(["Invoice", "Service request"] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={scenario === item}
            onClick={() => {
              setScenario(item);
              setStep(0);
            }}
          >
            {item}
          </button>
        ))}
      </div>
      <div
        className="automation-visual"
        aria-label={
          scenario + " automation workflow, currently at " + workflows[scenario][activeStep]
        }
      >
        <div className="automation-octagon" aria-hidden="true" />
        <div className="binary-stream binary-stream-top" aria-hidden="true">
          EVENT RECEIVED&nbsp;·&nbsp;CONTEXT LOADED&nbsp;·&nbsp;POLICY VERIFIED
        </div>
        <div className="binary-stream binary-stream-bottom" aria-hidden="true">
          AUDIT TRAIL&nbsp;·&nbsp;HUMAN REVIEW&nbsp;·&nbsp;SYNC COMPLETE
        </div>
        <div className="automation-canvas">
          <div className="automation-track" aria-hidden="true">
            <span className="track-segment" />
            <span className="track-segment" />
            <span className="track-segment" />
          </div>
          <div className="workflow-tile workflow-trigger">
            <span className="workflow-kicker">01 / INTAKE</span>
            <div className="workflow-glyph">
              <GitBranch size={22} weight="light" />
            </div>
            <strong>{scenario === "Invoice" ? "Invoice received" : "Request received"}</strong>
            <small>{scenario === "Invoice" ? "Email + document" : "Form + message"}</small>
          </div>
          <div className="workflow-tile workflow-agent">
            <span className="workflow-kicker">02 / REASON</span>
            <div className="automation-core">
              <RobotHead />
              <strong>Quentagon AI</strong>
              <span>Extract · classify · decide</span>
            </div>
            <div className="agent-tools">
              <span>Knowledge</span>
              <span>Rules</span>
              <span>Memory</span>
            </div>
          </div>
          <div className="workflow-tile workflow-decision">
            <span className="workflow-kicker">03 / ROUTE</span>
            <div className="workflow-glyph">
              <GitBranch size={22} weight="light" />
            </div>
            <strong>Decision engine</strong>
            <small>
              {scenario === "Invoice" ? "Match or flag variance" : "Prioritize and assign"}
            </small>
          </div>
          <div className="workflow-outputs">
            <div className="workflow-tile workflow-output">
              <span className="workflow-kicker">04 / CONNECT</span>
              <strong>{scenario === "Invoice" ? "ERP sync" : "CRM update"}</strong>
              <small>Validated data</small>
            </div>
            <div className="workflow-tile workflow-output">
              <span className="workflow-kicker">05 / OVERSIGHT</span>
              <strong>Human review</strong>
              <small>Exception handling</small>
            </div>
          </div>
        </div>
        <div className="automation-steps" aria-label="Workflow progress">
          {workflows[scenario].map((name, index) => (
            <div
              className={
                "automation-node" +
                (activeStep === index ? " is-active" : "") +
                (activeStep > index ? " is-complete" : "")
              }
              key={name}
            >
              <i>
                {activeStep > index ? (
                  <CheckCircle size={11} weight="fill" />
                ) : (
                  String(index + 1).padStart(2, "0")
                )}
              </i>
              <span>{name}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="automation-footer">
        <span>
          <GitBranch size={13} /> Decision route:{" "}
          {scenario === "Invoice" ? "unusual amounts to review" : "urgent needs to a person"}
        </span>
        <span>Human oversight built in</span>
      </div>
      <p className="flow-result">
        {scenario + " execution  /  " + workflows[scenario][activeStep] + " active"}
      </p>
    </div>
  );
}
