import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/divider.css";
import type { ElementType } from "react";

/**
 * Props for {@link Divider}.
 */
export interface DividerProps {
  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

/**
 * A Divider separates items in a list with a thin line. This is used when
 * separation cannot be accomplished with Cards or white space.
 */
export const Divider: StyleableFC<DividerProps> = ({
  element: Element = "hr",
  style,
  className,
}) => <Element style={style} className={cn("skc-divider", className)} />;
