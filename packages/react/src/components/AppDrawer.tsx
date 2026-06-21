"use client";

import { Button } from "@/components/Button";
import { MaterialIcon } from "@/components/MaterialIcon";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/app-drawer.css";
import type { ReactNode } from "react";

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
  return (
    <>
      <Button
        appearance="text"
        icon={<MaterialIcon icon="apps" />}
        onClick={onOpen}
        style={style}
        className={cn("skc-app-drawer__toggle", className)}
        element={(props) => <button {...props} popoverTarget="app-drawer" />}
      >
        {STRINGS[locale].toggle}
      </Button>
      <div id="app-drawer" className="skc-app-drawer__modal" popover="auto">
        {children}
      </div>
    </>
  );
};
