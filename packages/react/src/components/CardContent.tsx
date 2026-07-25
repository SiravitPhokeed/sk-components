import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/card-content.css";
import type { ReactNode } from "react";

/**
 * Props for {@link CardContent Card Content}.
 */
export interface CardContentProps extends ElementCustomizableProps {
  /**
   * Card Content can contain anything, from supporting text to Actions.
   *
   * - Always required.
   */
  children: ReactNode;
}

/**
 * A section of content inside Card.
 *
 * @param children Card Content can contain anything, from supporting text to Actions.
 * @see https://sk-components-demo.mysk.school/docs/data/card-content
 */
export const CardContent: StyleableFC<CardContentProps> = ({
  children,
  element = "div",
  style,
  className,
}) => {
  return (
    <Text
      type="body-medium"
      element={element}
      className={cn("skc-card-content", className)}
      style={style}
    >
      {children}
    </Text>
  );
};
