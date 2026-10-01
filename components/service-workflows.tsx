"use client";

import { useEffect, useState } from "react";
import {
  ArrowRight,
  Check,
  CheckCircle,
  Code,
  Compass,
  Cube,
  GitBranch,
  Lightning,
  Plus,
  SquaresFour,
  UserCircle,
} from "@phosphor-icons/react";
import { useQuietMotion } from "./use-quiet-motion";

const deployments = [
  {
    name: "Build",
    detail: "Prepare the application and its dependencies.",
    output: "Application package ready",
    metric: "Build checks passed",
  },
  {
    name: "Connect",
    detail: "Connect the data, services and integrations.",
    output: "Routes validated",
    metric: "3 services connected",
  },
  {
    name: "Deploy",
    detail: "Release through an agreed deployment plan.",
    output: "Release checklist complete",
    metric: "Environment healthy",
  },
] as const;

export function CloudDemo() {
  const [stage, setStage] = useState(0);
  const [guided, setGuided] = useState(true);
  const quiet = useQuietMotion();
  useEffect(() => {
    if (quiet || !guided) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setStage((current) => (current + 1) % 3);
    }, 3800);
    return () => window.clearInterval(id);
  }, [guided, quiet]);
  const current = deployments[stage];
  return (
    <div className="infra-demo interactive-visual">
      <div className="infra-top">
        <span>CONNECTED ARCHITECTURE</span>
        <span className="infra-live">
          <i /> Systems healthy
        </span>
      </div>
      <div className={"infra-canvas infra-stage-" + stage}>
        <div className="infra-node infra-source">
          <span className="infra-node-icon">
            <Code size={19} />
          </span>
          <small>EXPERIENCE</small>
          <strong>Customer app</strong>
          <span>Web + mobile</span>
        </div>
        <div className="infra-wire" aria-hidden="true">
          <i />
        </div>
        <div className="infra-node infra-gateway">
          <span className="infra-node-icon">
            <SquaresFour size={19} />
          </span>
          <small>INTEGRATION</small>
          <strong>API gateway</strong>
          <span>Secure routing</span>
        </div>
        <div className="infra-wire" aria-hidden="true">
          <i />
        </div>
        <div className="infra-targets">
          <div className="infra-node">
            <span className="infra-node-icon">
              <Cube size={17} />
            </span>
            <div>
              <strong>Operations</strong>
              <small>Records in sync</small>
            </div>
          </div>
          <div className="infra-node">
            <span className="infra-node-icon">
              <GitBranch size={17} />
            </span>
            <div>
              <strong>Analytics</strong>
              <small>Events delivered</small>
            </div>
          </div>
        </div>
        <div className="infra-telemetry">
          <span>
            <Lightning size={13} /> Live event stream
          </span>
          <strong>{current.metric}</strong>
        </div>
      </div>
      <div className="deployment-steps" role="group" aria-label="Explore deployment stages">
        {deployments.map((item, index) => (
          <button
            type="button"
            key={item.name}
            aria-pressed={stage === index}
            onClick={() => {
              setGuided(false);
              setStage(index);
            }}
          >
            <span>{index < stage ? <Check size={14} /> : String(index + 1).padStart(2, "0")}</span>
            {item.name}
          </button>
        ))}
      </div>
      <div className="infra-detail" aria-live={guided ? "off" : "polite"}>
        <CheckCircle size={20} />
        <div>
          <strong>{current.output}</strong>
          <p className="deployment-explanation">{current.detail}</p>
        </div>
        <ArrowRight size={18} />
      </div>
    </div>
  );
}

type EngagementStep = {
  name: string;
  title: string;
  description: string;
  input: string;
  output: string;
};
const engagements: Record<"new" | "improve", EngagementStep[]> = {
  new: [
    {
      name: "Discover",
      title: "Find the real opportunity.",
      description: "We map the work, the people, and the decision that matters most.",
      input: "Your goals and current workflow",
      output: "A clear problem brief",
    },
    {
      name: "Align",
      title: "Shape a practical route.",
      description: "Priorities become a shared scope with tradeoffs everyone can see.",
      input: "Priorities and feedback",
      output: "Validated solution path",
    },
    {
      name: "Deliver",
      title: "Build with visibility.",
      description: "Working releases make progress tangible and easy to review.",
      input: "Review working increments",
      output: "Working release and handover",
    },
    {
      name: "Evolve",
      title: "Keep improving.",
      description: "Usage signals and real feedback guide what should happen next.",
      input: "Usage signals and changes",
      output: "Practical improvement backlog",
    },
  ],
  improve: [
    {
      name: "Discover",
      title: "Locate the friction.",
      description: "We trace where the current system slows your team down.",
      input: "Pain points and workflows",
      output: "System opportunity map",
    },
    {
      name: "Align",
      title: "Choose the best fix.",
      description: "We assess impact, effort, and risk before changing the system.",
      input: "Constraints and priorities",
      output: "Focused improvement plan",
    },
    {
      name: "Deliver",
      title: "Improve safely.",
      description: "Changes move through review and release in visible increments.",
      input: "Review tested changes",
      output: "Reliable updated system",
    },
    {
      name: "Evolve",
      title: "Measure the result.",
      description: "The team sees what improved and what deserves attention next.",
      input: "Operational feedback",
      output: "Measured next-step backlog",
    },
  ],
};

export function ConsultingDemo() {
  const [path, setPath] = useState<"new" | "improve">("new");
  const [phase, setPhase] = useState(0);
  const [guided, setGuided] = useState(true);
  const quiet = useQuietMotion();
  useEffect(() => {
    if (quiet || !guided) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setPhase((current) => (current + 1) % 4);
    }, 3400);
    return () => window.clearInterval(id);
  }, [guided, quiet]);
  const current = engagements[path][phase];
  return (
    <div className="engagement-demo interactive-visual">
      <div className="engagement-top">
        <span>ENGAGEMENT WORKSPACE</span>
        <div className="engagement-switch" role="group" aria-label="Explore your starting point">
          <button
            type="button"
            aria-pressed={path === "new"}
            onClick={() => {
              setPath("new");
              setPhase(0);
              setGuided(false);
            }}
          >
            <Plus size={14} /> New idea
          </button>
          <button
            type="button"
            aria-pressed={path === "improve"}
            onClick={() => {
              setPath("improve");
              setPhase(0);
              setGuided(false);
            }}
          >
            <Compass size={14} /> Improve a system
          </button>
        </div>
      </div>
      <div className="engagement-track" role="group" aria-label="Explore consultancy story phases">
        <div className="engagement-track-line" aria-hidden="true">
          <i style={{ transform: `scaleX(${(phase + 1) / 4})` }} />
        </div>
        {engagements[path].map((item, index) => (
          <button
            type="button"
            key={item.name}
            aria-pressed={phase === index}
            onClick={() => {
              setPhase(index);
              setGuided(false);
            }}
          >
            <span>{String(index + 1).padStart(2, "0")}</span>
            {item.name}
          </button>
        ))}
      </div>
      <div className="engagement-board">
        <div className="engagement-story" key={path + phase}>
          <small>
            {String(phase + 1).padStart(2, "0")} / {current.name.toUpperCase()}
          </small>
          <h4>{current.title}</h4>
          <p>{current.description}</p>
        </div>
        <div className="engagement-handoff">
          <div>
            <UserCircle size={20} />
            <span>
              <b>Your team</b>
              <small>{current.input}</small>
            </span>
          </div>
          <div className="engagement-bridge" aria-hidden="true">
            <i />
          </div>
          <div>
            <Cube size={20} />
            <span>
              <b>Quentagon</b>
              <small>Strategy + delivery</small>
            </span>
          </div>
        </div>
      </div>
      <div className="engagement-output" aria-live={guided ? "off" : "polite"}>
        <span>
          <CheckCircle size={17} /> What you receive
        </span>
        <strong>{current.output}</strong>
      </div>
    </div>
  );
}
