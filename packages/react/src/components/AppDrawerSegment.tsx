"use client";

import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/app-drawer-segment.css";
import { useId, type ReactNode } from "react";

/**
 * Props for {@link AppDrawerSegment App Drawer Segment}.
 */
export interface AppDrawerSegmentProps extends ElementCustomizableProps {
  /**
   * The apps in this segment.
   *
   * - Always required. Must be App Drawer Items.
   */
  children: ReactNode;

  /**
   * The title of the group.
   *
   * - Always required.
   */
  title: string;
}

/**
 * A group of apps in the App Drawer.
 *
 * @param children The apps in this segment.
 * @param title The title of the group.
 */
export const AppDrawerSegment: StyleableFC<AppDrawerSegmentProps> = ({
  children,
  title,
  element: Element = "section",
  style,
  className,
}) => {
  const id = `app-${useId()}`;

  return (
    <Element
      aria-labelledby={id}
      style={style}
      className={cn("skc-app-drawer-segment", className)}
    >
      <Text
        id={id}
        type="title-medium"
        className="skc-app-drawer-segment__title"
        element="h3"
      >
        {title}
      </Text>
      <ul className="skc-app-drawer-segment__content">{children}</ul>
    </Element>
  );
};
