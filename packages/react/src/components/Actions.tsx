import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/actions.css";
import type { ReactNode } from "react";

/**
 * Props for {@link Actions}.
 */
export interface ActionsProps extends ElementCustomizableProps {
  /**
   * The Buttons inside Actions. You can include as many as needed, but the
   * recommended limit is 3.
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
}

/**
 * A row of Buttons. Actions handles spacing and overflow.
 *
 * @param children The Buttons inside Actions.
 * @param align How the Buttons should be positioned.
 *
 * @see https://sk-components-demo.mysk.school/docs/inputs/actions
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
