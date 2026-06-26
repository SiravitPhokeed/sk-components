"use client";

import { useAnimatedPopover } from "@/hooks/useAnimatedPopover";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Text } from "@/components/Text";
import "@suankularb-components/css/snackbar.css";
import type { ReactNode } from "react";
import { useId, useRef } from "react";

const EXITING_CLASS = "skc-snackbar--exiting";
const EXIT_ANIMATION_NAME = "skc-snackbar-exit";

export interface SnackbarProps {
  /**
   * The message inside the Snackbar.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * The ID of the popover element, for Imperative API access.
   *
   * - Optional. Defaults to an auto-generated ID.
   * - Call `showPopover()` on the element to display the Snackbar.
   */
  id?: string;

  /**
   * A Snackbar can contain 1 action. Pressing this action closes the Snackbar.
   *
   * - Must contain 1 Button with text appearance.
   * - Optional.
   */
  action?: ReactNode;

  /**
   * Put the message ({@link children `children`}) above the action
   * ({@link action `action`}).
   *
   * - This is useful if the action text is long.
   * - Optional.
   */
  stacked?: boolean;
}

/**
 * Snackbar briefly shows low priority information that does not require
 * action, as opposed to Dialog. It can inform the user about ongoing processes
 * or an event that has just been completed.
 *
 * @param children The message inside the Snackbar.
 * @param id The ID of the popover element, for Imperative API access.
 * @param action A Snackbar can contain 1 action. Pressing this action closes the Snackbar.
 * @param stacked Put the message (`children`) above the action (`action`).
 */
export const Snackbar: StyleableFC<SnackbarProps> = ({
  children,
  id: requestedId,
  action,
  stacked,
  className,
  style,
}) => {
  const generatedId = useId();
  const snackbarID = requestedId ?? `snackbar-${generatedId}`;

  const snackbarRef = useRef<HTMLDivElement>(null);

  const { popoverProps } = useAnimatedPopover(snackbarRef, {
    exitingClass: EXITING_CLASS,
    exitAnimationName: EXIT_ANIMATION_NAME,
  });

  return (
    <div
      id={snackbarID}
      ref={snackbarRef}
      popover="manual"
      role="status"
      aria-live="polite"
      {...popoverProps}
      className={cn(
        "skc-snackbar",
        stacked && "skc-snackbar--stacked",
        className,
      )}
      style={style}
    >
      <Text type="body-medium" className="skc-snackbar__label">
        {children}
      </Text>
      {action && <div className="skc-snackbar__action">{action}</div>}
    </div>
  );
};

Snackbar.displayName = "Snackbar";
