import invokerClose from "@/lib/helpers/invoker/close";
import invokerSupported from "@/lib/helpers/invoker/supported";

const DIALOG_COMMANDS = ["show-modal", "close", "request-close"];
const POPOVER_COMMANDS = ["show-popover", "hide-popover", "toggle-popover"];

/** Call `obj[method]()` only when it is a function — safer than `?.()`. */
function callIfFunction(obj: object, method: string): void {
  const fn = (obj as Record<string, unknown>)[method];
  if (typeof fn === "function") fn.call(obj);
}

/**
 * Imitate a built-in Invoker Command on browsers without the HTML Invoker
 * Commands API.
 *
 * @param command The command to imitate.
 * @param commandfor The ID of the element to send the command to.
 * @param root The root node to resolve `commandfor` in.
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
    if (command === "show-modal" && !dialog.open)
      callIfFunction(dialog, "showModal");
    else if (command === "close" && dialog.open)
      callIfFunction(dialog, "close");
    else if (command === "request-close") invokerClose(dialog);
    return;
  }

  if (POPOVER_COMMANDS.includes(command)) {
    const popover = target as HTMLElement;
    const isPopoverOpen = popover.matches(":popover-open");
    if (command === "show-popover" && !isPopoverOpen)
      callIfFunction(popover, "showPopover");
    else if (command === "hide-popover" && isPopoverOpen)
      callIfFunction(popover, "hidePopover");
    else if (command === "toggle-popover")
      callIfFunction(popover, "togglePopover");
    return;
  }

  console.warn(
    `[SKCom] Invoker Command \`${command}\` is not supported by the Invoker Commands polyfill.`,
  );
}
