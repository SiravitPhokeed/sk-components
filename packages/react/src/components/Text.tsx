import "@suankularb-components/css/text.css";

import type { ReactNode } from "react";
import type { StyleableFC } from "@/lib/types";
import cn from "@/lib/helpers/cn";

/**
 * Props for {@link Text}.
 */
export interface TextProps {
  /**
   * The text to apply the typographic styling to.
   */
  children: ReactNode;

  /**
   * The typographic style to apply.
   */
  type: `${"display" | "headline" | "title" | "label" | "body"}-${
    | "large"
    | "medium"
    | "small"}`;
}

/**
 * A piece of text with a typographic style applied.
 */
export const Text: StyleableFC<TextProps> = ({
  children,
  type,
  className,
  style,
}) => {
  return (
    <p className={cn(`skc-text skc-text--${type}`, className)} style={style}>
      {children}
    </p>
  );
};
