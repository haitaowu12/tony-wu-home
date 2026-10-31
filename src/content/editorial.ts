/** Homepage framing. Biography and project facts remain in profile.ts. */
export const editorial = {
  introduction: "I’m Tony Wu, a systems engineer in Vancouver.",
  headline: ["Connecting the parts.", "Making the whole work."],
  summary: "My work connects requirements, interfaces, evidence, and people—from aerospace controls to rail systems integration. I also build tools that make those connections easier to explore, question, and use.",
  work: {
    kicker: "01 / Engineering & practice",
    title: "From a difficult question to a working tool.",
    summary: "These projects start with questions I meet in engineering practice: what governs a result, what supports a decision, and how much process is enough? Open a tool, inspect an example, or read the limits beside it.",
  },
  atlas: {
    kicker: "A wider lens / History & geography",
    summary: "The same curiosity takes me beyond engineering. World History Atlas connects a person or event with its place, its time, and what was happening elsewhere.",
  },
  playground: {
    kicker: "02 / Leadership & learning",
    title: "Learn by making a decision.",
    summary: "Stories, exercises, and workshop games for exploring how people reason, coordinate, and respond to change. These are experiments in learning—not claims of proven learning outcomes.",
  },
  about: {
    kicker: "03 / About",
    title: "An engineer who keeps building.",
    summary: "Aerospace taught me to follow a signal through a system. Rail integration widened the view: the interfaces between teams matter alongside the interfaces between equipment. My independent projects are a place to turn those questions into something people can try.",
  },
  writing: {
    kicker: "04 / Writing & research",
    title: "Ideas to examine, not just announce.",
    summary: "Writing on technical leadership, engineering judgment, and the long life of infrastructure. Published work is separated from papers and practice guidance still in development.",
  },
  contact: {
    title: "A useful conversation starts with a real problem.",
    summary: "I welcome conversations about rail integration, model-based engineering, technical leadership, and responsible uses of AI. For research, workshops, or a shared engineering question, connect with me on LinkedIn.",
  },
} as const;
