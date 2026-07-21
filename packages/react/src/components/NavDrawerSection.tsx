"use client";

import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/nav-drawer-section.css";
import type { ReactNode } from "react";
import { useId } from "react";

/**
 * Props for {@link NavDrawerSection Navigation Drawer Section}.
 */
export interface NavDrawerSectionProps extends ElementCustomizableProps {
  /**
   * Destinations grouped into this section.
   *
   * - Must consist of Navigation Drawer Item(s).
   * - Always required.
   */
  children: ReactNode;

  /**
   * The header of the section.
   *
   * - Optional for secondary sections. Required for the first section in a Nav
   *   Drawer, where it typically displays the app name.
   */
  header?: ReactNode;
}

/**
 * A group of destinations within a Navigation Drawer.
 *
 * @param children Destinations grouped into this section.
 * @param header The header of the section.
 */
export const NavDrawerSection: StyleableFC<NavDrawerSectionProps> = ({
  children,
  header,
  element: Element = "section",
  style,
  className,
}) => {
  const id = `nav-section-${useId()}`;

  return (
    <Element className={cn("skc-nav-drawer-section", className)} style={style}>
      <Text
        id={id}
        type="title-small"
        className="skc-nav-drawer-section__header"
        element="h2"
      >
        {header}
      </Text>
      <ul aria-labelledby={id} role="list">
        {children}
      </ul>
    </Element>
  );
};
