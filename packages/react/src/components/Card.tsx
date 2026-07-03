import { Interactive } from "@/components/Interactive";
import cn from "@/lib/helpers/cn";
import type {
  ActionableProps,
  ElementCustomizableProps,
  StyleableFC,
} from "@/lib/types";
import "@suankularb-components/css/card.css";
import type { ReactNode } from "react";

/**
 * Props for {@link Card}.
 */
export interface CardProps extends ActionableProps, ElementCustomizableProps {
  /**
   * Card must contain at least 1 element.
   *
   * - Always required. Card Header and Card Content work well inside Card.
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
}

/**
 * Card is a container for information and actions about a subject. It can be
 * in a list, on its own, or as a link to another page; Card is extremely versatile.
 *
 * To quote Material Design 3, there is no right way to make a Card. However,
 * we have provided some useful props and components to get you started.
 *
 * @param children Card must contain at least 1 element.
 * @param appearance The appearance of the Card. Each appearance puts different amounts of emphasis on the subject.
 * @param direction The flow of the Card’s content, like the CSS property `flex-direction`.
 * @param stateLayerEffect The state layer reacts to changes to the state to signify its interactivity. This effect can be enabled on Card as well.
 * @param shadowEffect Elevates Card on hover and focus to signify its interactivity.
 */
export const Card: StyleableFC<CardProps> = ({
  children,
  appearance,
  direction = "column",
  stateLayerEffect = false,
  shadowEffect,
  command,
  commandfor,
  onClick,
  href,
  element,
  style,
  className,
}) => {
  const isInteractive =
    onClick !== undefined ||
    href !== undefined ||
    stateLayerEffect ||
    shadowEffect ||
    command !== undefined;
  const Element = isInteractive ? Interactive : element || "div";

  return (
    <Element
      {...(isInteractive
        ? {
            stateLayerEffect,
            shadowEffect,
            onClick,
            href,
            element,
            command,
            commandfor,
          }
        : {})}
      style={style}
      className={cn(
        "skc-card",
        `skc-card--${appearance}`,
        `skc-card--${direction}`,
        className,
      )}
    >
      {children}
    </Element>
  );
};
