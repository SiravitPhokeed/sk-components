/**
 * Close a `<dialog>` like `command="request-close"` would. The fallback
 * dispatches `cancel` — `useAnimatedDialog` intercepts it to play the exit
 * animation before `dialog.close()`.
 */
export default function invokerClose(dialog: HTMLDialogElement) {
  if (typeof dialog.requestClose === "function") {
    dialog.requestClose();
    return;
  }
  if (!dialog.open) return;
  const cancel = new Event("cancel", { cancelable: true });
  if (dialog.dispatchEvent(cancel) && typeof dialog.close === "function")
    dialog.close();
}
