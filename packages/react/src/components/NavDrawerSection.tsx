"use client";

import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/nav-drawer-section.css";
import { useId, type ElementType, type JSX, type ReactNode } from "react";

/**
 * Props for {@link NavDrawerSection Navigation Drawer Section}.
 */
export interface NavDrawerSectionProps {
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
   * - Normally optional but required if this is the first Navigation Drawer
   *   Section in a Navigation Drawer. In this case, it'd be the name of the app.
   */
  header?: string | JSX.Element;

  /**
   * A description of the Navigation Drawer Section for screen readers,
   * similar to `alt` on `<img>`.
   *
   * - Required if `header` is a JSX Element, as it is used to generate the ID
   *   crucial for accessibility.
   */
  alt?: string;

  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

/**
 * A group of destinations within a Navigation Drawer.
 *
 * @param children Destinations grouped into this section.
 * @param header The header of the section.
 * @param alt A description of the Navigation Drawer Section for screen readers, similar to `alt` on `<img>`.
 */
export const NavDrawerSection: StyleableFC<NavDrawerSectionProps> = ({
  children,
  header,
  alt,
  element: Element = "section",
  style,
  className,
}) => {
  const sectionID = `nav-section-${useId()}`;

  return (
    <Element style={style} className={cn("skc-nav-drawer-section", className)}>
      <Text
        type="title-medium"
        className="skc-nav-drawer-section__header"
        element={(props) => <h2 {...props} id={sectionID} aria-label={alt} />}
      >
        {header}
      </Text>
      <ul role="list">{children}</ul>
    </Element>
  );
};
