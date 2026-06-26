import { Snackbar } from "@/components/Snackbar";
import type { ReactNode } from "react";
import { createRoot } from "react-dom/client";

const EXITING_CLASS = "skc-snackbar--exiting";

/**
 * Push a Snackbar notification to the screen.
 *
 * @param message The message inside the Snackbar.
 * @param action A Snackbar can contain 1 action. Pressing this action closes the Snackbar.
 * @param stacked Put the {@link message} above the {@link action}.
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
  stacked?: boolean,
): () => void {
  const container = document.createElement("div");
  document.body.appendChild(container);

  const root = createRoot(container);

  let dismissed = false;

  root.render(
    <Snackbar action={action} stacked={stacked}>
      {message}
    </Snackbar>,
  );

  // After React commits the DOM, wire up the popover and cleanup.
  // Using rAF rather than assuming synchronous render so this is robust
  // across React versions.
  requestAnimationFrame(() => {
    if (dismissed) return;

    const snackbarEl =
      container.querySelector<HTMLDivElement>('[popover="manual"]');
    if (!snackbarEl) return;

    // When the popover closes (after exit animation), tear down the React
    // root and remove the container from the DOM.
    const handleToggle = (e: ToggleEvent) => {
      if (e.newState === "closed") {
        snackbarEl.removeEventListener("toggle", handleToggle);
        root.unmount();
        container.remove();
      }
    };
    snackbarEl.addEventListener("toggle", handleToggle);

    snackbarEl.showPopover();
  });

  return () => {
    dismissed = true;
    const el = container.querySelector<HTMLDivElement>('[popover="manual"]');
    el?.classList.add(EXITING_CLASS);
  };
}
