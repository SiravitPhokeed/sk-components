import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/root-layout.css";
import type { ReactNode } from "react";

/**
 * Props for {@link RootLayout Root Layout}.
 */
export interface RootLayoutProps extends ElementCustomizableProps {
  /**
   * Root Layout manages the placement of Navigation Drawer, Navigation Bar, and
   * FAB.
   *
   * - These six components should be direct children of Root Layout:
   *   - Navigation Drawer
   *   - Navigation Bar
   *   - FAB
   *   - Page Header
   *   - Content Layout
   *   - Split Layout
   * - All other elements should go inside Content Layout or Split Layout.
   * - Always required.
   */
  children: ReactNode;
}

/**
 * The container for everything in your application. Components like Nav
 * Drawer, Navigation Bar, FAB, and Page Header each appear exactly once, and they
 * work best as direct children of Root Layout.
 *
 * Root Layout handles component positioning and responsiveness.
 *
 * @param children Root Layout manages the placement of Navigation Drawer, Navigation Bar, and FAB.
 */
export const RootLayout: StyleableFC<RootLayoutProps> = ({
  children,
  element: Element = "body",
  className,
  style,
}) => (
  <Element className={cn("skc-root-layout", className)} style={style}>
    {children}
  </Element>
);
