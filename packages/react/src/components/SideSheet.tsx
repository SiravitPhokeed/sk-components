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
   * - Use with `command="show-modal" and `commandfor={id}` on a trigger button
   *   to open the Side Sheet declaratively via the Invoker Commands API.
   * - Use `command="request-close"` to close, not `command="close"`.
   * - Optional.
   */
  id?: string;

  /**
   * The edge of the screen the Side Sheet attaches to.
   *
   * - Optional.
   */
  attach?: "left" | "right";
}

const EXITING_CLASS = "skc-side-sheet--exiting";
const EXIT_ANIMATION_NAME = "skc-side-sheet-exit";

/**
 * Side Sheet is modal attached to one side of the screen. It is used to display
 * content that is related to the main content, but not essential to it. It can
 * be used for navigation, settings, or other secondary content.
 *
 * @param children Content of the Side Sheet.
 * @param id The ID of the `<dialog>` element, for Invoker Commands API support.
 * @param attach The edge of the screen the Side Sheet attaches to.
 */
export const SideSheet: StyleableFC<SideSheetProps> = ({
  children,
  id,
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
