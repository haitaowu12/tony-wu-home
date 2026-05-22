import { useEffect, useState } from "react";
import { profile } from "./content/profile";
import type { SelectedProject } from "./content/profile";

const statusLabels = {
  public: "Public",
  prototype: "Prototype",
  "local-private": "Local/private",
};

const visibleNoteLimit = 4;

const navItems = [
  { id: "practice", label: "Practice" },
  { id: "principles", label: "Principles" },
  { id: "notes", label: "Field notes" },
  { id: "lab", label: "Lab" },
  { id: "proof", label: "Background" },
  { id: "delivery", label: "Experience" },
  { id: "contact", label: "Contact" },
];

function App() {
  const [showAllNotes, setShowAllNotes] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const hasMoreNotes = profile.fieldNotes.length > visibleNoteLimit;
  const visibleNotes = showAllNotes
    ? profile.fieldNotes
    : profile.fieldNotes.slice(0, visibleNoteLimit);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      return;
    }

    document.documentElement.classList.add("motion-ready");

    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));

    if (!("IntersectionObserver" in window)) {
      revealItems.forEach((item) => item.classList.add("is-visible"));
      return;
    }

    revealItems.forEach((item, index) => {
      item.style.setProperty("--reveal-order", String(index % 8));
    });

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -14% 0px", threshold: 0.1 },
    );

    revealItems.forEach((item) => revealObserver.observe(item));

    return () => {
      revealObserver.disconnect();
    };
  }, [showAllNotes]);

  useEffect(() => {
    const sectionIds = ["top", ...navItems.map((item) => item.id)];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!("IntersectionObserver" in window)) {
      return;
    }

    const navObserver = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      { rootMargin: "-35% 0px -55% 0px", threshold: [0.05, 0.2, 0.45] },
    );

    sections.forEach((section) => navObserver.observe(section));

    return () => {
      navObserver.disconnect();
    };
  }, []);

  return (
    <main>
      <nav className="site-nav" aria-label="Page sections">
        <a className="site-nav__brand" href="#top">
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
          <p className="eyebrow">Systems thinking / Rail and transit / MBSE / Assurance / AI practice</p>
          <h1 id="hero-title">{profile.identity.name}</h1>
          <p className="hero__title">{profile.positioning.headline}</p>
          <p className="hero__copy">{profile.positioning.subhead}</p>
          <div className="hero__meta" aria-label="Professional scope">
            <span>{profile.identity.credentials}</span>
            <span>{profile.identity.title}</span>
            <span>{profile.identity.location}</span>
            <span>Director-at-Large / Past President, INCOSE Canada</span>
          </div>
          <div className="hero__actions" aria-label="Primary links">
            <a className="button" href="#practice">
              Explore the practice
            </a>
            <a className="button button--quiet" href="#lab">
              See the lab
            </a>
          </div>
          <div className="hero__social" aria-label="External profiles">
            {profile.links.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hero__visual" aria-label="Systems engineering briefing">
          <img src="./hero-systems-briefing.webp" alt="" />
        </div>
      </section>

      <section className="proof-strip" aria-label="Professional proof points">
        {profile.proofPoints.map((item) => (
          <div className="proof-strip__item" data-reveal key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="section thesis-band" aria-labelledby="thesis-title" data-reveal>
        <div>
          <p className="section-kicker">Personal practice</p>
          <h2 id="thesis-title">Practical systems thinking for complex delivery.</h2>
        </div>
        <p>{profile.positioning.thesis}</p>
      </section>

      <section className="section practice" id="practice" aria-labelledby="practice-title">
        <div className="section-heading section-heading--wide" data-reveal>
          <p className="section-kicker">Practice areas</p>
          <h2 id="practice-title">Where I keep sharpening the work.</h2>
        </div>
        <div className="practice-grid">
          {profile.practiceAreas.map((area) => (
            <article className="practice-panel" data-reveal key={area.title}>
              <h3>{area.title}</h3>
              <p>{area.summary}</p>
              <ul>
                {area.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section diagnostic" id="principles" aria-labelledby="principles-title">
        <div className="section-heading section-heading--wide" data-reveal>
          <p className="section-kicker">Operating principles</p>
          <h2 id="principles-title">Useful systems engineering shows up in decisions.</h2>
        </div>
        <div className="diagnostic-list">
          {profile.operatingPrinciples.map((principle, index) => (
            <article className="diagnostic-row" data-reveal key={principle.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{principle.title}</h3>
              <p>{principle.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section method" aria-labelledby="method-title" data-reveal>
        <div>
          <p className="section-kicker">Working method</p>
          <h2 id="method-title">Frame, tailor, connect, transfer.</h2>
        </div>
        <div className="method-steps">
          {profile.methodSteps.map((step) => (
            <article className="method-step" key={step.label}>
              <span>{step.label}</span>
              <h3>{step.title}</h3>
              <p>{step.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section notes" id="notes" aria-labelledby="notes-title">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">Field notes</p>
          <h2 id="notes-title">Papers, notes, and ideas in progress.</h2>
          <p className="section-intro">
            A public shelf for selected writing and thought pieces. More notes, papers, and
            working essays will be added as they become ready to share.
          </p>
        </div>
        <div className="note-list">
          {visibleNotes.map((note, index) => (
            <article className="note-row" data-reveal key={note.title}>
              <div className="note-row__index">{String(index + 1).padStart(2, "0")}</div>
              <div>
                <p className="note-row__status">{note.status}</p>
                <h3>{note.title}</h3>
              </div>
              <div className="note-row__body">
                <p>{note.summary}</p>
                {note.linkPlaceholder && <span>{note.linkPlaceholder}</span>}
              </div>
            </article>
          ))}
        </div>
        {hasMoreNotes && (
          <button
            className="notes__toggle"
            type="button"
            aria-expanded={showAllNotes}
            onClick={() => setShowAllNotes((value) => !value)}
          >
            {showAllNotes ? "Show fewer notes" : `Show ${profile.fieldNotes.length - visibleNoteLimit} more`}
          </button>
        )}
      </section>

      <section className="section work" id="lab" aria-labelledby="work-title">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">AI + Systems Lab</p>
          <h2 id="work-title">Experiments that sharpen practice.</h2>
        </div>
        <div className="project-list">
          {profile.projects.map((project: SelectedProject) => (
            <article className="project-row" data-reveal key={project.title}>
              <div className="project-row__meta">
                <span>{statusLabels[project.status]}</span>
              </div>
              <div className="project-row__body">
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <ul aria-label={`${project.title} themes`}>
                  {project.themes.map((theme) => (
                    <li key={theme}>{theme}</li>
                  ))}
                </ul>
              </div>
              <div className="project-row__link">
                {project.link ? (
                  <a href={project.link.href}>{project.link.label}</a>
                ) : (
                  <span>{project.availabilityLabel ?? "Private for now"}</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section practice-proof" id="proof" aria-labelledby="background-title">
        <div className="section-heading" data-reveal>
          <p className="section-kicker">Background</p>
          <h2 id="background-title">Professional society work and public record.</h2>
        </div>
        <div className="proof-columns">
          <div>
            <h3>Credentials, leadership, recognition</h3>
            <ul className="credential-list">
              {profile.recognition.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Public record</h3>
            <div className="publication-list">
              {profile.publications.map((item) => (
                <article className="publication-row" data-reveal key={item.title}>
                  <div>
                    <span className="type-label">{item.kind}</span>
                    <h3>{item.title}</h3>
                  </div>
                  <div>
                    <p className="publication-row__status">{item.status}</p>
                    <p>{item.summary}</p>
                    {item.link && <a href={item.link.href}>{item.link.label}</a>}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section delivery" id="delivery" aria-labelledby="delivery-title">
        <div className="section-heading section-heading--wide" data-reveal>
          <p className="section-kicker">Selected experience contexts</p>
          <h2 id="delivery-title">Experience behind the point of view.</h2>
        </div>
        <div className="experience-grid">
          {profile.experienceChapters.map((chapter) => (
            <article className="experience-panel" data-reveal key={chapter.title}>
              <div className="experience-panel__topline">
                <span>{chapter.period}</span>
                <span>{chapter.geography}</span>
              </div>
              <p className="type-label">{chapter.industry}</p>
              <h3>{chapter.title}</h3>
              <p className="experience-panel__role">{chapter.role}</p>
              <p>{chapter.summary}</p>
              <ul>
                {chapter.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section contact" id="contact" aria-labelledby="contact-title" data-reveal>
        <div>
          <p className="section-kicker">Contact</p>
          <h2 id="contact-title">Connect on LinkedIn.</h2>
        </div>
        <div>
          <p>
            The easiest way to start a professional conversation is through LinkedIn. I use this
            site to collect public writing, lab experiments, and systems engineering practice notes.
            Views are my own.
          </p>
          <div className="contact__links">
            {profile.links.map((link) => (
              <a href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default App;
