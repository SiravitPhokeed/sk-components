import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/columns.css";
import type { ReactNode } from "react";

/**
 * Props for {@link Columns}.
 */
export interface ColumnsProps extends ElementCustomizableProps {
  /**
   * The content to be divided.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * Number of columns.
   *
   * - Must be an integer: 2, 3, 4, 6, or 12.
   * - Always required.
   */
  columns: 2 | 3 | 4 | 6 | 12;
}

/**
 * Columns break up content on larger screens into multiple columns, so as to
 * make the content easier to read. On smaller screens, Columns automatically
 * collapse columns into one column.
 *
 * Columns is built on a 12-column grid. This grid system keeps elements
 * visually aligned across the page, creating a consistent rhythm.
 *
 * @param children The content to be divided.
 * @param columns Number of columns.
 * @see https://sk-components-demo.mysk.school/docs/layout/columns
 */
export const Columns: StyleableFC<ColumnsProps> = ({
  children,
  columns,
  element: Element = "div",
  style,
  className,
}) => {
  return (
    <Element
      className={cn(`skc-columns skc-columns--${columns}`, className)}
      style={style}
    >
      {children}
    </Element>
  );
};
