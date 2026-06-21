"use client";

import { Button } from "@/components/Button";
import { MaterialIcon } from "@/components/MaterialIcon";
import { useAnimatedPopover } from "@/hooks/useAnimatedPopover";
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
  },
  th: {
    toggle: "ตัวเลือกแอพ",
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
  const drawerRef = useRef<HTMLDivElement>(null);

  const { close, cancelExit, popoverProps } = useAnimatedPopover(drawerRef, {
    exitingClass: EXITING_CLASS,
    exitAnimationName: EXIT_ANIMATION_NAME,
    wrapperRef,
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
        onClick={() => {
          const drawer = drawerRef.current;
          if (!drawer) return;
          // If the drawer is already open, toggle close: start exit, or cancel
          // if already exiting.
          if (drawer.matches(":popover-open")) {
            if (drawer.classList.contains(EXITING_CLASS)) cancelExit();
            else close();
          }
          // If the drawer is closed, open it and call `onOpen`.
          else {
            onOpen?.();
            drawer.showPopover();
          }
        }}
        className="skc-app-drawer__toggle"
      >
        {STRINGS[locale].toggle}
      </Button>
      <div
        ref={drawerRef}
        {...popoverProps}
        className="skc-app-drawer__modal"
        popover="manual"
      >
        {children}
      </div>
    </div>
  );
};
