import { Snackbar } from "@/components/Snackbar";
import type { SnackbarProps } from "@/components/Snackbar";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";

const EXITING_CLASS = "skc-snackbar--exiting";

/** The dismiss function of the currently-visible Snackbar, if any. */
let activeDismiss: (() => void) | null = null;

/**
 * Options for {@link pushSnackbar}.
 */
export type PushSnackbarOptions = Pick<
  SnackbarProps,
  "stacked" | "persistent" | "autoDismissDurationMs"
>;

/**
 * Push a Snackbar notification to the screen. If a Snackbar is already
 * visible, it is dismissed (with its exit animation) before the new one
 * appears. The Snackbar auto-dismisses after 6 seconds by default.
 *
 * @param message The message inside the Snackbar.
 * @param action A Snackbar can contain 1 action.
 * @param options.stacked Put the message above the action.
 * @param options.persistent If `true`, the Snackbar will not auto-dismiss.
 * @param options.autoDismissDurationMs Time in milliseconds until the Snackbar exits automatically.
 *
 * @returns A function to programmatically dismiss the Snackbar with its exit animation.
 *
 * @see {@link Snackbar}
 *
 * @example
 * ```tsx
 * pushSnackbar("Students removed", <Button appearance="text">Undo</Button>);
 * ```
 */
export function pushSnackbar(
  message: ReactNode,
  action?: ReactNode,
  options?: PushSnackbarOptions,
): () => void {
  // Dismiss any currently-visible Snackbar so only one is shown at a time.
  activeDismiss?.();

  const { stacked, persistent, autoDismissDurationMs } = options ?? {};

  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = createRoot(container);

  let dismissed = false;
  let snackbarEl: HTMLDivElement | null = null;

  const cleanup = () => {
    if (activeDismiss === dismiss) activeDismiss = null;
  };

  // Callback ref — fires during React's commit phase, so the element is
  // guaranteed to be available before the next rAF.
  const captureRef = (el: HTMLDivElement | null) => {
    snackbarEl = el;
  };

  root.render(
    <Snackbar
      ref={captureRef}
      persistent={persistent}
      autoDismissDurationMs={autoDismissDurationMs}
      action={action}
      stacked={stacked}
    >
      {message}
    </Snackbar>,
  );

  // After React commits the DOM, attach the toggle listener for cleanup.
  // The callback ref has already set snackbarEl by this point.
  requestAnimationFrame(() => {
    if (dismissed || !snackbarEl) return;

    const handleToggle = (e: ToggleEvent) => {
      if (e.newState === "closed") {
        cleanup();
        snackbarEl!.removeEventListener("toggle", handleToggle);
        root.unmount();
        container.remove();
      }
    };
    snackbarEl.addEventListener("toggle", handleToggle);
  });

  const dismiss = () => {
    dismissed = true;
    cleanup();
    snackbarEl?.classList.add(EXITING_CLASS);
  };

  activeDismiss = dismiss;

  return dismiss;
}
