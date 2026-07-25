import type { ContentLayout } from "@/components/ContentLayout";
import type { FAB } from "@/components/FAB";
import type { NavBar } from "@/components/NavBar";
import type { NavDrawer } from "@/components/NavDrawer";
import type { PageHeader } from "@/components/PageHeader";
import { SkipLink } from "@/components/SkipLink";
import type { SplitLayout } from "@/components/SplitLayout";
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
   *   - {@link ContentLayout Content Layout}
   *   - {@link SplitLayout Split Layout}
   * - All other elements should go inside {@link ContentLayout Content Layout}
   *   or {@link SplitLayout Split Layout}.
   * - Always required.
   */
  children: ReactNode;

  /**
   * Whether to render a Skip Link as the first child. The Skip Link allows
   * keyboard users to jump directly to the main content.
   *
   * - Optional. Defaults to `true`.
   */
  skipToContent?: boolean;

  /**
   * Allows for translation of the Skip Link accessibility label.
   *
   * - Must be `en-US` or `th`.
   * - Optional.
   */
  locale?: "en-US" | "th";
}

/**
 * The container for everything in your application. Components like
 * {@link NavDrawer Navigation Drawer}, {@link NavBar Navigation Bar},
 * {@link FAB FAB}, and {@link PageHeader Page Header} each appear exactly
 * once, and they work best as direct children of Root Layout.
 *
 * Root Layout handles component positioning and responsiveness. It also
 * renders a Skip Link by default, allowing keyboard users to jump directly
 * to the main content.
 *
 * @param children Root Layout manages the placement of Navigation Drawer,
 *   Navigation Bar, and FAB.
 * @param skipToContent Whether to render a Skip Link as the first child.
 * @param locale Allows for translation of the Skip Link accessibility label.
 */
export const RootLayout: StyleableFC<RootLayoutProps> = ({
  children,
  skipToContent = true,
  locale,
  element: Element = "body",
  className,
  style,
}) => (
  <Element className={cn("skc-root-layout", className)} style={style}>
    {skipToContent && <SkipLink locale={locale} />}
    {/* Central live-region announcer for aria.notify. */}
    <span id="skc-aria-announcer" role="status" className="skc-sr-only" />
    {children}
  </Element>
);
