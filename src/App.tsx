import { useEffect, useState } from "react";
import { profile } from "./content/profile";

const statusLabels = {
  public: "Public",
  prototype: "Prototype",
  "local-private": "Local/private",
};

const navItems = [
  { id: "work", label: "Work" },
  { id: "about", label: "About" },
  { id: "practice", label: "Practice" },
  { id: "writing", label: "Writing" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

const featuredProjects = profile.projects.filter((project) => project.featured);
const privateProjects = profile.projects.filter((project) => project.status === "local-private");
const spotlightProject = featuredProjects[0]!;
const indexedProjects = featuredProjects.slice(1);

function App() {
  const [activeSection, setActiveSection] = useState("top");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };

    const closeOnOutsidePress = (event: PointerEvent) => {
      const nav = event.target instanceof Element ? event.target.closest(".site-nav") : null;
      if (!nav) setMenuOpen(false);
    };

    window.addEventListener("keydown", closeOnEscape);
    window.addEventListener("pointerdown", closeOnOutsidePress);

    return () => {
      window.removeEventListener("keydown", closeOnEscape);
      window.removeEventListener("pointerdown", closeOnOutsidePress);
    };
  }, [menuOpen]);

  useEffect(() => {
    const root = document.documentElement;
    const nav = document.querySelector<HTMLElement>(".site-nav");
    const targets = ["top", ...navItems.map((item) => item.id)]
      .map((id) => ({ id, element: document.getElementById(id) }))
      .filter((entry): entry is { id: string; element: HTMLElement } => entry.element !== null);

    let frame = 0;
    let hashTimer = 0;
    let cancelled = false;
    let navHeight = 0;
    let pageHeight = 0;
    let offsets: number[] = [];

    const measure = () => {
      navHeight = nav?.offsetHeight ?? 0;
      pageHeight = root.scrollHeight;
      offsets = targets.map((entry) => entry.element.offsetTop);
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
      setActiveSection((previous) => (previous === current ? previous : current));
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
        if (cancelled) return;
        measure();
        const target = document.getElementById(hashTarget);
        if (target) window.scrollTo(0, Math.max(0, target.offsetTop - navHeight - 16));
        root.classList.remove("hash-jump");
        setActiveSection(hashTarget);
      };

      if (document.fonts?.ready) {
        // Measure after webfont metrics settle; a fixed timer would scroll
        // against a layout the font swap then moves.
        document.fonts.ready.then(() => {
          frame = window.requestAnimationFrame(jumpToHashTarget);
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

      <main id="main-content">
      <section className="hero" id="top" aria-labelledby="hero-title">
        <div className="hero__content">
          <p className="eyebrow" data-hero-item="1">
            Rail systems / MBSE / assurance / AI-augmented practice
          </p>
          <h1 id="hero-title" data-hero-item="2">
            {profile.identity.name}
          </h1>
          <p className="hero__title" data-hero-item="3">
            {profile.positioning.headline}
          </p>
          <p className="hero__copy" data-hero-item="4">
            {profile.positioning.subhead}
          </p>
          <div className="hero__actions" data-hero-item="5" aria-label="Primary links">
            <a className="button" href="#work">
              Explore selected work
            </a>
            <a className="button button--quiet" href="#writing">
              Read papers & field notes
            </a>
          </div>
          <dl className="hero__identity" data-hero-item="6">
            <div>
              <dt>Role</dt>
              <dd>{profile.identity.title}</dd>
            </div>
            <div>
              <dt>Based</dt>
              <dd>{profile.identity.location}</dd>
            </div>
            <div>
              <dt>Practice</dt>
              <dd>Full lifecycle systems engineering</dd>
            </div>
          </dl>
        </div>

        <div className="hero__stage" data-hero-item="7" aria-label="Systems engineering workbench">
          <div className="hero__visual">
            {/* Measured against the rendered .hero__visual box at each breakpoint: it never
                exceeds ~722px, so every band resolves to the 720w variant on 1x screens and
                1080w/1239w are only fetched on high-DPR displays. */}
            <img
              src="./hero-systems-briefing.webp"
              srcSet="./hero-systems-briefing-720.webp 720w, ./hero-systems-briefing-1080.webp 1080w, ./hero-systems-briefing.webp 1239w"
              sizes="(max-width: 620px) 93vw, (max-width: 900px) min(87vw, 715px), min(53vw, 715px)"
              width="1239"
              height="948"
              fetchPriority="high"
              decoding="async"
              alt="Systems engineering briefing board with rail, model, evidence, and readiness artifacts"
            />
          </div>
          <div className="hero__project-index" aria-label="Featured public work">
            <p>Public work index</p>
            <ol>
              {featuredProjects.slice(0, 3).map((project, index) => (
                <li key={project.title}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {project.title}
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <aside className="evidence-rail" aria-label="Professional context" data-reveal="handoff">
        <div>
          <strong>{profile.proofPoints[0].value}</strong>
          <span>{profile.proofPoints[0].label}</span>
        </div>
        <p>{profile.identity.credentials}</p>
        <p>Director-at-Large / Past President, INCOSE Canada</p>
      </aside>

      <section className="section work" id="work" aria-labelledby="work-title">
        <header className="section-heading section-heading--work" data-reveal="handoff">
          <div>
            <p className="section-kicker">Selected public work</p>
            <h2 id="work-title">Methods made tangible.</h2>
          </div>
          <p>
            Open tools, models, and learning experiences built to test how systems engineering can
            become clearer, more usable, and easier to transfer.
          </p>
        </header>

        <article className="project-spotlight" data-reveal="project">
          {spotlightProject.preview && (
            <a
              className="project-spotlight__visual"
              href={spotlightProject.link?.href}
              aria-label={`Open ${spotlightProject.title}`}
            >
              {/* The spotlight visual is ~857px wide on desktop and ~718px on a
                  768px tablet, so a flat "700px / 100vw" pair mis-served it in both
                  directions: too small on large screens, past the 720w candidate below 900px. */}
              <img
                src={spotlightProject.preview.src}
                srcSet={`${spotlightProject.preview.smallSrc} 720w, ${spotlightProject.preview.src} ${spotlightProject.preview.width}w`}
                sizes="(min-width: 901px) min(61vw, 860px), 91vw"
                width={spotlightProject.preview.width}
                height={spotlightProject.preview.height}
                loading="lazy"
                decoding="async"
                alt={spotlightProject.preview.alt}
              />
            </a>
          )}
          <div className="project-spotlight__body">
            <div className="project-entry__meta">
              <span>01</span>
              <span>{statusLabels[spotlightProject.status]}</span>
            </div>
            <p className="project-spotlight__label">Featured practice tool</p>
            <h3>{spotlightProject.title}</h3>
            <p>{spotlightProject.summary}</p>
            <ul aria-label={`${spotlightProject.title} themes`}>
              {spotlightProject.themes.map((theme) => (
                <li key={theme}>{theme}</li>
              ))}
            </ul>
            {spotlightProject.link && (
              <a
                className="project-entry__link"
                href={spotlightProject.link.href}
                aria-label={`Open project: ${spotlightProject.title}`}
              >
                Open project
              </a>
            )}
          </div>
        </article>

        <div className="project-stack" aria-label="More selected public work">
          {indexedProjects.map((project, index) => (
            <article
              className={`project-entry${project.preview ? " has-preview" : ""}`}
              data-reveal="project"
              key={project.title}
            >
              <div className="project-entry__meta">
                <span>{String(index + 2).padStart(2, "0")}</span>
                <span>{project.availabilityLabel ?? statusLabels[project.status]}</span>
              </div>
              <div className="project-entry__body">
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <ul aria-label={`${project.title} themes`}>
                  {project.themes.map((theme) => (
                    <li key={theme}>{theme}</li>
                  ))}
                </ul>
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
                  aria-label={`Open ${project.title}`}
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

        <aside className="private-work" aria-label="Unpublished lab work" data-reveal>
          <p className="private-work__label">Also in the lab</p>
          <ul>
            {privateProjects.map((project) => (
              <li key={project.title}>
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <span className="private-work__status">{statusLabels["local-private"]}</span>
              </li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="statement" id="about" aria-labelledby="about-title">
        <div className="statement__label" data-reveal>
          <p className="section-kicker">About / Now</p>
          <p>{profile.identity.title}</p>
          <p>{profile.identity.location}</p>
          <p>Updated {profile.now.reviewed}</p>
        </div>
        <div className="statement__body" data-reveal>
          <h2 id="about-title">Make complexity visible. Leave teams with something they can use.</h2>
          <p>{profile.positioning.thesis}</p>
          <p>{profile.now.summary}</p>
          <p>{profile.now.research}</p>
        </div>
      </section>

      <section className="section practice" id="practice" aria-labelledby="practice-title">
        <header className="section-heading" data-reveal>
          <div>
            <p className="section-kicker">Practice</p>
            <h2 id="practice-title">Systems engineering that holds up in delivery.</h2>
          </div>
          <p>
            The focus is delivery: enough rigor to expose risk, enough tailoring to remain usable,
            and enough evidence for decisions to hold.
          </p>
        </header>
        <div className="practice-list">
          {profile.practiceAreas.map((area, index) => (
            <article className="practice-entry" data-reveal key={area.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h3>{area.title}</h3>
                <p>{area.summary}</p>
                <ul className="practice-entry__outcomes" aria-label={`${area.title} outcomes`}>
                  {area.outcomes.map((outcome) => (
                    <li key={outcome}>{outcome}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <ol className="method-steps" aria-label="Method" data-reveal>
          {profile.methodSteps.map((step) => (
            <li key={step.label}>
              <span>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.summary}</p>
            </li>
          ))}
        </ol>

        <ul className="principle-grid" aria-label="Operating principles" data-reveal>
          {profile.operatingPrinciples.map((principle) => (
            <li key={principle.title}>
              <h3>{principle.title}</h3>
              <p>{principle.summary}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="section writing" id="writing" aria-labelledby="writing-title">
        <header className="section-heading" data-reveal>
          <div>
            <p className="section-kicker">Writing & standards</p>
            <h2 id="writing-title">Field notes from real practice.</h2>
          </div>
          <p>
            Published work, papers in development, and contributions to transit standards across
            tailoring, adaptability, operational readiness, and technical leadership.
          </p>
        </header>
        <div className="writing-grid">
          <div className="note-list">
            {profile.fieldNotes.map((note, index) => (
              <article className="note-entry" data-reveal key={note.title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <p className="type-label">{note.status}</p>
                  <h3>{note.title}</h3>
                  <p>{note.summary}</p>
                  {"link" in note && note.link && (
                    <a href={note.link.href} aria-label={`${note.link.label}: ${note.title}`}>
                      {note.link.label}
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
          <aside className="publication-index" data-reveal aria-label="Public record">
            <p className="section-kicker">Public record</p>
            {profile.publications.map((item) => (
              <article key={item.title}>
                <p className="type-label">{item.kind}</p>
                <h3>{item.title}</h3>
                <p>{item.status}</p>
                {item.link && (
                  <a href={item.link.href} aria-label={`${item.link.label}: ${item.title}`}>
                    {item.link.label}
                  </a>
                )}
              </article>
            ))}
          </aside>
        </div>
      </section>

      <section className="section experience" id="experience" aria-labelledby="experience-title">
        <header className="section-heading" data-reveal>
          <div>
            <p className="section-kicker">Selected experience</p>
            <h2 id="experience-title">The record behind the point of view.</h2>
          </div>
          <p>
            Aerospace controls, rail systems delivery, strategic consulting, major expansion
            programs, and professional community leadership.
          </p>
        </header>
        <div className="experience-list">
          {profile.experienceChapters.map((chapter) => (
            <article className="experience-entry" data-reveal key={chapter.title}>
              <div>
                <span>{chapter.period}</span>
                <span>{chapter.geography}</span>
              </div>
              <div>
                <p className="type-label">{chapter.industry}</p>
                <h3>{chapter.title}</h3>
                <p className="experience-entry__role">{chapter.role}</p>
              </div>
              <div className="experience-entry__detail">
                <p>{chapter.summary}</p>
                <ul aria-label={`${chapter.title} highlights`}>
                  {chapter.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <aside className="recognition" aria-label="Recognition and credentials" data-reveal>
          <p className="section-kicker">Recognition &amp; credentials</p>
          <ul>
            {profile.recognition.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </aside>
      </section>

      <section className="contact" id="contact" aria-labelledby="contact-title" data-reveal>
        <div>
          <p className="section-kicker">Contact</p>
          <h2 id="contact-title">Compare notes. Build better practice.</h2>
        </div>
        <div>
          <p>
            I welcome conversations around systems engineering practice, technical leadership,
            public-interest infrastructure, workshops, writing, and selective future advisory work.
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
