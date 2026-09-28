"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  FileText,
  Clock,
  CheckCircle,
  GitBranch,
} from "@phosphor-icons/react";
import { useQuietMotion } from "./use-quiet-motion";
const stages = [
  {
    name: "Discover",
    title: "First, understand the right problem.",
    description:
      "We explore how your business works, where the friction is and what a better system needs to achieve.",
    input: "Your goals, current workflows and the people who use them.",
    deliverable: "Discovery summary and an initial list of priorities.",
    decision: "Record assumptions, constraints and questions to resolve.",
    tasks: ["Business goals discussed", "Current workflows mapped", "Open questions documented"],
    next: "Agree priorities and project boundaries.",
  },
  {
    name: "Define",
    title: "Make the scope clear.",
    description:
      "We turn the discovery into agreed requirements, boundaries and acceptance criteria before committing to a build.",
    input: "Priorities, budget parameters and scope approval.",
    deliverable: "Project scope, acceptance criteria and milestone plan.",
    decision: "Document approvals and how scope changes will be handled.",
    tasks: ["Requirements documented", "Acceptance criteria drafted", "Scope ready for approval"],
    next: "Map the architecture and technical dependencies.",
  },
  {
    name: "Architect",
    title: "Give the system a solid foundation.",
    description:
      "We map the application, data and integrations around the requirements, including technical constraints and risks.",
    input: "Existing system information and access requirements.",
    deliverable: "Architecture outline and integration plan.",
    decision: "Record technology choices and their tradeoffs.",
    tasks: ["System boundaries mapped", "Data flow reviewed", "Technical decisions recorded"],
    next: "Turn the architecture into usable experiences.",
  },
  {
    name: "Design",
    title: "Make the experience make sense.",
    description:
      "We shape user flows and interfaces, so the proposed experience can be reviewed before implementation.",
    input: "Content, user context and structured feedback.",
    deliverable: "User flows, interface designs and a reviewable prototype.",
    decision: "Keep a record of design feedback and agreed changes.",
    tasks: ["User flows mapped", "Interface review in progress", "Design feedback recorded"],
    next: "Approve the design and begin implementation.",
  },
  {
    name: "Build",
    title: "Bring the plan into working software.",
    description:
      "We implement the agreed features and integrations in reviewable increments, with visible progress and change tracking.",
    input: "Feedback on working features and agreed priorities.",
    deliverable: "Working software increments and demonstrations.",
    decision: "Track completed work, open issues and change requests.",
    tasks: ["Agreed features in progress", "Integration work tracked", "Demonstration prepared"],
    next: "Validate the complete experience against the scope.",
  },
  {
    name: "Validate",
    title: "Check the details before release.",
    description:
      "We check functionality, integrations and readiness. Security review is included where appropriate to the engagement.",
    input: "User acceptance feedback and operational checks.",
    deliverable: "Test findings, resolved issues and acceptance record.",
    decision: "Make release risks and sign-off decisions visible.",
    tasks: [
      "Functional tests recorded",
      "Acceptance review in progress",
      "Release issues prioritised",
    ],
    next: "Agree launch readiness and the release plan.",
  },
  {
    name: "Deploy",
    title: "Launch with a considered handover.",
    description:
      "We prepare the release, deployment and documentation so your team understands the system it is taking forward.",
    input: "Launch approval and the necessary operational access.",
    deliverable: "Deployed system, release checklist and documentation.",
    decision: "Record release approval and handover responsibilities.",
    tasks: ["Deployment checklist reviewed", "Launch approval recorded", "Handover prepared"],
    next: "Move into the agreed support arrangement.",
  },
  {
    name: "Support",
    title: "Keep the system useful.",
    description:
      "We support and evolve the system within the agreed arrangement, responding to issues and changing priorities.",
    input: "Issue reports, feedback and new business requirements.",
    deliverable: "Support records and an agreed improvement backlog.",
    decision: "Document priorities, changes and support responsibilities.",
    tasks: ["Support scope agreed", "Issue reports tracked", "Improvements prioritised"],
    next: "Review the next improvement together.",
  },
];
export default function ProjectJourney() {
  const [active, setActive] = useState(3);
  const section = useRef<HTMLElement>(null),
    tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const reduced = useQuietMotion();
  const { scrollYProgress } = useScroll({ target: section, offset: ["start 85%", "end 40%"] });
  const scaleX = useTransform(scrollYProgress, [0, 1], [0.05, 1]);
  const stage = stages[active];
  function move(index: number, focus = false) {
    setActive(index);
    if (focus) {
      tabs.current[index]?.focus();
      tabs.current[index]?.scrollIntoView({
        block: "nearest",
        inline: "nearest",
        behavior: "instant",
      });
    }
  }
  function key(event: React.KeyboardEvent, index: number) {
    let next = index;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = (index + 1) % 8;
    else if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = (index + 7) % 8;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = 7;
    else return;
    event.preventDefault();
    move(next, true);
  }
  return (
    <section ref={section} id="process" className="journey-section section-shell">
      <div className="section-heading">
        <p className="eyebrow">INSIDE A QUENTAGON PROJECT</p>
        <h2>
          A clear path.
          <br />
          <span>At every stage.</span>
        </h2>
        <p>
          You always know what is being built, where it stands and what happens next. Explore an
          illustrative project journey.
        </p>
      </div>
      <div className="journey-rail">
        <div className="journey-track" aria-hidden="true">
          <motion.div style={{ scaleX: reduced ? 1 : scaleX }} />
        </div>
        <div className="journey-tabs" role="tablist" aria-label="Project stages">
          {stages.map((item, i) => (
            <button
              type="button"
              ref={(el) => {
                tabs.current[i] = el;
              }}
              className={`journey-step ${active === i ? "is-active" : ""} ${i < active ? "is-complete" : ""}`}
              id={`journey-tab-${i}`}
              key={item.name}
              role="tab"
              aria-selected={active === i}
              aria-controls="journey-panel"
              tabIndex={active === i ? 0 : -1}
              onClick={() => move(i)}
              onKeyDown={(e) => key(e, i)}
            >
              <span className="journey-step-node">
                {i < active ? <Check size={14} /> : String(i + 1).padStart(2, "0")}
              </span>
              <span>{item.name}</span>
            </button>
          ))}
        </div>
      </div>
      <div
        className="journey-content"
        id="journey-panel"
        role="tabpanel"
        aria-labelledby={`journey-tab-${active}`}
        tabIndex={0}
      >
        <div className="journey-detail">
          <div className="journey-stage-caption">
            <span className="journey-stage-number">{String(active + 1).padStart(2, "0")}</span>
            <span>{stage.name}</span>
          </div>
          <h3>{stage.title}</h3>
          <p>{stage.description}</p>
          <dl className="journey-deliverables">
            <div>
              <dt>Your input</dt>
              <dd>{stage.input}</dd>
            </div>
            <div>
              <dt>What you receive</dt>
              <dd>{stage.deliverable}</dd>
            </div>
          </dl>
          <div className="journey-controls">
            <button
              className="icon-button"
              aria-label="Previous stage"
              disabled={active === 0}
              onClick={() => move(active - 1)}
            >
              <ArrowLeft size={19} />
            </button>
            <span>
              {active + 1} of {stages.length}
            </span>
            <button
              className="icon-button"
              aria-label="Next stage"
              disabled={active === 7}
              onClick={() => move(active + 1)}
            >
              <ArrowRight size={19} />
            </button>
          </div>
        </div>
        <div className="journey-board">
          <div className="journey-board-top">
            <span>
              <GitBranch size={16} /> Project workspace
            </span>
            <span className="journey-example-label">Illustrative view</span>
          </div>
          <div className="journey-board-heading">
            <div>
              <p>Current milestone</p>
              <h4>{stage.name}</h4>
            </div>
            <span className="journey-status">
              <Clock size={12} /> In progress
            </span>
          </div>
          <div className="journey-tasks">
            {stage.tasks.map((task, i) => (
              <div key={task}>
                <span className={i === 0 ? "task-done" : "task-pending"}>
                  {i === 0 ? <CheckCircle size={17} /> : <span />}
                </span>
                <span>{task}</span>
                <span>{i === 0 ? "Recorded" : i === 1 ? "In review" : "Planned"}</span>
              </div>
            ))}
          </div>
          <div className="journey-record">
            <FileText size={20} />
            <div>
              <h5>Decisions, documented.</h5>
              <p>{stage.decision}</p>
            </div>
          </div>
          <div className="journey-next">
            <span>UP NEXT</span>
            <p>{stage.next}</p>
            <ArrowRight size={19} />
          </div>
        </div>
      </div>
      <p className="journey-note">
        An example of the delivery experience. Scope, milestones and support are agreed for each
        engagement.
      </p>
    </section>
  );
}
