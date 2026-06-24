import "@suankularb-components/css/text.css";

import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import type { ElementType, ReactNode } from "react";

/**
 * Props for {@link Text}.
 */
export interface TextProps {
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
    | "large"
    | "medium"
    | "small"}`;

  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

/**
 * A piece of text with a typographic style applied.
 *
 * @param id The unique identifier of the Text, similar to `id` on any HTML element.
 * @param children The text to apply the typographic styling to.
 * @param type The token of the typescale to apply.
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
