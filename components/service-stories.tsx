"use client";
import { useState } from "react";
import { ArrowUpRight, Code, Sparkle, ShieldCheck } from "@phosphor-icons/react";
import { capabilities } from "@/data/capabilities";
import { SoftwarePortfolio, WebPortfolio } from "./portfolio-previews";
import AutomationDemo from "./automation-demo";
import { CloudDemo, ConsultingDemo } from "./service-workflows";
const anchors = [
  "custom-software",
  "web-commerce",
  "mobile-apps",
  "ai-automation",
  "cybersecurity",
  "cloud-devops",
  "consulting",
];
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
function SecurityDemo() {
  const [layer, setLayer] = useState(0);
  return (
    <div className="security-demo interactive-visual">
      <div className="security-console">
        <div className="security-console-top">
          <span>SECURITY OPERATIONS / PREVIEW</span>
          <span className="security-live">Signal scan</span>
        </div>
        <div className="security-visual" aria-hidden="true">
          <div className="security-ring ring-one" />
          <div className="security-ring ring-two" />
          <div className="security-ring ring-three" />
          <div className="security-sweep" />
          <span className="security-node node-one">NETWORK</span>
          <span className="security-node node-two">THREATS</span>
          <span className="security-node node-three">ENCRYPTION</span>
          <span className="security-node node-four">ANALYSIS</span>
          <div className="security-core">
            <ShieldCheck size={34} weight="light" />
            <span>PROTECTED</span>
          </div>
        </div>
        <div className="security-telemetry">
          <span>
            Traffic integrity <strong>Within policy</strong>
          </span>
          <span>
            Threat signals <strong>Analysing</strong>
          </span>
          <span>
            Keys <strong>Encrypted</strong>
          </span>
        </div>
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
            <h3>Software &amp; SaaS development</h3>
            <p className="service-lead">Engineered around your operations.</p>
            <p>
              We study each industry, then engineer efficient, cost-conscious systems that fit its
              workflows and exceed operational needs.
            </p>
            <ServiceLink>Build your business system</ServiceLink>
          </div>
          <SoftwarePortfolio />
        </article>
        <article id={anchors[1]} data-service-index="1" className="service-card commerce-card">
          <div className="service-copy">
            <h3>Web &amp; e-commerce</h3>
            <p className="service-lead">One experience. Every screen.</p>
            <p>Adaptive layouts and thoughtful interactions make each visit feel effortless.</p>
          </div>
          <WebPortfolio />
          <ServiceLink>Build your digital presence</ServiceLink>
        </article>
        <article id={anchors[2]} data-service-index="2" className="service-card mobile-card">
          <div className="service-copy">
            <h3>Mobile applications</h3>
            <p className="service-lead">Made for the way people use a phone.</p>
            <p>Shared product logic with considered iOS and Android interactions.</p>
          </div>
          <WebPortfolio mobile />
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
            <AutomationDemo />
          </div>
        </article>
        <article id={anchors[4]} data-service-index="4" className="service-card security-card">
          <div className="service-copy">
            <h3>Cybersecurity</h3>
            <p className="service-lead">Confidence, considered.</p>
            <p>{capabilities[4].description}</p>
          </div>
          <SecurityDemo />
          <ServiceLink>Discuss your security needs</ServiceLink>
        </article>
        <article id={anchors[5]} data-service-index="5" className="service-card cloud-card">
          <div className="service-copy">
            <h3>Cloud &amp; integrations</h3>
            <p className="service-lead">A clear route from code to reality.</p>
            <p>{capabilities[5].description}</p>
          </div>
          <CloudDemo />
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
