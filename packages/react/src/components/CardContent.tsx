import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/card-content.css";
import type { ElementType, ReactNode } from "react";

/**
 * Props for {@link CardContent Card Content}.
 */
export interface CardContentProps {
  /**
   * Card Content can contain anything, from supporting text to Actions.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

/**
 * A section of content inside Card.
 */
export const CardContent: StyleableFC<CardContentProps> = ({
  children,
  element: Element = "div",
  style,
  className,
}) => {
  return (
    <Element className={cn("skc-card-content", className)} style={style}>
      {children}
    </Element>
  );
};
