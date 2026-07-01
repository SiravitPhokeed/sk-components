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
   * A small image of your brand can be put on the Navigation Rail to
   * constantly remind your users that they are, in fact, in your app.
   *
   * - Not displayed on mobile.
   * - Ensure the image is simple and undistracting.
   * - Optional but recommended.
   */
  brand?: ReactNode;

  /**
   * More Navigation Items can be placed on the bottom of the Navigation Rail
   * in larger screens. Use cases are settings and log out.
   *
   * - Optional.
   */
  end?: ReactNode;

  /**
   * Allows for translation of the accessibility labels.
   *
   * - Must be `th` or `en-US`, as SKCom currently only support those 2 languages.
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
    nav: "Open navigation",
  },
  th: {
    nav: "เปิดเมนู",
  },
};

/**
 * A Navigation Bar/Rail provides persistent access to all top-level pages. On
 * larger screens, a Navigation Bar transforms into a Navigation Rail.
 *
 * @param children A Navigation Bar contains Navigation Bar Items, each leading to a different top-level page.
 * @param brand A small image of your brand can be put on the Navigation Rail.
 * @param end More Navigation Items can be placed on the bottom of the Navigation Rail in larger screens.
 * @param locale Allows for translation of the accessibility labels.
 * @param onNavToggle The function called when the user clicks on the navigation Button.
 */
export const NavBar: StyleableFC<NavBarProps> = ({
  children,
  brand,
  end,
  locale = "en-US",
  onNavToggle,
  element: Element = "nav",
  style,
  className,
}) => (
  <Element className={cn("skc-nav-bar", className)} style={style}>
    <div className="skc-nav-bar__content">
      <div className="skc-nav-bar__actions">
        <Button
          appearance="text"
          icon={<MaterialIcon icon="menu" />}
          alt={STRINGS[locale].nav}
          onClick={onNavToggle}
          command="show-modal"
          commandfor="nav-drawer"
        />
        <div className="skc-nav-bar__brand">{brand}</div>
      </div>
      <div className="skc-nav-bar__destinations">{children}</div>
      {end && <div className="skc-nav-bar__end">{end}</div>}
    </div>
  </Element>
);

NavBar.displayName = "NavBar";
