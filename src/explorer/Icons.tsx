import type { CSSProperties, ReactNode } from "react";

const paths: Record<string, ReactNode> = {
  home: <><path d="m3 11 9-8 9 8v10H3Z" /><path d="M9 21v-8h6v8" /></>,
  folder: <><path d="M3 7V4h7l3 3h8v13H3Z" /><path d="M3 10h18" /></>,
  globe: <><circle cx="12" cy="12" r="9" /><ellipse cx="12" cy="12" rx="4" ry="9" /><path d="M3 12h18M5 7h14M5 17h14" /></>,
  play: <><path d="M8 8h8a5 5 0 0 1 5 5l-1 6h-3l-3-4h-4l-3 4H4l-1-6a5 5 0 0 1 5-5Z" /><path d="M7 10v5M4.5 12.5h5M16 11h.01M18 14h.01" /></>,
  person: <><circle cx="12" cy="8" r="4" /><path d="M4 21v-3a8 6 0 0 1 16 0v3" /></>,
  book: <><path d="M12 5C8 2 4 3 3 4v16c3-2 6-2 9 0 3-2 6-2 9 0V4c-3-2-6-2-9 1Z" /><path d="M12 5v15M6 8h3M15 8h3M6 12h3M15 12h3" /></>,
  mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 6 9 8 9-8" /></>,
  search: <><circle cx="10.5" cy="10.5" r="6.5" /><path d="m16 16 5 5" /></>,
  arrow: <><path d="M5 12h14m-6-6 6 6-6 6" /></>,
  external: <><path d="M13 3h8v8M21 3l-12 12M10 3H3v18h18v-7" /></>,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  minimize: <path d="M5 17h14" />,
  maximize: <rect x="5" y="5" width="14" height="14" rx="1" />,
  restore: <><path d="M8 5V3h13v13h-2" /><rect x="3" y="8" width="13" height="13" rx="1" /></>,
  grid: <><rect x="3" y="3" width="6" height="6" rx="1" /><rect x="15" y="3" width="6" height="6" rx="1" /><rect x="3" y="15" width="6" height="6" rx="1" /><rect x="15" y="15" width="6" height="6" rx="1" /></>,
  monitor: <><rect x="3" y="3" width="18" height="13" rx="2" /><path d="M8 21h8M12 16v5" /></>,
  chevron: <path d="m9 5 7 7-7 7" />,
  back: <path d="m14 5-7 7 7 7" />,
  sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1M5 19l1-1M18 6l1-1" /></>,
  info: <><circle cx="12" cy="12" r="9" /><path d="M12 10v7M12 6v1" /></>,
};
export function Icon({ name, size = 20, className, style }: { name: string; size?: number; className?: string; style?: CSSProperties }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className} style={style}>{paths[name] ?? paths.folder}</svg>;
}
