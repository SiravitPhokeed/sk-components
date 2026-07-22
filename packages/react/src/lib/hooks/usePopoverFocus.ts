import type { RefObject } from "react";
import { useEffect, useRef } from "react";

/**
 * Manages focus for a `popover` element, per the ARIA patterns for popover
 * widgets like menus.
 *
 * - When the popover opens, focus moves to the element returned by
 *   `getInitialFocus`.
 * - When the popover closes, focus returns to the previously focused element
 *   (usually the trigger) — unless the user has already moved focus
 *   elsewhere, e.g. by clicking another control.
 *
 * @param popoverRef Ref attached to the `popover` element.
 * @param getInitialFocus Returns the element to focus when the popover opens.
 */
export default function usePopoverFocus(
  popoverRef: RefObject<HTMLElement | null>,
  getInitialFocus: () => HTMLElement | undefined,
) {
  const returnFocusRef = useRef<HTMLElement | null>(null);

  // Mount-only setup. `popoverRef` is a stable ref object; `getInitialFocus` is
  // expected to be memoized by the caller (or handled by React Compiler).
  useEffect(() => {
    const popover = popoverRef.current;
    if (!popover) return;

    const handleToggle = (event: Event) => {
      if ((event as ToggleEvent).newState === "open") {
        // Remember the previously focused element to return focus to on
        // close.
        const active = document.activeElement;
        returnFocusRef.current =
          active instanceof HTMLElement && !popover.contains(active)
            ? active
            : null;
        getInitialFocus()?.focus();
      } else {
        // Only return focus if it was lost when the popover closed, not if
        // the user has moved it elsewhere.
        const active = document.activeElement;
        if (!active || active === document.body || popover.contains(active))
          returnFocusRef.current?.focus();
        returnFocusRef.current = null;
      }
    };

    popover.addEventListener("toggle", handleToggle);
    return () => popover.removeEventListener("toggle", handleToggle);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
