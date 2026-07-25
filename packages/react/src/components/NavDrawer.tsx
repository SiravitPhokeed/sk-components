import { SideSheet } from "@/components/SideSheet";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/nav-drawer.css";
import type { ReactNode } from "react";

/**
 * Props for {@link NavDrawer Navigation Drawer}.
 */
export interface NavDrawerProps {
  /**
   * Navigation Drawer Sections holding Navigation Drawer Items, the navigation
   * destinations.
   *
   * - Always required.
   */
  children: ReactNode;
}

/**
 * A navigation drawer that slides in from the left.
 *
 * @param children Navigation Drawer Sections holding Navigation Drawer Items, the navigation destinations.
 *
 * @see https://sk-components-demo.mysk.school/docs/layout/nav-drawer
 */
export const NavDrawer: StyleableFC<NavDrawerProps> = ({
  children,
  className,
  style,
}) => (
  <SideSheet
    id="nav-drawer"
    attach="left"
    className={cn("skc-nav-drawer", className)}
    style={style}
  >
    <nav className="skc-nav-drawer__content">{children}</nav>
  </SideSheet>
);
