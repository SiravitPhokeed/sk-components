"use client";

import { useAnimatedPopover } from "@/hooks/useAnimatedPopover";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Text } from "@/components/Text";
import "@suankularb-components/css/snackbar.css";
import type { ReactNode, Ref } from "react";
import { useCallback, useEffect, useId, useRef } from "react";

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

  /**
   * If `true`, the Snackbar will not auto-dismiss.
   *
   * - Optional. Defaults to `false`.
   */
  persistent?: boolean;

  /**
   * Time in milliseconds until the Snackbar exits automatically.
   *
   * - Optional. Defaults to `6000` (6 seconds).
   * - Ignored when {@link persistent} is `true`.
   */
  autoDismissDurationMs?: number;

  /**
   * A ref to the underlying popover element.
   *
   * - Optional. Useful for imperative access to the DOM element.
   */
  ref?: Ref<HTMLDivElement>;
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
 * @param persistent If `true`, the Snackbar will not auto-dismiss.
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
  ref,
}) => {
  const generatedId = useId();
  const snackbarID = requestedId ?? `snackbar-${generatedId}`;

  const internalRef = useRef<HTMLDivElement>(null);

  // Merge the prop ref with the internal ref so both the consumer
  // (pushSnackbar) and the useAnimatedPopover hook have access.
  const mergedRef = useCallback(
    (node: HTMLDivElement | null) => {
      internalRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref)
        (ref as React.MutableRefObject<HTMLDivElement | null>).current = node;
    },
    [ref],
  );

  const { popoverProps } = useAnimatedPopover(internalRef, {
    exitingClass: EXITING_CLASS,
    exitAnimationName: EXIT_ANIMATION_NAME,
  });

  // Auto-show on mount. Using useEffect guarantees the DOM is committed.
  useEffect(() => {
    internalRef.current?.showPopover();
  }, []);

  // Auto-dismiss after the configured duration (unless persistent).
  useEffect(() => {
    if (persistent) return;
    const el = internalRef.current;
    if (!el) return;

    const timer = setTimeout(() => {
      el.classList.add(EXITING_CLASS);
    }, autoDismissDurationMs);

    return () => clearTimeout(timer);
  }, [persistent, autoDismissDurationMs]);

  return (
    <div
      id={snackbarID}
      ref={mergedRef}
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
