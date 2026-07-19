import requestCloseDialog from "@/lib/helpers/invokerCommands/requestClose";
import supportsInvokerCommands from "@/lib/helpers/invokerCommands/supported";
import type { CommandProps } from "@/lib/types";

/** A built-in command value (excludes `--*` custom commands). */
type BuiltinCommand = Exclude<
  NonNullable<CommandProps["command"]>,
  `--${string}`
>;

const BUILTIN_COMMANDS: BuiltinCommand[] = [
  "show-modal",
  "close",
  "request-close",
  "show-popover",
  "hide-popover",
  "toggle-popover",
];

/** Whether `command` is a built-in command (not a `--*` custom command). */
const isBuiltinCommand = (command: string): command is BuiltinCommand =>
  (BUILTIN_COMMANDS as string[]).includes(command);

/**
 * Imitate a built-in Invoker Command on browsers without the Invoker Commands
 * API.
 *
 * - No-op when the API is supported — the browser already performs the
 *   command as the trigger’s default action.
 * - No-op for custom (`--*`) commands, which cannot be imitated without
 *   `CommandEvent`. They stay inert, same as on a browser without the API.
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
export default function synthesizeCommand(
  command: string,
  commandfor: string,
  root: Document | ShadowRoot = document,
) {
  if (supportsInvokerCommands() || !isBuiltinCommand(command)) return;
  const target = root.getElementById(commandfor);
  if (!target) return;

  switch (command) {
    case "show-modal": {
      const dialog = target as HTMLDialogElement;
      if (typeof dialog.showModal === "function" && !dialog.open)
        dialog.showModal();
      break;
    }
    case "close": {
      const dialog = target as HTMLDialogElement;
      if (typeof dialog.close === "function" && dialog.open) dialog.close();
      break;
    }
    case "request-close":
      requestCloseDialog(target as HTMLDialogElement);
      break;
    case "show-popover":
      if (
        typeof target.showPopover === "function" &&
        !target.matches(":popover-open")
      )
        target.showPopover();
      break;
    case "hide-popover":
      if (
        typeof target.hidePopover === "function" &&
        target.matches(":popover-open")
      )
        target.hidePopover();
      break;
    case "toggle-popover":
      if (typeof target.togglePopover === "function") target.togglePopover();
      break;
  }
}
