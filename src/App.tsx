import { useEffect, useState } from "react";
import { profile } from "./content/profile";

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

const sectionIds = ["top", "work", "playground", "about", "practice", "experience", "writing", "contact"];
const navSection = (id: string) => id === "practice" || id === "experience" ? "about" : id;

const featuredProjects = profile.projects.filter((project) => project.featured);
const privateProjects = profile.projects.filter((project) => project.status === "local-private" && !project.featured);
const spotlightProject = featuredProjects.find((project) => project.title === profile.featuredStory.projectTitle)!;
const atlasProject = featuredProjects.find((project) => project.group === "atlas")!;
const indexedProjects = featuredProjects.filter((project) => project.group === "tool" && project !== spotlightProject);
const learningProjects = featuredProjects.filter((project) => project.group === "learning");
const learningSpotlight = learningProjects.find((project) => project.title === "SE Learning Quest")!;
const learningExperiments = learningProjects.filter((project) => project !== learningSpotlight);
const publishedNote = profile.fieldNotes[0]!;
const developingNotes = profile.fieldNotes.slice(1);
const otherPublications = profile.publications.filter((item) => item.title !== publishedNote.title);

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

    const measure = () => {
      navHeight = nav?.offsetHeight ?? 0;
      pageHeight = root.scrollHeight;
      offsets = targets.map((entry) => entry.element.getBoundingClientRect().top + window.scrollY);
    };

    const updateActiveSection = () => {
      frame = 0;
      const marker = window.scrollY + navHeight + 28;
      const atPageEnd = window.innerHeight + window.scrollY >= pageHeight - 2;
      let current = targets[0]?.id ?? "top";
      if (atPageEnd) {
        current = targets[targets.length - 1]?.id ?? "top";
      } else {
        for (let index = 0; index < offsets.length; index += 1) {
          if (offsets[index] <= marker) current = targets[index].id;
        }
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
    if (hashTarget) {
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
    <>
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
          <span aria-hidden="true">Menu</span>
          <span className="site-nav__toggle-lines" aria-hidden="true" />
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
          <h1 id="hero-title" data-hero-item="2">
            <span className="hero__greeting">Hi, I’m</span>
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
              See what I’m building <span aria-hidden="true">↘</span>
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
              sizes="(max-width: 900px) calc(100vw - 48px), (max-width: 1368px) 43vw, 615px"
              width="1448"
              height="1086"
              fetchPriority="high"
              decoding="async"
              alt="Illustration of aerospace and rail sketches, a systems-modeling laptop, leadership notes, and the Asterfall game beside a Vancouver window"
            />
          </div>
          <figcaption>Engineering systems. Building tools. Sharing the thinking.</figcaption>
        </figure>
        <dl className="hero__identity" data-hero-item="6">
          <div>
            <dt>Practice</dt>
            <dd>Systems engineering &amp; technical leadership</dd>
          </div>
          <div>
            <dt>Based in</dt>
            <dd>{profile.identity.location}</dd>
          </div>
          <div>
            <dt>Exploring</dt>
            <dd>Responsible AI, history &amp; learning through play</dd>
          </div>
        </dl>
      </section>

      <aside className="evidence-rail" aria-label="Professional context" data-reveal="handoff">
        <div>
          <strong>{profile.proofPoints[0].value}</strong>
          <span>{profile.proofPoints[0].label}</span>
        </div>
        <p>{profile.identity.credentials}</p>
        <p>Director-at-Large / Past President, INCOSE Canada</p>
      </aside>

      <section className="section work" id="work" aria-labelledby="work-title" tabIndex={-1}>
        <header className="section-heading section-heading--work" data-reveal="handoff">
          <div>
            <p className="section-kicker">Selected work</p>
            <h2 id="work-title">What I’m building.</h2>
          </div>
          <p>
            Tools, research prototypes, and experiments in understanding the world.
          </p>
        </header>

        <article className="atlas-feature" id="world-atlas" aria-labelledby="atlas-title">
          {atlasProject.preview && atlasProject.link && (
            <a className="atlas-feature__preview" href={atlasProject.link.href} aria-label="Open World History Atlas">
              <img
                src={atlasProject.preview.src}
                srcSet={`${atlasProject.preview.smallSrc} 720w, ${atlasProject.preview.src} ${atlasProject.preview.width}w`}
                sizes="(max-width: 900px) calc(100vw - 48px), min(58vw, 780px)"
                width={atlasProject.preview.width}
                height={atlasProject.preview.height}
                alt={atlasProject.preview.alt}
                loading="lazy"
                decoding="async"
              />
            </a>
          )}
          <div className="atlas-feature__body">
            <p className="section-kicker">{atlasProject.availabilityLabel}</p>
            <h3 id="atlas-title">{atlasProject.title}<span className="feature-name-note" lang="zh">寰宇时序</span></h3>
            <p className="feature-dek">{profile.atlasStory.title}</p>
            <p>{atlasProject.summary}</p>
            {atlasProject.link && <a className="text-link" href={atlasProject.link.href}>{atlasProject.link.label} <span aria-hidden="true">↗</span></a>}
            <details className="inline-details">
              <summary>How the atlas grew</summary>
              <p>{profile.atlasStory.basis}</p>
              <a className="text-link" href={profile.atlasStory.source.href}>{profile.atlasStory.source.label}</a>
            </details>
          </div>
        </article>

        <article className="project-story" aria-labelledby="story-title" data-reveal="project">
          <div className="project-spotlight">
            {spotlightProject.preview && (
              <a
                className="project-spotlight__visual"
                href={spotlightProject.link?.href}
                tabIndex={-1}
                aria-hidden="true"
              >
                <img
                  src={spotlightProject.preview.src}
                  srcSet={`${spotlightProject.preview.smallSrc} 720w, ${spotlightProject.preview.src} ${spotlightProject.preview.width}w`}
                  sizes="(min-width: 901px) min(55vw, 780px), calc(100vw - 48px)"
                  width={spotlightProject.preview.width}
                  height={spotlightProject.preview.height}
                  loading="lazy"
                  decoding="async"
                  alt={spotlightProject.preview.alt}
                />
              </a>
            )}
            <div className="project-spotlight__body">
              <p className="project-spotlight__label">Public research tool</p>
              <h3 id="story-title">{spotlightProject.title}</h3>
              <p className="feature-dek">{profile.featuredStory.title}</p>
              <p>{profile.featuredStory.introduction}</p>
              <p className="project-qualification">Developed with Cleo Wong. Evaluation of the method remains in progress.</p>
              {spotlightProject.link && (
                <a className="project-entry__link" href={spotlightProject.link.href}>
                  Explore the tailoring tool <span aria-hidden="true">↗</span>
                </a>
              )}
            </div>
          </div>
          <details className="project-rationale">
            <summary>The tailoring approach</summary>
          <div className="project-story__steps">
            {profile.featuredStory.steps.map((step) => (
              <section key={step.label}>
                <p className="project-story__label">{step.label}</p>
                <h4>{step.title}</h4>
                <p>{step.text}</p>
              </section>
            ))}
          </div>
          </details>
        </article>

        <div className="project-stack" role="group" aria-label="More selected work">
          {indexedProjects.map((project) => (
            <article
              className={`project-entry${project.preview ? " has-preview" : ""}`}
              data-reveal="project"
              key={project.title}
            >
              <div className="project-entry__meta">
                <span>{project.availabilityLabel ?? statusLabels[project.status]}</span>
              </div>
              <div className="project-entry__body">
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                {project.link && (
                  <a
                    className="project-entry__link"
                    href={project.link.href}
                    aria-label={`${project.link.label === "Open" ? "Open project" : project.link.label}: ${project.title}`}
                  >
                    {project.link.label === "Open" ? "Open project" : project.link.label}
                  </a>
                )}
              </div>
              {project.preview && project.link && (
                <a
                  className="project-entry__preview"
                  href={project.link.href}
                  tabIndex={-1}
                  aria-hidden="true"
                >
                  <img
                    src={project.preview.src}
                    srcSet={`${project.preview.smallSrc} 720w, ${project.preview.src} ${project.preview.width}w`}
                    sizes="min(90vw, 365px)"
                    width={project.preview.width}
                    height={project.preview.height}
                    loading="lazy"
                    decoding="async"
                    alt={project.preview.alt}
                  />
                </a>
              )}
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
        <header className="section-heading">
          <div>
            <p className="section-kicker">Playground</p>
            <h2 id="playground-title">Learning through making.</h2>
          </div>
          <p>Games, reflection, and learning by doing. Small experiments in how people think, decide, and grow.</p>
        </header>
        <article className="learning-feature" aria-labelledby="learning-title">
          {learningSpotlight.preview && learningSpotlight.link && (
            <a className="learning-feature__preview" href={learningSpotlight.link.href} aria-label="Explore Asterfall">
              <img
                src={learningSpotlight.preview.src}
                srcSet={`${learningSpotlight.preview.smallSrc} 720w, ${learningSpotlight.preview.src} ${learningSpotlight.preview.width}w`}
                sizes="(max-width: 900px) calc(100vw - 48px), min(55vw, 740px)"
                width={learningSpotlight.preview.width}
                height={learningSpotlight.preview.height}
                alt={learningSpotlight.preview.alt}
                loading="lazy"
                decoding="async"
              />
            </a>
          )}
          <div className="learning-feature__body">
            <p className="section-kicker">{learningSpotlight.title} · Public</p>
            <h3 id="learning-title">Asterfall: The Last Relay</h3>
            <p className="feature-dek">{profile.learningStory.title}</p>
            <p>{profile.learningStory.summary}</p>
            {learningSpotlight.link && <a className="text-link" href={learningSpotlight.link.href}>Play Asterfall <span aria-hidden="true">↗</span></a>}
            <p className="learning-feature__limit">{profile.learningStory.limitation}</p>
          </div>
        </article>
        <div className="learning-experiments" role="group" aria-label="More learning experiments">
          {learningExperiments.map((project) => (
            <article key={project.title}>
              <p className="type-label">{project.availabilityLabel ?? statusLabels[project.status]}</p>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              {project.link && <a className="text-link" href={project.link.href}>{project.link.label === "Open" ? "Try the game" : project.link.label} <span aria-hidden="true">↗</span></a>}
            </article>
          ))}
        </div>
      </section>

      <section className="section about-section" id="about" aria-labelledby="about-title" tabIndex={-1}>
        <div className="about-overview">
          <div>
            <p className="section-kicker">About &amp; practice</p>
            <h2 id="about-title">{profile.about.title}</h2>
            <p className="about-identity">{profile.identity.fullName}<br />{profile.identity.title}</p>
          </div>
          <div className="about-prose">
            {profile.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            <details className="inline-details">
              <summary>Current research &amp; explorations</summary>
              <p>{profile.now.summary}</p>
              <p>{profile.now.research}</p>
            </details>
          </div>
        </div>

        <div className="practice-compact" id="practice" aria-labelledby="practice-title">
          <h3 className="subsection-title" id="practice-title">How I work</h3>
          <div className="practice-essentials">
            {profile.practiceAreas.map((area) => (
              <article key={area.title}>
                <h4>{area.title}</h4>
                <p>{area.summary}</p>
              </article>
            ))}
          </div>
          <details className="supporting-details">
            <summary>Methods, outcomes &amp; principles</summary>
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
          </details>
        </div>

        <div className="career-compact" id="experience" aria-labelledby="experience-title">
          <h3 className="subsection-title" id="experience-title">Experience</h3>
          <ol className="career-timeline">
            {profile.experienceChapters.map((chapter) => (
              <li key={chapter.title}><span>{chapter.period}</span><p>{chapter.role}</p></li>
            ))}
          </ol>
          <details className="supporting-details career-evidence">
            <summary>Career contributions &amp; credentials</summary>
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
          </details>
        </div>
      </section>

      <section className="section writing" id="writing" aria-labelledby="writing-title" tabIndex={-1}>
        <header className="section-heading" data-reveal>
          <div>
            <p className="section-kicker">Published &amp; in progress</p>
            <h2 id="writing-title">Writing &amp; research.</h2>
          </div>
          <p>
            Published research and work in progress on leadership, tailoring, adaptability, and the ways people learn.
          </p>
        </header>
        <article className="published-feature" aria-labelledby="published-title">
          <div>
            <p className="type-label">{publishedNote.status}</p>
            <h3 id="published-title">{publishedNote.title}</h3>
          </div>
          <div>
            <p>{publishedNote.summary}</p>
            {"link" in publishedNote && publishedNote.link && <a className="text-link" href={publishedNote.link.href}>{publishedNote.link.label} <span aria-hidden="true">↗</span></a>}
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
    </>
  );
}

export default App;
