import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import type { SelectedProject } from "../content/profile";

type Selection = { project: SelectedProject; trigger: HTMLAnchorElement };
const PreviewContext = createContext<(selection: Selection) => void>(() => {});
export const usePreview = () => useContext(PreviewContext);
const displayTitle = (project?: SelectedProject) => project?.title === "SE Learning Quest" ? "Asterfall: The Last Relay" : project?.title;

/** Native dialog keeps the background inert; original image links remain usable
 * without enhancement. Browsing the gallery retains the original return point. */
export function PreviewProvider({ children, projects }: { children: ReactNode; projects: SelectedProject[] }) {
  const [selection, setSelection] = useState<Selection | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const fullImage = useRef<HTMLImageElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const surface = useRef<HTMLDivElement>(null);
  const trigger = selection?.trigger;
  const preview = selection?.project.preview;
  const gallery = projects.filter((project) => project.preview);
  const index = gallery.findIndex((project) => project.title === selection?.project.title);

  useEffect(() => {
    if (!isOpen || !trigger || !dialog.current) return;
    const element = dialog.current;
    const overflow = document.body.style.overflow;
    element.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = overflow;
      trigger.focus({ preventScroll: true });
    };
  }, [trigger, isOpen]);

  useEffect(() => {
    setZoomed(false);
    setFailed(false);
    setLoaded(Boolean(fullImage.current?.complete && fullImage.current.naturalWidth));
    surface.current?.scrollTo(0, 0);
  }, [preview?.src, isOpen]);

  const move = (direction: number) => {
    if (!selection || gallery.length < 2) return;
    setLoaded(false);
    setFailed(false);
    setZoomed(false);
    setSelection({ ...selection, project: gallery[(index + direction + gallery.length) % gallery.length] });
  };

  return <PreviewContext.Provider value={(next) => { setSelection(next); setIsOpen(true); }}>
    {children}
    <dialog ref={dialog} className="image-viewer" aria-labelledby="viewer-title"
      aria-describedby={preview?.caption ? "viewer-caption" : undefined}
      onClose={() => setIsOpen(false)}
      onKeyDown={(event) => {
        if (!zoomed && (event.key === "ArrowLeft" || event.key === "ArrowRight")) {
          event.preventDefault();
          move(event.key === "ArrowRight" ? 1 : -1);
          return;
        }
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
        <div aria-live="polite" aria-atomic="true"><p className="image-viewer__position">{index + 1} / {gallery.length}</p>
        <h2 id="viewer-title">{displayTitle(selection?.project)}</h2></div>
        <button type="button" autoFocus onClick={() => dialog.current?.close()}>Close preview</button>
      </header>
      {preview && <>
        <div ref={surface} className={`image-viewer__surface${zoomed ? " is-zoomed" : ""}`} tabIndex={0} aria-busy={!loaded && !failed} aria-label="Screenshot; scroll to inspect when enlarged">
          {failed ? <p role="status">The screenshot could not load. <a href={preview.src}>Open the original image</a>.</p> :
            <img key={preview.src} ref={fullImage} src={preview.src} alt={preview.alt} width={preview.width} height={preview.height}
              style={{ aspectRatio: `${preview.width} / ${preview.height}`, width: zoomed ? `${preview.width}px` : `min(100%, ${preview.width}px, calc((100dvh - 290px) * ${preview.width / preview.height}))` }}
              onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />}
          {!loaded && !failed && <p className="image-viewer__loading" role="status">Loading full-resolution image…</p>}
        </div>
        <footer className="image-viewer__footer">
          <div className="image-viewer__navigation" role="group" aria-label="Browse project screenshots">
            <button type="button" onClick={() => move(-1)} aria-label="Previous project">←</button>
            <button type="button" onClick={() => move(1)} aria-label="Next project">→</button>
          </div>
          <p id="viewer-caption">{preview.caption ?? "Interface preview"}</p>
          <button type="button" aria-pressed={zoomed} disabled={failed || !loaded} onClick={() => {
            setZoomed((value) => !value);
            surface.current?.scrollTo(0, 0);
          }}>{zoomed ? "Fit to window" : "Actual size"}</button>
          <a href={preview.src}>Open original</a>
        </footer>
      </>}
    </dialog>
  </PreviewContext.Provider>;
}
