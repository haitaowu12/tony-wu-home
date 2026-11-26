import { useEffect, useRef, useState } from "react";
import { profile, type SelectedProject } from "../content/profile";
import { usePreview } from "../components/ScreenshotViewer";
import { Icon } from "./Icons";
import { apps, projectId, projectTitle, publicProjects, statusLabel, type AppId } from "./model";

type OpenApp = (id: AppId, project?: string) => void;

export function Welcome({ open }: { open: OpenApp }) {
  return <div className="os-welcome">
    <div className="os-welcome__intro">
      <div className="os-welcome__words">
        <p className="os-kicker">Hello from Vancouver</p>
        <h1>Tony <em>Wu.</em></h1>
        <p className="os-welcome__tagline">Engineering, leadership<br />&amp; a curious mind.</p>
        <p>From aircraft engines to rail networks, my work is about how things fit together. Here are the tools, stories, and learning experiments I’m making along the way.</p>
        <div className="os-actions"><button className="os-button" onClick={() => open("projects")}>Explore my projects </button><button className="os-text-button" onClick={() => open("about")}>A little about me</button></div>
      </div>
      <figure className="os-character-stage"><div className="os-character-halo" /><span className="os-character-orbit" aria-hidden="true" /><img src="./tony/standing.png" width="362" height="362" alt="Tony’s pixel-art character, wearing black glasses and a backpack" /><figcaption>A curious mind, at work.</figcaption></figure>
    </div>
    <nav className="os-home-apps" aria-label="Explore Tony OS">{apps.filter(app => app.id !== "welcome").map(app => <button key={app.id} onClick={() => open(app.id)}><span className={`os-app-icon os-${app.color}`}><Icon name={app.icon} size={29} /></span><strong>{app.title}</strong></button>)}</nav>
    <div className="os-welcome__shelf" aria-label="Places to start">
      <button onClick={() => open("projects", "modeling-lab")}><span className="os-shelf-icon os-blue"><Icon name="folder" size={25} /></span><span><strong>Make a model</strong><small>Explore Modeling Lab</small></span></button>
      <button onClick={() => open("atlas")}><span className="os-shelf-icon os-sky"><Icon name="globe" size={25} /></span><span><strong>Follow a history</strong><small>Open the World Atlas</small></span></button>
      <button onClick={() => open("play")}><span className="os-shelf-icon os-gold"><Icon name="play" size={25} /></span><span><strong>Learn through play</strong><small>Visit the playground</small></span></button>
    </div>
  </div>;
}

export function ProjectDetail({ project, back }: { project: SelectedProject; back?: () => void }) {
  const openPreview = usePreview();
  return <article className="os-project-detail">
    {back && <button className="os-back" onClick={back}> All projects</button>}
    <header><p className="os-kicker">{statusLabel(project)}</p><h2 tabIndex={-1}>{projectTitle(project)}{project.chineseTitle && <span lang="zh">{project.chineseTitle}</span>}</h2><p className="os-detail-lead">{project.teaser ?? project.summary}</p></header>
    <div className="os-actions">
      {project.link && <a className="os-button" href={project.link.href} target="_blank" rel="noopener noreferrer">{project.link.label === "Open" ? `Open ${projectTitle(project)}` : project.link.label}<span className="os-sr-only"> (opens in a new tab)</span></a>}
      {project.learningGuide && <a className="os-text-link" href={project.learningGuide.href} target="_blank" rel="noopener noreferrer">{project.learningGuide.label}<span className="os-sr-only"> (opens in a new tab)</span></a>}
    </div>
    {project.preview && <figure className="os-project-image"><a href={project.preview.src} aria-label={`View full screenshot: ${projectTitle(project)}`} aria-haspopup="dialog" onClick={event => {
      if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || typeof HTMLDialogElement === "undefined") return;
      event.preventDefault(); openPreview({ project, trigger: event.currentTarget });
    }}><img src={project.preview.src} srcSet={`${project.preview.smallSrc} 720w, ${project.preview.src} ${project.preview.width}w`} sizes="(max-width: 760px) 90vw, 800px" width={project.preview.width} height={project.preview.height} alt={project.preview.alt} loading="lazy" /><span><Icon name="maximize" size={15} /> Enlarge screenshot</span></a></figure>}
    <div className="os-project-copy">
      {project.teaser && <p>{project.summary}</p>}
      {project.origin && <section><h3>Why I built it</h3>{project.origin.map(paragraph => <p key={paragraph}>{paragraph}</p>)}</section>}
      {project.group === "atlas" && <section><h3>How the atlas grew</h3><p>{profile.atlasStory.basis}</p><a className="os-text-link" href={profile.atlasStory.source.href} target="_blank" rel="noopener noreferrer">{profile.atlasStory.source.label}<span className="os-sr-only"> (opens in a new tab)</span></a></section>}
      {project.title === "SE Tailoring Model" && <section><h3>The tailoring approach</h3>{profile.featuredStory.steps.map(step => <div key={step.label}><h4>{step.title}</h4><p>{step.text}</p></div>)}</section>}
      {project.resources && <section><h3>Keep exploring</h3><ul className="os-resource-list">{project.resources.map(link => <li key={link.href}><a href={link.href} target="_blank" rel="noopener noreferrer">{link.label}<span className="os-sr-only"> (opens in a new tab)</span></a></li>)}</ul></section>}
      <ul className="os-tags" aria-label="Topics">{project.themes.map(theme => <li key={theme}>{theme}</li>)}</ul>
    </div>
  </article>;
}

const categories = [{ id: "all", title: "Everything", icon: "grid" }, { id: "engineering", title: "Engineering", icon: "folder" }, { id: "history", title: "History", icon: "globe" }, { id: "learning", title: "Learning & play", icon: "play" }];
const belongs = (project: SelectedProject, category: string) => category === "all" || (category === "engineering" && (project.group === "tool" || project.group === "anatomy")) || (category === "history" && project.group === "atlas") || (category === "learning" && project.group === "learning");
const orderedProjects = [...publicProjects].sort((a, b) => {
  const order = ["World History Atlas", "Modeling Lab", "SE Learning Quest"];
  return (order.indexOf(a.title) < 0 ? 99 : order.indexOf(a.title)) - (order.indexOf(b.title) < 0 ? 99 : order.indexOf(b.title));
});

export function Projects({ selected, select }: { selected?: string; select: (id?: string) => void }) {
  const [category, setCategory] = useState("all");
  const [query, setQuery] = useState("");
  const surface = useRef<HTMLDivElement>(null);
  const collections = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const listScroll = useRef(0);
  const previousSelection = useRef(selected);
  const project = publicProjects.find(item => projectId(item) === selected);
  const filtered = orderedProjects.filter(item => belongs(item, category) && `${projectTitle(item)} ${item.summary} ${item.themes.join(" ")}`.toLowerCase().includes(query.toLowerCase().trim()));
  useEffect(() => {
    const controls = collections.current;
    if (!controls) return;
    const measure = () => {
      const selectedButton = controls.querySelector<HTMLButtonElement>(`[data-category="${category}"]`);
      if (selectedButton) setIndicator({ x: selectedButton.offsetLeft, y: selectedButton.offsetTop, width: selectedButton.offsetWidth, height: selectedButton.offsetHeight });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(controls);
    return () => observer.disconnect();
  }, [category, project]);
  useEffect(() => {
    const previous = previousSelection.current;
    previousSelection.current = selected;
    if (previous === selected) return;
    if (project) {
      surface.current?.closest(".os-window-content")?.scrollTo(0, 0);
      surface.current?.querySelector<HTMLElement>(".os-project-detail h2")?.focus({ preventScroll: true });
    } else if (previous) {
      const list = surface.current?.querySelector<HTMLElement>(".os-project-list");
      if (list) list.scrollTop = listScroll.current;
      const card = surface.current?.querySelector<HTMLButtonElement>(`[data-project-id="${previous}"]`);
      card?.focus({ preventScroll: true });
    }
  }, [selected, project]);
  if (project) return <div className="os-projects-root" ref={surface}><ProjectDetail project={project} back={() => select(undefined)} /></div>;
  return <div className="os-projects-root" ref={surface}><div className="os-project-browser">
    <aside className="os-project-sidebar" aria-label="Project collections"><p className="os-kicker">Collections</p><div className="os-collection-controls" ref={collections}><span className="os-collection-indicator" aria-hidden="true" style={{ width: indicator.width, height: indicator.height, transform: `translate(${indicator.x}px, ${indicator.y}px)` }} />{categories.map(item => <button key={item.id} data-category={item.id} className={category === item.id ? "is-selected" : ""} aria-pressed={category === item.id} onClick={() => setCategory(item.id)}><Icon name={item.icon} size={18} />{item.title}<span>{publicProjects.filter(project => belongs(project, item.id)).length}</span></button>)}</div><p className="os-sidebar-note">Things I make to understand how things work.</p></aside>
    <div className="os-project-list" onScroll={event => { listScroll.current = event.currentTarget.scrollTop; }}><header className="os-list-header"><div><p className="os-kicker">The project shelf</p><h2>{categories.find(item => item.id === category)?.title}</h2></div><label className="os-inline-search"><Icon name="search" size={17} /><input type="search" aria-label="Filter projects" placeholder="Find a project" value={query} onChange={event => setQuery(event.target.value)} /></label></header>
      <p className="os-result-count" aria-live="polite">{filtered.length} {filtered.length === 1 ? "project" : "projects"}</p>
      {filtered.length ? <div className="os-project-grid" key={category}>{filtered.map(item => <button className="os-project-card" key={item.title} data-project-id={projectId(item)} onClick={() => select(projectId(item))}>
        <div className={`os-project-card__image os-${item.group === "atlas" ? "sky" : item.group === "learning" ? "gold" : "blue"}`}>{item.preview ? <img src={item.preview.smallSrc} alt="" width={item.preview.width} height={item.preview.height} loading="lazy" /> : <Icon name={item.group === "learning" ? "play" : "folder"} size={48} />}</div>
        <div className="os-project-card__text"><small>{statusLabel(item)}</small><h3>{projectTitle(item)}</h3><p>{item.teaser ?? item.summary}</p><span>Explore project </span></div>
      </button>)}</div> : <div className="os-empty"><Icon name="search" size={32} /><h3>No matching projects</h3><p>Try another word or explore the full shelf.</p><button className="os-button" onClick={() => { setQuery(""); setCategory("all"); }}>Show all projects</button></div>}
    </div>
  </div></div>;
}

export function Playground({ open }: { open: OpenApp }) {
  const asterfall = publicProjects.find(item => item.title === "SE Learning Quest")!;
  return <div className="os-playground"><header><p className="os-kicker">Learning through play</p><h2>A decision. A consequence.<br /><em>A different way to learn.</em></h2><p>Stories, exercises, and workshop games for exploring systems, leadership, and how people work together.</p></header>
    <button className="os-play-feature" onClick={() => open("projects", projectId(asterfall))}><img src={asterfall.preview!.src} width={asterfall.preview!.width} height={asterfall.preview!.height} alt={asterfall.preview!.alt} /><span><small>Game prototype</small><strong>Asterfall: The Last Relay</strong><span>{profile.learningStory.title}</span><b>Enter the story </b></span></button>
    <div className="os-play-list">{publicProjects.filter(item => item.group === "learning" && item !== asterfall).map(item => <button key={item.title} onClick={() => open("projects", projectId(item))}><span className="os-shelf-icon os-gold"><Icon name="play" size={24} /></span><span><small>{statusLabel(item)}</small><strong>{item.title}</strong><span>{item.teaser}</span></span></button>)}</div>
  </div>;
}

export function About() {
  return <article className="os-reading os-about"><header><span className="os-monogram"><img src="./tony/neutral.png" width="362" height="362" alt="Tony’s pixel-art portrait" /></span><div><p className="os-kicker">The person behind the desk</p><h2>{profile.identity.fullName}</h2><p>{profile.identity.title}<br />{profile.identity.credentials}</p></div></header>
    <h3>{profile.about.title}</h3>{profile.about.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
    <section><h3>How I work</h3><ol className="os-practice">{profile.practice.map((step, index) => <li key={step.title}><span>0{index + 1}</span><div><h4>{step.title}</h4><p>{step.summary}</p></div></li>)}</ol></section>
    <section><h3>Professional community</h3><p>{profile.community}</p></section>
    <details><summary>Experience &amp; credentials</summary>{profile.experienceChapters.map(chapter => <section key={chapter.title}><p className="os-kicker">{chapter.period} · {chapter.industry}</p><h4>{chapter.title}</h4><p>{chapter.role}</p><p>{chapter.summary}</p><ul>{chapter.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}</ul></section>)}<h4>Recognition &amp; credentials</h4><ul>{profile.recognition.map(item => <li key={item}>{item}</li>)}</ul></details>
  </article>;
}

export function Research() {
  return <article className="os-reading os-research"><header><p className="os-kicker">Papers, patents & practice</p><h2>Research &amp; publications.</h2><p>Ideas to examine, methods to try, and questions still in progress.</p></header>
    {profile.publications.map(item => <section key={item.title}><p className="os-kicker">{item.kind === "patent" ? "Patent" : "Conference work"}</p><h3>{item.title}</h3><p className="os-citation">{item.status}</p><p>{item.summary}</p>{item.link && <a className="os-text-link" href={item.link.href} target="_blank" rel="noopener noreferrer">{item.link.label}<span className="os-sr-only"> (opens in a new tab)</span></a>}</section>)}
    <details><summary>Research in progress</summary>{profile.fieldNotes.slice(1).map(note => <section key={note.title}><p className="os-kicker">{note.status}</p><h3>{note.title}</h3><p>{note.summary}</p>{"link" in note && note.link && <a className="os-text-link" href={note.link.href} target="_blank" rel="noopener noreferrer">{note.link.label}<span className="os-sr-only"> (opens in a new tab)</span></a>}</section>)}</details>
  </article>;
}

export function Contact() {
  return <article className="os-contact"><span className="os-shelf-icon os-blue"><Icon name="mail" size={32} /></span><p className="os-kicker">A conversation starts here</p><h2>Let’s compare notes.</h2><p>Working through a systems integration question, exploring responsible AI in engineering, or developing a learning idea? Send me a note on LinkedIn with a little context and what you’d like to explore together.</p><div className="os-actions"><a className="os-button" href={profile.links[0].href} target="_blank" rel="noopener noreferrer">Contact me on LinkedIn<span className="os-sr-only"> (opens in a new tab)</span></a><a className="os-text-link" href="https://github.com/haitaowu12" target="_blank" rel="noopener noreferrer">Explore my GitHub<span className="os-sr-only"> (opens in a new tab)</span></a></div></article>;
}
