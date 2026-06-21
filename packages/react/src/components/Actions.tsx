import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/actions.css";
import type { ElementType, ReactNode } from "react";

/**
 * Props for {@link Actions}.
 */
export interface ActionsProps {
  /**
   * Actions contains Buttons. You can put as many Buttons inside Actions as
   * needed, but the recommended limit is 3.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * How the Buttons should be positioned. It can be aligned to the left, the
   * center, the right (default), or fill the entire width.
   *
   * - Must be `left`, `center`, `right`, `full`.
   * - Optional.
   */
  align?: "left" | "center" | "right" | "full";

  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

/**
 * A row of Buttons. Actions handles spacing and overflow.
 *
 * @param children Actions contains Buttons; the recommended limit is 3.
 * @param align How the Buttons should be positioned.
 */
export const Actions: StyleableFC<ActionsProps> = ({
  children,
  align = "right",
  element: Element = `div`,
  className,
  style,
}) => {
  return (
    <Element
      className={cn("skc-actions", `skc-actions--${align}`, className)}
      style={style}
    >
      {children}
    </Element>
  );
};
