import { useId } from "react";

/**
 * Returns a valid anchor name (dashed-ident) for CSS Anchor Positioning.
 *
 * - If `name` is provided, it is returned as-is.
 * - If `name` is omitted, a unique anchor name is generated using `useId()`.
 *
 * @param name The anchor name (dashed-ident) for CSS Anchor Positioning.
 * @returns A valid anchor name (dashed-ident).
 */
export default function useAnchorName(name?: `--${string}`): `--${string}` {
  // `useId()` returns a string with colons, which is not valid for
  // dashed-ident.
  return name ?? `--anchor-${useId().replace(/:/g, "")}`;
}
