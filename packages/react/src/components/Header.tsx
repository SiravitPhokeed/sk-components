"use client";

import { useSectionId } from "@/components/Section";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/header.css";
import type { ElementType, ReactElement, ReactNode } from "react";

/**
 * Props for {@link Header}.
 */
export interface HeaderProps extends ElementCustomizableProps {
  /**
   * Header contains Buttons. You can put as many Buttons inside Header as
   * needed, but the recommended limit is 3.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * The level of the Header. The number corresponds to an HTML header element,
   * i.e., `3` corresponds to `<h3>`.
   *
   * - `2` by default.
   * - Must be a number from 2-6. `1` is not allowed as `<h1>` is reserved for Page Header.
   * - Optional.
   */
  level?: 2 | 3 | 4 | 5 | 6;

  /**
   * An icon can appear before the text (`children`) in a Header. In a page
   * with many headers, icons can quickly orient users.
   *
   * - You are encouraged to use Material Icons as the value for `icon`.
   * - Optional.
   */
  icon?: ReactElement;
}

const HEADER_TYPE_BY_LEVEL = {
  2: "headline-medium",
  3: "headline-small",
  4: "title-large",
  5: "title-medium",
  6: "title-small",
} as const;

/**
 * A Header helps users quickly identifies sections and their purpose.
 *
 * When used in conjunction with Section, the Section can be labeled with the
 * Header for screen readers.
 *
 * @param children The text of the Header.
 * @param level The level of the Header. The number corresponds to an HTML header element.
 * @param icon An icon can appear before the text (`children`) in a Header.
 */
export const Header: StyleableFC<HeaderProps> = ({
  children,
  level = 2,
  icon,
  element,
  className,
  style,
}) => {
  const sectionId = useSectionId();
  const Element = element ?? (`h${level}` as ElementType);

  return (
    <Element
      id={sectionId ?? undefined}
      className={cn("skc-header", className)}
      style={style}
    >
      {icon}
      <Text type={HEADER_TYPE_BY_LEVEL[level]}>{children}</Text>
    </Element>
  );
};
