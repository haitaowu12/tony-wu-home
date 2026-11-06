export type Link = {
  label: string;
  href: string;
};

export type SelectedProject = {
  title: string;
  chineseTitle?: string;
  summary: string;
  origin?: string[];
  status: "public" | "prototype" | "local-private";
  /** Rendered in Work or Playground. Set explicitly so no
   *  positional slice can silently drop a project. */
  featured?: boolean;
  group?: "tool" | "learning" | "atlas" | "anatomy";
  teaser?: string;
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
  resources?: Link[];
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
    headline: "Systems engineering & technical leadership",
    subhead:
      "I build tools for understanding complex systems—from engineering decisions to world history and learning through play.",
    thesis:
      "The thread through my work is decision quality: make complexity visible, connect evidence to acceptance, keep interfaces owned, and leave teams with methods they can actually use.",
  },
  about: {
    title: "My route into systems thinking.",
    paragraphs: [
      "I started in aerospace controls, then moved into rail systems integration. Across models, interfaces, assurance, and readiness, I look for the connections that make a whole system work.",
      "My work now connects engineering with technical leadership, responsible AI, and learning. I build models, tools, and experiences that help people examine assumptions and make decisions.",
    ],
  },
  learningStory: {
    title: "What if a systems problem were an adventure?",
    summary: "Play Iona Vale, a keeper in training, across six island regions. Discover why working parts do not always make a working whole.",
    invitation: "Read the scene. Choose an action. Explore the consequences.",
  },
  atlasStory: {
    title: "A world of histories, side by side.",
    basis: "I started this atlas while telling my daughter history stories: where did each story happen, and what was happening elsewhere? English and Chinese let us explore the wider world while staying connected to our Chinese heritage. Inspired by DeanChensj and the contributors to Jiangshan Map (江山时序), the atlas includes attributed adaptations of their work and is now independently maintained.",
    source: {
      label: "Project source and credits",
      href: "https://github.com/haitaowu12/world-history-atlas",
    },
  },
  featuredStory: {
    projectTitle: "SE Tailoring Model",
    title: "How much engineering is enough?",
    steps: [
      {
        label: "The problem",
        title: "One process, different projects.",
        text: "Risk, complexity, and delivery conditions vary. A process checklist alone cannot explain where to invest more effort or where a lighter approach makes sense.",
      },
      {
        label: "The approach",
        title: "Make the reasoning inspectable.",
        text: "The framework connects project drivers with process rigor and interdependencies. I built a browser tool to explore the approach.",
      },
      {
        label: "The artifact",
        title: "A tool you can question.",
        text: "Explore the assessment, inspect process recommendations, and review the guidance behind them.",
      },
    ],
  },
  community: "I serve as Director-at-Large for INCOSE Canada, where I previously served as president. I also help develop the proposed INCOSE–APTA Systems Lifecycle Engineering standard for transit.",
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
  practice: [
    {
      title: "Start with the decision",
      summary: "I ask what the team needs to decide, who needs to be involved, and what the system must do in operation.",
    },
    {
      title: "Match the effort to the risk",
      summary: "I use models and formal reviews where they clarify a tradeoff or expose a risk. I keep the process lighter where the team already has enough evidence to act.",
    },
    {
      title: "Make ownership and evidence clear",
      summary: "At each interface, I clarify who owns it and what both sides need to verify. I link requirements, hazards, and test results so teams can see what supports a readiness decision and what still needs work.",
    },
    {
      title: "Carry the lessons forward",
      summary: "I record why decisions were made so the next team can revisit them when conditions change. I turn lessons worth repeating into tools, guides, and workshops.",
    },
  ],
  fieldNotes: [
    {
      ...leadershipPaper,
      status: "Published 11 September 2026 · INCOSE IS",
    },
    {
      title: "Right-sized systems engineering for infrastructure programs",
      status: "Paper in development",
      summary:
        "Developing a method for matching systems engineering rigor to project drivers, process dependencies, organizational conditions, and delivery risk. The paper explains how tailoring decisions are justified and revisited as a project changes.",
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
        "Helping develop the proposed SLE standard through a transit lifecycle framework, reusable practice modules, and guidance for applying them to different projects. Current work focuses on lifecycle responsibilities, interfaces, tailoring, and evidence.",
    },
    {
      title: "Learning through decisions, practice, and reflection",
      status: "Work in progress",
      summary:
        "World History Atlas connects histories, places, lives, and sources in English and Chinese. Asterfall explores systems thinking through story and consequences; Personal Growth Copilot adds practice and reflection.",
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
      title: "World History Atlas",
      chineseTitle: "普天之下",
      group: "atlas",
      summary: "Put each story back in its world. Explore people, places, and events across regions and time, in English and Chinese. Follow guided readings, compare histories side by side, and keep a personal notebook with bookmarks and notes.",
      status: "public",
      featured: true,
      themes: ["history & geography", "connected lives", "English / 中文"],
      link: { label: "Explore World Atlas", href: "https://world-history-atlas-tony.techiesea.chatgpt.site/" },
      preview: {
        src: "./project-previews/world-history-atlas-vermilion-2026-11-01.webp",
        smallSrc: "./project-previews/world-history-atlas-vermilion-2026-11-01-720.webp",
        alt: "World History Atlas · 普天之下 at 1200 CE, with a world map, compact regional timeline and selected Southern Song reading",
        width: 1425,
        height: 1013,
      },
    },
    {
      title: "Railway Anatomy",
      origin: ["I work in the railway industry, and I often see graduates arrive with strong engineering fundamentals but little exposure to how a railway works as a whole. Much of that picture has to be built on the job: how vehicles, track, power, signalling, communications, stations and the people around them fit together.", "I built Railway Anatomy to make that picture easier to explore. You can start with a familiar place or piece of equipment, look inside it, and follow the relationships into other systems. I hope it gives young professionals a useful starting point, and helps experienced practitioners see beyond their own discipline, compare explanations and share what they know."],
      group: "anatomy",
      teaser: "Go inside a railway. Inspect its assemblies, then explore the forces, energy and information that connect them.",
      summary: "Explore vehicles, energy, track, stations, networks and maintenance through six connected study workspaces. Follow the point-machine setting into a complete turnout, then watch both wheels take the straight or diverging route. A crossing close-up separates tread support at the wing rail and nose from guidance at the opposite check rail. Inspect other assemblies, compare control responsibilities and explore the people behind railway operation and maintenance.",
      status: "public",
      featured: true,
      availabilityLabel: "Public · v10.2.0 · Illustrated railway studies",
      themes: ["railway systems", "illustrated assemblies", "guided learning"],
      link: { label: "Explore Railway Anatomy", href: "https://haitaowu12.github.io/railway-anatomy/" },
      resources: [
        { label: "Follow wheels through a turnout", href: "https://haitaowu12.github.io/railway-anatomy/#learn/turnout-wheels" },
        { label: "Follow a point machine", href: "https://haitaowu12.github.io/railway-anatomy/#learn/point-proof" },
        { label: "Read the turnout guide", href: "https://haitaowu12.github.io/railway-anatomy/reading.html#guide-turnout-wheels" },
      ],
      preview: {
        src: "./project-previews/railway-anatomy-turnout-2026-11-06.webp",
        smallSrc: "./project-previews/railway-anatomy-turnout-2026-11-06-720.webp",
        alt: "Railway Anatomy turnout journey showing both wheels at a fixed crossing, with route and blade-setting readouts",
        width: 1265,
        height: 889,
      },
    },
    {
      title: "Engine Anatomy",
      origin: ["I began my career at Pratt & Whitney Canada, working on aircraft engine controls. This project grew from wanting to show how control logic connects with the engine’s moving parts.", "My daughter and I built the LEGO Technic H175 together. The real helicopter uses an engine from a programme I worked on, which gave us a personal reason to explore the model’s gears and rotor mechanisms."],
      group: "anatomy",
      teaser: "Explore the engines that power flight and see how their components work together.",
      summary: "An interactive look at aircraft engines, with a LEGO H175 mechanism study.",
      status: "public",
      featured: true,
      themes: ["engine architecture", "control response", "interactive models"],
      link: { label: "Explore Engine Anatomy", href: "https://haitaowu12.github.io/engine-anatomy/" },
      resources: [{ label: "Explore H175 mechanisms", href: "https://haitaowu12.github.io/engine-anatomy/h175.html" }],
      preview: {
        src: "./project-previews/engine-anatomy-5-0-1-2026-11-01.webp",
        smallSrc: "./project-previews/engine-anatomy-5-0-1-2026-11-01-720.webp",
        alt: "Engine Anatomy illustrated turboshaft cutaway with its power shaft, engine layers and inspection controls",
        width: 967,
        height: 620,
      },
    },
    {
      title: "Rail Energy",
      group: "tool",
      origin: ["Over the past year, I’ve worked with power engineers and a client on load-flow studies for a railway network. I saw how easily the subject could become a black box for people without a power-engineering background. It was often hard to explain what was being modelled, why the study mattered, and which decisions its results could support.", "I built Rail Energy to make that reasoning easier to follow. The illustrated guide connects electrical behaviour with the train service people care about, and lets readers explore what changes when demand rises or a supply is unavailable. From there, they can try the live lab or inspect recorded simulations."],
      teaser: "Follow electricity through a railway, see how limited power can delay trains, and compare supply upgrades.",
      summary: "An illustrated introduction to load-flow and energy studies, with interactive teaching examples, a live browser lab and recorded synthetic railway simulations.",
      status: "public",
      featured: true,
      themes: ["rail energy", "DC traction power", "interactive experiments"],
      link: { label: "Read the illustrated guide", href: "https://haitaowu12.github.io/rail-energy-public-demo/learn.html" },
      preview: {
        src: "./project-previews/rail-energy-shared-supply-2026-11-06.webp",
        smallSrc: "./project-previews/rail-energy-shared-supply-2026-11-06-720.webp",
        alt: "Rail Energy guide showing three separate trains sharing a DC power section, with one substation isolated and calculated train voltages",
        width: 843,
        height: 469,
      },
      resources: [
        { label: "Try the live lab", href: "https://haitaowu12.github.io/rail-energy-public-demo/lab.html" },
        { label: "Explore recorded simulations", href: "https://haitaowu12.github.io/rail-energy-public-demo/explorer.html" },
      ],
    },
    {
      title: "SE Tailoring Model",
      group: "tool",
      summary:
        "A framework developed with Cleo Wong for matching systems engineering effort to project needs. Assess project drivers, explore process recommendations, record decisions and prepare a report.",
      status: "public",
      featured: true,
      themes: ["INCOSE TIW 2026", "tailoring", "infrastructure SE"],
      link: { label: "Open", href: "https://haitaowu12.github.io/SE_Tailoring_Framework/" },
      preview: {
        src: "./project-previews/se-tailoring-2026-11-01.webp",
        smallSrc: "./project-previews/se-tailoring-2026-11-01-720.webp",
        alt: "Current SE Tailoring Model home screen with project questions, process recommendations, and assessment guidance",
        width: 955,
        height: 537,
      },
    },
    {
      title: "Modeling Lab",
      teaser: "A browser-based SysML v2 workspace with Engineering and Stakeholder views.",
      group: "tool",
      summary:
        "Open a SysML v2 model or project folder, explore Engineering and Stakeholder views, and review model changes. Download an editable project or a reader to share. Your work stays in the browser.",
      status: "prototype",
      featured: true,
      availabilityLabel: "Browser prototype",
      themes: ["SysML v2", "engineering & stakeholder views", "source-grounded models"],
      link: { label: "Open Modeling Lab", href: "https://haitaowu12.github.io/sysmlv2_viewer/" },
      preview: {
        src: "./project-previews/modeling-lab-2026-10-25.webp",
        smallSrc: "./project-previews/modeling-lab-2026-10-25-720.webp",
        alt: "Modeling Lab showing the Apollo mission-system view, model navigation, and Engineering audience controls",
        width: 962,
        height: 541,
      },
    },
    {
      title: "RailClear",
      teaser: "Compare mixed fleets, failure scenarios, and route variants.",
      group: "tool",
      summary:
        "Compare safe-braking distances for different train fleets, failures and route options. Inspect the governing cases and export calculation records.",
      status: "prototype",
      availabilityLabel: "Prototype",
      link: { label: "Open RailClear", href: "https://haitaowu12.github.io/railclear-pages/" },
      featured: true,
      themes: ["safe-braking models", "railway safety-distance studies", "mixed-fleet comparison"],
      preview: {
        src: "./project-previews/railclear-2026-10-27.webp",
        smallSrc: "./project-previews/railclear-2026-10-27-720.webp",
        alt: "RailClear’s synthetic Metro vehicle study, showing stopping-distance results and a speed-versus-distance chart",
        width: 1687,
        height: 1186,
      },
    },
    {
      title: "RAMS Workbench",
      teaser: "Explore a Crossrail-informed ventilation example, from hazards to verification.",
      group: "tool",
      summary:
        "Create and review reliability, availability, maintainability and safety studies. Try a Crossrail-informed ventilation example, trace hazards through controls and requirements to verification, and inspect conflicting declarations and receiving conditions. Retain RAM and fault-tree calculations, compare baselines, and export a study to share.",
      status: "prototype",
      availabilityLabel: "Prototype",
      resources: [
        { label: "Read the user guide", href: "https://haitaowu12.github.io/rams-workbench-pages/guide/" },
        { label: "Watch the walkthrough · 5:52", href: "https://haitaowu12.github.io/rams-workbench-pages/guide/#walkthrough" },
      ],
      link: { label: "Open RAMS Workbench", href: "https://haitaowu12.github.io/rams-workbench-pages/" },
      featured: true,
      themes: ["hazard analysis", "RAM studies", "evidence traceability"],
      preview: {
        src: "./project-previews/rams-workbench-crossrail-2026-11-05.webp",
        smallSrc: "./project-previews/rams-workbench-crossrail-2026-11-05-720.webp",
        alt: "RAMS Workbench showing the Crossrail-informed ventilation study, with requirements, controls and verification applicability",
        width: 1521,
        height: 856,
      },
    },
    {
      title: "Leadership Toolbox",
      teaser: "Practical methods and a source-backed library for technical leadership.",
      group: "tool",
      summary: "An agent skill with 32 methods for preparing conversations, reviewing handoffs and working through leadership decisions. Each method includes practical steps, examples and sources.",
      status: "public",
      featured: true,
      themes: ["technical leadership", "practical methods", "source-backed guidance"],
      link: { label: "Explore Leadership Toolbox", href: "https://haitaowu12.github.io/leadership-toolbox/" },
    },
    {
      title: "SE Learning Quest",
      teaser: "A systems-thinking adventure about a failed warning network and decisions with consequences.",
      group: "learning",
      summary:
        "Asterfall: The Last Relay is a browser roleplaying adventure about a failed warning network. Its 24-quest Classic campaign and seven-chapter, 25-scene illustrated journey turn stakeholder needs, interfaces, trade-offs, verification, change and stewardship into decisions with consequences.",
      status: "public",
      featured: true,
      themes: ["systems thinking", "story-driven learning", "lifecycle decisions"],
      link: { label: "Play Asterfall", href: "https://haitaowu12.github.io/SE-Learning-Quest/" },
      preview: {
        src: "./project-previews/asterfall-2026-10-25.webp",
        smallSrc: "./project-previews/asterfall-2026-10-25-720.webp",
        alt: "Asterfall's opening scene with six floating island realms and lantern towers",
        width: 1083,
        height: 609,
      },
    },
    {
      title: "Personal Growth Copilot",
      group: "learning",
      teaser: "Reflection, practice, and small experiments in learning.",
      summary:
        "An agent skill for reflection, small behaviour-change experiments and learning through practice. Includes an offline requirements-writing lesson with source-linked explanations, exercises and follow-up practice.",
      status: "prototype",
      featured: true,
      availabilityLabel: "Alpha",
      themes: ["reflection", "source-grounded learning", "user-owned progress"],
      link: {
        label: "Try the lesson and explore the skill",
        href: "https://haitaowu12.github.io/personal-growth-copilot/",
      },
    },
    {
      title: "Systems Visuals",
      summary: "A local toolkit for turning source-grounded system models into linked visual explanations and review readers. Development continues within declared modeling and notation profiles.",
      status: "local-private",
      themes: ["systems modeling", "visual explanation", "engineering review"],
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
      group: "learning",
      teaser: "Work through technical leadership decisions under pressure.",
      summary:
        "Place evidence on the INCOSE TLI Shared Model, choose actions through three pressure rounds, and examine the consequences in a debrief. A guided scenario connects technical leadership practice with situations beyond the game.",
      status: "prototype",
      featured: true,
      themes: ["technical leadership", "learning game", "facilitation"],
      link: { label: "Open", href: "https://haitaowu12.github.io/TLI_Shared_Model_game/" },
    },
    {
      title: "FOCAL POINT: Hold the Vision",
      group: "learning",
      teaser: "Keep a shared vision while stakeholder viewpoints pull apart.",
      summary:
        "Keep a shared vision through five rounds of disruptions and competing stakeholder viewpoints. Play solo or pass the device among up to six players, use a strategic pause when the vision drifts, and compare perspectives in the debrief.",
      status: "public",
      featured: true,
      themes: ["systems thinking", "workshop game", "shared vision"],
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
      "Built by Tony Wu, systems engineer and builder working across technical leadership, practical engineering tools, responsible AI, and learning experiences.",
  },
};
