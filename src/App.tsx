import { useEffect, useState } from "react";
import { PreviewProvider, usePreview } from "./components/ScreenshotViewer";
import { profile, type SelectedProject } from "./content/profile";

const statusLabels = { public: "Public", prototype: "Prototype", "local-private": "Local/private" };
const navItems = [
  { id: "work", label: "Projects" },
  { id: "playground", label: "Playground" },
  { id: "about", label: "About" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];
const sectionIds = ["top", "work", "playground", "about", "writing", "contact"];
const navSection = (id: string) => {
  if (["practice", "experience"].includes(id)) return "about";
  if (["world-atlas", "modeling-lab", "railway-anatomy", "engine-anatomy", "anatomy", "engineering-studies", "collections", "rams-workbench", "railclear"].includes(id)) return "work";
  if (id === "asterfall") return "playground";
  return id;
};
const projects: SelectedProject[] = profile.projects;
const featuredProjects = projects.filter((project) => project.featured);
const privateProjects = projects.filter((project) => project.status === "local-private" && !project.featured);
const spotlightProject = featuredProjects.find((project) => project.title === profile.featuredStory.projectTitle)!;
const atlasProject = featuredProjects.find((project) => project.group === "atlas")!;
const modelingProject = featuredProjects.find((project) => project.title === "Modeling Lab")!;
const studyProjects = featuredProjects.filter((project) => project.title === "RailClear" || project.title === "RAMS Workbench").sort((a) => a.title === "RAMS Workbench" ? -1 : 1);
const anatomyProjects = featuredProjects.filter((project) => project.group === "anatomy");
const indexedProjects = [spotlightProject, featuredProjects.find((project) => project.title === "Leadership Toolbox")!];
const learningProjects = featuredProjects.filter((project) => project.group === "learning");
const learningSpotlight = learningProjects.find((project) => project.title === "SE Learning Quest")!;
const learningExperiments = learningProjects.filter((project) => project !== learningSpotlight);
const publishedNote = profile.fieldNotes[0]!;
const developingNotes = profile.fieldNotes.slice(1);
const otherPublications = profile.publications.filter((item) => item.title !== publishedNote.title);

function ProjectPreview({ project, sizes, className = "" }: { project: SelectedProject; sizes: string; className?: string }) {
  const openPreview = usePreview();
  if (!project.preview) return null;
  const preview = project.preview;
  return <figure className={`project-preview ${className}`}>
    <a href={preview.src} aria-label={`View full screenshot: ${project.title}`} aria-haspopup="dialog"
      onClick={(event) => {
        if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || typeof HTMLDialogElement === "undefined") return;
        event.preventDefault();
        openPreview({ project, trigger: event.currentTarget });
      }}>
      <img src={preview.src} srcSet={`${preview.smallSrc} 720w, ${preview.src} ${preview.width}w`}
        sizes={sizes} width={preview.width} height={preview.height} loading="lazy" decoding="async" alt={preview.alt} />
      <span>Enlarge screenshot <span aria-hidden="true">↗</span></span>
    </a>
    {preview.caption && <figcaption>{preview.caption}</figcaption>}
  </figure>;
}

function App() {
  const [activeSection, setActiveSection] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        document.querySelector<HTMLButtonElement>(".site-nav__toggle")?.focus();
      }
    };
    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!(event.target instanceof Element && event.target.closest(".site-nav"))) setMenuOpen(false);
    };
    const closeOnFocusOut = (event: FocusEvent) => {
      const nav = document.querySelector(".site-nav");
      if (nav && !nav.contains(event.relatedTarget as Node)) setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOnOutsidePress);
    window.addEventListener("focusout", closeOnFocusOut);
    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOnOutsidePress);
      window.removeEventListener("focusout", closeOnFocusOut);
    };
  }, [menuOpen]);

  useEffect(() => {
    const root = document.documentElement;
    const nav = document.querySelector<HTMLElement>(".site-nav");
    const targets = sectionIds.map((id) => ({ id, element: document.getElementById(id) }))
      .filter((entry): entry is { id: string; element: HTMLElement } => entry.element !== null);
    let frame = 0, hashTimer = 0, hashFrame = 0;
    let cancelled = false, navHeight = 0, pageHeight = 0;
    let offsets: number[] = [], ends: number[] = [];
    const measure = () => {
      navHeight = nav?.offsetHeight ?? 0;
      pageHeight = root.scrollHeight;
      offsets = targets.map((entry) => entry.element.getBoundingClientRect().top + window.scrollY);
      ends = targets.map((entry, index) => offsets[index] + entry.element.offsetHeight);
    };
    const updateActiveSection = () => {
      frame = 0;
      const marker = window.scrollY + navHeight + 28;
      const atPageEnd = window.innerHeight + window.scrollY >= pageHeight - 2;
      let current = targets[0]?.id ?? "top";
      const intent = navSection(window.location.hash.slice(1));
      if (atPageEnd) {
        const index = targets.findIndex((entry) => entry.id === intent);
        const intendedHeadingVisible = index >= 0 && offsets[index] >= window.scrollY + navHeight - 1 && offsets[index] < window.scrollY + window.innerHeight;
        current = intendedHeadingVisible ? intent : (targets[targets.length - 1]?.id ?? "top");
      } else {
        // About and Writing share a desktop row. Respect the chosen chapter
        // while its reading region is visible, then resume vertical order.
        let nearest = -Infinity;
        let candidates: string[] = [];
        for (let index = 0; index < offsets.length; index += 1) {
          if (offsets[index] <= marker) {
            if (offsets[index] > nearest + 1) {
              nearest = offsets[index];
              candidates = [targets[index].id];
            } else if (Math.abs(offsets[index] - nearest) <= 1) candidates.push(targets[index].id);
          }
        }
        const visible = candidates.filter((id) => ends[targets.findIndex((entry) => entry.id === id)] > marker);
        current = visible.includes(intent) ? intent : (visible[0] ?? candidates[0] ?? current);
      }
      setActiveSection((previous) => previous === navSection(current) ? previous : navSection(current));
    };
    const queueActiveSection = () => { if (!frame) frame = window.requestAnimationFrame(updateActiveSection); };
    const remeasureAndRefresh = () => { measure(); queueActiveSection(); };
    measure();
    updateActiveSection();
    const resizeObserver = new ResizeObserver(remeasureAndRefresh);
    resizeObserver.observe(root);
    window.addEventListener("scroll", queueActiveSection, { passive: true });
    window.addEventListener("resize", remeasureAndRefresh);
    const hashTarget = window.location.hash.slice(1);
    const isHistoryTraversal = (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type === "back_forward";
    // Returning from an original image must retain the browsing position.
    if (hashTarget && !isHistoryTraversal) {
      root.classList.add("hash-jump");
      const jumpToHashTarget = () => {
        hashFrame = 0;
        if (cancelled) return;
        // Font metrics can move sections; align the visitor's latest choice.
        measure();
        const target = document.getElementById(window.location.hash.slice(1));
        if (target) {
          const clearance = parseFloat(getComputedStyle(target).scrollMarginTop) || navHeight;
          window.scrollTo(0, Math.max(0, target.getBoundingClientRect().top + window.scrollY - clearance));
        }
        root.classList.remove("hash-jump");
        updateActiveSection();
      };
      if (document.fonts?.ready) document.fonts.ready.then(() => {
        if (!cancelled) hashFrame = window.requestAnimationFrame(jumpToHashTarget);
      });
      else hashTimer = window.setTimeout(jumpToHashTarget, 60);
    }
    return () => {
      cancelled = true;
      resizeObserver.disconnect();
      window.clearTimeout(hashTimer);
      window.cancelAnimationFrame(frame);
      window.cancelAnimationFrame(hashFrame);
      window.removeEventListener("scroll", queueActiveSection);
      window.removeEventListener("resize", remeasureAndRefresh);
      root.classList.remove("hash-jump");
    };
  }, []);

  return <PreviewProvider projects={[...studyProjects, atlasProject, modelingProject, ...anatomyProjects, ...indexedProjects, learningSpotlight]}>
    <a className="skip-link" href="#main-content">Skip to content</a>
    <nav className="site-nav" aria-label="Page sections">
      <a className="site-nav__brand" href="#top" aria-current={activeSection === "top" ? "location" : undefined} onClick={() => setMenuOpen(false)}>Tony Wu</a>
      <button className="site-nav__toggle" type="button" aria-label={menuOpen ? "Close page menu" : "Open page menu"}
        aria-controls="site-nav-links" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
        <span aria-hidden="true">{menuOpen ? "Close" : "Menu"}</span>
      </button>
      <div className={`site-nav__links${menuOpen ? " is-open" : ""}`} id="site-nav-links">
        {navItems.map((item) => <a key={item.id} href={`#${item.id}`} aria-current={activeSection === item.id ? "location" : undefined}
          className={activeSection === item.id ? "is-active" : undefined}
          onClick={() => { setActiveSection(item.id); setMenuOpen(false); }}>{item.label}</a>)}
      </div>
    </nav>
    <main id="main-content" tabIndex={-1}>
      <section className="hero" id="top" aria-labelledby="hero-title" tabIndex={-1}>
        <div className="hero__content">
          <p className="eyebrow">Systems engineer <span aria-hidden="true">·</span> {profile.identity.location}</p>
          <h1 id="hero-title">Tony <em>Wu.</em></h1>
          <p className="hero__title">Engineering, leadership<br />&amp; a curious mind.</p>
          <p className="hero__copy">From aircraft engines to rail networks, my work is about how things fit together. Here are the tools, stories, and learning experiments I’m making along the way.</p>
          <div className="hero__actions" role="group" aria-label="Primary links">
            <a className="button" href="#work">See what I’m building <span aria-hidden="true">↘</span></a>
            <a className="button button--quiet" href="#about">A little about me <span aria-hidden="true">↗</span></a>
          </div>
        </div>
        <figure className="hero__stage">
          <div className="hero__visual">
            <img src="./hero-practice-story.webp"
              srcSet="./hero-practice-story-720.webp 720w, ./hero-practice-story-1080.webp 1080w, ./hero-practice-story.webp 1448w"
              sizes="(max-width: 700px) calc(100vw - 40px), min(50vw, 640px)"
              width="1448" height="1086" fetchPriority="high" decoding="async"
              alt="Illustrated workspace with aerospace and rail sketches, a modeling laptop, leadership notes, a history map, and the Asterfall game beside a Vancouver window" />
          </div>
          <figcaption className="desk-links"><span>Explore the desk</span>
            <a href="#modeling-lab">Models <span aria-hidden="true">↗</span></a>
            <a href="#world-atlas">History <span aria-hidden="true">↗</span></a>
            <a href="#asterfall">Play <span aria-hidden="true">↗</span></a>
          </figcaption>
        </figure>
      </section>

      <section className="section work" id="work" aria-labelledby="work-title" tabIndex={-1}>
        <header className="section-heading section-heading--work">
          <div><p className="section-kicker">Selected projects</p><h2 id="work-title">A few things I’ve made.</h2></div>
          <p>Practical tools, connected histories, and games that turn questions into experiences.</p>
        </header>
        <nav className="project-paths" aria-label="Explore projects by interest"><a href="#engineering-studies">Engineering studies <span aria-hidden="true">↓</span></a><a href="#anatomy">Inside the system <span aria-hidden="true">↓</span></a><a href="#collections">Maps, models &amp; stories <span aria-hidden="true">↓</span></a><a href="#playground">Learning through play <span aria-hidden="true">↓</span></a></nav>
        <section className="engineering-work" id="engineering-studies" tabIndex={-1} aria-labelledby="engineering-title">
        <header className="work-subheading"><h3 id="engineering-title">Engineering studies</h3><p>From an assumption to evidence you can review.</p></header>
        <div className="study-pair" role="group" aria-label="Engineering study tools">
          {studyProjects.map((project) => <article className={`project-entry study-entry${project.title === "RAMS Workbench" ? " study-entry--lead" : " study-entry--compact"}`} id={project.title === "RAMS Workbench" ? "rams-workbench" : "railclear"} key={project.title}>
            <ProjectPreview project={project} sizes="(max-width: 700px) calc(100vw - 40px), min(60vw, 800px)" />
            <div className="project-entry__body">{project.title === "RAMS Workbench" && <p className="release-note">Latest release · November 2026</p>}<h3>{project.title}</h3>
              <p className="feature-dek">{project.title === "RailClear" ? "Safe-braking studies" : "Hazards, reliability & evidence"}</p>
              <p>{project.teaser}</p><p className="availability">{project.availabilityLabel}</p>
              <div className="project-actions">{project.link && <a className={project.title === "RAMS Workbench" ? "project-open" : "text-link"} href={project.link.href}>{project.link.label}{project.title === "RAMS Workbench" && <span aria-hidden="true">↗</span>}</a>}{project.resources?.map((link) => <a key={link.href} className="text-link" href={link.href}>{link.label}</a>)}</div>
              <p className="project-limit">{project.title === "RailClear" ? "Outputs require project-specific engineering qualification." : "Single-user study prototype; engineering qualification remains open."}</p>
              <details className="inline-details"><summary>Study scope &amp; limits</summary><p>{project.summary}</p></details>
            </div>
          </article>)}
        </div>
        </section>

        <section className="collections-work" id="collections" tabIndex={-1} aria-labelledby="collections-title">
        <header className="work-subheading"><h3 id="collections-title">Maps, models &amp; stories</h3><p>Different ways into a complex world.</p></header>
        <div className="featured-work" role="group" aria-label="History, engineering and learning projects">
          <article className="atlas-feature" id="world-atlas" tabIndex={-1} aria-labelledby="atlas-title">
            <ProjectPreview project={atlasProject} sizes="(max-width: 700px) calc(100vw - 40px), min(42vw, 520px)" />
            <div className="atlas-feature__body"><p className="type-label">History &amp; geography</p>
              <h3 id="atlas-title">{atlasProject.title}<span className="feature-name-note" lang="zh">{atlasProject.chineseTitle}</span></h3>
              <p>Read a history beside its map. Compare regions on a shared timeline—in English and Chinese.</p>
              <p className="availability">{atlasProject.availabilityLabel} · Selected coverage</p>
              {atlasProject.link && <a className="text-link" href={atlasProject.link.href}>{atlasProject.link.label}</a>}
              <details className="inline-details"><summary>How the atlas grew</summary><p>{atlasProject.summary}</p><p>{profile.atlasStory.basis}</p>
                <a className="text-link" href="https://haitaowu12.github.io/world-history-atlas/">GitHub Pages mirror</a>
                <a className="text-link" href={profile.atlasStory.source.href}>{profile.atlasStory.source.label}</a>
              </details>
            </div>
          </article>
          <article className="featured-project" id="modeling-lab" tabIndex={-1} aria-labelledby="modeling-title">
            <ProjectPreview project={modelingProject} sizes="(max-width: 700px) calc(100vw - 40px), min(29vw, 370px)" />
            <div className="featured-project__body"><p className="type-label">Models &amp; engineering</p>
              <h3 id="modeling-title">Modeling Lab</h3>
              <p>Open a SysML v2 model. Explore its structure, review changes, and share a reader.</p>
              <p className="availability">Browser prototype · Bounded language and diagram coverage</p>
              {modelingProject.link && <a className="text-link" href={modelingProject.link.href}>{modelingProject.link.label}</a>}
              <details className="inline-details"><summary>About the project</summary><p>{modelingProject.summary}</p></details>
            </div>
          </article>
          <article className="featured-project featured-project--play" aria-labelledby="play-preview-title">
            <a className="play-cover" href="#asterfall" aria-label="Explore Asterfall in the Playground">
              <img src={learningSpotlight.preview!.src}
                srcSet={`${learningSpotlight.preview!.smallSrc} 720w, ${learningSpotlight.preview!.src} ${learningSpotlight.preview!.width}w`}
                sizes="(max-width: 700px) calc(100vw - 40px), min(29vw, 370px)"
                width={learningSpotlight.preview!.width} height={learningSpotlight.preview!.height}
                loading="lazy" decoding="async" alt="Asterfall's illustrated island world and opening invitation" />
              <span>Explore the story <span aria-hidden="true">↘</span></span>
            </a>
            <div className="featured-project__body"><p className="type-label">Learning &amp; play</p><h3 id="play-preview-title">Asterfall</h3>
              <p>A failed warning network. Six island regions. Decisions that reveal how a system works.</p>
              <p className="availability">Learning experiment · Effectiveness not evaluated</p>
              {learningSpotlight.link && <a className="text-link" href={learningSpotlight.link.href}>Play Asterfall</a>}
            </div>
          </article>
        </div>

        </section>

        <section className="anatomy-work" id="anatomy" aria-labelledby="anatomy-title" tabIndex={-1}>
          <header className="work-subheading"><h3 id="anatomy-title">Inside the system</h3><p>Two interactive atlases, from the whole to the parts.</p></header>
          <div className="study-pair anatomy-pair">
            {anatomyProjects.map((project) => <article className="project-entry study-entry" id={project.title === "Railway Anatomy" ? "railway-anatomy" : "engine-anatomy"} key={project.title}>
              <ProjectPreview project={project} sizes="(max-width: 700px) calc(100vw - 40px), min(44vw, 600px)" />
              <div className="project-entry__body"><h3>{project.title}</h3><p>{project.teaser}</p>
                <p className="availability">{project.availabilityLabel}</p>
                {project.link && <a className="text-link" href={project.link.href}>{project.link.label}</a>}
                <details className="inline-details"><summary>What you can explore</summary><p>{project.summary}</p></details>
              </div>
            </article>)}
          </div>
        </section>

        <div className="project-index" role="group" aria-label="More selected work">
          {indexedProjects.map((project) => <article key={project.title}>
            <header className="project-index__heading"><h3>{project.title}</h3><p className="availability">{project === spotlightProject ? "Research with Cleo Wong" : (project.availabilityLabel ?? statusLabels[project.status])}</p></header>
            <div className="project-index__body"><p>{project === spotlightProject ? "Assess project drivers, inspect process recommendations, record decisions and prepare a report. Developed with Cleo Wong; research evaluation is in progress." : project.teaser}</p>
              <details className="inline-details"><summary>{project === spotlightProject ? "The tailoring approach" : "About the project"}</summary><p>{project.summary}</p>
                {project === spotlightProject && <div className="project-story__steps">{profile.featuredStory.steps.map((step) => <section key={step.label}><h4>{step.title}</h4><p>{step.text}</p></section>)}</div>}
                {project.preview && <ProjectPreview project={project} sizes="(max-width: 700px) calc(100vw - 40px), min(45vw, 560px)" />}
              </details>
            </div>
            {project.link && <a className="text-link" href={project.link.href}>{project.link.label === "Open" ? "Explore the tailoring tool" : project.link.label}</a>}
          </article>)}
        </div>
        <details className="private-work"><summary>Unpublished experiments <span className="private-work__label">Local/private</span></summary>
          <ul>{privateProjects.map((project) => <li key={project.title}><h3>{project.title}</h3><p>{project.summary}</p><span className="private-work__status">Local/private</span></li>)}</ul>
        </details>
      </section>

      <section className="section playground" id="playground" aria-labelledby="playground-title" tabIndex={-1}>
        <header className="section-heading"><div><p className="section-kicker">Playground</p><h2 id="playground-title">Learning through play.</h2></div><p>Stories, exercises, and workshop games for exploring systems, leadership, and how people work together.</p></header>
        <div className="playground-layout">
          <article className="learning-feature" id="asterfall" tabIndex={-1} aria-labelledby="learning-title">
            <ProjectPreview project={learningSpotlight} sizes="(max-width: 700px) calc(100vw - 40px), min(58vw, 740px)" />
            <div className="learning-feature__body"><h3 id="learning-title">Asterfall: The Last Relay</h3>
              <p>{learningSpotlight.teaser}</p><p className="project-limit">{profile.learningStory.limitation}</p>
              {learningSpotlight.link && <a className="text-link" href={learningSpotlight.link.href}>Play Asterfall</a>}
              <details className="inline-details"><summary>The learning experiment</summary><p>{learningSpotlight.summary}</p><p>{profile.learningStory.summary}</p></details>
            </div>
          </article>
          <div className="learning-experiments" role="group" aria-label="More learning experiments">
            {learningExperiments.map((project) => <article key={project.title}><h3>{project.title}</h3><p className="availability">{project.availabilityLabel ?? statusLabels[project.status]}</p><p>{project.teaser}</p>
              <details className="inline-details"><summary>About the project</summary><p>{project.summary}</p></details>
              {project.link && <a className="text-link" href={project.link.href}>{project.link.label === "Open" ? "Try the game" : project.link.label}</a>}
            </article>)}
          </div>
        </div>
      </section>

      <div className="reading-columns">
        <section className="section about-section" id="about" aria-labelledby="about-title" tabIndex={-1}>
          <header className="section-heading"><h2 id="about-title">A little about me.</h2></header>
          {profile.about.paragraphs.map((paragraph) => <p className="about-intro" key={paragraph}>{paragraph}</p>)}
          <p className="about-identity"><strong>{profile.identity.fullName}</strong><br />{profile.identity.title}<br />{profile.identity.credentials}</p>
          <ol className="career-thread" aria-label="My route into systems thinking">
            <li><h3>Aerospace controls</h3><p>Control logic, analysis models, and verification for engine programs.</p></li>
            <li><h3>Rail systems integration</h3><p>Requirements, interfaces, assurance, and readiness across rail programs.</p></li>
            <li><h3>Tools, leadership &amp; learning</h3><p>Models, practical tools, writing, and experiences for learning.</p></li>
          </ol>
          <details className="inline-details about-story"><summary>Current work &amp; community</summary>
            <p>{profile.now.summary}</p><p>{profile.now.research}</p><p>{profile.proofPoints[0].value} {profile.proofPoints[0].label}</p>
            <p>Director-at-Large / Past President, INCOSE Canada</p>
          </details>
          <details className="practice-compact" id="practice" aria-labelledby="practice-title"><summary id="practice-title">How I work</summary>
            <div className="practice-essentials">{profile.practiceAreas.map((area) => <article key={area.title}><h4>{area.title}</h4><p>{area.summary}</p></article>)}</div>
            <div className="supporting-details"><h4 className="detail-heading">Methods &amp; principles</h4>
              <div className="practice-outcomes">{profile.practiceAreas.map((area) => <section key={area.title}><h4>{area.title}</h4><ul>{area.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul></section>)}</div>
              <ol className="method-steps" aria-label="Method">{profile.methodSteps.map((step) => <li key={step.label}><span>{step.label}</span><h4>{step.title}</h4><p>{step.summary}</p></li>)}</ol>
              <ul className="principle-grid" aria-label="Operating principles">{profile.operatingPrinciples.map((principle) => <li key={principle.title}><h4>{principle.title}</h4><p>{principle.summary}</p></li>)}</ul>
            </div>
          </details>
          <details className="career-compact" id="experience" aria-labelledby="experience-title"><summary id="experience-title">Experience &amp; credentials</summary>
            <ol className="career-timeline">{profile.experienceChapters.map((chapter) => <li key={chapter.title}><span>{chapter.period}</span><p>{chapter.role}</p></li>)}</ol>
            <div className="supporting-details career-evidence"><div className="career-chapters">{profile.experienceChapters.map((chapter) => <section key={chapter.title}><p className="type-label">{chapter.industry} · {chapter.geography}</p><h4>{chapter.title}</h4><p>{chapter.summary}</p><ul>{chapter.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul></section>)}</div>
              <h4>Recognition &amp; credentials</h4><ul>{profile.recognition.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
          </details>
        </section>
        <section className="section writing" id="writing" aria-labelledby="writing-title" tabIndex={-1}>
          <header className="section-heading"><h2 id="writing-title">Writing &amp; research.</h2></header>
          <p className="writing-intro">Published papers and work in progress, from technical leadership to adapting transit systems.</p>
          <article className="published-feature" aria-labelledby="published-title"><div><p className="type-label">{publishedNote.status}</p><h3 id="published-title">{publishedNote.title}</h3></div>
            <div><p>{publishedNote.summary}</p>{"link" in publishedNote && publishedNote.link && <a className="text-link" href={publishedNote.link.href}>{publishedNote.link.label}</a>}<p className="published-feature__citation">{profile.publications[0].status}</p></div>
          </article>
          <div className="research-index"><details className="supporting-details"><summary>Research in progress <span>{developingNotes.length} papers &amp; practice threads</span></summary>
            <div className="research-entries">{developingNotes.map((note) => <article key={note.title}><p className="type-label">{note.status}</p><h4>{note.title}</h4><p>{note.summary}</p>{"link" in note && note.link && <a className="text-link" href={note.link.href}>{note.link.label}</a>}</article>)}</div>
          </details><details className="supporting-details"><summary>Conference work &amp; patents</summary><div className="research-entries">{otherPublications.map((item) => <article key={item.title}><p className="type-label">{item.kind}</p><h4>{item.title}</h4><p>{item.status}</p><p>{item.summary}</p>{item.link && <a className="text-link" href={item.link.href}>{item.link.label}</a>}</article>)}</div></details></div>
        </section>
      </div>
      <section className="contact" id="contact" aria-labelledby="contact-title" tabIndex={-1}>
        <div><p className="section-kicker">Get in touch</p><h2 id="contact-title">Let’s compare notes.</h2></div>
        <div><p>I welcome conversations about systems engineering, technical leadership, responsible AI, research, and learning. Start with a question, a project, or something you’re exploring.</p>
          <div className="contact__links">{profile.links.map((link) => <a key={link.href} href={link.href}>Connect on {link.label} <span aria-hidden="true">↗</span></a>)}<a href="https://github.com/haitaowu12">Explore my GitHub <span aria-hidden="true">↗</span></a></div>
        </div>
      </section>
    </main>
  </PreviewProvider>;
}

export default App;
