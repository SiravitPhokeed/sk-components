import { SideSheet } from "@/components/SideSheet";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/nav-drawer.css";
import type { ReactNode } from "react";

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

  /**
   * Allows for translation of the accessibility labels.
   *
   * - Must be `th` or `en-US`, as SKCom currently only support those 2
   *   languages.
   * - Optional.
   */
  locale?: "en-US" | "th";
}

const STRINGS = {
  "en-US": {
    label: "Primary",
  },
  th: {
    label: "หลัก",
  },
};

/**
 * A navigation drawer that slides in from the left.
 *
 * @param children Nav Drawer Sections holding Nav Drawer Items.
 * @param locale Allows for translation of the accessibility labels.
 */
export const NavDrawer: StyleableFC<NavDrawerProps> = ({
  children,
  locale = "en-US",
  className,
  style,
}) => {
  return (
    <SideSheet
      id="nav-drawer"
      className={cn("skc-nav-drawer", className)}
      style={style}
    >
      <nav
        aria-label={STRINGS[locale].label}
        className="skc-nav-drawer__content"
      >
        {children}
      </nav>
    </SideSheet>
  );
};
