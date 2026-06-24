"use client";

import type { RefObject } from "react";
import { useCallback, useEffect } from "react";

/**
 * Options for {@link useAnimatedDialog}.
 */
export interface UseAnimatedDialogOptions {
  /**
   * CSS class added to the dialog element to trigger the exit animation.
   *
   * The corresponding CSS should apply a `@keyframes` animation that plays
   * the exit transition (e.g. fade + slide out). The animation should have
   * `forwards` fill mode so the end state sticks until `dialog.close()` runs.
   */
  exitingClass: string;

  /**
   * `animationName` of the exit @keyframes, used to filter `animationend`
   * events. This prevents `::backdrop` animations (and any other animation
   * on the dialog element) from accidentally triggering the close.
   */
  exitAnimationName: string;
}

/**
 * Return value of {@link useAnimatedDialog}.
 */
export interface UseAnimatedDialogReturn {
  /**
   * Start the exit animation. The dialog will be closed via `dialog.close()`
   * after the animation completes (`animationend`).
   *
   * Call this from a close button inside the dialog, or any other explicit
   * close trigger.
   */
  close: () => void;

  /**
   * Props to spread onto the `<dialog>` element. Handles:
   * - `onAnimationEnd` — removes the exiting class and calls `dialog.close()`
   *   once the exit animation finishes.
   * - `onClick` — detects clicks on the `::backdrop` (not spec-mandated for
   *   `<dialog>`) by checking `e.target === e.currentTarget`.
   */
  dialogProps: {
    onAnimationEnd: (e: React.AnimationEvent<HTMLDialogElement>) => void;
    onClick: (e: React.MouseEvent<HTMLDialogElement>) => void;
  };
}

/**
 * Manages exit animations for a `<dialog>` element opened via `showModal()`.
 *
 * The browser natively handles:
 * - Top-layer rendering and `::backdrop` creation
 * - ESC key → `cancel` event (this hook calls `preventDefault()` to play
 *   the exit animation before closing)
 * - Focus trapping and background inertness
 *
 * This hook adds:
 * - Exit animation lifecycle (add exiting class → wait for `animationend` →
 *   call `dialog.close()`)
 * - Backdrop-click dismissal (not spec-mandated, detected via
 *   `e.target === e.currentTarget`)
 *
 * @param dialogRef Ref attached to the `<dialog>` element.
 * @param options.exitingClass CSS class that triggers the exit animation.
 * @param options.exitAnimationName `animationName` to filter `animationend` for.
 */
export function useAnimatedDialog(
  dialogRef: RefObject<HTMLDialogElement | null>,
  options: UseAnimatedDialogOptions,
): UseAnimatedDialogReturn {
  const { exitingClass, exitAnimationName } = options;

  // ── Imperative close ───────────────────────────────────────────────

  const close = useCallback(() => {
    dialogRef.current?.classList.add(exitingClass);
  }, [dialogRef, exitingClass]);

  // ── ESC key → cancel event (spec-mandated) ─────────────────────────
  // React has no onCancel synthetic event, so we use addEventListener.

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      close();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [close]);

  // ── animationend handler ───────────────────────────────────────────
  // Spread onto the <dialog> via dialogProps.onAnimationEnd.

  const handleAnimationEnd = (e: React.AnimationEvent<HTMLDialogElement>) => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (e.target !== dialog) return;
    if (e.animationName !== exitAnimationName) return;
    dialog.classList.remove(exitingClass);
    dialog.close();
  };

  // ── Backdrop-click handler ─────────────────────────────────────────
  // Not spec-mandated for <dialog>. Clicks on ::backdrop fire on the
  // owning <dialog> with e.target === dialog.

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget && e.currentTarget.open) close();
  };

  return {
    close,
    dialogProps: {
      onAnimationEnd: handleAnimationEnd,
      onClick: handleBackdropClick,
    },
  };
}
