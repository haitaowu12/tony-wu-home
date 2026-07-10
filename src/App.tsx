import { useEffect, useMemo, useState } from "react";
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

function App() {
  const [activeSection, setActiveSection] = useState("top");
  const featuredProjects = useMemo(
    () => profile.projects.filter((project) => project.link).slice(0, 4),
    [],
  );

  useEffect(() => {
    const root = document.documentElement;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    let pageFrame = 0;
    let scrollFrame = 0;

    if (!reducedMotion) {
      root.classList.add("motion-ready");
      pageFrame = window.requestAnimationFrame(() => root.classList.add("page-ready"));
    }

    if (!reducedMotion && "IntersectionObserver" in window) {
      const revealObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            }
          });
        },
        { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
      );

      revealItems.forEach((item) => revealObserver.observe(item));

      const updateHeroProgress = () => {
        scrollFrame = 0;
        const hero = document.getElementById("top");
        if (!hero) return;
        const progress = Math.min(Math.max(window.scrollY / (hero.offsetHeight * 0.82), 0), 1);
        root.style.setProperty("--hero-progress", progress.toFixed(3));
        root.style.setProperty("--hero-shift", `${Math.round(progress * -18)}px`);
        root.style.setProperty("--hero-scale", (1.02 + progress * 0.025).toFixed(3));
      };

      const queueHeroProgress = () => {
        if (!scrollFrame) scrollFrame = window.requestAnimationFrame(updateHeroProgress);
      };

      updateHeroProgress();
      window.addEventListener("scroll", queueHeroProgress, { passive: true });

      return () => {
        revealObserver.disconnect();
        window.removeEventListener("scroll", queueHeroProgress);
        window.cancelAnimationFrame(pageFrame);
        window.cancelAnimationFrame(scrollFrame);
        root.classList.remove("motion-ready", "page-ready");
        root.style.removeProperty("--hero-progress");
        root.style.removeProperty("--hero-shift");
        root.style.removeProperty("--hero-scale");
      };
    }

    revealItems.forEach((item) => item.classList.add("is-visible"));
    return () => window.cancelAnimationFrame(pageFrame);
  }, []);

  useEffect(() => {
    const root = document.documentElement;
    let hashTimer = 0;
    let activeFrame = 0;
    const sectionIds = ["top", ...navItems.map((item) => item.id)];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    const updateActiveSection = () => {
      activeFrame = 0;
      const navHeight = document.querySelector(".site-nav")?.getBoundingClientRect().height ?? 0;
      const marker = window.scrollY + navHeight + 28;
      const current = sections.reduce(
        (active, section) => (section.offsetTop <= marker ? section.id : active),
        "top",
      );
      setActiveSection(current);
    };

    const queueActiveSection = () => {
      if (!activeFrame) activeFrame = window.requestAnimationFrame(updateActiveSection);
    };

    const hashTarget = window.location.hash.slice(1);
    if (hashTarget) {
      root.classList.add("hash-jump");
      hashTimer = window.setTimeout(() => {
        const target = document.getElementById(hashTarget);
        const navHeight = document.querySelector(".site-nav")?.getBoundingClientRect().height ?? 0;
        if (target) window.scrollTo(0, Math.max(0, target.offsetTop - navHeight - 16));
        root.classList.remove("hash-jump");
        updateActiveSection();
      }, 60);
    }

    updateActiveSection();
    window.addEventListener("scroll", queueActiveSection, { passive: true });
    window.addEventListener("resize", queueActiveSection);

    return () => {
      window.clearTimeout(hashTimer);
      window.cancelAnimationFrame(activeFrame);
      window.removeEventListener("scroll", queueActiveSection);
      window.removeEventListener("resize", queueActiveSection);
      root.classList.remove("hash-jump");
    };
  }, []);

  return (
    <main>
      <nav className="site-nav" aria-label="Page sections">
        <a className="site-nav__brand" href="#top" aria-current={activeSection === "top" ? "page" : undefined}>
          Tony Wu
        </a>
        <div className="site-nav__links">
          {navItems.map((item) => (
            <a
              aria-current={activeSection === item.id ? "page" : undefined}
              className={activeSection === item.id ? "is-active" : undefined}
              href={`#${item.id}`}
              key={item.id}
            >
              {item.label}
            </a>
          ))}
        </div>
      </nav>

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
              Read field notes
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
            <img src="./hero-systems-briefing.webp" alt="Systems engineering briefing board with rail, model, evidence, and readiness artifacts" />
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

        <div className="project-stack">
          {featuredProjects.map((project, index) => (
            <article
              className="project-entry"
              data-reveal="project"
              key={project.title}
            >
              <div className="project-entry__meta">
                <span>{String(index + 1).padStart(2, "0")}</span>
                <span>{statusLabels[project.status]}</span>
              </div>
              <div className="project-entry__body">
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <ul aria-label={`${project.title} themes`}>
                  {project.themes.map((theme) => (
                    <li key={theme}>{theme}</li>
                  ))}
                </ul>
              </div>
              {project.link && (
                <a className="project-entry__link" href={project.link.href}>
                  Open project
                </a>
              )}
            </article>
          ))}
        </div>
      </section>

      <section className="statement" id="about" aria-labelledby="about-title">
        <div className="statement__label" data-reveal>
          <p className="section-kicker">About / Now</p>
          <p>{profile.identity.title}</p>
          <p>{profile.identity.location}</p>
        </div>
        <div className="statement__body" data-reveal>
          <h2 id="about-title">Make complexity visible. Leave teams with something they can use.</h2>
          <p>{profile.positioning.thesis}</p>
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
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section writing" id="writing" aria-labelledby="writing-title">
        <header className="section-heading" data-reveal>
          <div>
            <p className="section-kicker">Writing & talks</p>
            <h2 id="writing-title">Field notes from real practice.</h2>
          </div>
          <p>
            Papers and working ideas across systems engineering tailoring, technical leadership,
            infrastructure delivery, and human-AI collaboration.
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
                </div>
              </article>
            ))}
          </div>
          <aside className="publication-index" data-reveal aria-label="Public record">
            <p className="section-kicker">Public record</p>
            {profile.publications.slice(0, 3).map((item) => (
              <article key={item.title}>
                <p className="type-label">{item.kind}</p>
                <h3>{item.title}</h3>
                <p>{item.status}</p>
                {item.link && <a href={item.link.href}>{item.link.label}</a>}
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
              <p>{chapter.summary}</p>
            </article>
          ))}
        </div>
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
  );
}

export default App;
