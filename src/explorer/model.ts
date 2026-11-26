import { profile, type SelectedProject } from "../content/profile";

export const apps = [
  { id: "welcome", title: "Welcome", subtitle: "A curious mind, at work", icon: "home", color: "copper" },
  { id: "projects", title: "Projects", subtitle: "Tools, models & experiments", icon: "folder", color: "blue" },
  { id: "atlas", title: "World Atlas", subtitle: "Histories, side by side", icon: "globe", color: "sky" },
  { id: "play", title: "Playground", subtitle: "Learn through decisions", icon: "play", color: "gold" },
  { id: "about", title: "About Tony", subtitle: "The person behind the desk", icon: "person", color: "copper" },
  { id: "research", title: "Research", subtitle: "Papers & work in progress", icon: "book", color: "purple" },
  { id: "contact", title: "Contact", subtitle: "Let’s compare notes", icon: "mail", color: "blue" },
] as const;
export type AppId = typeof apps[number]["id"];
export const isAppId = (id: string | null): id is AppId => apps.some(app => app.id === id);
export const projectId = (project: SelectedProject) => project.title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
export const projectTitle = (project: SelectedProject) => project.title === "SE Learning Quest" ? "Asterfall: The Last Relay" : project.title;
export const publicProjects: SelectedProject[] = profile.projects.filter(project => project.status !== "local-private");
export const statusLabel = (project: SelectedProject) => project.availabilityLabel ?? (project.title === "SE Learning Quest" ? "Game prototype" : project.status === "prototype" ? "Prototype" : "Public");

export type Bounds = { width: number; height: number };
export type DesktopWindow = { id: AppId; x: number; y: number; width: number; height: number; minimized: boolean; maximized: boolean; z: number };
export function fitWindow(window: DesktopWindow, bounds: Bounds): DesktopWindow {
  const width = Math.min(Math.max(280, window.width), Math.max(280, bounds.width - 24));
  const height = Math.min(Math.max(240, window.height), Math.max(240, bounds.height - 24));
  return { ...window, width, height, x: Math.max(0, Math.min(window.x, bounds.width - width)), y: Math.max(0, Math.min(window.y, bounds.height - height)) };
}
export function makeWindow(id: AppId, bounds: Bounds, order: number): DesktopWindow {
  const width = Math.min(id === "contact" ? 620 : 930, bounds.width - 56);
  const height = Math.min(id === "contact" ? 480 : 640, bounds.height - 48);
  return fitWindow({ id, x: Math.max(132, (bounds.width - width) / 2) + (order % 4) * 22, y: 28 + (order % 4) * 22, width, height, minimized: false, maximized: false, z: order + 1 }, bounds);
}
