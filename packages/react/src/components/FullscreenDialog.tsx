"use client";

import { Button } from "@/components/Button";
import { MaterialIcon } from "@/components/MaterialIcon";
import { Text } from "@/components/Text";
import { useAnimatedDialog } from "@/hooks/useAnimatedDialog";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/fullscreen-dialog.css";
import type { CSSProperties, ReactNode } from "react";
import { createContext, useContext, useEffect, useId, useRef } from "react";

const FullscreenDialogContext = createContext<{
  dialogID: string;
  onClose: (() => void) | undefined;
} | null>(null);

/**
 * Returns the Full-screen Dialog context if inside a Full-screen Dialog, or
 * `null` otherwise.
 */
export const useFullscreenDialogContext = () =>
  useContext(FullscreenDialogContext);

const EXITING_CLASS = "skc-fullscreen-dialog--exiting";
const EXIT_ANIMATION_NAME = "skc-fullscreen-dialog-exit";

export interface FullscreenDialogProps {
  /**
   * The content.
   *
   * - Always required.
   */
  children?: ReactNode;

  /**
   * The ID of the `<dialog>` element, for Invoker Commands API support.
   *
   * - Optional. Use with `command="show-modal" and `commandfor={id}` on a
   *   trigger button to open the Dialog declaratively via the Invoker Commands
   *   API.
   * - Use `command="request-close"` to close, not `command="close"`.
   * - Defaults to an auto-generated ID.
   */
  id?: string;

  /**
   * If the Full-screen Dialog is open and shown.
   *
   * - Optional. When provided, the Dialog is controlled: the consumer must
   *   call `onClose` on dismiss and set `open` to `false`.
   * - When omitted, use `id` together with a trigger button that has
   *   `command="show-modal"` and `commandfor={id}`.
   */
  open?: boolean;

  /**
   * The title text.
   *
   * - Always required.
   */
  title: ReactNode;

  /**
   * The submission Button.
   *
   * - Should be a Button.
   * - Optional.
   */
  action?: ReactNode;

  /**
   * Full-screen Dialog transforms into a basic Dialog on larger screens. The
   * width of the Dialog can be set here.
   *
   * - Optional.
   */
  width?: CSSProperties["width"];

  /**
   * Allows for translation of the accessibility labels.
   *
   * - Must be `th` or `en-US`, as SKCom currently only support those 2
   *   languages.
   * - Optional.
   */
  locale?: "en-US" | "th";

  /**
   * The function triggered when the backdrop is clicked or Escape is pressed.
   */
  onClose?: () => void;
}

const STRINGS = {
  "en-US": {
    close: "Close",
  },
  th: {
    close: "ปิดหน้าต่าง",
  },
};

/**
 * A Full-screen Dialog fills the entire screen containing a series of tasks
 * required to complete.
 *
 * A Full-screen Dialog only fills the screen on mobile and turns into a Dialog
 * on larger screens. A Dialog can appear above a Full-screen Dialog.
 *
 * @param children The content.
 * @param id TThe ID of the `<dialog>` element, for Invoker Commands API support.
 * @param open If the Full-screen Dialog is open and shown.
 * @param title The title text.
 * @param action The submission Button.
 * @param width The width of the Dialog this Full-screen Dialog transforms into.
 * @param locale Allows for translation of the accessibility labels.
 * @param onClose The function triggered when the backdrop is clicked or Escape is pressed.
 */
export const FullscreenDialog: StyleableFC<FullscreenDialogProps> = ({
  children,
  id: requestedId,
  open,
  title,
  action,
  width,
  locale = "en-US",
  onClose,
  style,
  className,
}) => {
  const generatedId = useId();
  const dialogID = requestedId ?? `fullscreen-dialog-${generatedId}`;

  const dialogRef = useRef<HTMLDialogElement>(null);

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
    <dialog
      id={dialogID}
      ref={dialogRef}
      role="alertdialog"
      aria-labelledby={`${dialogID}-title`}
      {...dialogProps}
      className={cn("skc-fullscreen-dialog", className)}
      style={{ ...style, width }}
    >
      <FullscreenDialogContext.Provider value={{ dialogID, onClose }}>
        {/* Top app bar */}
        <div className="skc-fullscreen-dialog__top-app-bar">
          <Button
            appearance="text"
            icon={<MaterialIcon icon="close" />}
            alt={STRINGS[locale].close}
            command="request-close"
            commandfor={dialogID}
          />
          <Text id={`${dialogID}-title`} type="title-large" element="h2">
            {title}
          </Text>
          {action}
        </div>

        {/* Content */}
        <div className="skc-fullscreen-dialog__content">{children}</div>
      </FullscreenDialogContext.Provider>
    </dialog>
  );
};
