"use client";

import { Button } from "@/components/Button";
import { MaterialIcon } from "@/components/MaterialIcon";
import { useAnimatedDialog } from "@/hooks/useAnimatedDialog";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/app-drawer.css";
import type { ReactNode } from "react";
import { useRef } from "react";

/**
 * Props for {@link AppDrawer App Drawer}.
 */
export interface AppDrawerProps {
  /**
   * App Drawer Segments.
   */
  children: ReactNode;

  /**
   * Allows for translation of the accessibility labels.
   *
   * - Must be `th` or `en-US`, as SKCom currently only supports these two
   *   languages.
   * - Optional.
   */
  locale?: "en-US" | "th";

  /**
   * Triggers when the toggle Button opens the drawer.
   */
  onOpen?: () => any;
}

const STRINGS = {
  "en-US": {
    toggle: "Apps",
    header: "Apps",
  },
  th: {
    toggle: "ตัวเลือกแอพ",
    header: "รายการแอพ",
  },
};

const EXITING_CLASS = "skc-app-drawer__modal--exiting";
const EXIT_ANIMATION_NAME = "skc-app-drawer-exit";

/**
 * A drawer of related apps.
 *
 * @param children App Drawer Segments.
 * @param locale Allows for translation of the accessibility labels.
 * @param onOpen Triggers when the toggle Button opens the drawer.
 */
export const AppDrawer: StyleableFC<AppDrawerProps> = ({
  children,
  locale = "en-US",
  onOpen,
  style,
  className,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const drawerRef = useRef<HTMLDialogElement>(null);

  const { dialogProps } = useAnimatedDialog(drawerRef, {
    exitingClass: EXITING_CLASS,
    exitAnimationName: EXIT_ANIMATION_NAME,
  });

  // With showModal(), the toggle is inert while the dialog is open,
  // so this only ever fires to open.
  const handleToggle = () => {
    const dialog = drawerRef.current;
    if (!dialog) return;
    onOpen?.();
    dialog.showModal();
  };

  return (
    <div
      ref={wrapperRef}
      className={cn("skc-app-drawer", className)}
      style={style}
    >
      <Button
        appearance="text"
        icon={<MaterialIcon icon="apps" />}
        onClick={handleToggle}
        className="skc-app-drawer__toggle"
      >
        {STRINGS[locale].toggle}
      </Button>
      <dialog
        ref={drawerRef}
        {...dialogProps}
        className="skc-app-drawer__modal"
      >
        <h2 className="skc-app-drawer__header">{STRINGS[locale].header}</h2>
        {children}
      </dialog>
    </div>
  );
};
