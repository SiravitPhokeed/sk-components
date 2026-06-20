import { Interactive } from "@/components/Interactive";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/card.css";
import type { ElementType, ReactNode } from "react";

/**
 * Props for {@link Card}.
 */
export interface CardProps {
  /**
   * Card must contain at least 1 JSX element; here is a list of SKCom
   * components that work well with Card: Card Header, Card Media, Card
   * Content, Chip List, Actions.
   *
   * - Required.
   */
  children: ReactNode;

  /**
   * The appearance of the Card.
   *
   * - Each appearance puts different amounts of emphasis on the subject. From
   *   most to least emphasis, a Card can be outlined, elevated, and filled.
   * - Must be `outlined`, `elevated`, or `filled`, from highest to lowest
   *   emphasis.
   * - Always required.
   */
  appearance: "outlined" | "elevated" | "filled";

  /**
   * The flow of the Card’s content, like the CSS property `flex-direction`.
   * The default is `column`.
   *
   * - Must be `row` or `column`.
   * - Optional.
   */
  direction?: "row" | "column";

  /**
   * In interactive components like Button, the state layer reacts to changes
   * to the state to signify its interactivity. For example, a Button’s state
   * layer turns up its opacity on hover.
   *
   * - This effect can be enabled on Card as well, letting the user know that
   *   this Card is interactive.
   * - Optional.
   */
  stateLayerEffect?: boolean;

  /**
   * Elevates Card on hover and focus to signify its interactivity.
   *
   * - Optional.
   */
  shadowEffect?: boolean;

  /**
   * The function called when the user interacts with the Card, similar to
   * `onClick` on `<button>`.
   */
  onClick?: () => any;

  /**
   * The URL of the page this Card leads to, similar to `href` on `<a>`.
   */
  href?: string;

  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

/**
 * A row of Buttons. Card handles spacing and overflow.
 */
export const Card: StyleableFC<CardProps> = ({
  children,
  appearance,
  direction = "column",
  stateLayerEffect = false,
  shadowEffect,
  onClick,
  href,
  element,
  style,
  className,
}) => {
  return (
    <Interactive
      stateLayerEffect={stateLayerEffect}
      rippleEffect={stateLayerEffect}
      shadowEffect={shadowEffect}
      href={href}
      onClick={onClick}
      element={element}
      style={style}
      className={cn(
        "skc-card",
        appearance === "outlined"
          ? "skc-card--outlined"
          : appearance === "elevated"
            ? "skc-card--elevated"
            : appearance === "filled"
              ? "skc-card--filled"
              : undefined,
        direction === "row" ? "skc-card--row" : "skc-card--column",
        className,
      )}
    >
      {children}
    </Interactive>
  );
};
