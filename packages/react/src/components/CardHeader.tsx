import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/card-header.css";
import type { ReactElement, ReactNode } from "react";

/**
 * Props for {@link CardHeader Card Header}.
 */
export interface CardHeaderProps extends ElementCustomizableProps {
  /**
   * An avatar is placed before all content in a Card Header. A use case would
   * be the profile picture of a user.
   *
   * - You are encouraged to use Avatar as the value for `avatar`.
   * - Incompatible with `icon`.
   * - Optional.
   */
  avatar?: ReactElement;

  /**
   * An icon can appear before all content in a Card Header. In a page with
   * many cards, icons can quickly orient users.
   *
   * - You are encouraged to use Material Icon as the value for `icon`.
   * - Incompatible with `avatar`.
   * - Optional.
   */
  icon?: ReactElement;

  /**
   * The most predominant text inside a Card.
   *
   * - Always required.
   */
  title: ReactNode;

  /**
   * A short text complementing the title text.
   *
   * - Optional.
   */
  subtitle?: ReactNode;

  /**
   * The heading level for the title, which affects the document outline.
   *
   * - Must be `2`, `3`, `4`, `5`, or `6`.
   * - Optional. Defaults to `3`.
   */
  level?: 2 | 3 | 4 | 5 | 6;

  /**
   * Limits the title and subtitle to a single line, truncating the text with an
   * ellipsis if it overflows.
   *
   * - Optional.
   */
  truncate?: boolean;
}

/**
 * The header of a Card. Sometimes all a Card needs is a Card Header.
 *
 * @param avatar An avatar is placed before all content in a Card Header. A use case would be the profile picture of a user.
 * @param icon An icon can appear before all content in a Card Header. In a page with many cards, icons can quickly orient users.
 * @param title The most predominant text inside a Card.
 * @param subtitle A short text complementing the title text.
 * @param level The heading level for the title, which affects the document outline.
 * @param truncate Limits the title and subtitle to a single line, truncating the text with an ellipsis if it overflows.
 */
export const CardHeader: StyleableFC<CardHeaderProps> = ({
  avatar,
  icon,
  title,
  subtitle,
  level = 3,
  truncate,
  element: Element = "div",
  style,
  className,
}) => {
  return (
    <Element
      className={cn(
        "skc-card-header",
        truncate && "skc-card-header--truncate",
        className,
      )}
      style={style}
    >
      {avatar || (icon && <div className="skc-card-header__icon">{icon}</div>)}
      <div className="skc-card-header__content">
        <Text
          type="title-medium"
          className="skc-card-header__title"
          element={`h${level}`}
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
