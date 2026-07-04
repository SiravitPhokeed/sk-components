import { SideSheet } from "@/components/SideSheet";
import type { StyleableFC } from "@/lib/types";
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
}

/**
 * A navigation drawer that slides in from the left.
 *
 * @param children Nav Drawer Sections holding Nav Drawer Items.
 */
export const NavDrawer: StyleableFC<NavDrawerProps> = (props) => {
  return <SideSheet id="nav-drawer" {...props} />;
};
