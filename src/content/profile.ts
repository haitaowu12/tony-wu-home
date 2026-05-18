export type Link = {
  label: string;
  href: string;
};

export type SelectedProject = {
  title: string;
  summary: string;
  role: string;
  status: "public" | "prototype" | "local-private";
  themes: string[];
  link?: Link;
};

export type Publication = {
  title: string;
  kind: "conference" | "patent";
  status: string;
  summary: string;
  link?: Link;
};

export type ProofPoint = {
  value: string;
  label: string;
};

export const profile = {
  canonicalUrl: "https://haitaowu12.github.io/tony-wu-home/",
  identity: {
    name: "Tony Wu",
    fullName: "Hai Tao (Tony) Wu",
    credentials: "P.Eng, MIRSE, PMP, CSEP",
    title: "Principal Engineer, Rail Systems",
    location: "Vancouver, Canada",
  },
  positioning: {
    headline: "Systems Engineering for Complex Rail and Transit Programs",
    subhead:
      "I help infrastructure teams turn requirements, interfaces, assurance, and delivery risk into usable systems of work, with practical MBSE and software tools.",
    thesis:
      "My work sits where major-program governance, model-based engineering, technical assurance, and human decision-making have to survive real delivery pressure.",
  },
  links: [
    { label: "LinkedIn", href: "https://ca.linkedin.com/in/haitonyw" },
    { label: "GitHub", href: "https://github.com/haitaowu12" },
  ] satisfies Link[],
  proofPoints: [
    { value: "15+", label: "years across systems, integration, assurance, and controls" },
    { value: "4", label: "credentials spanning engineering, systems, rail, and delivery" },
    { value: "2", label: "sensor fault-detection patent records" },
    { value: "2026", label: "INCOSE IS technical leadership paper track" },
  ] satisfies ProofPoint[],
  domains: [
    {
      title: "Rail and Transit Systems",
      summary:
        "Program integration, requirements, interfaces, verification, operational readiness, and technical assurance for complex infrastructure delivery.",
    },
    {
      title: "MBSE and Digital Delivery",
      summary:
        "Model-based delivery patterns that make traceability, assumptions, decisions, and evidence visible enough for real project teams to use.",
    },
    {
      title: "AI-Augmented Technical Leadership",
      summary:
        "Practical use of AI to sharpen synthesis, learning, planning, and decision surfaces without delegating safety-critical judgment.",
    },
  ],
  projects: [
    {
      title: "SysML Viewer",
      summary:
        "A local SysML v2 visual editor with synchronized text, diagrams, Draw.io, SVG, and AI-assisted modeling workflows.",
      role: "Builder",
      status: "prototype",
      themes: ["SysML v2", "model readability", "diagram workflow"],
      link: { label: "GitHub", href: "https://github.com/haitaowu12/sysmlv2_viewer" },
    },
    {
      title: "SE Tailoring Model",
      summary:
        "A practical framework for right-sizing systems engineering rigor to project drivers, culture, and delivery risk.",
      role: "Author and co-presenter",
      status: "public",
      themes: ["INCOSE TIW 2026", "tailoring", "infrastructure SE"],
      link: { label: "GitHub", href: "https://github.com/haitaowu12/se-tailoring-model" },
    },
    {
      title: "Shared Model Under Pressure",
      summary:
        "A React training game that turns the INCOSE TLI Shared Model into evidence placement, pressure rounds, and debrief transfer.",
      role: "Builder",
      status: "prototype",
      themes: ["technical leadership", "learning game", "facilitation"],
      link: { label: "GitHub", href: "https://github.com/haitaowu12/TLI_Shared_Model_game" },
    },
    {
      title: "FOCAL POINT: Hold the Vision",
      summary:
        "A static browser game for leadership training around vision drift, stakeholder viewpoints, and local multiplayer facilitation.",
      role: "Builder",
      status: "public",
      themes: ["systems thinking", "workshop game", "GitHub Pages"],
      link: { label: "GitHub", href: "https://github.com/haitaowu12/Focal-Point-Game" },
    },
    {
      title: "Compliance Assurance Workbench",
      summary:
        "A local-first assurance prototype for reviewing obligations, evidence, findings, authority, and review snapshots.",
      role: "Builder",
      status: "local-private",
      themes: ["assurance", "evidence", "review workflow"],
    },
  ] satisfies SelectedProject[],
  publications: [
    {
      title: "Building an AI-Augmented Technical Leadership Model",
      kind: "conference",
      status: "Accepted for INCOSE International Symposium 2026",
      summary:
        "A technical leadership model for using AI as a decision-support and learning amplifier in systems engineering practice.",
    },
    {
      title: "Right-Sizing the SE Approach via an SE Tailoring Framework",
      kind: "conference",
      status: "Presented at INCOSE Transportation Infrastructure Workshop 2026",
      summary:
        "A workshop presentation with Cleo Wong on fitting systems engineering rigor to real infrastructure project conditions.",
    },
    {
      title: "Pre-emptive Fault Detection Through Advanced Signal Analysis",
      kind: "patent",
      status: "US 9,996,078 B1, issued June 12, 2018",
      summary:
        "Sensor fault-detection methods and systems for gas turbine engine control systems.",
      link: {
        label: "Patent record",
        href: "https://patents.justia.com/assignee/pratt-whitney-canada?page=14",
      },
    },
    {
      title: "In-Range Sensor Fault Detection",
      kind: "patent",
      status: "US 20190154754 A1, published May 23, 2019",
      summary:
        "Detection of in-range sensor faults based on rate-reversal events and fault status assignment.",
      link: {
        label: "Patent record",
        href: "https://patents.google.com/patent/US20190154754A1/en",
      },
    },
  ] satisfies Publication[],
  recognition: [
    "Certified Systems Engineering Professional (CSEP), INCOSE",
    "Professional Engineer (P.Eng)",
    "Member of the Institution of Railway Signal Engineers (MIRSE)",
    "Project Management Professional (PMP)",
    "INCOSE Canada leadership and transportation infrastructure workshop work",
    "2025 Mott MacDonald NASA Award for Technical Excellence",
    "2023 Mott MacDonald Digital Excellence Award",
  ],
  authorBadge: {
    label: "Know the author",
    description:
      "Built by Tony Wu, systems engineer and developer focused on rail/transit systems engineering, MBSE, assurance workflows, and learning simulations.",
  },
};
