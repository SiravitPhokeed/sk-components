import type { Button } from "@/components/Button";
import type { SnackbarProps } from "@/components/Snackbar";
import { Snackbar } from "@/components/Snackbar";
import "@suankularb-components/css/sr-only.css";
import type { ReactElement, ReactNode } from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

const EXITING_CLASS = "skc-snackbar--exiting";

/** The dismiss function of the currently-visible Snackbar, if any. */
let activeDismiss: (() => void) | null = null;

/** Counter for generating unique Snackbar IDs. */
let nextId = 0;

// ── Screen reader announcer ───────────────────────────────────────────
// A single visually-hidden `role="status"` element lives in the DOM
// permanently. Each push() writes the Snackbar label text into it so
// assistive technology announces the message. The element is created on
// the first call to snackbarPush and reused thereafter.

let announcerEl: HTMLDivElement | null = null;

function ensureAnnouncer(): HTMLDivElement {
  if (!announcerEl || !document.body.contains(announcerEl)) {
    announcerEl = document.createElement("div");
    announcerEl.className = "skc-sr-only";
    announcerEl.setAttribute("role", "status");
    announcerEl.setAttribute("aria-live", "polite");
    announcerEl.setAttribute("aria-atomic", "true");
    document.body.appendChild(announcerEl);
  }
  return announcerEl;
}

/** Options for {@link snackbarPush}. */
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
 * @param options Options for the Snackbar.
 *
 * @returns A function to programmatically dismiss the Snackbar with its exit animation.
 */
export default function snackbarPush(
  message: ReactNode,
  action?: ReactElement<typeof Button>,
  options?: PushSnackbarOptions,
): () => void {
  const { stacked, persistent, autoDismissDurationMs } = options ?? {};

  // Dismiss any currently-visible Snackbar so only one is shown at a time.
  activeDismiss?.();

  const id = `snackbar-${nextId++}`;

  // Create a new React root for the Snackbar. If the consumer is using Root
  // Layout, create it inside the Root Layout.
  const container = document.createElement("div");
  const rootLayout = document.querySelector(".skc-root-layout");
  if (rootLayout) rootLayout.appendChild(container);
  else document.body.appendChild(container);

  const root = createRoot(container);

  let dismissed = false;

  /** Reset the active dismiss function. */
  const resetActiveDismiss = () => {
    if (activeDismiss === dismiss) activeDismiss = null;
  };

  // Render the Snackbar into the container.
  // The Snackbar auto-shows via `useEffect` (post-commit), so the element is
  // always in the DOM by the time this `requestAnimationFrame` fires.
  root.render(
    <StrictMode>
      <Snackbar
        id={id}
        persistent={persistent}
        autoDismissDurationMs={autoDismissDurationMs}
        action={action}
        stacked={stacked}
      >
        {message}
      </Snackbar>
    </StrictMode>,
  );

  requestAnimationFrame(() => {
    if (dismissed) return;

    const snackbarEl = document.getElementById(id) as HTMLDivElement | null;
    if (!snackbarEl) return;

    const handleToggle = (e: ToggleEvent) => {
      if (e.newState === "closed") {
        resetActiveDismiss();
        snackbarEl.removeEventListener("toggle", handleToggle);
        root.unmount();
        container.remove();
      }
    };
    snackbarEl.addEventListener("toggle", handleToggle);

    // Announce the Snackbar message to screen readers. We defer by one
    // additional rAF frame so the popover has appeared (showPopover runs in
    // useEffect after paint; the first rAF fires before the next paint, so
    // the second rAF guarantees the popover is open).
    requestAnimationFrame(() => {
      if (dismissed) return;
      const label = snackbarEl.querySelector(".skc-snackbar__label");
      if (label?.textContent) {
        ensureAnnouncer().textContent = label.textContent.trim();
      }
    });
  });

  const dismiss = () => {
    dismissed = true;
    resetActiveDismiss();
    const el = document.getElementById(id) as HTMLDivElement | null;
    el?.classList.add(EXITING_CLASS);
  };

  // Set the active dismiss function so that future calls to `pushSnackbar` will
  // dismiss this Snackbar before showing the new one.
  activeDismiss = dismiss;

  return dismiss;
}
