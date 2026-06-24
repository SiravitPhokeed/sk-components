"use client";

import { useAnimatedDialog } from "@/hooks/useAnimatedDialog";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/nav-drawer.css";
import type { ReactNode } from "react";
import { useRef } from "react";

/**
 * Props for {@link NavDrawer Nav Drawer}.
 */
export interface NavDrawerProps {
  /**
   * Nav Drawer Sections holding Nav Drawer Items, the navigation destinations.
   *
   * - Must consist of {@link NavDrawerSection Nav Drawer Sections}.
   * - Always required.
   */
  children: ReactNode;
}

const EXITING_CLASS = "skc-nav-drawer--exiting";
const EXIT_ANIMATION_NAME = "skc-nav-drawer-exit";

/**
 * A navigation drawer that slides in from the left.
 *
 * Opened by a button with `command="show-modal" commandfor="<id>"` — the
 * browser calls `showModal()` natively via the Invoker Commands API.
 * Closes when a Nav Drawer Item is clicked, when the backdrop is clicked,
 * or when ESC is pressed.
 *
 * @param children Nav Drawer Sections holding Nav Drawer Items.
 */
export const NavDrawer: StyleableFC<NavDrawerProps> = ({
  children,
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
      id="nav-drawer"
      ref={drawerRef}
      {...dialogProps}
      className={cn("skc-nav-drawer", className)}
      style={style}
    >
      <nav
        className="skc-nav-drawer__content"
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
