/** Cached result of the feature detection, so it runs at most once. */
let cached: boolean | undefined;

/**
 * Whether the browser supports the HTML Invoker Commands API (`command` and
 * `commandfor` attributes). Always false outside the browser.
 */
export default function invokerSupported(): boolean {
  cached ??=
    typeof HTMLButtonElement !== "undefined" &&
    "command" in HTMLButtonElement.prototype;
  return cached;
}
