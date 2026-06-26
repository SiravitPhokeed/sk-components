"use client";

import { useAnimatedPopover } from "@/hooks/useAnimatedPopover";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Text } from "@/components/Text";
import "@suankularb-components/css/snackbar.css";
import type { ReactNode } from "react";
import { useEffect, useId, useRef } from "react";

const EXITING_CLASS = "skc-snackbar--exiting";
const EXIT_ANIMATION_NAME = "skc-snackbar-exit";

export interface SnackbarProps {
  /**
   * The message inside the Snackbar.
   *
   * - The Material Design style guide
   *   {@link https://m3.material.io/foundations/content-design/style-guide/grammar-and-punctuation recommend omitting periods}
   *   at the end of Snackbar messages.
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

  /**
   * Prevent the Snackbar from auto-dismissing after a certain duration.
   *
   * - Incompatible with {@link autoDismissDurationMs `autoDismissDurationMs`}.
   * - Optional.
   */
  persistent?: boolean;

  /**
   * Time in milliseconds until the Snackbar exits automatically.
   *
   * - Incompatible with {@link persistent `persistent`}.
   * - Defaults to 6000 (6 seconds).
   * - Optional.
   *
   * @default 6000
   */
  autoDismissDurationMs?: number;
}

/**
 * Snackbar briefly shows low priority information that does not require action,
 * as opposed to Dialog. It can inform the user about ongoing processes or an
 * event that has just been completed.
 *
 * Users frequently leave Snackbars unread, so check if other components like
 * Dialog, `loading` in Button, or inline banners are more appropriate for your
 * use case.
 *
 * @param children The message inside the Snackbar.
 * @param id The ID of the popover element, for Imperative API access.
 * @param action A Snackbar can contain 1 action. Pressing this action closes the Snackbar.
 * @param stacked Put the message (`children`) above the action (`action`).
 * @param persistent Prevent the Snackbar from auto-dismissing after a certain duration.
 * @param autoDismissDurationMs Time in milliseconds until the Snackbar exits automatically.
 */
export const Snackbar: StyleableFC<SnackbarProps> = ({
  children,
  id: requestedId,
  action,
  stacked,
  persistent = false,
  autoDismissDurationMs = 6000,
  className,
  style,
}) => {
  const generatedId = useId();
  const snackbarID = requestedId ?? `snackbar-${generatedId}`;

  const ref = useRef<HTMLDivElement>(null);

  const { popoverProps } = useAnimatedPopover(ref, {
    exitingClass: EXITING_CLASS,
    exitAnimationName: EXIT_ANIMATION_NAME,
  });

  // Auto-show on mount. Using useEffect guarantees the DOM is committed.
  useEffect(() => {
    ref.current?.showPopover();
  }, []);

  // Auto-dismiss after the configured duration (unless persistent).
  useEffect(() => {
    if (persistent) return;
    const el = ref.current;
    if (!el) return;

    const timer = setTimeout(() => {
      el.classList.add(EXITING_CLASS);
    }, autoDismissDurationMs);

    return () => clearTimeout(timer);
  }, [persistent, autoDismissDurationMs]);

  return (
    <div
      id={snackbarID}
      ref={ref}
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
