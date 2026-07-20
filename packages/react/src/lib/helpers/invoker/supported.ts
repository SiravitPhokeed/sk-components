let cached: boolean | undefined;

export default function invokerSupported(): boolean {
  cached ??=
    typeof HTMLButtonElement !== "undefined" &&
    "command" in HTMLButtonElement.prototype;
  return cached;
}
