import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { SelectedProject } from "../content/profile";

type Selection = { project: SelectedProject; trigger: HTMLAnchorElement };
const PreviewContext = createContext<(selection: Selection) => void>(() => {});
export const usePreview = () => useContext(PreviewContext);

/** Native dialog supplies focus containment, Escape, and an inert background.
 * Links keep their original href for no-JS, modified clicks, and browser menus. */
export function PreviewProvider({ children }: { children: ReactNode }) {
  const [selection, setSelection] = useState<Selection | null>(null);
  const [zoomed, setZoomed] = useState(false);
  const [failed, setFailed] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const restore = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!selection || !dialog.current) return;
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    setZoomed(false);
    setFailed(false);
    element.showModal();
    document.body.style.overflow = "hidden";
    const release = () => {
      document.body.style.overflow = overflow;
      selection.trigger.focus({ preventScroll: true });
    };
    restore.current = release;
    return () => { release(); restore.current = null; };
  }, [selection]);

  const preview = selection?.project.preview;
  return <PreviewContext.Provider value={setSelection}>
    {children}
    <dialog ref={dialog} className="image-viewer" aria-labelledby="viewer-title"
      aria-describedby={preview?.caption ? "viewer-caption" : undefined}
      onClose={() => restore.current?.()}
      onKeyDown={(event) => {
        if (event.key !== "Tab") return;
        const controls = [...event.currentTarget.querySelectorAll<HTMLElement>("button:not(:disabled), a[href], [tabindex='0']")];
        const first = controls[0], last = controls[controls.length - 1];
        if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last?.focus(); }
        else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first?.focus(); }
      }}
      onClick={(event) => {
        if (event.target !== event.currentTarget) return;
        const box = event.currentTarget.getBoundingClientRect();
        if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.current?.close();
      }}>
      <header className="image-viewer__header">
        <h2 id="viewer-title">{selection?.project.title === "SE Learning Quest" ? "Asterfall: The Last Relay" : selection?.project.title}</h2>
        <button type="button" autoFocus onClick={() => dialog.current?.close()}>Close preview</button>
      </header>
      {preview && <>
        <div ref={surface} className={`image-viewer__surface${zoomed ? " is-zoomed" : ""}`} tabIndex={0} aria-label="Screenshot; scroll to inspect when enlarged">
          {failed ? <p role="status">The screenshot could not load. <a href={preview.src}>Open the original image</a>.</p> :
            <img src={preview.src} alt={preview.alt} width={preview.width} height={preview.height} onError={() => setFailed(true)} />}
        </div>
        <footer className="image-viewer__footer">
          <p id="viewer-caption">{preview.caption ?? "Interface preview"}</p>
          <button type="button" aria-pressed={zoomed} disabled={failed} onClick={() => {
            setZoomed((value) => !value);
            surface.current?.scrollTo(0, 0);
          }}>{zoomed ? "Fit to window" : "Actual size"}</button>
          <a href={preview.src}>Open original</a>
        </footer>
      </>}
    </dialog>
  </PreviewContext.Provider>;
}
