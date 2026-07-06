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
}

const EXITING_CLASS = "skc-side-sheet--exiting";
const EXIT_ANIMATION_NAME = "skc-side-sheet-exit";

/**
 * A side sheet that slides in from the left.
 *
 * @param children Side Sheet Sections holding Nav Drawer Items.
 */
export const SideSheet: StyleableFC<SideSheetProps> = ({
  children,
  id,
  style,
  className,
}) => {
  const drawerRef = useRef<HTMLDialogElement>(null);

  const { close, dialogProps } = useAnimatedDialog(drawerRef, {
    exitingClass: EXITING_CLASS,
    exitAnimationName: EXIT_ANIMATION_NAME,
  });

  return (
    <dialog
      id={id}
      ref={drawerRef}
      {...dialogProps}
      className={cn("skc-side-sheet", className)}
      style={style}
    >
      <nav
        className="skc-side-sheet__content"
        // Auto-close when a Nav Drawer Item is clicked.
        // Capture phase fires before the item's own onClick, matching the
        // legacy behavior where onClose() fires first.
        onClickCapture={(e) => {
          const target = e.target as HTMLElement;
          if (target.closest(".skc-nav-drawer-item")) close();
        }}
      >
        {children}
      </nav>
    </dialog>
  );
};
