"use client";

import { useAnimatedDialog } from "@/hooks/useAnimatedDialog";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/side-sheet.css";
import type { ReactNode } from "react";
import { useRef } from "react";

/**
 * Props for {@link SideSheet Side Sheet}.
 */
export interface SideSheetProps {
  /**
   * Content of the Side Sheet.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * The ID of the `<dialog>` element, for Invoker Commands API support.
   *
   * - Use with `command="show-modal"` and `commandfor={id}` on a trigger button
   *   to open the Side Sheet declaratively via the Invoker Commands API.
   * - Use `command="request-close"` to close, not `command="close"`.
   * - Optional.
   */
  id?: string;

  /**
   * A description of the Side Sheet for screen readers, similar to `alt` on
   * `<img>`.
   *
   * - Required if the Side Sheet's purpose isn't clear from its trigger, or if
   *   multiple Side Sheets exist in the same context.
   */
  alt?: string;

  /**
   * The edge of the screen the Side Sheet attaches to.
   *
   * - `"right"` attaches to the right edge in LTR, left in RTL. This is the
   *   default.
   * - `"left"` attaches to the left edge in LTR, right in RTL.
   * - Optional.
   */
  attach?: "left" | "right";
}

const EXITING_CLASS = "skc-side-sheet--exiting";
const EXIT_ANIMATION_NAME = "skc-side-sheet-exit";

/**
 * A modal panel that slides in from the side of the screen for secondary
 * content — related information, settings, or navigation that doesn’t need to
 * be front and center.
 *
 * @param children Content of the Side Sheet.
 * @param id The ID of the `<dialog>` element, for Invoker Commands API support.
 * @param alt A description of the Side Sheet for screen readers, similar to `alt` on `<img>`.
 * @param attach The edge of the screen the Side Sheet attaches to.
 */
export const SideSheet: StyleableFC<SideSheetProps> = ({
  children,
  id,
  alt,
  attach = "right",
  style,
  className,
}) => {
  const drawerRef = useRef<HTMLDialogElement>(null);

  const { dialogProps } = useAnimatedDialog(drawerRef, {
    exitingClass: EXITING_CLASS,
    exitAnimationName: EXIT_ANIMATION_NAME,
  });

  return (
    <dialog
      id={id}
      ref={drawerRef}
      aria-modal="true"
      aria-label={alt}
      {...dialogProps}
      className={cn(
        "skc-side-sheet",
        attach === "left" && "skc-side-sheet--left",
        className,
      )}
      style={style}
    >
      {children}
    </dialog>
  );
};
