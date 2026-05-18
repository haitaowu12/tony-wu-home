import { AuthorBadge } from "./components/AuthorBadge";
import { profile } from "./content/profile";

const statusLabels = {
  public: "Public",
  prototype: "Prototype",
  "local-private": "Local/private",
};

function App() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero__content">
          <p className="eyebrow">{profile.identity.credentials}</p>
          <h1 id="hero-title">{profile.identity.name}</h1>
          <p className="hero__title">{profile.positioning.headline}</p>
          <p className="hero__copy">{profile.positioning.subhead}</p>
          <div className="hero__actions" aria-label="Primary links">
            {profile.links.map((link) => (
              <a className="button" href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
            <a className="button button--quiet" href="#work">
              Selected work
            </a>
          </div>
        </div>

        <div className="hero__visual" aria-label="Systems engineering traceability map">
          <img src="./systems-map.svg" alt="" />
          <div className="visual-caption">
            <span>requirements</span>
            <span>interfaces</span>
            <span>evidence</span>
            <span>readiness</span>
          </div>
        </div>
      </section>

      <section className="proof-strip" aria-label="Professional proof points">
        {profile.proofPoints.map((item) => (
          <div className="proof-strip__item" key={item.label}>
            <strong>{item.value}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="section thesis-band" aria-labelledby="thesis-title">
        <div>
          <p className="section-kicker">Working thesis</p>
          <h2 id="thesis-title">Governance has to become usable.</h2>
        </div>
        <p>{profile.positioning.thesis}</p>
      </section>

      <section className="section domains" aria-labelledby="domains-title">
        <div className="section-heading">
          <p className="section-kicker">Practice</p>
          <h2 id="domains-title">What I Work On</h2>
        </div>
        <div className="domain-list">
          {profile.domains.map((domain) => (
            <article className="domain-row" key={domain.title}>
              <h3>{domain.title}</h3>
              <p>{domain.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section work" id="work" aria-labelledby="work-title">
        <div className="section-heading">
          <p className="section-kicker">Proof</p>
          <h2 id="work-title">Selected Work And Pet Projects</h2>
        </div>
        <div className="project-list">
          {profile.projects.map((project) => (
            <article className="project-row" key={project.title}>
              <div className="project-row__meta">
                <span>{statusLabels[project.status]}</span>
                <span>{project.role}</span>
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
                  <span>Private for now</span>
                )}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section credentials" aria-labelledby="credentials-title">
        <div className="section-heading">
          <p className="section-kicker">Credibility</p>
          <h2 id="credentials-title">Credentials, Leadership, Recognition</h2>
        </div>
        <ul className="credential-list">
          {profile.recognition.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section className="section publications" aria-labelledby="publications-title">
        <div className="section-heading">
          <p className="section-kicker">Public record</p>
          <h2 id="publications-title">Publications And Patents</h2>
        </div>
        <div className="publication-list">
          {profile.publications.map((item) => (
            <article className="publication-row" key={item.title}>
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
      </section>

      <section className="section badge-kit" aria-labelledby="badge-title">
        <div>
          <p className="section-kicker">Reusable link</p>
          <h2 id="badge-title">Know The Author</h2>
          <p>
            A compact badge can sit in project READMEs or quiet app footers without
            taking over the workflow.
          </p>
        </div>
        <div className="badge-kit__preview">
          <AuthorBadge />
          <pre>
            <code>{`Built by [Tony Wu](${profile.canonicalUrl}) - systems engineering tools, assurance workflows, and learning simulations.`}</code>
          </pre>
        </div>
      </section>

      <section className="section contact" aria-labelledby="contact-title">
        <div>
          <p className="section-kicker">Connect</p>
          <h2 id="contact-title">Engineering judgment, made visible.</h2>
        </div>
        <div>
          <p>
            Best fit: systems engineering strategy, MBSE adoption, assurance
            workflows, technical leadership, and practical tooling for infrastructure
            delivery teams.
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
