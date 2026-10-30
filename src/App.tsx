import { useEffect, useState } from "react";
import { PreviewProvider, usePreview } from "./components/ScreenshotViewer";
import { profile, type SelectedProject } from "./content/profile";

const statusLabels = {
  public: "Public",
  prototype: "Prototype",
  "local-private": "Local/private",
};

const navItems = [
  { id: "work", label: "Work" },
  { id: "playground", label: "Playground" },
  { id: "about", label: "About" },
  { id: "writing", label: "Writing" },
  { id: "contact", label: "Contact" },
];

const sectionIds = ["top", "work", "playground", "about", "writing", "contact"];
const navSection = (id: string) => id === "practice" || id === "experience" ? "about" : id;

const featuredProjects = profile.projects.filter((project) => project.featured);
const privateProjects = profile.projects.filter((project) => project.status === "local-private" && !project.featured);
const spotlightProject = featuredProjects.find((project) => project.title === profile.featuredStory.projectTitle)!;
const atlasProject = featuredProjects.find((project) => project.group === "atlas")!;
const studyProjects = featuredProjects.filter((project) => project.title === "RailClear" || project.title === "RAMS Workbench");
const indexedProjects = [
  featuredProjects.find((project) => project.title === "Modeling Lab")!,
  spotlightProject,
  featuredProjects.find((project) => project.title === "Leadership Toolbox")!,
];
const learningProjects = featuredProjects.filter((project) => project.group === "learning");
const learningSpotlight = learningProjects.find((project) => project.title === "SE Learning Quest")!;
const learningExperiments = learningProjects.filter((project) => project !== learningSpotlight);
const publishedNote = profile.fieldNotes[0]!;
const developingNotes = profile.fieldNotes.slice(1);
const otherPublications = profile.publications.filter((item) => item.title !== publishedNote.title);

function ProjectPreview({ project, sizes, className = "" }: {
  project: SelectedProject;
  sizes: string;
  className?: string;
}) {
  const openPreview = usePreview();
  if (!project.preview) return null;
  const preview = project.preview;
  return (
    <figure className={`project-preview ${className}`}>
      <a href={preview.src} aria-label={`View full screenshot: ${project.title}`} aria-haspopup="dialog"
        onClick={(event) => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || typeof HTMLDialogElement === "undefined") return;
          event.preventDefault();
          openPreview({ project, trigger: event.currentTarget });
        }}>
        <img src={preview.src} srcSet={`${preview.smallSrc} 720w, ${preview.src} ${preview.width}w`}
          sizes={sizes} width={preview.width} height={preview.height}
          loading="lazy" decoding="async" alt={preview.alt} />
        <span>Enlarge screenshot</span>
      </a>
      {preview.caption && <figcaption>{preview.caption}</figcaption>}
    </figure>
  );
}

function App() {
  const [activeSection, setActiveSection] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        const toggleButton = document.querySelector<HTMLButtonElement>(".site-nav__toggle");
        if (toggleButton) toggleButton.focus();
      }
    };

    const closeOnOutsidePress = (event: PointerEvent) => {
      const nav = event.target instanceof Element ? event.target.closest(".site-nav") : null;
      if (!nav) setMenuOpen(false);
    };

    const closeOnFocusOut = (event: FocusEvent) => {
      const nav = document.querySelector(".site-nav");
      if (nav && !nav.contains(event.relatedTarget as Node)) {
        setMenuOpen(false);
      }
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
    const targets = sectionIds
      .map((id) => ({ id, element: document.getElementById(id) }))
      .filter((entry): entry is { id: string; element: HTMLElement } => entry.element !== null);

    let frame = 0;
    let hashTimer = 0;
    let hashFrame = 0;
    let cancelled = false;
    let navHeight = 0;
    let pageHeight = 0;
    let offsets: number[] = [];
    let ends: number[] = [];

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
        // About and Writing share a desktop row. Keep the explicitly chosen
        // chapter active while its reading region is visible, then fall back
        // to the last section start (the normal vertical reading order).
        let nearest = -Infinity;
        let candidates: string[] = [];
        for (let index = 0; index < offsets.length; index += 1) {
          if (offsets[index] <= marker) {
            if (offsets[index] > nearest + 1) {
              nearest = offsets[index];
              candidates = [targets[index].id];
            } else if (Math.abs(offsets[index] - nearest) <= 1) {
              candidates.push(targets[index].id);
            }
          }
        }
        const visible = candidates.filter((id) => ends[targets.findIndex((entry) => entry.id === id)] > marker);
        current = visible.includes(intent) ? intent : (visible[0] ?? candidates[0] ?? current);
      }
      setActiveSection((previous) => (previous === navSection(current) ? previous : navSection(current)));
    };

    const queueActiveSection = () => {
      if (!frame) frame = window.requestAnimationFrame(updateActiveSection);
    };

    const remeasureAndRefresh = () => {
      measure();
      queueActiveSection();
    };

    measure();
    updateActiveSection();

    // Pre-rendered markup plus lazily loaded images and late webfonts keep
    // changing section offsets after first paint, so geometry is refreshed on
    // layout growth instead of being read from the DOM on every scroll frame.
    const resizeObserver = new ResizeObserver(remeasureAndRefresh);
    resizeObserver.observe(root);

    window.addEventListener("scroll", queueActiveSection, { passive: true });
    window.addEventListener("resize", remeasureAndRefresh);

    const hashTarget = window.location.hash.slice(1);
    const isHistoryTraversal = (performance.getEntriesByType("navigation")[0] as PerformanceNavigationTiming | undefined)?.type === "back_forward";
    // Native Back from a full-size image restores the exact browsing position;
    // do not replace it with an older section fragment from the address bar.
    if (hashTarget && !isHistoryTraversal) {
      root.classList.add("hash-jump");
      const jumpToHashTarget = () => {
        hashFrame = 0;
        if (cancelled) return;
        measure();
        const target = document.getElementById(hashTarget);
        if (target) window.scrollTo(0, Math.max(0, target.getBoundingClientRect().top + window.scrollY - navHeight - 16));
        root.classList.remove("hash-jump");
        updateActiveSection();
      };

      if (document.fonts?.ready) {
        // Measure after webfont metrics settle; a fixed timer would scroll
        // against a layout the font swap then moves.
        document.fonts.ready.then(() => {
          if (!cancelled) hashFrame = window.requestAnimationFrame(jumpToHashTarget);
        });
      } else {
        hashTimer = window.setTimeout(jumpToHashTarget, 60);
      }
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

  return (
    <PreviewProvider>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <nav className="site-nav" aria-label="Page sections">
        <a
          className="site-nav__brand"
          href="#top"
          aria-current={activeSection === "top" ? "location" : undefined}
          onClick={() => setMenuOpen(false)}
        >
          Tony Wu
        </a>
        <button
          className="site-nav__toggle"
          type="button"
          aria-label={menuOpen ? "Close page menu" : "Open page menu"}
          aria-controls="site-nav-links"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <span aria-hidden="true">{menuOpen ? "Close" : "Menu"}</span>
        </button>
        <div
          className={`site-nav__links${menuOpen ? " is-open" : ""}`}
          id="site-nav-links"
        >
          {navItems.map((item) => (
            <a
              aria-current={activeSection === item.id ? "location" : undefined}
              className={activeSection === item.id ? "is-active" : undefined}
              href={`#${item.id}`}
              key={item.id}
              onClick={() => {
                setActiveSection(item.id);
                setMenuOpen(false);
              }}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

      <main id="main-content" tabIndex={-1}>
      <section className="hero" id="top" aria-labelledby="hero-title" tabIndex={-1}>
        <div className="hero__content">
          <p className="eyebrow">Vancouver, Canada</p>
          <h1 id="hero-title" data-hero-item="2">
            <span className="hero__greeting">Hi, I’m </span>
            {profile.identity.name}<span className="hero__period">.</span>
          </h1>
          <p className="hero__title" data-hero-item="3">
            {profile.positioning.headline}
          </p>
          <p className="hero__copy" data-hero-item="4">
            {profile.positioning.subhead}
          </p>
          <div className="hero__actions" data-hero-item="5" role="group" aria-label="Primary links">
            <a className="button" href="#work">
              See what I’m building
            </a>
            <a className="button button--quiet" href="#writing">
              Writing &amp; research
            </a>
          </div>
        </div>

        <figure className="hero__stage" data-hero-item="7">
          <div className="hero__visual">
            <img
              src="./hero-practice-story.webp"
              srcSet="./hero-practice-story-720.webp 720w, ./hero-practice-story-1080.webp 1080w, ./hero-practice-story.webp 1448w"
              sizes="(max-width: 700px) calc(100vw - 36px), min(48vw, 580px)"
              width="1448"
              height="1086"
              fetchPriority="high"
              decoding="async"
              alt="Illustration of aerospace and rail sketches, a systems-modeling laptop, leadership notes, and the Asterfall game beside a Vancouver window"
            />
          </div>
        </figure>
      </section>

      <section className="section work" id="work" aria-labelledby="work-title" tabIndex={-1}>
        <header className="section-heading section-heading--work">
          <h2 id="work-title">Selected work</h2>
        </header>
        <article className="atlas-feature" id="world-atlas" aria-labelledby="atlas-title">
          <div className="atlas-feature__body">
            <h3 id="atlas-title">{atlasProject.title}<span className="feature-name-note" lang="zh">{atlasProject.chineseTitle}</span></h3>
            <p>{atlasProject.summary}</p>
            <div className="atlas-host-links">{atlasProject.link && <a className="text-link" href={atlasProject.link.href}>{atlasProject.link.label}</a>}</div>
            <p className="availability">{atlasProject.availabilityLabel}</p>
            <details className="inline-details">
              <summary>How the atlas grew</summary>
              <p>{profile.atlasStory.basis}</p>
              <a className="text-link" href="https://haitaowu12.github.io/world-history-atlas/">GitHub Pages mirror</a>
              <a className="text-link" href={profile.atlasStory.source.href}>{profile.atlasStory.source.label}</a>
            </details>
          </div>
          <ProjectPreview project={atlasProject} className="atlas-feature__preview"
            sizes="(max-width: 700px) calc(100vw - 36px), min(50vw, 620px)" />
        </article>

        <div className="study-pair" role="group" aria-label="Engineering study tools">
          {studyProjects.map((project) => (
            <article className="project-entry study-entry" key={project.title}>
              <div className="project-entry__body">
                <h3>{project.title}</h3>
                <p className="feature-dek">{project.title === "RailClear" ? "Safe-braking studies" : "Hazards, reliability & evidence"}</p>
                <p>{project.teaser}</p>
                <p className="availability">{project.availabilityLabel}</p>
                {project.link && <a className="text-link" href={project.link.href}>{project.link.label}</a>}
                <p className="project-limit">{project.title === "RailClear"
                  ? "Outputs require project-specific engineering qualification."
                  : "Single-user study prototype; engineering qualification remains open."}</p>
                <details className="inline-details">
                  <summary>Study scope &amp; limits</summary>
                  <p>{project.summary}</p>
                </details>
              </div>
              <ProjectPreview project={project} sizes="(max-width: 700px) calc(100vw - 36px), min(44vw, 560px)" />
            </article>
          ))}
        </div>

        <div className="project-index" role="group" aria-label="More selected work">
          {indexedProjects.map((project) => (
            <article key={project.title}>
              <header className="project-index__heading"><h3>{project.title}</h3>
              <p className="availability">{project === spotlightProject ? "Research with Cleo Wong" : (project.availabilityLabel ?? statusLabels[project.status])}</p></header>
              <div className="project-index__body"><p>{project === spotlightProject ? "Decide how much systems engineering a project needs. Research evaluation is in progress." : project.teaser}</p>
              <details className="inline-details">
                <summary>{project === spotlightProject ? "The tailoring approach" : "About the project"}</summary>
                <p>{project.summary}</p>
                {project === spotlightProject && <>
                  <div className="project-story__steps">
                    {profile.featuredStory.steps.map((step) => (
                      <section key={step.label}><h4>{step.title}</h4><p>{step.text}</p></section>
                    ))}
                  </div>
                </>}
                {project.preview && <ProjectPreview project={project} sizes="(max-width: 700px) calc(100vw - 36px), min(30vw, 380px)" />}
              </details>
              </div>
              {project.link && <a className="text-link" href={project.link.href}>
                {project.link.label === "Open" ? "Explore the tailoring tool" : project.link.label}
              </a>}
            </article>
          ))}
        </div>

        <details className="private-work" data-reveal>
          <summary>Unpublished experiments <span className="private-work__label">Local/private</span></summary>
          <ul>
            {privateProjects.map((project) => (
              <li key={project.title}>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <span className="private-work__status">{statusLabels["local-private"]}</span>
              </li>
            ))}
          </ul>
        </details>
      </section>

      <section className="section playground" id="playground" aria-labelledby="playground-title" tabIndex={-1}>
        <header className="section-heading"><h2 id="playground-title">Playground</h2></header>
        <div className="playground-layout">
          <article className="learning-feature" aria-labelledby="learning-title">
            <ProjectPreview project={learningSpotlight} sizes="(max-width: 700px) calc(100vw - 36px), min(30vw, 350px)" />
            <div className="learning-feature__body">
              <h3 id="learning-title">Asterfall: The Last Relay</h3>
              <p>{learningSpotlight.teaser}</p>
              <p className="project-limit">{profile.learningStory.limitation}</p>
              {learningSpotlight.link && <a className="text-link" href={learningSpotlight.link.href}>Play Asterfall</a>}
              <details className="inline-details"><summary>The learning experiment</summary>
                <p>{learningSpotlight.summary}</p><p>{profile.learningStory.summary}</p>
              </details>
            </div>
          </article>
          <div className="learning-experiments" role="group" aria-label="More learning experiments">
            {learningExperiments.map((project) => (
              <article key={project.title}>
                <h3>{project.title}</h3>
                <p className="availability">{project.availabilityLabel ?? statusLabels[project.status]}</p>
                <p>{project.teaser}</p>
                <details className="inline-details">
                  <summary>About the project</summary>
                  <p>{project.summary}</p>
                </details>
                {project.link && <a className="text-link" href={project.link.href}>{project.link.label === "Open" ? "Try the game" : project.link.label}</a>}
              </article>
            ))}
          </div>
        </div>
      </section>

      <div className="reading-columns">
      <section className="section about-section" id="about" aria-labelledby="about-title" tabIndex={-1}>
        <header className="section-heading"><h2 id="about-title">How I got here</h2></header>
        <p className="about-identity">{profile.identity.fullName}<br />{profile.identity.title}</p>
        <ol className="career-thread" aria-label="My route into systems thinking">
          <li><h3>Aerospace controls</h3><p>Control logic, analysis models, and verification for engine programs.</p></li>
          <li><h3>Rail systems integration</h3><p>Requirements, interfaces, assurance, and readiness across rail programs.</p></li>
          <li><h3>Tools, leadership &amp; learning</h3><p>Models, practical tools, writing, and experiences for learning.</p></li>
        </ol>
        <details className="inline-details about-story">
          <summary>More about my practice</summary>
          {profile.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <p>{profile.now.summary}</p><p>{profile.now.research}</p>
          <p>{profile.proofPoints[0].value} {profile.proofPoints[0].label}</p>
          <p>{profile.identity.credentials}</p>
          <p>Director-at-Large / Past President, INCOSE Canada</p>
          <p>Exploring responsible AI, history &amp; learning through play.</p>
        </details>

        <details className="practice-compact" id="practice" aria-labelledby="practice-title">
          <summary id="practice-title">How I work</summary>
          <div className="practice-essentials">
            {profile.practiceAreas.map((area) => (
              <article key={area.title}>
                <h4>{area.title}</h4>
                <p>{area.summary}</p>
              </article>
            ))}
          </div>
          <div className="supporting-details">
            <h4 className="detail-heading">Methods &amp; principles</h4>
            <div className="practice-outcomes">
              {profile.practiceAreas.map((area) => (
                <section key={area.title}>
                  <h4>{area.title}</h4>
                  <ul>{area.outcomes.map((outcome) => <li key={outcome}>{outcome}</li>)}</ul>
                </section>
              ))}
            </div>
            <ol className="method-steps" aria-label="Method">
              {profile.methodSteps.map((step) => (
                <li key={step.label}><span>{step.label}</span><h4>{step.title}</h4><p>{step.summary}</p></li>
              ))}
            </ol>
            <ul className="principle-grid" aria-label="Operating principles">
              {profile.operatingPrinciples.map((principle) => (
                <li key={principle.title}><h4>{principle.title}</h4><p>{principle.summary}</p></li>
              ))}
            </ul>
          </div>
        </details>

        <details className="career-compact" id="experience" aria-labelledby="experience-title">
          <summary id="experience-title">Experience &amp; credentials</summary>
          <ol className="career-timeline">
            {profile.experienceChapters.map((chapter) => (
              <li key={chapter.title}><span>{chapter.period}</span><p>{chapter.role}</p></li>
            ))}
          </ol>
          <div className="supporting-details career-evidence">
            <div className="career-chapters">
              {profile.experienceChapters.map((chapter) => (
                <section key={chapter.title}>
                  <p className="type-label">{chapter.industry} · {chapter.geography}</p>
                  <h4>{chapter.title}</h4>
                  <p>{chapter.summary}</p>
                  <ul>{chapter.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
                </section>
              ))}
            </div>
            <h4>Recognition &amp; credentials</h4>
            <ul>{profile.recognition.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
        </details>
      </section>

      <section className="section writing" id="writing" aria-labelledby="writing-title" tabIndex={-1}>
        <header className="section-heading"><h2 id="writing-title">Writing &amp; research</h2></header>
        <article className="published-feature" aria-labelledby="published-title">
          <div>
            <p className="type-label">{publishedNote.status}</p>
            <h3 id="published-title">{publishedNote.title}</h3>
          </div>
          <div>
            <p>{publishedNote.summary}</p>
            {"link" in publishedNote && publishedNote.link && <a className="text-link" href={publishedNote.link.href}>{publishedNote.link.label}</a>}
            <p className="published-feature__citation">{profile.publications[0].status}</p>
          </div>
        </article>
        <div className="research-index">
          <details className="supporting-details">
            <summary>Research in progress <span>{developingNotes.length} papers &amp; practice threads</span></summary>
            <div className="research-entries">
              {developingNotes.map((note) => (
                <article key={note.title}>
                  <p className="type-label">{note.status}</p>
                  <h4>{note.title}</h4>
                  <p>{note.summary}</p>
                  {"link" in note && note.link && <a className="text-link" href={note.link.href}>{note.link.label}</a>}
                </article>
              ))}
            </div>
          </details>
          <details className="supporting-details">
            <summary>Conference work &amp; patents</summary>
            <div className="research-entries">
              {otherPublications.map((item) => (
                <article key={item.title}>
                  <p className="type-label">{item.kind}</p>
                  <h4>{item.title}</h4>
                  <p>{item.status}</p>
                  <p>{item.summary}</p>
                  {item.link && <a className="text-link" href={item.link.href}>{item.link.label}</a>}
                </article>
              ))}
            </div>
          </details>
        </div>
      </section>

      </div>
      <section className="contact" id="contact" aria-labelledby="contact-title" data-reveal tabIndex={-1}>
        <div>
          <p className="section-kicker">Contact</p>
          <h2 id="contact-title">Let’s compare notes.</h2>
        </div>
        <div>
          <p>
            I welcome conversations around systems thinking, technical leadership, responsible AI,
            workshops, writing, and selective future advisory work.
          </p>
          <div className="contact__links">
            {profile.links.map((link) => (
              <a href={link.href} key={link.href}>
                Connect on {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
      </main>
    </PreviewProvider>
  );
}

export default App;
