"use client";
import { useEffect, useRef, useState } from "react";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Play,
  CheckCircle,
  Code,
  SquaresFour,
  ShoppingBag,
  DeviceMobile,
  Sparkle,
  ShieldCheck,
  Compass,
  GitBranch,
  FileText,
  UserCircle,
  Plus,
} from "@phosphor-icons/react";
import { capabilities } from "@/data/capabilities";
const anchors = [
  "custom-software",
  "web-commerce",
  "mobile-apps",
  "ai-automation",
  "cybersecurity",
  "cloud-devops",
  "consulting",
];
function Outcomes({ index }: { index: number }) {
  return (
    <ul className="service-outcomes">
      {capabilities[index].outcomes.map((o) => (
        <li key={o}>{o}</li>
      ))}
    </ul>
  );
}
function Tags({ index }: { index: number }) {
  return (
    <div className="technology-tags">
      {capabilities[index].technologies.map((t) => (
        <span key={t}>{t}</span>
      ))}
    </div>
  );
}
function ServiceLink({ children = "Discuss your project" }: { children?: React.ReactNode }) {
  return (
    <a href="#project-brief" className="text-link">
      {children}
      <ArrowUpRight size={18} />
    </a>
  );
}
function SoftwareDemo() {
  const [active, setActive] = useState(0);
  const data = [
    {
      name: "Operations",
      items: ["New customer onboarding", "Supplier approval", "Monthly reporting"],
      state: ["In review", "Ready", "Scheduled"],
    },
    {
      name: "Projects",
      items: ["Customer portal", "Inventory integration", "Team workspace"],
      state: ["Design", "Build", "Discovery"],
    },
    {
      name: "Inventory",
      items: ["Stock request", "Warehouse transfer", "Catalogue update"],
      state: ["Approved", "In progress", "Ready"],
    },
  ];
  return (
    <div className="software-demo interactive-visual">
      <div className="demo-top">
        <span>
          <SquaresFour size={18} /> Your workspace
        </span>
        <span className="concept-label">Workflow concept</span>
      </div>
      <div className="workspace-body">
        <div className="workspace-menu" role="group" aria-label="Explore software workflows">
          {data.map((d, i) => (
            <button key={d.name} onClick={() => setActive(i)} aria-pressed={active === i}>
              {i === 0 ? (
                <SquaresFour size={18} />
              ) : i === 1 ? (
                <GitBranch size={18} />
              ) : (
                <StackGlyph />
              )}
              {d.name}
            </button>
          ))}
        </div>
        <div className="workspace-content" aria-live="polite">
          <p>Everything in its place.</p>
          <h4>{data[active].name}</h4>
          <div className="workspace-columns">
            <span>Workflow</span>
            <span>Status</span>
          </div>
          {data[active].items.map((d, i) => (
            <div className="workspace-row" key={d}>
              <span>
                <span className="row-mark" />
                {d}
              </span>
              <span className={`status status-${i}`}>{data[active].state[i]}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="workspace-bottom">
        <span>
          <CheckCircle size={16} /> Your people. Your process.
        </span>
        <span>
          One connected system <ArrowRight size={15} />
        </span>
      </div>
    </div>
  );
}
function StackGlyph() {
  return <Code size={18} />;
}
function CommerceDemo() {
  const [checkout, setCheckout] = useState(false);
  return (
    <div className={`commerce-demo interactive-visual ${checkout ? "is-checkout" : ""}`}>
      <div className="commerce-window">
        <div className="store-header">
          <span>Studio collection</span>
          <ShoppingBag size={19} />
        </div>
        <div className="store-preview">
          <div className="product-object" aria-hidden="true">
            <div />
            <div />
            <div />
          </div>
          <div>
            <span className="concept-label">Commerce concept</span>
            <h4>{checkout ? "A clearer checkout." : "A considered collection."}</h4>
            <p>
              {checkout
                ? "The right details, at the right moment."
                : "From a first look to the next step."}
            </p>
            <button className="demo-action" onClick={() => setCheckout(!checkout)}>
              {checkout ? "Back to collection" : "Preview checkout"}
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
        <div className="checkout-detail" aria-live="polite">
          {checkout ? (
            <>
              <CheckCircle size={16} /> Item selected. Delivery and payment come next.
            </>
          ) : (
            <>
              Discover <span /> Choose <span /> Connect
            </>
          )}
        </div>
      </div>
    </div>
  );
}
function MobileDemo() {
  const [platform, setPlatform] = useState("iOS"),
    [tab, setTab] = useState("Overview");
  return (
    <div className="mobile-demo interactive-visual">
      <div className="mobile-context">
        <DeviceMobile size={27} />
        <h4>
          A familiar feeling.
          <br />
          On either platform.
        </h4>
        <div className="segmented" role="group" aria-label="Preview mobile platform">
          {["iOS", "Android"].map((p) => (
            <button key={p} onClick={() => setPlatform(p)} aria-pressed={platform === p}>
              {p}
            </button>
          ))}
        </div>
        <p>Interaction concept</p>
      </div>
      <div className={`phone phone-${platform.toLowerCase()}`}>
        <div className="phone-speaker" />
        <div className="phone-ui">
          <p>Hello, team.</p>
          <h4>{tab === "Overview" ? "A little more clarity." : "Moving things forward."}</h4>
          <div className="phone-note">
            <CheckCircle size={20} />
            <span>
              {tab === "Overview" ? "Your workspace is ready" : "Project review recorded"}
            </span>
          </div>
          <div className="phone-line" />
          <div className="phone-line short" />
          <div className="phone-tabs" role="group" aria-label="Mobile screen">
            {["Overview", "Activity"].map((t) => (
              <button aria-pressed={tab === t} key={t} onClick={() => setTab(t)}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
function FlowDemo() {
  const [step, setStep] = useState(-1),
    timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  useEffect(() => () => timers.current.forEach(clearTimeout), []);
  function run() {
    timers.current.forEach(clearTimeout);
    setStep(0);
    const quiet =
      matchMedia("(prefers-reduced-motion: reduce)").matches ||
      document.documentElement.dataset.motion === "paused";
    [1, 2, 3].forEach((v, i) =>
      timers.current.push(setTimeout(() => setStep(v), quiet ? 0 : 420 * (i + 1))),
    );
  }
  const icons = [
    <FileText key="file" size={28} />,
    <Sparkle key="ai" size={28} />,
    <UserCircle key="human" size={28} />,
  ];
  return (
    <div className="flow-demo interactive-visual">
      <div className="demo-top">
        <span>Useful intelligence. Clear boundaries.</span>
        <button className="demo-action" onClick={run} disabled={step >= 0 && step < 3}>
          <Play size={14} weight="fill" />
          {step === 3 ? "Run again" : "Run example"}
        </button>
      </div>
      <div className="flow-diagram">
        {["Your document", "AI processing", "Human review"].map((name, i) => (
          <div className={`flow-node ${step >= i ? "is-running" : ""}`} key={name}>
            <div className="flow-node-icon">{step > i ? <CheckCircle size={28} /> : icons[i]}</div>
            <h4>{name}</h4>
            <p>
              {["Give the workflow context", "Extract and summarise", "Keep people in control"][i]}
            </p>
            {i < 2 && (
              <div className="flow-connector" aria-hidden="true">
                <span />
              </div>
            )}
          </div>
        ))}
      </div>
      <p className="flow-result" role="status">
        {step === 3
          ? "Example complete. Human review stays in the workflow."
          : step >= 0
            ? "Following the example data flow..."
            : "Illustrative workflow. No document is uploaded or processed."}
      </p>
    </div>
  );
}
function SecurityDemo() {
  const [layer, setLayer] = useState(0);
  return (
    <div className="security-demo interactive-visual">
      <div className="security-emblem">
        <ShieldCheck size={76} weight="light" />
        <span>Consider every layer.</span>
      </div>
      <div className="security-options" role="group" aria-label="Explore security layers">
        {["Assess", "Harden", "Review"].map((x, i) => (
          <button onClick={() => setLayer(i)} aria-pressed={layer === i} key={x}>
            {x}
            <ArrowUpRight size={15} />
          </button>
        ))}
      </div>
      <p className="security-explanation" aria-live="polite">
        {
          [
            "Understand the application, its risks and the scope of the engagement.",
            "Apply controls and hardening appropriate to your system.",
            "Validate the work with a qualified specialist.",
          ][layer]
        }
      </p>
    </div>
  );
}
function CloudDemo() {
  const [stage, setStage] = useState(0);
  return (
    <div className="cloud-demo interactive-visual">
      <div className="deployment-steps" role="group" aria-label="Explore deployment stages">
        {["Build", "Connect", "Deploy"].map((n, i) => (
          <button onClick={() => setStage(i)} aria-pressed={stage === i} key={n}>
            <span>{i < stage ? <Check size={17} /> : i + 1}</span>
            {n}
            {i < 2 && <ArrowRight size={17} />}
          </button>
        ))}
      </div>
      <div className="delivery-window">
        <div>
          <GitBranch size={16} />
          <span>Delivery concept</span>
        </div>
        <p className="deployment-explanation" aria-live="polite">
          {
            [
              "Prepare the application and its dependencies.",
              "Connect the data, services and integrations.",
              "Release through an agreed deployment plan.",
            ][stage]
          }
        </p>
        <div className="delivery-check">
          <CheckCircle size={17} />
          {
            ["Application & dependencies", "APIs & connected data", "Release checklist & handover"][
              stage
            ]
          }
        </div>
      </div>
    </div>
  );
}
function ConsultingDemo() {
  const [improve, setImprove] = useState(false);
  return (
    <div className="consulting-demo">
      <div className="segmented" role="group" aria-label="Explore your starting point">
        <button aria-pressed={!improve} onClick={() => setImprove(false)}>
          <Plus size={15} /> Start something new
        </button>
        <button aria-pressed={improve} onClick={() => setImprove(true)}>
          <Compass size={15} /> Improve a system
        </button>
      </div>
      <div className="decision-route" aria-live="polite">
        {(improve
          ? ["Understand the friction", "Map the opportunities", "Plan the next improvement"]
          : ["Explore the idea", "Define the right scope", "Plan the first release"]
        ).map((x, i) => (
          <div key={x}>
            <span>{String(i + 1).padStart(2, "0")}</span>
            <p>{x}</p>
            {i < 2 && <ArrowRight size={20} />}
          </div>
        ))}
      </div>
    </div>
  );
}
export default function ServiceStories() {
  return (
    <section id="services" className="services-section section-shell">
      <div className="section-heading">
        <p className="eyebrow">What we do</p>
        <h2>
          The right expertise.
          <br />
          <span>At every connection.</span>
        </h2>
        <p>Seven connected disciplines. One team thinking about the whole picture.</p>
      </div>
      <nav className="service-index" aria-label="Explore services">
        {capabilities.map((c, i) => (
          <a href={`#${anchors[i]}`} key={c.name}>
            {c.short}
            <ArrowUpRight size={15} />
          </a>
        ))}
      </nav>
      <div className="service-grid">
        <article
          id={anchors[0]}
          data-service-index="0"
          className="service-feature software-feature"
        >
          <div className="service-copy">
            <Code size={28} weight="light" />
            <h3>Custom software</h3>
            <p className="service-lead">Built around the way you work.</p>
            <p>{capabilities[0].description}</p>
            <Outcomes index={0} />
            <ServiceLink>Build your business system</ServiceLink>
          </div>
          <SoftwareDemo />
        </article>
        <article id={anchors[1]} data-service-index="1" className="service-card commerce-card">
          <div className="service-copy">
            <h3>Web &amp; e-commerce</h3>
            <p className="service-lead">Make every first impression count.</p>
            <p>{capabilities[1].description}</p>
          </div>
          <CommerceDemo />
          <Outcomes index={1} />
          <Tags index={1} />
          <ServiceLink>Build your digital presence</ServiceLink>
        </article>
        <article id={anchors[2]} data-service-index="2" className="service-card mobile-card">
          <div className="service-copy">
            <h3>Mobile applications</h3>
            <p className="service-lead">Your business, within reach.</p>
            <p>{capabilities[2].description}</p>
          </div>
          <MobileDemo />
          <Outcomes index={2} />
          <Tags index={2} />
          <ServiceLink>Explore your app idea</ServiceLink>
        </article>
        <article id={anchors[3]} data-service-index="3" className="service-feature ai-feature">
          <div className="ai-intro">
            <Sparkle size={30} weight="light" />
            <h3>AI &amp; automation</h3>
            <p className="service-lead">
              Less busywork.
              <br />
              More room to think.
            </p>
            <p>{capabilities[3].description}</p>
            <Tags index={3} />
            <ServiceLink>Find your useful automation</ServiceLink>
          </div>
          <div className="ai-example">
            <FlowDemo />
            <Outcomes index={3} />
          </div>
        </article>
        <article id={anchors[4]} data-service-index="4" className="service-card security-card">
          <div className="service-copy">
            <h3>Cybersecurity</h3>
            <p className="service-lead">Confidence, considered.</p>
            <p>{capabilities[4].description}</p>
          </div>
          <SecurityDemo />
          <Outcomes index={4} />
          <ServiceLink>Discuss your security needs</ServiceLink>
        </article>
        <article id={anchors[5]} data-service-index="5" className="service-card cloud-card">
          <div className="service-copy">
            <h3>Cloud &amp; integrations</h3>
            <p className="service-lead">A clear route from code to reality.</p>
            <p>{capabilities[5].description}</p>
          </div>
          <CloudDemo />
          <Outcomes index={5} />
          <ServiceLink>Connect your systems</ServiceLink>
        </article>
        <article
          id={anchors[6]}
          data-service-index="6"
          className="service-feature consulting-feature"
        >
          <div className="service-copy">
            <h3>Consulting &amp; support</h3>
            <p className="service-lead">
              Clarity before code.
              <br />
              Support beyond launch.
            </p>
            <p>{capabilities[6].description}</p>
            <ServiceLink>Find your next step</ServiceLink>
          </div>
          <ConsultingDemo />
        </article>
      </div>
    </section>
  );
}
