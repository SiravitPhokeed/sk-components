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
   * - From most to least emphasis: `"outlined"`, `"elevated"`, `"filled"`.
   * - Each appearance puts a different amount of emphasis on the subject.
   * - Always required.
   */
  appearance: "outlined" | "elevated" | "filled";

  /**
   * The flow of the Card’s content, like the CSS property `flex-direction`.
   * The default is `"column"`.
   *
   * - Must be `"row"` or `"column"`.
   * - Optional.
   */
  direction?: "row" | "column";

  /**
   * A state layer is a visual overlay that responds to user interaction. For
   * example, a Button’s state layer increases its opacity on hover, signaling
   * it’s clickable.
   *
   * - This effect can be enabled on Card too, helping users recognize it as
   *   interactive.
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
 * Card is a container for related information and actions about a subject. It can
 * hold any content — text, images, or other components — arranged in a row
 * or a column.
 *
 * What you put inside Card is up to you. Here is one common pattern — a header,
 * an image, some text, and an action — but you can use any combination.
 *
 * Card Header, Card Content, and Actions are available to help structure common
 * patterns, but none are required — Card itself imposes no structure.
 *
 * @param children Card must contain at least 1 element.
 * @param appearance The appearance of the Card.
 * @param direction The flow of the Card’s content, like the CSS property `flex-direction`. The default is `"column"`.
 * @param stateLayerEffect A state layer is a visual overlay that responds to user interaction. For example, a Button’s state layer increases its opacity on hover, signaling it’s clickable.
 * @param shadowEffect Elevates Card on hover and focus to signify its interactivity.
 *
 * @see {@link https://sk-components-demo.mysk.school/docs/data/card Card documentation}
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
