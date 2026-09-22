export type Link = {
  label: string;
  href: string;
};

export type SelectedProject = {
  title: string;
  summary: string;
  status: "public" | "prototype" | "local-private";
  /** Rendered in the Selected public work section. Set explicitly so no
   *  positional slice can silently drop a project. */
  featured?: boolean;
  themes: string[];
  link?: Link;
  preview?: {
    /** Full-resolution capture; also the largest srcset entry. */
    src: string;
    /** 720px-wide variant served to narrow viewports. */
    smallSrc: string;
    alt: string;
    /** Intrinsic pixel size, so the browser can reserve layout space. */
    width: number;
    height: number;
  };
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
  link?: Link;
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

const leadershipPaper = {
  title: "Building an AI-Augmented Technical Leadership Model",
  summary:
    "Co-authored with INCOSE TLI Cohort 10, this paper extends the original six leadership pillars for human-AI collaboration and adds a seventh on ethical and responsible technology use. Human judgment and accountability remain central.",
  link: {
    label: "Read the published paper",
    href: "https://incose.onlinelibrary.wiley.com/doi/10.1002/iis2.70143",
  },
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
    headline: "Systems engineering for complex delivery. Practical methods. Usable tools.",
    subhead:
      "I help complex infrastructure programs turn interfaces, evidence, and readiness into decisions teams can act on. Alongside rail delivery, I write about responsible technical leadership and build tools and learning experiences that make systems practice easier to use.",
    thesis:
      "The thread through my work is decision quality: make complexity visible, connect evidence to acceptance, keep interfaces owned, and leave teams with methods they can actually use.",
  },
  now: {
    reviewed: "September 2026",
    summary:
      "My current public work connects responsible AI, engineering judgment, and learning through practice: a published INCOSE paper on AI-augmented technical leadership, the Asterfall systems-thinking adventure, and Personal Growth Copilot, an early-stage reflection and learning tool.",
    research:
      "My current writing explores SE tailoring, changing transit concepts of operations, future upgrades, and whole-facility operation. Alongside these papers, I am helping advance development of the proposed INCOSE–APTA Systems Lifecycle Engineering standard for transit.",
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
      ...leadershipPaper,
      status: "Published 11 September 2026 · INCOSE IS",
    },
    {
      title: "Right-sized systems engineering for infrastructure programs",
      status: "Paper in development",
      summary:
        "Developing an inspectable method for matching systems engineering rigor to project drivers, process dependencies, organizational conditions, and delivery risk. The paper explains how tailoring decisions are justified and revisited as a project changes; evaluation remains in progress.",
      linkPlaceholder: "Paper link pending",
    },
    {
      title: "Applying Adaptability Practices to Transit Concepts of Operations",
      status: "Working paper",
      summary:
        "How should a transit concept of operations respond when service needs, operating assumptions, or system configurations change? This paper draws on published cases and established adaptability practices to connect operating intent with justified revisions to requirements, design, and operating arrangements over long development and service lives.",
    },
    {
      title: "Designing for the Next Upgrade: Applying Adaptability to Rail and Transit Procurement",
      status: "Abstract and outline in development",
      summary:
        "Examining how today's requirements and architecture choices shape tomorrow's upgrades. Published procurement and migration cases inform review questions and requirement-drafting patterns for interfaces, configuration management, migration, and support, including the engineering effort, service disruption, and cost of preserving future options.",
    },
    {
      title: "Beyond System Completion: Planning for Operable and Adaptable Transit Facilities",
      status: "Abstract and outline in development",
      summary:
        "Contract completion and subsystem tests leave a further question: can the whole facility deliver its intended service with the people, procedures, and maintenance support available? This paper uses mission analysis, human systems integration, validation, and adaptability practices to connect service outcomes with requirements, responsibilities, and evidence before handover and during later change.",
    },
    {
      title: "INCOSE–APTA Systems Lifecycle Engineering (SLE)",
      status: "Standards development in progress",
      summary:
        "Helping advance the proposed SLE standard through a transit lifecycle framework, reusable practice modules, and guidance for applying them to different projects. Current preparation focuses on lifecycle responsibilities, interfaces, tailoring, and evidence, with scoped volunteer authoring and lead/deputy continuity. The working material remains a development candidate, not an approved standard.",
    },
    {
      title: "Learning through decisions, practice, and reflection",
      status: "Work in progress",
      summary:
        "Asterfall explores systems thinking through story and consequences; Personal Growth Copilot adds source-grounded practice, written application, and delayed retrieval. These are learning experiments, with effectiveness still to be evaluated.",
      link: {
        label: "Explore Asterfall",
        href: "https://haitaowu12.github.io/SE-Learning-Quest/",
      },
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
        "Developed and verified control logic and analysis models for helicopter, propeller, and turbofan engine programs in a DO-178 B/C environment.",
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
        "Delivered train-control, requirements, interfaces, testing, RAMS, V&V, and advisory work across Canada Line Capacity Expansion, SkyTrain OMC3A, Montréal REM, and Eglinton Crosstown LRT.",
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
        "Leads systems engineering, assurance, integration, and readiness for major SkyTrain expansion work, supported by practical MBSE and digital workflows.",
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
        "Contributes through INCOSE Canada leadership, Technical Leadership Institute work, certification review, and transportation practice development.",
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
      featured: true,
      themes: ["INCOSE TIW 2026", "tailoring", "infrastructure SE"],
      link: { label: "Open", href: "https://haitaowu12.github.io/SE_Tailoring_Framework" },
      preview: {
        src: "./project-previews/se-tailoring-model.webp",
        smallSrc: "./project-previews/se-tailoring-model-720.webp",
        alt: "SE Tailoring Model assessment interface showing its right-size-the-work introduction",
        width: 1440,
        height: 900,
      },
    },
    {
      title: "SysML Viewer",
      summary:
        "A visual editor for a supported subset of SysML v2, connecting text, diagrams, and Draw.io. The public prototype runs in the browser; AI-assisted workflows require a separately configured local service.",
      status: "prototype",
      featured: true,
      themes: ["SysML v2", "model readability", "diagram workflow"],
      link: { label: "Open", href: "https://haitaowu12.github.io/sysmlv2_viewer/" },
      preview: {
        src: "./project-previews/sysml-viewer.webp",
        smallSrc: "./project-previews/sysml-viewer-720.webp",
        alt: "SysML Viewer with synchronized model explorer, source editor, and system diagram",
        width: 1280,
        height: 720,
      },
    },
    {
      title: "SE Learning Quest",
      summary:
        "Asterfall: The Last Relay is a browser roleplaying adventure about a failed warning network. Its 24-quest Classic campaign turns stakeholder needs, interfaces, trade-offs, verification, and change into decisions with consequences.",
      status: "public",
      featured: true,
      themes: ["systems thinking", "story-driven learning", "lifecycle decisions"],
      link: { label: "Play Asterfall", href: "https://haitaowu12.github.io/SE-Learning-Quest/" },
    },
    {
      title: "Personal Growth Copilot",
      summary:
        "An early-stage tool for reflective dialogue, small behavior-change experiments, and learning through practice. Its development version includes an offline requirements-writing lesson with source-linked explanations, written exercises, and delayed retrieval.",
      status: "prototype",
      featured: true,
      availabilityLabel: "Public alpha",
      themes: ["reflection", "source-grounded learning", "user-owned progress"],
      link: {
        label: "View project and alpha status",
        href: "https://github.com/haitaowu12/personal-growth-copilot",
      },
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
      featured: true,
      themes: ["technical leadership", "learning game", "facilitation"],
      link: { label: "Open", href: "https://haitaowu12.github.io/TLI_Shared_Model_game/" },
    },
    {
      title: "FOCAL POINT: Hold the Vision",
      summary:
        "A static browser game for leadership training around vision drift, stakeholder viewpoints, and local multiplayer facilitation.",
      status: "public",
      featured: true,
      themes: ["systems thinking", "workshop game", "static web game"],
      link: { label: "Open", href: "https://haitaowu12.github.io/Focal-Point-Game/" },
    },
  ] satisfies SelectedProject[],
  publications: [
    {
      ...leadershipPaper,
      kind: "conference",
      status: "INCOSE International Symposium, 36(1), 459–481. First published 11 September 2026. DOI: 10.1002/iis2.70143.",
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
    "2026 Mott MacDonald Award - Thought Leadership Award",
    "2025 Mott MacDonald technical excellence recognition",
    "2023 Regional Winner, Mott MacDonald Digital Excellence Award",
  ],
  authorBadge: {
    label: "Know the author",
    description:
      "Built by Tony Wu, systems engineer and developer focused on complex project delivery, rail/transit systems engineering, MBSE, assurance workflows, and learning simulations.",
  },
};
