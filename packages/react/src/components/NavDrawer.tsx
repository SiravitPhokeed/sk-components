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

  /**
   * A description of the Navigation Drawer for screen readers, similar to
   * `alt` on `<img>`. Applied as `aria-label` on the `<nav>` element.
   *
   * - Optional. Defaults to a localized "Main" string.
   */
  alt?: string;

  /**
   * Allows for translation of the accessibility labels.
   *
   * - Must be `en-US` or `th`.
   * - Optional.
   */
  locale?: "en-US" | "th";
}

const STRINGS = {
  "en-US": {
    alt: "Main",
  },
  th: {
    alt: "หลัก",
  },
};

/**
 * A navigation drawer that slides in from the left.
 *
 * @param children Navigation Drawer Sections holding Navigation Drawer Items, the navigation destinations.
 * @param alt A description of the Navigation Drawer for screen readers, similar to `alt` on `<img>`.
 * @param locale Allows for translation of the accessibility labels.
 */
export const NavDrawer: StyleableFC<NavDrawerProps> = ({
  children,
  alt,
  locale = "en-US",
  className,
  style,
}) => (
  <SideSheet
    id="nav-drawer"
    attach="left"
    className={cn("skc-nav-drawer", className)}
    style={style}
  >
    <nav
      aria-label={alt ?? STRINGS[locale].alt}
      className="skc-nav-drawer__content"
    >
      {children}
    </nav>
  </SideSheet>
);
