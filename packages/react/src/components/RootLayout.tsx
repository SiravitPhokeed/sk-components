import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/root-layout.css";
import type { ElementType, ReactNode } from "react";

/**
 * Props for {@link RootLayout Root Layout}.
 */
export interface RootLayoutProps {
  /**
   * Root Layout positions Navigation Drawer, Navigation Bar, and FAB. It can
   * contain Navigation Drawer, Navigation Bar, FAB, Page Header, Content
   * Layout, and Vertical Split Layout only.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

/**
 * The container of everything inside an application. Components which must
 * appear only once in like Navigation Drawer, Navigation Bar, FAB, and Page
 * Header only work optimally as direct descendants of Root Layout.
 *
 * Root Layout handles positioning of components and responsiveness.
 *
 * @param children Root Layout positions Navigation Drawer, Navigation Bar, and FAB. It can contain Navigation Drawer, Navigation Bar, FAB, Page Header, Content Layout, and Vertical Split Layout only.
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
