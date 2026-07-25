import "@suankularb-components/css/text.css";

import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import type { ReactNode } from "react";

/**
 * Props for {@link Text}.
 */
export interface TextProps extends ElementCustomizableProps {
  /**
   * The text to apply the typographic styling to.
   */
  children: ReactNode;

  /**
   * The unique identifier of the Text, similar to `id` on any HTML element.
   *
   * - Optional.
   */
  id?: string;

  /**
   * The typographic style to apply.
   */
  type: `${"display" | "headline" | "title" | "label" | "body"}-${
    "large" | "medium" | "small"}`;
}

/**
 * A piece of text with a typographic style applied.
 *
 * @param id The unique identifier of the Text, similar to `id` on any HTML element.
 * @param children The text to apply the typographic styling to.
 * @param type The typographic style to apply.
 * @see https://sk-components-demo.mysk.school/docs/data/text
 */
export const Text: StyleableFC<TextProps> = ({
  children,
  id,
  type,
  element: Element = "span",
  className,
  style,
}) => {
  return (
    <Element
      id={id}
      className={cn(`skc-text skc-text--${type}`, className)}
      style={style}
    >
      {children}
    </Element>
  );
};
