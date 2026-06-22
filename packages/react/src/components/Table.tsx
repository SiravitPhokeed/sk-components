import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/table.css";
import type { ElementType, ReactNode } from "react";

/**
 * Props for {@link Table}.
 */
export interface TableProps {
  /**
   * The content of the Table.
   *
   * - Must include Table Head and Table Body.
   * - Can include Table Foot in addition to the 2 required components.
   * - Always required.
   */
  children: ReactNode;

  /**
   * The minimum width of the content. When the Table's width is lower than
   * this value, it becomes scrollable. Otherwise, the content fills the width
   * of the Table.
   *
   * - Optional.
   */
  contentWidth?: number;

  /**
   * The maximum height of the Table. The Table uses the content's height until
   * it exceeds this value.
   *
   * - Optional.
   */
  height?: number;

  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

/**
 * A Table displays information in columns and rows, each row representing a set
 * of data in each aspect, represented by columns.
 *
 * @param children The content of the Table.
 * @param contentWidth The minimum width of the content.
 * @param height The maximum height of the Table.
 */
export const Table: StyleableFC<TableProps> = ({
  children,
  contentWidth,
  height,
  element: Element = "div",
  style,
  className,
}) => (
  <Element
    style={{ ...style, maxHeight: height }}
    className={cn("skc-table", className)}
  >
    <table style={{ minWidth: contentWidth }} className="skc-table__content">
      {children}
    </table>
  </Element>
);
