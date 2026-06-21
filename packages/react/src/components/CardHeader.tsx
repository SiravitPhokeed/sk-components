import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/card-header.css";
import type { ElementType, JSX } from "react";

/**
 * Props for {@link CardHeader Card Header}.
 */
export interface CardHeaderProps {
  /**
   * An avatar is placed before all content in a Card Header. A use case would
   * be the profile picture of a user.
   *
   * - You are encouraged to use Avatar as the value for `avatar`.
   * - Incompatible with `icon`.
   * - Optional.
   */
  avatar?: JSX.Element;

  /**
   * An icon can appear before all content in a Card Header. In a page with
   * many cards, icons can quickly orient users.
   *
   * - You are encouraged to use Material Icons as the value for `icon`.
   * - Incompatible with `avatar`.
   * - Optional.
   */
  icon?: JSX.Element;

  /**
   * The most predominant text inside a Card.
   *
   * - Always required.
   */
  title: string | JSX.Element;

  /**
   * A short text complementing the title text.
   *
   * - Optional.
   */
  subtitle?: string | JSX.Element;

  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

/**
 * The header of a Card. Sometimes all a Card needs is a Card Header.
 */
export const CardHeader: StyleableFC<CardHeaderProps> = ({
  avatar,
  icon,
  title,
  subtitle,
  element: Element = "div",
  style,
  className,
}) => {
  return (
    <Element className={cn("skc-card-header", className)} style={style}>
      {avatar || icon}
      <div className="skc-card-header__content">
        <Text
          type="title-medium"
          className="skc-card-header__title"
          element="h2"
        >
          {title}
        </Text>
        {subtitle && (
          <Text type="body-medium" className="skc-card-header__subtitle">
            {subtitle}
          </Text>
        )}
      </div>
    </Element>
  );
};
