import { useEffect, type RefObject } from "react";

// Motion Prompt #049, #051 · MIT License (c) 2026 Shohei Ohtaki
// https://showheyohtaki.github.io/motion-prompt/#049
// https://showheyohtaki.github.io/motion-prompt/#051
// Adapted to real React/native-dialog state. Cubic-bezier curves approximate
// the source's power-cubic easing; recipe details live in docs/tony-os.md.
const OUT = "cubic-bezier(.215,.61,.355,1)";
const IN_OUT = "cubic-bezier(.645,.045,.355,1)";
const running = new WeakMap<HTMLElement, Animation>();
export const reducedMotion = () => document.documentElement.dataset.osReduce === "true" || (document.documentElement.dataset.osReduce === undefined && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

export function cancelSurfaceMotion(element: HTMLElement | null) {
  if (!element) return;
  const animation = running.get(element);
  running.delete(element);
  animation?.cancel();
}

export function enterSurface(element: HTMLElement | null, sheet = false) {
  if (!element) return;
  cancelSurfaceMotion(element);
  if (reducedMotion() || !element.animate) return;
  const animation = element.animate(sheet
    ? [{ transform: "translateY(100%)", opacity: 1 }, { transform: "translateY(0)", opacity: 1 }]
    : [{ transform: "translateY(10px) scale(.9)", opacity: 0 }, { transform: "translateY(0) scale(1)", opacity: 1 }],
  { duration: sheet ? 400 : 320, easing: OUT });
  running.set(element, animation);
  void animation.finished.then(() => { if (running.get(element) === animation) running.delete(element); }).catch(() => {});
}

export function exitSurface(element: HTMLElement | null, done: () => void, sheet = false) {
  if (!element || reducedMotion() || !element.animate) { done(); return; }
  cancelSurfaceMotion(element);
  const animation = element.animate(sheet
    ? [{ transform: "translateY(0)", opacity: 1 }, { transform: "translateY(100%)", opacity: 1 }]
    : [{ transform: "translateY(0) scale(1)", opacity: 1 }, { transform: "translateY(8px) scale(.94)", opacity: 0 }],
  { duration: sheet ? 280 : 200, easing: IN_OUT, fill: "forwards" });
  running.set(element, animation);
  const finish = () => {
    if (running.get(element) !== animation) return;
    running.delete(element);
    done();
    animation.cancel();
  };
  // A canceled/replaced animation cannot complete an older dismissal.
  const timer = window.setTimeout(finish, 420);
  void animation.finished.then(finish).catch(() => {}).finally(() => window.clearTimeout(timer));
}

export function useModalMotion(ref: RefObject<HTMLDialogElement | null>, visible: boolean, onClose: () => void, sheet = false) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (visible && !element.open) { element.showModal(); enterSurface(element, sheet); }
    else if (!visible && element.open) { cancelSurfaceMotion(element); element.close(); }
    return () => cancelSurfaceMotion(element);
  }, [visible, ref, sheet]);
  return (after?: () => void) => {
    const element = ref.current;
    if (!element?.open) { onClose(); after?.(); return; }
    exitSurface(element, () => { element.close(); onClose(); after?.(); }, sheet);
  };
}
