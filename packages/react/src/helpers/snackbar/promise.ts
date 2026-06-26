import snackbarPush, {
  type PushSnackbarOptions,
} from "@/helpers/snackbar/push";
import type { ReactNode } from "react";

/**
 * Show a Snackbar for the duration of an async function. The Snackbar
 * stays visible while the function runs and is dismissed when it settles.
 *
 * The `persistent` and `autoDismissDurationMs` options are ignored —
 * the Snackbar is always persistent during the operation.
 *
 * @param message The message inside the Snackbar (typically "Loading…").
 * @param fn The async function to run.
 * @param options Visual options for the Snackbar (only `stacked` applies).
 *
 * @returns The result of the async function.
 */
export default async function snackbarPromise<T>(
  message: ReactNode,
  fn: () => Promise<T>,
  options?: Pick<PushSnackbarOptions, "stacked">,
): Promise<T> {
  const dismiss = snackbarPush(message, undefined, {
    ...options,
    persistent: true,
  });
  try {
    return await fn();
  } finally {
    dismiss();
  }
}
