export type Link = {
  label: string;
  href: string;
};

export type SelectedProject = {
  title: string;
  summary: string;
  status: "public" | "prototype" | "local-private";
  themes: string[];
  link?: Link;
  availabilityLabel?: string;
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

export type PracticeArea = {
  title: string;
  summary: string;
  outcomes: string[];
};

export type MethodStep = {
  label: string;
  title: string;
  summary: string;
};

export type OperatingPrinciple = {
  title: string;
  summary: string;
};

export type FieldNote = {
  title: string;
  status: string;
  summary: string;
  linkPlaceholder?: string;
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

export const profile = {
  canonicalUrl: "https://haitaowu12.github.io/tony-wu-home/",
  identity: {
    name: "Tony Wu",
    fullName: "Hai Tao (Tony) Wu",
    credentials: "P.Eng (ON, BC), MIRSE, PMP, CSEP",
    title: "Principal Engineer, Rail Systems",
    location: "Vancouver, Canada",
  },
  positioning: {
    headline: "Systems engineering for infrastructure programs where interfaces, evidence, and readiness decide delivery.",
    subhead:
      "I work in rail systems practice in Vancouver. This site collects field notes, public practice work, and lab experiments around MBSE, assurance, AI-assisted engineering, and technical leadership.",
    thesis:
      "The thread through my work is decision quality: make complexity visible, connect evidence to acceptance, keep interfaces owned, and leave teams with methods they can actually use.",
  },
  links: [
    { label: "LinkedIn", href: "https://ca.linkedin.com/in/haitonyw" },
  ] satisfies Link[],
  proofPoints: [
    {
      value: "15+",
      label: "years across rail systems, aerospace controls, integration, assurance, and technical leadership",
    },
    { value: "Full Lifecycle SE", label: "requirements, interfaces, V&V, assurance, configuration, readiness" },
    {
      value: "Rail and Transit",
      label: "train control, major expansion programs, operational readiness, and systems integration",
    },
    {
      value: "INCOSE",
      label: "Director-at-Large / Past President, INCOSE Canada; Technical Leadership Institute member",
    },
  ] satisfies ProofPoint[],
  practiceAreas: [
    {
      title: "Rail systems integration and readiness",
      summary:
        "Turn requirements, interfaces, verification, assurance, and operations readiness into a delivery system teams can inspect and act on.",
      outcomes: [
        "Interface ownership that survives organizational boundaries",
        "Acceptance paths connected to evidence and readiness",
        "Technical forums that move decisions instead of recycling status",
      ],
    },
    {
      title: "MBSE and digital engineering adoption",
      summary:
        "Use models, traces, and digital workflows when they improve delivery decisions, not because the method looks impressive on paper.",
      outcomes: [
        "Model-based work tied to real review questions",
        "Traceability that exposes assumptions and gaps",
        "Tooling choices shaped by team behavior and governance",
      ],
    },
    {
      title: "Evidence, assurance, and decision memory",
      summary:
        "Build the working memory around why a technical decision was made, what evidence supports it, and what still needs closure.",
      outcomes: [
        "Requirements-to-verification paths people can follow",
        "Assurance reviews with sharper entry and exit criteria",
        "Decision records that support handover and future learning",
      ],
    },
    {
      title: "Practice leadership and capability building",
      summary:
        "Turn delivery lessons into workshops, papers, games, public notes, and reusable methods for engineering teams and professional communities.",
      outcomes: [
        "Right-sized systems engineering adoption patterns",
        "Workshop formats that change how people decide",
        "Practice assets that can outlive a single project",
      ],
    },
  ] satisfies PracticeArea[],
  methodSteps: [
    {
      label: "01",
      title: "Frame",
      summary:
        "Define the system boundary, stakeholder landscape, operating context, success criteria, and decisions the work must support.",
    },
    {
      label: "02",
      title: "Tailor",
      summary:
        "Fit the systems engineering rigor to risk, novelty, safety, regulatory burden, delivery pressure, and team maturity.",
    },
    {
      label: "03",
      title: "Connect",
      summary:
        "Link requirements, interfaces, models, hazards, V&V, assurance evidence, and readiness claims into one inspectable thread.",
    },
    {
      label: "04",
      title: "Transfer",
      summary:
        "Turn delivery lessons into reusable playbooks, templates, field notes, workshop formats, diagrams, tools, and training aids.",
    },
  ] satisfies MethodStep[],
  operatingPrinciples: [
    {
      title: "Start with the decision, not the artifact.",
      summary:
        "A model, register, workshop, or report earns its place only if it improves a decision, exposes a tradeoff, or changes what the team does next.",
    },
    {
      title: "Fit the rigor to the risk.",
      summary:
        "Over-prescribing systems engineering burns trust; under-scoping it hides risk. Tailoring has to make both sides of that trade visible.",
    },
    {
      title: "Make interfaces owned, not just listed.",
      summary:
        "Interface work matters when owners, assumptions, timing, evidence, and acceptance responsibilities are clear across organizations.",
    },
    {
      title: "Keep evidence close to readiness.",
      summary:
        "Requirements, hazards, tests, concessions, operations constraints, and residual risk should converge into a defensible readiness position.",
    },
  ] satisfies OperatingPrinciple[],
  fieldNotes: [
    {
      title: "Right-sized systems engineering for infrastructure programs",
      status: "Paper - In Progress",
      summary:
        "A practical response to a recurring problem: simple projects can be smothered by over-prescribed process, while complex projects can lose the value of SE when rigor is cut too far. The work explores clearer ways to match SE rigor to project drivers and understand how tailoring one process affects the others.",
      linkPlaceholder: "Paper link pending",
    },
    {
      title: "Building an AI-Augmented Technical Leadership Model",
      status: "Paper - Finalized",
      summary:
        "An INCOSE IS 2026 paper updating the TLI technical leadership model for human-AI collaboration, adaptive decision-making, organizational AI literacy, and ethical technology stewardship.",
      linkPlaceholder: "Paper link pending",
    },
    {
      title: "Scenario games for practical systems thinking",
      status: "Note",
      summary:
        "A note on using small scenario-based interactions and games to make systems engineering easier to understand for non-SE practitioners. Systems thinking should feel like common sense: a way to bring order to chaos, not a specialist ritual.",
    },
  ] satisfies FieldNote[],
  experienceChapters: [
    {
      period: "Early career",
      industry: "Aerospace controls",
      title: "Full Authority Digital Engine Control (FADEC) research and development",
      geography: "Canada",
      role: "Control Systems Analyst, Pratt & Whitney Canada",
      summary:
        "Built engine-control logic, analysis models, and verification evidence for aircraft engine programs across helicopter, propeller, and turbofan applications.",
      highlights: [
        "Developed control algorithms, dynamic analyses, and simulation models for helicopter, propeller, and turbofan engine programs.",
        "Carried control-system logic through V-model development in a DO-178 B/C environment.",
        "Produced verification reports and supported certification, Safety of Flight, airframe integration, and flight-test needs.",
        "Named inventor on sensor fault-detection patent records for gas turbine engine control systems.",
      ],
    },
    {
      period: "2017-2021",
      industry: "Signalling and train control systems",
      title: "Train control, rail systems delivery, and strategic consulting",
      geography: "Canada",
      role: "Train Control Systems Engineer, SNC-Lavalin / AtkinsRealis",
      summary:
        "Built rail systems delivery and advisory depth across automated train control, requirements, interfaces, supplier reviews, testing, commissioning, RAMS, V&V, and strategic consulting studies.",
      highlights: [
        "Supported projects including Canada Line Capacity Expansion, SkyTrain OMC3A, Montreal REM, Eglinton Crosstown LRT, and related transit assignments.",
        "Contributed to strategic consulting and feasibility work including service-hour, station-impact, rail-condition, and switch-machine studies.",
        "Managed requirements, interface documentation, configuration baselines, design reviews, and supplier technical audits.",
      ],
    },
    {
      period: "2021-present",
      industry: "Major rail expansion programs",
      title: "Rail expansion systems integration",
      geography: "Vancouver, Canada",
      role: "Principal Engineer, Rail Systems / Rail Expansion Systems Integration Lead, Mott MacDonald",
      summary:
        "Progressed from Senior Systems Engineer into Principal Engineer while helping build program-level systems engineering, assurance, integration, and readiness capability for major SkyTrain expansion work.",
      highlights: [
        "Led and supported requirements, interfaces, V&V, technical governance, assurance, and readiness across multiple concurrent rail expansion projects.",
        "Advanced outcome-based assurance, Success Criteria, Path to Acceptance, configuration-phase delivery, headend sequencing, and technical gap closure practices.",
        "Developed digital and MBSE-enabled ways of working using Capella, Jama Connect, HazOps+/Reliability Workbench, Power BI, Moata, and automation.",
      ],
    },
    {
      period: "2023 - Present",
      industry: "INCOSE and professional community",
      title: "Professional society leadership",
      geography: "Canada / International",
      role: "Director-at-Large / Past President, INCOSE Canada",
      summary:
        "Contributes to the systems engineering community through INCOSE Canada leadership, technical leadership work, certification review, and transportation infrastructure practice development.",
      highlights: [
        "Served as Communications Director, Vice President, President, and now Director-at-Large / Past President for INCOSE Canada.",
        "Member of the INCOSE Technical Leadership Institute and Certification Application Reviewer for INCOSE Central.",
        "Organizer of the Transportation Infrastructure Workshop and contributor to the Transportation Working Group.",
      ],
    },
  ] satisfies ExperienceChapter[],
  projects: [
    {
      title: "SE Tailoring Model",
      summary:
        "A practical framework for right-sizing systems engineering rigor to project drivers, process interdependencies, culture, and delivery risk.",
      status: "public",
      themes: ["INCOSE TIW 2026", "tailoring", "infrastructure SE"],
      link: { label: "Open", href: "https://haitaowu12.github.io/SE_Tailoring_Framework" },
    },
    {
      title: "SysML Viewer",
      summary:
        "A local SysML v2 visual editor with synchronized text, diagrams, Draw.io, SVG, and AI-assisted modeling workflows.",
      status: "prototype",
      themes: ["SysML v2", "model readability", "diagram workflow"],
      link: { label: "Open", href: "https://haitaowu12.github.io/sysmlv2_viewer/" },
    },
    {
      title: "SE Learning Quest",
      summary:
        "A scenario-based systems engineering learning game that teaches evidence threads across lifecycle decisions instead of process memorization.",
      status: "public",
      themes: ["SE education", "Phaser", "scenario learning"],
      link: { label: "Open", href: "https://haitaowu12.github.io/SE-Learning-Quest/" },
    },
    {
      title: "Compliance Assurance Workbench",
      summary:
        "A local-first assurance prototype for reviewing obligations, evidence, findings, authority, and review snapshots.",
      status: "local-private",
      themes: ["assurance", "evidence", "review workflow"],
    },
    {
      title: "Systems Engineering Playbook",
      summary:
        "A private experiment in ISO 15288-aligned process playbooks, templates, AI prompts, training assets, examples, and practitioner guidance.",
      status: "local-private",
      themes: ["ISO 15288", "training", "AI prompts"],
    },
    {
      title: "Systems Engineering Skills Library",
      summary:
        "A local/private agent skills library for systems engineering practitioners, including SysML v2 support, diagram creation workflows, and reusable practice skills.",
      status: "local-private",
      themes: ["agent skills", "SysML v2", "diagram workflows"],
    },
    {
      title: "Shared Model Under Pressure",
      summary:
        "A React training game that turns the INCOSE TLI Shared Model into evidence placement, pressure rounds, and debrief transfer.",
      status: "prototype",
      themes: ["technical leadership", "learning game", "facilitation"],
      link: { label: "Open", href: "https://haitaowu12.github.io/TLI_Shared_Model_game/" },
    },
    {
      title: "FOCAL POINT: Hold the Vision",
      summary:
        "A static browser game for leadership training around vision drift, stakeholder viewpoints, and local multiplayer facilitation.",
      status: "public",
      themes: ["systems thinking", "workshop game", "static web game"],
      link: { label: "Open", href: "https://haitaowu12.github.io/Focal-Point-Game/" },
    },
  ] satisfies SelectedProject[],
  publications: [
    {
      title: "Building an AI-Augmented Technical Leadership Model",
      kind: "conference",
      status: "Accepted for INCOSE International Symposium 2026, Yokohama",
      summary:
        "An accepted INCOSE IS 2026 paper proposing an AI-augmented extension of the TLI technical leadership model, retaining the six original behaviors while adding competencies for human-AI collaboration, adaptive leadership, AI literacy, and ethical technology stewardship.",
    },
    {
      title: "A Modular Framework for Tailoring Systems Engineering Processes",
      kind: "conference",
      status: "Presented at INCOSE Transportation Infrastructure Workshop 2026",
      summary:
        "A practical SE tailoring approach, developed with Cleo Wong, using ISO/IEC/IEEE 15288 process modules, Basic/Standard/Comprehensive rigor levels, project metrics, scoring logic, and process interdependencies.",
    },
    {
      title: "Pre-emptive Fault Detection Through Advanced Signal Analysis",
      kind: "patent",
      status: "US 9,996,078 B1, issued June 12, 2018",
      summary:
        "Pre-emptive detection of intermittent sensor open-circuit faults in gas turbine engine control systems using high-pass signal analysis, spike-rate thresholds, sensor health values, and signal accommodation.",
      link: {
        label: "Patent record",
        href: "https://patentimages.storage.googleapis.com/30/d5/39/be3b3524c63dd1/US9996078.pdf",
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
    "Director-at-Large / Past President, INCOSE Canada",
    "Member, INCOSE Technical Leadership Institute",
    "Certification Application Reviewer, INCOSE Central",
    "Certified Systems Engineering Professional (CSEP), INCOSE",
    "Professional Engineer (P.Eng), Ontario and British Columbia",
    "Member of the Institution of Railway Signal Engineers (MIRSE)",
    "Project Management Professional (PMP)",
    "Organizer, INCOSE Transportation Infrastructure Workshop",
    "Contributor, INCOSE Transportation Working Group",
    "2025 Mott MacDonald technical excellence recognition",
    "2023 Regional Winner, Mott MacDonald Digital Excellence Award",
  ],
  authorBadge: {
    label: "Know the author",
    description:
      "Built by Tony Wu, systems engineer and developer focused on complex project delivery, rail/transit systems engineering, MBSE, assurance workflows, and learning simulations.",
  },
};
