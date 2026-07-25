"use client";

import { useAnimatedDialog } from "@/hooks/useAnimatedDialog";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/dialog.css";
import type { CSSProperties, ReactNode } from "react";
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

const DialogContext = createContext<{
  dialogID: string;
  onClose: (() => void) | undefined;
  hasTitle: boolean;
  setHasTitle: (hasTitle: boolean) => void;
} | null>(null);

/**
 * Returns the Dialog context if inside a Dialog, or `null` otherwise.
 */
export const useDialogContext = () => useContext(DialogContext);

const EXITING_CLASS = "skc-dialog--exiting";
const EXIT_ANIMATION_NAME = "skc-dialog-exit";

export interface DialogProps extends ElementCustomizableProps {
  /**
   * Parts of a Dialog.
   *
   * - {@link DialogHeader Dialog Header} and {@link Actions Actions} are
   *   required components and must appear in the said order.
   * - If present, {@link DialogContent Dialog Content} must appear between
   *   Dialog Header and Actions.
   */
  children: ReactNode;

  /**
   * The ID of the `<dialog>` element, for Invoker Commands API support.
   *
   * - Use with `command="show-modal"` and `commandfor={id}` on a
   *   trigger button to open the Dialog declaratively via the Invoker Commands
   *   API.
   * - Buttons inside this Dialog will automatically use this ID for their
   *   `commandfor` when they have a `command` but no explicit `commandfor`.
   * - Use `command="request-close"` to close, not `command="close"`.
   * - Optional. Defaults to an auto-generated ID.
   */
  id?: string;

  /**
   * A description of the Dialog for screen readers, similar to `alt` on
   * `<img>`.
   *
   * - Required if the Dialog does not have a Dialog Header with a title.
   */
  alt?: string;

  /**
   * If the Dialog is open and shown.
   *
   * - When provided, the Dialog is controlled: the consumer must
   *   call `onClose` on dismiss and set `open` to `false`.
   * - When omitted, use `id` together with a trigger button that has
   *   `command="show-modal"` and `commandfor={id}`.
   * - Optional.
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
 * A Dialog interrupts the user to make an immediately significant decision
 * or enter important information.
 *
 * @param children Parts of a Dialog.
 * @param id The ID of the `<dialog>` element, for Invoker Commands API support.
 * @param alt A description of the Dialog for screen readers, similar to `alt` on `<img>`.
 * @param open If the Dialog is open and shown.
 * @param onClose The function triggered when the backdrop is clicked or Escape is pressed.
 * @param width The width of the Dialog.
 */
export const Dialog: StyleableFC<DialogProps> = ({
  children,
  id: requestedId,
  alt,
  open,
  onClose,
  width,
  element: Element = "dialog",
  style,
  className,
}) => {
  const generatedId = useId();
  const dialogID = requestedId ?? `dialog-${generatedId}`;

  const [hasTitle, setHasTitle] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const dialogContextValue = { dialogID, onClose, hasTitle, setHasTitle };

  const { close, dialogProps } = useAnimatedDialog(dialogRef, {
    exitingClass: EXITING_CLASS,
    exitAnimationName: EXIT_ANIMATION_NAME,
    onClose,
  });

  // Controlled mode: open is provided, so we need to open/close the dialog when
  // it changes.
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog || open === undefined) return;
    if (open && !dialog.open) dialog.showModal();
    else if (!open && dialog.open) close();
  }, [open, close]);

  return (
    <DialogContext.Provider value={dialogContextValue}>
      <Element
        id={dialogID}
        ref={dialogRef}
        role="alertdialog"
        aria-modal="true"
        aria-label={alt}
        aria-labelledby={hasTitle ? `${dialogID}-title` : undefined}
        aria-describedby={`${dialogID}-desc`}
        {...dialogProps}
        className={cn("skc-dialog", className)}
        style={{ ...style, width }}
      >
        {children}
      </Element>
    </DialogContext.Provider>
  );
};
