"use client";

import { useAnimatedDialog } from "@/hooks/useAnimatedDialog";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/dialog.css";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
} from "react";
import type { CSSProperties, ReactNode } from "react";

const DialogContext = createContext<{
  dialogID: string;
  onClose: (() => void) | undefined;
} | null>(null);

/**
 * Returns the Dialog context if inside a Dialog, or `null` otherwise.
 */
export const useDialogContext = () => useContext(DialogContext);

const EXITING_CLASS = "skc-dialog--exiting";
const EXIT_ANIMATION_NAME = "skc-dialog-exit";

export interface DialogProps {
  /**
   * Parts of a Dialog.
   *
   * - Dialog Header and Actions are required components and must appear in the
   *   said order.
   * - If present, Dialog Content must appear between Dialog Header and Actions.
   */
  children: ReactNode;

  /**
   * The ID of the `<dialog>` element, for Invoker Commands API support.
   *
   * - Optional. Use with `command="show-modal" and `commandfor={id}` on a
   *   trigger button to open the dialog declaratively via the Invoker Commands API.
   * - Defaults to an auto-generated ID.
   */
  id?: string;

  /**
   * If the Dialog is open and shown.
   *
   * - Optional. When provided, the Dialog is controlled: the consumer must
   *   call `onClose` on dismiss and set `open` to `false`.
   * - When omitted, use `id` together with a trigger button that has
   *   `command="show-modal"` and `commandfor={id}`.
   */
  open?: boolean;

  /**
   * The function triggered when the backdrop is clicked or Escape is pressed.
   *
   * - In controlled mode (`open` is provided), the consumer should set
   *   `open` to `false` in response.
   */
  onClose?: () => void;

  /**
   * The width of the Dialog. This is useful when you want to fit more content
   * into a Dialog, or when you have many overlapping Dialogs.
   *
   * - Optional.
   */
  width?: CSSProperties["width"];
}

/**
 * A Dialog interrupts the user to have them make an immediately significant
 * decision or prompts a user to enter important information.
 *
 * @param id The ID of the `<dialog>` element, for Invoker Commands API support.
 * @param children Parts of a Dialog.
 * @param open If the Dialog is open and shown.
 * @param onClose The function triggered when the backdrop is clicked or Escape is pressed.
 * @param width The width of the Dialog.
 */
export const Dialog: StyleableFC<DialogProps> = ({
  children,
  id: requestedId,
  open,
  onClose,
  width,
  style,
  className,
}) => {
  const generatedId = useId();
  const dialogID = requestedId ?? `dialog-${generatedId}`;

  const dialogRef = useRef<HTMLDialogElement>(null);

  const { close, dialogProps } = useAnimatedDialog(dialogRef, {
    exitingClass: EXITING_CLASS,
    exitAnimationName: EXIT_ANIMATION_NAME,
    onClose,
  });

  // ── Controlled mode (open / onClose) ─────────────────────────────────

  // When open transitions to true → showModal()
  // When open transitions to false → trigger exit animation
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || open === undefined) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) close();
  }, [open, close]);

  return (
    <DialogContext.Provider value={{ dialogID, onClose }}>
      <dialog
        id={dialogID}
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby={`${dialogID}-title`}
        aria-describedby={`${dialogID}-desc`}
        {...dialogProps}
        className={cn("skc-dialog", className)}
        style={{ ...style, width }}
      >
        {children}
      </dialog>
    </DialogContext.Provider>
  );
};
