"use client";

import { Button } from "@/components/Button";
import { MaterialIcon } from "@/components/MaterialIcon";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/app-drawer.css";
import type { AnimationEvent, ReactNode } from "react";
import { useCallback, useEffect, useRef } from "react";

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
   * - Must be `th` or `en-US`, as SKCom currently only support those 2
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
 * Implemented with `<dialog>` and `showModal()` for native inertness,
 * focus trapping, and backdrop management.
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

  // Start the exit animation.
  const close = useCallback(() => {
    drawerRef.current?.classList.add(EXITING_CLASS);
  }, []);

  // ESC key → cancel event (spec-mandated for modal dialogs).
  // React has no onCancel synthetic event, so we use addEventListener.
  useEffect(() => {
    const dialog = drawerRef.current;
    if (!dialog) return;

    const handleCancel = (e: Event) => {
      e.preventDefault();
      close();
    };

    dialog.addEventListener("cancel", handleCancel);
    return () => dialog.removeEventListener("cancel", handleCancel);
  }, [close]);

  // After the exit animation completes, remove the exiting class and
  // actually close the dialog.
  const handleAnimationEnd = (e: AnimationEvent<HTMLDialogElement>) => {
    const dialog = drawerRef.current;
    if (!dialog) return;
    if (e.target !== dialog) return;
    if (e.animationName !== EXIT_ANIMATION_NAME) return;
    dialog.classList.remove(EXITING_CLASS);
    dialog.close();
  };

  // With showModal(), the toggle is inert while the dialog is open,
  // so this only ever fires to open.
  const handleToggle = () => {
    const dialog = drawerRef.current;
    if (!dialog) return;
    onOpen?.();
    dialog.showModal();
  };

  // Backdrop click → NOT spec-mandated. Clicks on ::backdrop fire on
  // the owning <dialog> with e.target === dialog.
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget && e.currentTarget.open) close();
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
        onAnimationEnd={handleAnimationEnd}
        onClick={handleBackdropClick}
        className="skc-app-drawer__modal"
      >
        <h2 className="skc-app-drawer__header">{STRINGS[locale].header}</h2>
        {children}
      </dialog>
    </div>
  );
};
