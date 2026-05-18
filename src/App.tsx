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
          <div className="hero__meta" aria-label="Professional scope">
            <span>{profile.identity.title}</span>
            <span>{profile.identity.location}</span>
            <span>Lifecycle SE implementation</span>
            <span>AI builder and INCOSE contributor</span>
          </div>
          <div className="hero__actions" aria-label="Primary links">
            {profile.links.map((link) => (
              <a className="button" href={link.href} key={link.href}>
                {link.label}
              </a>
            ))}
            <a className="button button--quiet" href="#delivery">
              Delivery portfolio
            </a>
          </div>
        </div>

        <div className="hero__visual" aria-label="Systems engineering practice studio">
          <img src="./systems-practice-studio.svg" alt="" />
          <div className="visual-caption">
            <span>lifecycle SE</span>
            <span>technical leadership</span>
            <span>AI lab</span>
            <span>professional society</span>
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
          <h2 id="thesis-title">Project delivery is a system.</h2>
        </div>
        <p>{profile.positioning.thesis}</p>
      </section>

      <section className="section persona" aria-labelledby="persona-title">
        <div className="section-heading section-heading--wide">
          <p className="section-kicker">Operating range</p>
          <h2 id="persona-title">Engineer at work. Builder after hours. Practice leader in public.</h2>
        </div>
        <div className="persona-grid">
          {profile.practiceFacets.map((facet) => (
            <article className="persona-panel" key={facet.title}>
              <h3>{facet.title}</h3>
              <p>{facet.summary}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section experience" aria-labelledby="experience-title">
        <div className="section-heading section-heading--wide">
          <p className="section-kicker">Experience map</p>
          <h2 id="experience-title">Fifteen years across controls, rail systems, assurance, and digital practice.</h2>
        </div>
        <div className="experience-grid">
          {profile.experienceChapters.map((chapter) => (
            <article className="experience-panel" key={chapter.title}>
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

      <section className="section delivery" id="delivery" aria-labelledby="delivery-title">
        <div className="section-heading section-heading--wide">
          <p className="section-kicker">Delivery portfolio</p>
          <h2 id="delivery-title">Selected project delivery work and roles.</h2>
        </div>
        <div className="delivery-list">
          {profile.deliveryWork.map((work, index) => (
            <article className="delivery-row" key={work.name}>
              <div className="delivery-row__index">{String(index + 1).padStart(2, "0")}</div>
              <div className="delivery-row__body">
                <div className="delivery-row__meta">
                  <span>{work.industry}</span>
                  <span>{work.geography}</span>
                </div>
                <h3>{work.name}</h3>
                <p className="delivery-row__role">{work.role}</p>
                <p>{work.summary}</p>
              </div>
              <ul className="delivery-row__contribution">
                {work.contribution.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section roles" aria-labelledby="roles-title">
        <div>
          <p className="section-kicker">Role pattern</p>
          <h2 id="roles-title">The recurring job: make complexity executable.</h2>
        </div>
        <div className="role-cloud">
          {profile.rolePatterns.map((role) => (
            <span key={role}>{role}</span>
          ))}
        </div>
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
          <p className="section-kicker">Builder proof</p>
          <h2 id="work-title">Public tools, frameworks, and pet projects.</h2>
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
            <code>{`<a href="${profile.canonicalUrl}">Built by Tony Wu</a> - systems engineering tools, assurance workflows, and learning simulations.`}</code>
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
            Best fit: major-program systems integration, rail/transit technical
            assurance, operational readiness, MBSE adoption, and project delivery
            workflows that need sharper evidence and clearer decisions.
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
