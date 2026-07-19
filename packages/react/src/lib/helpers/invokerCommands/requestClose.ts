/**
 * Close a `<dialog>` like `command="request-close"` would: fire a cancelable
 * `cancel` event, then close the dialog unless the event was prevented.
 *
 * Uses the native `HTMLDialogElement.requestClose()` where available. The
 * fallback mirrors it closely enough for SKCom dialogs — `useAnimatedDialog`
 * intercepts `cancel` to play the exit animation before closing.
 *
 * @param dialog The `<dialog>` element to request to close.
 */
export default function requestCloseDialog(dialog: HTMLDialogElement) {
  if (typeof dialog.requestClose === "function") {
    dialog.requestClose();
    return;
  }
  if (!dialog.open) return;
  const cancel = new Event("cancel", { cancelable: true });
  if (dialog.dispatchEvent(cancel)) dialog.close();
}
