import invokerClose from "@/lib/helpers/invoker/close";
import invokerSupported from "@/lib/helpers/invoker/supported";

const DIALOG_COMMANDS = ["show-modal", "close", "request-close"];
const POPOVER_COMMANDS = ["show-popover", "hide-popover", "toggle-popover"];

/**
 * Imitate a built-in Invoker Command on browsers without the Invoker Commands
 * API.
 *
 * - No-op when the API is supported — the browser already performs the
 *   command as the trigger’s default action.
 * - Unknown commands (including `--*` custom commands) fall through the
 *   switch and are silently ignored, same as on a browser without the API.
 * - Each command is guarded to mirror native behavior and avoid
 *   `DOMException`s, e.g. `show-modal` on an already-open dialog is ignored.
 * - Also imitates commands on elements the native API ignores (e.g. an `<a>`
 *   rendered via `element`) — strictly more functional than native.
 *
 * @param command The command to imitate.
 * @param commandfor The ID of the element to send the command to.
 * @param root The root node to resolve `commandfor` in, per the Invoker
 *   Commands polyfill. Defaults to `document`.
 */
export default function invokerSynthesize(
  command: string,
  commandfor: string,
  root: Document | ShadowRoot = document,
) {
  if (invokerSupported()) return;
  const target = root.getElementById(commandfor);
  if (!target) return;

  if (DIALOG_COMMANDS.includes(command)) {
    const dialog = target as HTMLDialogElement;
    if (command === "show-modal" && !dialog.open) dialog.showModal?.();
    else if (command === "close" && dialog.open) dialog.close?.();
    else if (command === "request-close") invokerClose(dialog);
    return;
  }

  if (POPOVER_COMMANDS.includes(command)) {
    const popover = target as HTMLElement;
    const isPopoverOpen = popover.matches(":popover-open");
    if (command === "show-popover" && !isPopoverOpen) popover.showPopover?.();
    else if (command === "hide-popover" && isPopoverOpen)
      popover.hidePopover?.();
    else if (command === "toggle-popover") popover.togglePopover?.();
    return;
  }

  console.warn(
    `[SKCom] Custom command \`${command}\` is not supported by the Invoker Commands polyfill.`,
  );
}
