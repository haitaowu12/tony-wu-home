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

export type PracticeFacet = {
  title: string;
  summary: string;
};

export type ExperienceChapter = {
  period: string;
  industry: string;
  title: string;
  geography: string;
  role: string;
  summary: string;
  highlights: string[];
};

export type DeliveryWork = {
  name: string;
  geography: string;
  industry: string;
  role: string;
  summary: string;
  contribution: string[];
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
    headline: "Systems engineering leader, delivery consultant, AI builder, and practice contributor",
    subhead:
      "Over 15 years, I have helped complex programs move from lifecycle SE intent to governed delivery, testable evidence, and operational readiness across North America.",
    thesis:
      "My value is not only in writing requirements or building models. It is in making the delivery system itself work: roles, interfaces, evidence, decisions, technical risk, and the human tools that keep people aligned under pressure.",
  },
  links: [
    { label: "LinkedIn", href: "https://ca.linkedin.com/in/haitonyw" },
    { label: "GitHub", href: "https://github.com/haitaowu12" },
  ] satisfies Link[],
  proofPoints: [
    { value: "15+", label: "years across delivery, systems integration, assurance, and controls" },
    { value: "Lifecycle SE", label: "implementation from requirements and interfaces to V&V, assurance, and readiness" },
    { value: "North America", label: "project exposure across Canadian and US transit programs" },
    { value: "INCOSE", label: "Canada past president, current director-at-large, workshop and practice contributor" },
  ] satisfies ProofPoint[],
  practiceFacets: [
    {
      title: "Full lifecycle SE implementation",
      summary:
        "Requirements, interfaces, architecture thinking, V&V, assurance, configuration-phase delivery, and acceptance paths made usable by real project teams.",
    },
    {
      title: "Technical leadership and consulting",
      summary:
        "Program-level facilitation across clients, designers, contractors, operators, maintainers, and reviewers where decisions need evidence and momentum.",
    },
    {
      title: "AI enthusiast and side-project builder",
      summary:
        "Pet projects, games, local tools, and AI-assisted workflows that test how systems engineers can think, learn, review, and decide better.",
    },
    {
      title: "Professional society contributor",
      summary:
        "Past President of INCOSE Canada, current Director-at-Large, workshop lead, author, and contributor to transportation infrastructure SE practice.",
    },
  ] satisfies PracticeFacet[],
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
        "Practical use of AI, local tools, and learning simulations to sharpen synthesis, planning, review, and decision surfaces without delegating engineering judgment.",
    },
    {
      title: "Professional Society and Practice Leadership",
      summary:
        "INCOSE Canada leadership, transportation infrastructure workshop work, papers, and reusable practice artifacts for right-sized systems engineering.",
    },
  ],
  experienceChapters: [
    {
      period: "Early career",
      industry: "Aerospace controls",
      title: "Control-system fault detection",
      geography: "Canada / aerospace supply chain",
      role: "Engineer and named inventor",
      summary:
        "Developed signal-analysis and event-classification approaches for detecting sensor faults in aircraft engine control systems.",
      highlights: [
        "Applied fault detection logic to high-consequence control-system behavior.",
        "Named inventor on pre-emptive and in-range sensor fault-detection patent records.",
        "Built early foundation in verification, evidence, thresholds, and technical judgment.",
      ],
    },
    {
      period: "Rail delivery",
      industry: "Rail communications and transit systems",
      title: "LRT and rail communications delivery",
      geography: "Greater Toronto and Canadian transit context",
      role: "Rail communications systems contributor",
      summary:
        "Supported rail communications delivery work, including Eglinton Crosstown LRT context, with attention to detail, critical duties, and project execution discipline.",
      highlights: [
        "Worked inside delivery teams where design, installation, commissioning, and assurance have to converge.",
        "Built practical understanding of contractor/client/operator delivery friction.",
        "Received 2020 SNC-Lavalin Recognition Award.",
      ],
    },
    {
      period: "2021-present",
      industry: "Major rail expansion programs",
      title: "Program systems integration and assurance",
      geography: "Vancouver, Canada, North America",
      role: "Principal Engineer, Rail Systems / Senior Systems Engineer",
      summary:
        "Led and supported program-level systems integration across interdependent rail expansion projects, connecting requirements, interfaces, V&V, readiness, and technical governance.",
      highlights: [
        "Established systems engineering management, requirements, interface, V&V, and assurance governance foundations.",
        "Matured outcome-based assurance, Success Criteria, Path to Acceptance, configuration-phase delivery, technical gap closure, and readiness workflows.",
        "Supported technical issue closure across control centres, maintenance facilities, headend sequencing, power requirements, and revenue-service readiness.",
      ],
    },
    {
      period: "Current practice",
      industry: "Digital engineering and professional practice",
      title: "MBSE, assurance tooling, and leadership models",
      geography: "Infrastructure practice and INCOSE community",
      role: "Builder, author, workshop lead, society contributor",
      summary:
        "Turned delivery lessons into reusable models, tools, workshops, and public-facing practice artifacts for systems engineering adoption.",
      highlights: [
        "Connected Capella, Jama Connect, HazOps+/Reliability Workbench, Power BI, Moata, and automation patterns into delivery workflows.",
        "Co-led INCOSE Transportation Infrastructure Workshop content on right-sized systems engineering.",
        "Developed public pet projects that test how models, games, and assurance tools help people think and decide.",
      ],
    },
  ] satisfies ExperienceChapter[],
  deliveryWork: [
    {
      name: "Rail Expansion Program systems integration",
      geography: "Western Canada",
      industry: "Automated rail / major transit expansion",
      role: "Program systems integration and assurance lead contributor",
      summary:
        "Program-level alignment across requirements, interfaces, V&V, assurance, configuration-phase delivery, and readiness for revenue service.",
      contribution: [
        "Built SE management, requirements, interface, and V&V governance foundations.",
        "Matured outcome-based assurance, Success Criteria, Path to Acceptance, and technical gap closure methods.",
        "Connected multiple concurrent project teams, designers, contractors, operators, and maintainers around evidence and decisions.",
      ],
    },
    {
      name: "Control centre, maintenance facility, and headend integration work",
      geography: "Canada and North America",
      industry: "Rail systems / operations readiness",
      role: "Systems engineering and technical assurance support",
      summary:
        "Support for technically coupled rail-system work where operations, maintainability, control systems, and handover evidence have to line up.",
      contribution: [
        "Supported design review and readiness thinking for control centre and maintenance facility contexts.",
        "Worked through technical dependencies around headend sequencing, expandability, power requirements, and operational acceptance.",
        "Helped convert technical ambiguity into forums, criteria, registers, and delivery actions.",
      ],
    },
    {
      name: "Ontario Line, Crenshaw/LAX, Sound Transit, Newhall Yard, and related advisory contexts",
      geography: "North America",
      industry: "Transit advisory and rail delivery",
      role: "Systems engineering reviewer / advisor / contributor",
      summary:
        "Selected North American rail and transit contexts that broadened delivery pattern recognition beyond one program or client.",
      contribution: [
        "Supported technical advisory, independent review, and design-review contexts.",
        "Observed recurring project delivery failure modes around interfaces, requirements, assurance timing, and operational readiness.",
        "Fed lessons learned back into practical frameworks and reusable work aids.",
      ],
    },
    {
      name: "Aerospace engine control fault detection",
      geography: "Canada",
      industry: "Aerospace controls",
      role: "Engineer and named inventor",
      summary:
        "Control-system health monitoring work focused on detecting sensor faults before they become operational problems.",
      contribution: [
        "Developed signal-analysis logic, threshold comparison, event counting, and fault classification methods.",
        "Produced patent-backed work on pre-emptive and in-range sensor fault detection.",
        "Carried evidence-first thinking from controls into later rail systems assurance work.",
      ],
    },
  ] satisfies DeliveryWork[],
  rolePatterns: [
    "Full lifecycle SE implementation",
    "Program systems integration",
    "Requirements and interface governance",
    "Verification, validation, and assurance strategy",
    "Operational readiness and Path to Acceptance",
    "Configuration-phase delivery and technical gap closure",
    "Digital / MBSE practice development",
    "Technical issue facilitation across client, designer, contractor, operator, maintainer",
    "AI-assisted synthesis, review, and learning workflows",
    "Workshop design, technical leadership, and reusable practice tools",
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
    "Past President and current Director-at-Large, INCOSE Canada",
    "Certified Systems Engineering Professional (CSEP), INCOSE",
    "Professional Engineer (P.Eng)",
    "Member of the Institution of Railway Signal Engineers (MIRSE)",
    "Project Management Professional (PMP)",
    "INCOSE transportation infrastructure workshop contributor",
    "2025 Mott MacDonald NASA Award for Technical Excellence",
    "2023 Mott MacDonald Digital Excellence Award",
  ],
  authorBadge: {
    label: "Know the author",
    description:
      "Built by Tony Wu, systems engineer and developer focused on complex project delivery, rail/transit systems engineering, MBSE, assurance workflows, and learning simulations.",
  },
};
