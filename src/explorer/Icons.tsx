import type { CSSProperties } from "react";

// Official Ionicons assets, pinned and attributed in public/symbols/.
const symbols: Record<string, string> = {
  play: "game-controller", minimize: "remove-outline", maximize: "expand-outline",
  restore: "copy-outline", back: "chevron-back", info: "information-circle-outline",
  monitor: "home", chevron: "chevron-back",
};
export function Icon({ name, size = 20, className = "", style }: { name: string; size?: number; className?: string; style?: CSSProperties }) {
  return <img src={`./symbols/${symbols[name] ?? name}.svg`} alt="" aria-hidden="true" width={size} height={size} className={`os-symbol ${className}`} style={style} draggable={false} />;
}
