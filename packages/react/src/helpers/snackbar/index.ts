import snackbarPromise from "@/helpers/snackbar/promise";
import snackbarPush from "@/helpers/snackbar/push";

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
  push: snackbarPush,
  promise: snackbarPromise,
};
