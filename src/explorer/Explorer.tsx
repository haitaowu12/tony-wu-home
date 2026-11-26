import { useCallback, useEffect, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { flushSync } from "react-dom";
import { PreviewProvider } from "../components/ScreenshotViewer";
import { Welcome, Projects, ProjectDetail, Playground, About, Research, Contact } from "./AppViews";
import { Icon } from "./Icons";
import { apps, fitWindow, isAppId, makeWindow, projectId, projectTitle, publicProjects, type AppId, type Bounds, type DesktopWindow } from "./model";
import { cancelSurfaceMotion, enterSurface, exitSurface, reducedMotion, useModalMotion } from "./motion";

const appFor = (id: AppId) => apps.find(app => app.id === id)!;

function Search({ visible, close, open }: { visible: boolean; close: () => void; open: (id: AppId, project?: string) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const dismiss = useModalMotion(dialog, visible, close);
  useEffect(() => {
    if (visible) { setQuery(""); input.current?.focus(); }
  }, [visible]);
  const term = query.trim().toLowerCase();
  const matchingApps = apps.filter(app => `${app.title} ${app.subtitle}`.toLowerCase().includes(term));
  const matchingProjects = publicProjects.filter(project => `${projectTitle(project)} ${project.themes.join(" ")} ${project.summary}`.toLowerCase().includes(term));
  const launch = (id: AppId, project?: string) => dismiss(() => open(id, project));
  return <dialog className="os-search-dialog" ref={dialog} aria-labelledby="os-search-title" onClose={close} onCancel={event => { event.preventDefault(); dismiss(); }} onKeyDownCapture={event => {
    if (event.key !== "Escape" || event.nativeEvent.isComposing) return;
    event.preventDefault(); event.stopPropagation(); dismiss();
  }}>
    <header><h2 id="os-search-title">Find your way around</h2><button className="os-icon-button" onClick={() => dismiss()} aria-label="Close search"><Icon name="close" /></button></header>
    <label className="os-search-input"><Icon name="search" size={23} /><input ref={input} type="search" aria-label="Search apps and projects" placeholder="Search projects, ideas, places…" value={query} onChange={event => setQuery(event.target.value)} autoComplete="off" /></label>
    <div className="os-search-results"><p className="os-sr-only" role="status">{matchingApps.length + matchingProjects.length} results</p>
      {matchingApps.length > 0 && <section><h3>On this desktop</h3>{matchingApps.map(app => <button key={app.id} onClick={() => launch(app.id)}><span className="os-shelf-icon"><img src={`./icons/${app.icon}.svg`} alt="" className="os-app-art" /></span><span><strong>{app.title}</strong><small>{app.subtitle}</small></span></button>)}</section>}
      {matchingProjects.length > 0 && <section><h3>Projects</h3>{matchingProjects.map(project => <button key={project.title} onClick={() => launch("projects", projectId(project))}><span className="os-shelf-icon"><img src={`./icons/${project.group === "learning" ? "play" : project.group === "atlas" ? "globe" : "folder"}.svg`} alt="" className="os-app-art" /></span><span><strong>{projectTitle(project)}</strong><small>{project.themes.slice(0, 2).join(" · ")}</small></span></button>)}</section>}
      {!matchingApps.length && !matchingProjects.length && <div className="os-empty"><h3>No results for “{query}”</h3><p>Try a topic such as history, rail, models or learning.</p><button className="os-text-button" onClick={() => { setQuery(""); input.current?.focus(); }}>Clear search</button></div>}
    </div>
    <footer><span>Tab to explore · Enter to open</span><kbd>Esc</kbd> to close</footer>
  </dialog>;
}

function AppsSheet({ visible, close, open }: { visible: boolean; close: () => void; open: (id: AppId) => void }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const dismiss = useModalMotion(dialog, visible, close, true);
  return <dialog ref={dialog} className="os-apps-dialog" aria-labelledby="os-apps-title" onClose={close} onCancel={event => { event.preventDefault(); dismiss(); }}>
    <header><div><p className="os-kicker">Make yourself at home</p><h2 id="os-apps-title">All apps</h2></div><button className="os-icon-button" onClick={() => dismiss()} aria-label="Close apps"><Icon name="close" /></button></header>
    <div className="os-apps-sheet-grid">{apps.map(app => <button key={app.id} onClick={() => dismiss(() => open(app.id))}><span className="os-app-icon"><img src={`./icons/${app.icon}.svg`} alt="" className="os-app-art" /></span><strong>{app.title}</strong><small>{app.subtitle}</small></button>)}</div>
  </dialog>;
}

function Window({ window: item, active, bounds, update, focus, close, back, backLabel, children }: { window: DesktopWindow; active: boolean; bounds: Bounds; update: (change: Partial<DesktopWindow>) => void; focus: () => void; close: () => void; back: () => void; backLabel: string; children: ReactNode }) {
  const surface = useRef<HTMLElement>(null);
  const previouslyVisible = useRef(false);
  const drag = useRef<{ startX: number; startY: number; x: number; y: number; width: number; height: number; resize: boolean } | null>(null);
  const app = appFor(item.id);
  const phone = bounds.width <= 760;
  useEffect(() => {
    const visible = !item.minimized && (active || bounds.width > 760);
    if (visible && !previouslyVisible.current) enterSurface(surface.current);
    previouslyVisible.current = visible;
  }, [item.minimized, active, bounds.width]);
  const start = (event: ReactPointerEvent<HTMLButtonElement>, resize = false) => {
    if (event.button !== 0 || item.maximized || window.matchMedia("(max-width: 760px)").matches) return;
    focus();
    drag.current = { startX: event.clientX, startY: event.clientY, x: item.x, y: item.y, width: item.width, height: item.height, resize };
    event.currentTarget.setPointerCapture(event.pointerId);
  };
  const move = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!drag.current) return;
    const origin = drag.current, dx = event.clientX - origin.startX, dy = event.clientY - origin.startY;
    update(fitWindow({ ...item, x: origin.resize ? origin.x : origin.x + dx, y: origin.resize ? origin.y : origin.y + dy, width: origin.resize ? Math.max(420, origin.width + dx) : origin.width, height: origin.resize ? Math.max(300, origin.height + dy) : origin.height }, bounds));
  };
  const stop = () => { drag.current = null; };
  const style: CSSProperties = item.maximized ? { inset: 10, width: "calc(100% - 20px)", height: "calc(100% - 20px)", zIndex: item.z } : { left: item.x, top: item.y, width: item.width, height: item.height, zIndex: item.z };
  return <section ref={surface} className={`os-window${active ? " is-active" : ""}${item.maximized ? " is-maximized" : ""}`} style={style} hidden={item.minimized} data-window={item.id} role="region" aria-labelledby={`os-window-title-${item.id}`} onPointerDown={focus} onFocusCapture={focus} tabIndex={-1}>
    <div className="os-window-bar">
      <button className="os-window-back" onClick={back} aria-label={backLabel}>Back</button>
      {phone ? <span className="os-window-title" id={`os-window-title-${item.id}`}><Icon name={app.icon} size={17} /><span>{app.title}</span></span> : <button className="os-window-title" id={`os-window-title-${item.id}`} onPointerDown={event => start(event)} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={stop} onDoubleClick={() => update({ maximized: !item.maximized })} onKeyDown={event => {
        if (!event.key.startsWith("Arrow") || item.maximized || window.matchMedia("(max-width: 760px)").matches) return;
        event.preventDefault(); const distance = event.shiftKey ? 40 : 12;
        update(fitWindow({ ...item, x: item.x + (event.key === "ArrowRight" ? distance : event.key === "ArrowLeft" ? -distance : 0), y: item.y + (event.key === "ArrowDown" ? distance : event.key === "ArrowUp" ? -distance : 0) }, bounds));
      }} title="Drag to move. Use arrow keys when focused. Double-click to maximize."><Icon name={app.icon} size={17} /><span>{app.title}</span><span className="os-window-grip" aria-hidden="true">······</span></button>}
      <div className="os-window-controls"><button aria-label={`Minimize ${app.title}`} title="Minimize" onClick={() => update({ minimized: true })}><Icon name="minimize" size={17} /></button><button className="os-window-maximize" aria-label={`${item.maximized ? "Restore" : "Maximize"} ${app.title}`} title={item.maximized ? "Restore" : "Maximize"} onClick={() => update({ maximized: !item.maximized })}><Icon name={item.maximized ? "restore" : "maximize"} size={15} /></button><button className="os-window-close" aria-label={`Close ${app.title}`} title="Close" onClick={close}><Icon name="close" size={17} /></button></div>
    </div>
    <div className="os-window-content">{children}</div>
    <div className="os-window-status"><span><i aria-hidden="true" /> Tony Wu · Public explorer</span><span>{app.subtitle}</span></div>
    {!item.maximized && <button className="os-window-resize" aria-label={`Resize ${app.title}. Use arrow keys.`} title="Drag to resize, or use arrow keys" onPointerDown={event => start(event, true)} onPointerMove={move} onPointerUp={stop} onPointerCancel={stop} onLostPointerCapture={stop} onKeyDown={event => {
      if (!event.key.startsWith("Arrow")) return;
      event.preventDefault(); update(fitWindow({ ...item, width: Math.max(420, item.width + (event.key === "ArrowRight" ? 24 : event.key === "ArrowLeft" ? -24 : 0)), height: Math.max(300, item.height + (event.key === "ArrowDown" ? 24 : event.key === "ArrowUp" ? -24 : 0)) }, bounds));
    }} />}
  </section>;
}

export default function Explorer() {
  const desktop = useRef<HTMLDivElement>(null);
  const bounds = useRef<Bounds>({ width: 1200, height: 760 });
  const [size, setSize] = useState(bounds.current);
  const [windows, setWindows] = useState<DesktopWindow[]>([]);
  const [selectedProject, setSelectedProject] = useState<string>();
  const [searchVisible, setSearchVisible] = useState(false);
  const [appsVisible, setAppsVisible] = useState(false);
  const [helpVisible, setHelpVisible] = useState(false);
  const [motionPreference, setMotionPreference] = useState<"system" | "full" | "reduced">("system");
  const [clock, setClock] = useState("");
  const [announcement, setAnnouncement] = useState("");
  const help = useRef<HTMLDialogElement>(null);
  const initialized = useRef(false);
  const topZ = useRef(1);
  const pendingDismissalFocus = useRef<AppId | null>(null);
  const projectTransition = useRef<ViewTransition | null>(null);
  const transitionGeneration = useRef(0);
  const closeHelp = useModalMotion(help, helpVisible, () => setHelpVisible(false));
  const activeId = [...windows].filter(item => !item.minimized).sort((a, b) => b.z - a.z)[0]?.id;

  const focusWindow = useCallback((id: AppId) => {
    setWindows(current => {
      const item = current.find(item => item.id === id);
      const highest = Math.max(0, ...current.filter(item => !item.minimized).map(item => item.z));
      if (!item || (!item.minimized && item.z === highest)) return current;
      return current.map(item => item.id === id ? { ...item, z: ++topZ.current, minimized: false } : item);
    });
  }, []);
  const focusContent = (id: AppId) => requestAnimationFrame(() => {
    const area = document.querySelector<HTMLElement>(`[data-window="${id}"]`);
    const heading = area?.querySelector<HTMLElement>("h1, h2");
    if (heading) { heading.tabIndex = -1; heading.focus({ preventScroll: true }); }
    else area?.focus({ preventScroll: true });
  });
  const updateUrl = (id?: AppId, project?: string) => {
    const url = new URL(window.location.href);
    url.searchParams.set("view", "explorer");
    if (id && id !== "welcome") url.searchParams.set("app", id); else url.searchParams.delete("app");
    if (project) url.searchParams.set("project", project); else url.searchParams.delete("project");
    url.hash = "";
    window.history.replaceState(null, "", url);
  };
  const open = useCallback((id: AppId, project?: string) => {
    cancelSurfaceMotion(document.querySelector<HTMLElement>(`[data-window="${id}"]`));
    if (id === "projects") setSelectedProject(project);
    setWindows(current => current.some(item => item.id === id)
      ? current.map(item => item.id === id ? { ...item, minimized: false, z: ++topZ.current } : item)
      : [...current, { ...makeWindow(id, bounds.current, current.length), z: ++topZ.current }]);
    updateUrl(id, project);
    setAnnouncement(`${appFor(id).title} opened`);
    focusContent(id);
  }, []);
  const update = (id: AppId, change: Partial<DesktopWindow>) => {
    const commit = () => {
      if (change.minimized) pendingDismissalFocus.current = id;
      setWindows(current => current.map(item => item.id === id ? { ...item, ...change } : item));
      if (change.minimized) setAnnouncement(`${appFor(id).title} minimized. Reopen it from the dock.`);
    };
    if (change.minimized) exitSurface(document.querySelector<HTMLElement>(`[data-window="${id}"]`), commit);
    else commit();
  };
  const close = (id: AppId) => exitSurface(document.querySelector<HTMLElement>(`[data-window="${id}"]`), () => { pendingDismissalFocus.current = id; setWindows(current => current.filter(item => item.id !== id)); setAnnouncement(`${appFor(id).title} closed`); updateUrl(); });
  const select = (id?: string) => {
    const commit = () => { flushSync(() => setSelectedProject(id)); updateUrl("projects", id); };
    if (reducedMotion() || !document.startViewTransition) { commit(); return; }
    // Motion Prompt #161 · MIT License (c) 2026 Shohei Ohtaki
    // https://showheyohtaki.github.io/motion-prompt/#161
    const generation = ++transitionGeneration.current;
    projectTransition.current?.skipTransition();
    const area = document.querySelector<HTMLElement>('[data-window="projects"] .os-window-content');
    const target = id ?? selectedProject;
    const imageSelector = id ? `[data-project-id="${target}"] img` : ".os-project-image img";
    const sourceImage = area?.querySelector<HTMLElement>(imageSelector);
    if (sourceImage) sourceImage.style.viewTransitionName = "os-project-image";
    if (area) area.style.viewTransitionName = "os-project-panel";
    const transition = document.startViewTransition(() => {
      commit();
      const image = area?.querySelector<HTMLElement>(id ? ".os-project-image img" : `[data-project-id="${target}"] img`);
      if (image) image.style.viewTransitionName = "os-project-image";
    });
    projectTransition.current = transition;
    void transition.ready.catch(() => {});
    void transition.finished.catch(() => {}).finally(() => {
      if (generation !== transitionGeneration.current) return;
      if (area) { area.style.viewTransitionName = ""; area.querySelectorAll<HTMLElement>("img").forEach(image => { image.style.viewTransitionName = ""; }); }
      projectTransition.current = null;
    });
  };

  // Run after the dismissed window is hidden/removed, so focus cannot return to
  // an element that React is about to remove or to an inactive mobile window.
  useEffect(() => {
    const dismissed = pendingDismissalFocus.current;
    if (!dismissed) return;
    pendingDismissalFocus.current = null;
    const remaining = [...windows].filter(item => !item.minimized).sort((a, b) => b.z - a.z)[0];
    if (remaining) {
      const area = document.querySelector<HTMLElement>(`[data-window="${remaining.id}"]`);
      const target = area?.querySelector<HTMLElement>("h1, h2") ?? area?.querySelector<HTMLElement>(".os-window-title");
      if (target) { target.tabIndex = -1; target.focus({ preventScroll: true }); return; }
    }
    const launcher = window.matchMedia("(max-width: 760px)").matches ? '[data-mobile-app="home"]' : `.os-dock [data-app="${dismissed}"]`;
    document.querySelector<HTMLButtonElement>(launcher)?.focus({ preventScroll: true });
  }, [windows]);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => { document.documentElement.dataset.osReduce = String(motionPreference === "reduced" || (motionPreference === "system" && media.matches)); };
    sync(); media.addEventListener("change", sync);
    return () => { media.removeEventListener("change", sync); delete document.documentElement.dataset.osReduce; };
  }, [motionPreference]);

  useEffect(() => {
    document.documentElement.classList.add("os-mode");
    const measure = () => {
      if (!desktop.current) return;
      const rect = desktop.current.getBoundingClientRect();
      const wasPhone = bounds.current.width <= 760;
      bounds.current = { width: rect.width, height: rect.height }; setSize(bounds.current);
      if (rect.width > 760) setWindows(current => current.map((item, index) => wasPhone ? { ...makeWindow(item.id, bounds.current, index), minimized: item.minimized, maximized: item.maximized, z: item.z } : fitWindow(item, bounds.current)));
    };
    measure();
    if (!initialized.current) {
      initialized.current = true;
      const params = new URLSearchParams(window.location.search);
      const app = params.get("app");
      open(isAppId(app) ? app : "welcome", params.get("project") ?? undefined);
    }
    const observer = new ResizeObserver(measure);
    if (desktop.current) observer.observe(desktop.current);
    const updateClock = () => setClock(new Intl.DateTimeFormat("en-CA", { timeZone: "America/Vancouver", hour: "numeric", minute: "2-digit" }).format(new Date()));
    updateClock(); const timer = window.setInterval(updateClock, 30000);
    const keydown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k" && !event.isComposing) {
        event.preventDefault(); if (!document.querySelector("dialog[open]")) setSearchVisible(true);
      }
    };
    window.addEventListener("keydown", keydown);
    return () => { observer.disconnect(); window.clearInterval(timer); window.removeEventListener("keydown", keydown); document.documentElement.classList.remove("os-mode"); };
  }, [open]);
  const showDesktop = () => { setWindows(current => current.map(item => ({ ...item, minimized: true }))); setAnnouncement("Desktop shown. Open a window from the dock."); };
  const content = (id: AppId) => {
    switch (id) {
      case "welcome": return <Welcome open={open} />;
      case "projects": return <Projects selected={selectedProject} select={select} />;
      case "atlas": return <ProjectDetail project={publicProjects.find(project => project.group === "atlas")!} />;
      case "play": return <Playground open={open} />;
      case "about": return <About />;
      case "research": return <Research />;
      case "contact": return <Contact />;
    }
  };
  return <PreviewProvider projects={publicProjects}>
    <div className="tony-os">
      <a className="os-skip" href="#os-desktop-apps">Skip to apps</a>
      <header className="os-menubar"><button className="os-brand" onClick={() => open("welcome")} aria-label="Tony OS home"><span><img src="./tony/neutral.png" width="362" height="362" alt="" /></span><strong>Tony OS</strong><span className="os-version">Explorer</span></button><nav aria-label="Desktop controls"><button aria-label="Open search" onClick={() => setSearchVisible(true)}><Icon name="search" size={17} /><span>Search</span><kbd>⌘ K</kbd></button><button onClick={() => setHelpVisible(true)}>Help</button></nav><div className="os-menubar-location"><span>Vancouver</span><time aria-label={`Current time in Vancouver: ${clock}`}>{clock}</time></div></header>
      <main className="os-desktop" ref={desktop} aria-label="Tony OS desktop">
        <nav className="os-desktop-apps" id="os-desktop-apps" aria-label="Open an app" inert={size.width <= 760 && Boolean(activeId)}>{apps.filter(app => app.id !== "welcome").map(app => <button key={app.id} onClick={() => open(app.id)}><span className="os-app-icon"><img src={`./icons/${app.icon}.svg`} alt="" className="os-app-art" /></span><span>{app.title}</span></button>)}</nav>
        {windows.map(item => <Window key={item.id} window={item} active={activeId === item.id} bounds={size} focus={() => focusWindow(item.id)} update={change => update(item.id, change)} close={() => close(item.id)} back={() => item.id === "projects" && selectedProject ? select(undefined) : open("welcome")} backLabel={item.id === "projects" && selectedProject ? "Back to projects" : "Back to Home"}>{content(item.id)}</Window>)}
      </main>
      <footer className="os-footer"><p>Explore the desk. Follow your curiosity.</p><nav className="os-dock" aria-label="Application dock"><button className="os-dock-search" onClick={() => setSearchVisible(true)} aria-label="Search apps and projects" title="Search · Ctrl / ⌘ K"><span className="os-app-icon"><img src="./icons/search.svg" alt="" className="os-app-art" /></span><span className="os-dock-tooltip">Search</span></button><span className="os-dock-divider" aria-hidden="true" />{apps.map(app => { const item = windows.find(item => item.id === app.id); return <button key={app.id} data-app={app.id} className={`${item ? "is-running" : ""}${activeId === app.id ? " is-active" : ""}`} onClick={() => { if (item) { focusWindow(app.id); focusContent(app.id); } else open(app.id); }} aria-label={`${item?.minimized ? "Restore" : "Open"} ${app.title}`} title={app.title}><span className="os-app-icon"><img src={`./icons/${app.icon}.svg`} alt="" className="os-app-art" /></span><span className="os-dock-tooltip">{app.title}</span></button>; })}<span className="os-dock-divider" aria-hidden="true" /><button onClick={showDesktop} aria-label="Show desktop" title="Show desktop"><span className="os-app-icon"><Icon name="monitor" size={26} /></span><span className="os-dock-tooltip">Show desktop</span></button></nav><button className="os-footer-help" onClick={() => setHelpVisible(true)}><Icon name="info" size={16} /><span>Make yourself at home</span></button></footer>
      <div className="os-sr-only" aria-live="polite" aria-atomic="true">{announcement}</div>
      <nav className="os-mobile-nav" aria-label="Phone navigation">
        <button data-mobile-app="home" className={activeId === "welcome" || !activeId ? "is-active" : ""} aria-current={activeId === "welcome" || !activeId ? "page" : undefined} onClick={() => open("welcome")}><Icon name="home" size={23} /><span>Home</span></button>
        <button className={activeId === "projects" ? "is-active" : ""} aria-current={activeId === "projects" ? "page" : undefined} onClick={() => open("projects")}><Icon name="folder" size={23} /><span>Projects</span></button>
        <button onClick={() => setSearchVisible(true)}><Icon name="search" size={23} /><span>Search</span></button>
        <button onClick={() => setAppsVisible(true)}><Icon name="grid" size={23} /><span>Apps</span></button>
      </nav>
      <Search visible={searchVisible} close={() => setSearchVisible(false)} open={open} />
      <AppsSheet visible={appsVisible} close={() => setAppsVisible(false)} open={open} />
      <dialog className="os-help-dialog" ref={help} onClose={() => setHelpVisible(false)} onCancel={event => { event.preventDefault(); closeHelp(); }} aria-labelledby="os-help-title"><header><h2 id="os-help-title">Make yourself at home.</h2><button className="os-icon-button" onClick={() => closeHelp()} aria-label="Close help"><Icon name="close" /></button></header><p>Open an app to explore the things I’m making. Your place stays here when you switch apps.</p><dl><div><dt>Open an app</dt><dd>Click once, or use Tab and Enter.</dd></div><div><dt>Move a window</dt><dd>Drag its title bar. With the title focused, use the arrow keys.</dd></div><div><dt>Resize or maximize</dt><dd>Drag the lower-right corner, or use its arrow-key control. The square button fills the desktop.</dd></div><div><dt>Find something</dt><dd>Use Search, or press <kbd>Ctrl</kbd> / <kbd>⌘</kbd> + <kbd>K</kbd>.</dd></div></dl><fieldset className="os-motion-choice"><legend>Motion</legend><div>{(["system", "full", "reduced"] as const).map(value => <button key={value} type="button" aria-pressed={motionPreference === value} onClick={() => setMotionPreference(value)}>{value === "system" ? "Use device setting" : value === "full" ? "Full" : "Reduced"}</button>)}</div></fieldset><div className="os-actions"><button className="os-button" onClick={() => closeHelp(() => { setWindows([]); open("welcome"); })}>Reset desktop</button></div></dialog>
    </div>
  </PreviewProvider>;
}
