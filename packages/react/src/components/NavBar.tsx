"use client";

import { Button } from "@/components/Button";
import { MaterialIcon } from "@/components/MaterialIcon";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/nav-bar.css";
import type { ReactNode } from "react";

/**
 * Props for {@link NavBar Navigation Bar}.
 */
export interface NavBarProps extends ElementCustomizableProps {
  /**
   * A Navigation Bar contains Navigation Bar Items, each leading to a
   * different top-level page. These pages should only be navigated to from
   * the Navigation Bar and the Navigation Drawer.
   *
   * - Must include at least 3 Navigation Bar Items.
   * - Must not include more than 5 Navigation Bar Items visible on mobile.
   * - Always required.
   */
  children: ReactNode;

  /**
   * A description of the Navigation Bar for screen readers, similar to `alt`
   * on `<img>`. Applied as `aria-label` on the `<nav>` element.
   *
   * - Optional.
   */
  alt?: string;

  /**
   * More Navigation Items can be placed on the bottom of the Navigation Rail
   * on larger screens. Use cases are settings and log out.
   *
   * - Optional.
   */
  end?: ReactNode;

  /**
   * Allows for translation of the accessibility labels.
   *
   * - Must be `en-US` or `th`.
   * - Optional.
   */
  locale?: "en-US" | "th";

  /**
   * The function called when the user clicks on the navigation Button.
   *
   * - Optional.
   */
  onNavToggle?: () => any;
}

const STRINGS = {
  "en-US": {
    alt: "Primary",
    nav: "Open navigation",
  },
  th: {
    alt: "หลัก",
    nav: "เปิดเมนู",
  },
};

/**
 * A Navigation Bar provides persistent access to all top-level pages. On larger
 * screens, it transforms into a Navigation Rail.
 *
 * @param children A Navigation Bar contains Navigation Bar Items, each leading to a different top-level page.
 * @param alt A description of the Navigation Bar for screen readers, similar to `alt` on `<img>`.
 * @param end More Navigation Items can be placed on the bottom of the Navigation Rail on larger screens.
 * @param locale Allows for translation of the accessibility labels.
 * @param onNavToggle The function called when the user clicks on the navigation Button.
 *
 * @see https://sk-components-demo.mysk.school/docs/layout/nav-bar
 */
export const NavBar: StyleableFC<NavBarProps> = ({
  children,
  alt,
  end,
  locale = "en-US",
  onNavToggle,
  element: Element = "nav",
  style,
  className,
}) => (
  <Element
    aria-label={alt ?? STRINGS[locale].alt}
    className={cn("skc-nav-bar", className)}
    style={style}
  >
    <div className="skc-nav-bar__content">
      <Button
        appearance="text"
        icon={<MaterialIcon icon="menu" />}
        alt={STRINGS[locale].nav}
        onClick={onNavToggle}
        command="show-modal"
        commandfor="nav-drawer"
        className="skc-nav-bar__nav-toggle"
      />
      <div className="skc-nav-bar__destinations">{children}</div>
      {end && <div className="skc-nav-bar__end">{end}</div>}
    </div>
  </Element>
);

NavBar.displayName = "NavBar";
