import type { ReactNode } from "react";
import { pushSnackbar } from "./pushSnackbar";
import type { PushSnackbarOptions } from "./pushSnackbar";

/**
 * Imperative API for showing Snackbar notifications. Only one Snackbar is
 * visible at a time — pushing a new one dismisses the previous.
 *
 * @example
 * ```ts
 * import { snackbar } from "@suankularb-components/react/helpers";
 *
 * snackbar.push("Students removed", <Button appearance="text">Undo</Button>);
 *
 * await snackbar.promise("Loading…", async () => {
 *   await fetch("/api/some-endpoint");
 * });
 * snackbar.push("Done!");
 * ```
 */
export const snackbar = {
  /**
   * Push a Snackbar notification to the screen. If a Snackbar is already
   * visible, it is dismissed (with its exit animation) before the new one
   * appears. The Snackbar auto-dismisses after 6 seconds by default.
   *
   * @param message The message inside the Snackbar.
   * @param action A Snackbar can contain 1 action.
   * @param options Options for the Snackbar.
   *
   * @returns A function to programmatically dismiss the Snackbar with its
   *          exit animation.
   */
  push(
    message: ReactNode,
    action?: ReactNode,
    options?: PushSnackbarOptions,
  ): () => void {
    return pushSnackbar(message, action, options);
  },

  /**
   * Show a Snackbar for the duration of an async function. The Snackbar
   * stays visible while the function runs and is dismissed when it settles.
   * The `persistent` and `autoDismissDurationMs` options are ignored —
   * the Snackbar is always persistent during the operation.
   *
   * @param message  The message inside the Snackbar (typically "Loading…").
   * @param fn       The async function to run.
   * @param options  Visual options for the Snackbar (only `stacked` applies).
   *
   * @returns The result of the async function.
   */
  async promise<T>(
    message: ReactNode,
    fn: () => Promise<T>,
    options?: Pick<PushSnackbarOptions, "stacked">,
  ): Promise<T> {
    const dismiss = pushSnackbar(message, undefined, {
      ...options,
      persistent: true,
    });
    try {
      return await fn();
    } finally {
      dismiss();
    }
  },
};
