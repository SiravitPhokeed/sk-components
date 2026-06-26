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
   * - Must be an integer from 2, 3, 4, 6, or 12.
   * - Always required.
   */
  columns: 2 | 3 | 4 | 6 | 12;
}

/**
 * Columns break up content in larger screens into multiple columns, so as to
 * make the content easier to read. On smaller screens, Columns automatically
 * collapse columns into one column.
 *
 * The columns inside of Columns are based on the layout grid, which is a grid
 * system that keeps elements of a page aligned to a common grid
 * ({@link https://m3.material.io/foundations/adaptive-design/large-screens/overview#55fc0118-1fa3-48a3-b805-169bb58e6e78 M3 reference};
 * {@link https://m2.material.io/design/layout/responsive-layout-grid.html#columns-gutters-and-margins M2 reference}).
 *
 * @param children The content to be divided.
 * @param columns Number of columns.
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
