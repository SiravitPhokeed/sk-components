import invokerClose from "@/lib/helpers/invoker/close";
import invokerSupported from "@/lib/helpers/invoker/supported";
import invokerSynthesize from "@/lib/helpers/invoker/synthesize";

/**
 * Fallback for the HTML Invoker Commands API on browsers without support (the
 * partial support tier). Built-in commands are imitated imperatively from
 * `onClick` — target resolution and feature detection mirror the Invoker
 * Commands polyfill (https://github.com/keithamus/invokers-polyfill). Custom
 * (`--*`) commands cannot be imitated and are ignored.
 */
export const invoker = {
  close: invokerClose,
  supported: invokerSupported,
  synthesize: invokerSynthesize,
};

export default invoker;
