export type Capability = {
  name: string;
  short: string;
  headline: string;
  description: string;
  outcomes: string[];
  technologies: string[];
  layers: string[];
};
export const capabilities: Capability[] = [
  {
    name: "Custom Software Development",
    short: "Custom software",
    headline: "Software that fits the way you work.",
    description:
      "Bring disconnected processes into a business system shaped around your people, operations and goals.",
    outcomes: [
      "Internal tools and operational dashboards",
      "Customer portals and business platforms",
      "Inventory and workflow management",
    ],
    technologies: ["React", "Next.js", "Python", "SQL"],
    layers: ["Your workflow", "Business logic", "Connected data"],
  },
  {
    name: "Web & E-Commerce",
    short: "Web & e-commerce",
    headline: "A better place to do business.",
    description:
      "Give customers a clear route from first impression to enquiry or purchase, with a platform your team can manage.",
    outcomes: [
      "Company websites and content platforms",
      "Online stores and multi-vendor marketplaces",
      "WordPress and WooCommerce solutions",
    ],
    technologies: ["WordPress", "WooCommerce", "React", "Next.js"],
    layers: ["Customer experience", "Commerce & content", "Payments & integrations"],
  },
  {
    name: "Mobile App Development",
    short: "Mobile applications",
    headline: "Your business, within reach.",
    description:
      "Build considered mobile experiences for Android and iOS from a shared cross-platform foundation.",
    outcomes: [
      "Customer and team-facing applications",
      "Mobile access to your existing services",
      "Consistent experiences across devices",
    ],
    technologies: ["Flutter", "React Native", "APIs"],
    layers: ["Android & iOS", "Shared application", "Connected services"],
  },
  {
    name: "AI & Automation",
    short: "AI & automation",
    headline: "Less repetitive work. More useful intelligence.",
    description:
      "Connect applied AI to everyday workflows, with clear boundaries and human review where it matters.",
    outcomes: [
      "Document processing and summarisation",
      "AI-assisted workflows and NLP",
      "API integrations and task automation",
    ],
    technologies: ["AI APIs", "Python", "NLP", "Workflow automation"],
    layers: ["Human oversight", "Intelligent workflow", "Your business data"],
  },
  {
    name: "Cybersecurity",
    short: "Cybersecurity",
    headline: "Build security into the system.",
    description:
      "Understand application risk and strengthen your systems with security work scoped and reviewed by specialists.",
    outcomes: [
      "Application review and security hardening",
      "Threat analysis and security consultation",
      "Specialist-reviewed SIEM and Sentinel work",
    ],
    technologies: ["Application security", "Microsoft Sentinel", "SIEM"],
    layers: ["Review & assessment", "Controls & hardening", "Monitoring integration"],
  },
  {
    name: "Cloud, DevOps & Integrations",
    short: "Cloud & integrations",
    headline: "Connected systems. Considered delivery.",
    description:
      "Give your application a dependable route to deployment and connect it to the tools your business already uses.",
    outcomes: [
      "Deployment pipelines and hosting setup",
      "Backend APIs and third-party integrations",
      "Database and container-based delivery",
    ],
    technologies: ["Docker", "CI/CD", "REST APIs", "Databases"],
    layers: ["Application services", "Delivery pipeline", "Infrastructure & data"],
  },
  {
    name: "Technology Consulting & Support",
    short: "Consulting & support",
    headline: "Know what to build. Know what comes next.",
    description:
      "Make informed technical decisions, from early requirements and architecture to documentation and agreed ongoing support.",
    outcomes: [
      "Discovery and technical qualification",
      "Architecture and implementation planning",
      "Maintenance, documentation and handover",
    ],
    technologies: ["Requirements", "Architecture", "Technical support"],
    layers: ["Business priorities", "Technical direction", "Continued support"],
  },
];
