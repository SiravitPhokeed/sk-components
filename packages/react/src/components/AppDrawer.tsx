"use client";

import { Button } from "@/components/Button";
import { MaterialIcon } from "@/components/MaterialIcon";
import { useAnimatedDialog } from "@/hooks/useAnimatedDialog";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/app-drawer.css";
import type { ReactNode } from "react";
import { useId, useRef } from "react";

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
   * - Must be `"en-US"` or `"th"`.
   * - Optional.
   */
  locale?: "en-US" | "th";

  /**
   * Called when the toggle Button opens the drawer.
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

const APP_DRAWER_HEADER_ID = "app-drawer-header";
const APP_DRAWER_MODAL_ID = "app-drawer-modal";

const EXITING_CLASS = "skc-app-drawer__modal--exiting";
const EXIT_ANIMATION_NAME = "skc-app-drawer-exit";

/**
 * A dropdown panel that opens from a Button, giving users quick access to a
 * family of related apps.
 *
 * @param children App Drawer Segments.
 * @param locale Allows for translation of the accessibility labels.
 * @param onOpen Called when the toggle Button opens the drawer.
 *
 * @see {@link https://sk-components-demo.mysk.school/docs/layout/app-drawer App Drawer documentation}
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
  const drawerID = useId();

  const { dialogProps } = useAnimatedDialog(drawerRef, {
    exitingClass: EXITING_CLASS,
    exitAnimationName: EXIT_ANIMATION_NAME,
  });

  return (
    <div
      ref={wrapperRef}
      className={cn("skc-app-drawer", className)}
      style={style}
    >
      <Button
        appearance="text"
        icon={<MaterialIcon icon="apps" />}
        command="show-modal"
        commandfor={APP_DRAWER_MODAL_ID}
        onClick={onOpen}
        className="skc-app-drawer__toggle"
      >
        {STRINGS[locale].toggle}
      </Button>
      <dialog
        id={APP_DRAWER_MODAL_ID}
        ref={drawerRef}
        aria-labelledby={APP_DRAWER_HEADER_ID}
        {...dialogProps}
        className="skc-app-drawer__modal"
      >
        <h2 id={APP_DRAWER_HEADER_ID} className="skc-sr-only">
          {STRINGS[locale].header}
        </h2>
        {children}
      </dialog>
    </div>
  );
};
