"use client";

import type { RefObject } from "react";
import { useEffect } from "react";

/**
 * Options for {@link useAnimatedPopover}.
 */
export interface UseAnimatedPopoverOptions {
  /**
   * CSS class added to the popover element to trigger the exit animation.
   *
   * The corresponding CSS should apply a `@keyframes` animation that plays
   * the exit transition (e.g. fade + slide out). The animation should have
   * `forwards` fill mode so the end state sticks until `hidePopover()` runs.
   */
  exitingClass: string;

  /**
   * `animationName` of the exit @keyframes, used to filter `animationend`
   * events. This prevents the `::backdrop` entry animation (and any other
   * animation on the popover element) from accidentally triggering the close.
   */
  exitAnimationName: string;

  /**
   * Ref to a wrapper element. Clicks inside this element (e.g. on the toggle
   * button) will _not_ close the popover. If omitted, any click outside the
   * popover element itself will trigger close.
   */
  wrapperRef?: RefObject<HTMLElement | null>;
}

/**
 * Return value of {@link useAnimatedPopover}.
 */
export interface UseAnimatedPopoverReturn {
  /**
   * Start the exit animation. The popover will be hidden via `hidePopover()`
   * after the animation completes (`animationend`).
   *
   * Call this from the toggle button, a "close" button inside the popover,
   * or any other explicit close trigger.
   */
  close: () => void;

  /**
   * Cancel an in-progress exit animation. Removes the exiting class so the
   * popover snaps back to its open state.
   *
   * Call this when the user re-opens the popover mid-exit (e.g. clicks the
   * toggle while the exit animation is still playing).
   */
  cancelExit: () => void;

  /**
   * Props to spread onto the `popover="manual"` element. Currently includes
   * `onAnimationEnd` — the handler that removes the exiting class and calls
   * `hidePopover()` once the exit animation finishes.
   */
  popoverProps: {
    onAnimationEnd: (e: React.AnimationEvent<HTMLElement>) => void;
  };
}

/**
 * Manages exit animations for a `popover="manual"` element.
 *
 * @param popoverRef Ref attached to the `popover="manual"` element.
 * @param options.exitingClass CSS class that triggers the exit animation.
 * @param options.exitAnimationName `animationName` to filter `animationend` for.
 * @param options.wrapperRef Ref to a wrapper — clicks inside it won't close.
 */
export function useAnimatedPopover(
  popoverRef: RefObject<HTMLElement | null>,
  options: UseAnimatedPopoverOptions,
): UseAnimatedPopoverReturn {
  const { exitingClass, exitAnimationName, wrapperRef } = options;

  // For use with `popover="manual"`.

  // Entry animation handled by CSS and the Popover API, but we need to handle
  // exit animation manually since browser support for
  // `transition-behavior: allow-discrete` is still shaky.

  // 1. The user starts the exit by either
  //    (1) clicking outside the popover (`handleClick` below),
  //    (2) pressing ESC (`handleKeyDown` below), or
  //    (3) calling the `close()` function returned by this hook (e.g. from a
  //        toggle or close button).
  // 2. The exiting class is added to the popover, which triggers the CSS exit
  //    animation. THE POPOVER IS NOT REMOVED FROM THE DOM YET!
  // 3. When the animation ends (`onAnimationEnd` on the popover), we remove the
  //    exiting class, and run `hidePopover()` to close the popover and remove
  //    it from the DOM.

  // ── Document-level close triggers ──────────────────────────────────

  // Step 1 (see above).
  useEffect(() => {
    const popover = popoverRef.current;
    const wrapper = wrapperRef?.current ?? null;
    if (!popover) return;

    // Click outside the popover → start exit animation.
    const handleClick = (e: MouseEvent) => {
      // Only start if (1) the popover is open, and (2) the click is not on
      // the popover, and (3) the click is not on the wrapper (toggle area).
      if (!popover.matches(":popover-open")) return; // (1)
      if (popover.contains(e.target as Node)) return; // (2)
      if (wrapper?.contains(e.target as Node)) return; // (3)
      // Step 2 (see above).
      popover.classList.add(exitingClass);
    };

    // ESC key → start exit animation.
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && popover.matches(":popover-open")) {
        e.preventDefault();
        // Step 2 (see above).
        popover.classList.add(exitingClass);
      }
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [exitingClass, exitAnimationName, popoverRef, wrapperRef]);

  // ── animationend handler ───────────────────────────────────────────
  // Spread onto the popover element via popoverProps.onAnimationEnd.

  // Step 3 (see above).
  const handleAnimationEnd = (e: React.AnimationEvent<HTMLElement>) => {
    const popover = popoverRef.current;
    if (!popover) return;
    if (e.target !== popover) return;
    if (e.animationName !== exitAnimationName) return;
    popover.classList.remove(exitingClass);
    popover.hidePopover();
  };

  // ── Imperative helpers ─────────────────────────────────────────────

  // Step 1 (see above).
  const close = () => {
    popoverRef.current?.classList.add(exitingClass);
  };

  const cancelExit = () => {
    popoverRef.current?.classList.remove(exitingClass);
  };

  return {
    close,
    cancelExit,
    popoverProps: {
      onAnimationEnd: handleAnimationEnd,
    },
  };
}
