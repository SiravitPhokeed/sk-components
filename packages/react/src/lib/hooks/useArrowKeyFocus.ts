/**
 * Returns a keydown handler that moves focus between a list of elements with
 * the arrow keys, per the ARIA composite widget patterns.
 *
 * - Arrow keys move focus to the next/previous element, wrapping around at
 *   both ends. Home and End jump to the first and last element.
 * - Vertical lists use ArrowDown/ArrowUp; horizontal lists use
 *   ArrowRight/ArrowLeft, flipped in RTL.
 * - Other keys are ignored, so the handler can be composed with
 *   widget-specific key handling.
 *
 * @param getItems Returns the focusable elements, in DOM order.
 * @param orientation The axis of the list. Defaults to `"vertical"`.
 * @returns A keydown handler to attach to the list’s container.
 */
export default function useArrowKeyFocus(
  getItems: () => HTMLElement[],
  orientation: "vertical" | "horizontal" = "vertical",
) {
  return (event: React.KeyboardEvent) => {
    let nextKey = "ArrowDown";
    let previousKey = "ArrowUp";
    if (orientation === "horizontal") {
      // In RTL, the reading direction is flipped, so the arrow keys are too.
      const isRTL = getComputedStyle(event.currentTarget).direction === "rtl";
      nextKey = isRTL ? "ArrowLeft" : "ArrowRight";
      previousKey = isRTL ? "ArrowRight" : "ArrowLeft";
    }

    if (![nextKey, previousKey, "Home", "End"].includes(event.key)) return;
    const items = getItems();
    if (!items.length) return;
    event.preventDefault();

    // The index of the currently focused element, or -1 if focus is not on
    // any of the items (e.g. still on the container).
    const index = items.indexOf(document.activeElement as HTMLElement);

    let target: HTMLElement | undefined;
    if (event.key === nextKey) target = items[(index + 1) % items.length];
    else if (event.key === previousKey)
      target =
        index === -1
          ? items[items.length - 1]
          : items[(index - 1 + items.length) % items.length];
    else if (event.key === "Home") target = items[0];
    else target = items[items.length - 1];
    target?.focus();
  };
}
