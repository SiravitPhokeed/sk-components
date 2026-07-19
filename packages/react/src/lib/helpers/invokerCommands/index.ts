import requestCloseDialog from "@/lib/helpers/invokerCommands/requestClose";
import supportsInvokerCommands from "@/lib/helpers/invokerCommands/supported";
import synthesizeCommand from "@/lib/helpers/invokerCommands/synthesize";

/**
 * Fallback for the HTML Invoker Commands API on browsers without support (the
 * partial support tier). Built-in commands are imitated imperatively from
 * `onClick` — target resolution and feature detection mirror the Invoker
 * Commands polyfill (https://github.com/keithamus/invokers-polyfill). Custom
 * (`--*`) commands cannot be imitated and are ignored.
 */
export const invokerCommands = {
  supported: supportsInvokerCommands,
  synthesize: synthesizeCommand,
  requestClose: requestCloseDialog,
};
