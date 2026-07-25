import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/table.css";
import type { ReactNode } from "react";

/**
 * Props for {@link Table}.
 */
export interface TableProps extends ElementCustomizableProps {
  /**
   * A description of the Table for screen readers, similar to `alt` on
   * `<img>`. Applied as `aria-label` on the `<table>` element.
   *
   * - Optional.
   */
  alt?: string;

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
}

/**
 * A Table displays information in columns and rows, where each row represents a
 * data record and each column represents a data attribute.
 *
 * @param alt A description of the Table for screen readers, similar to `alt` on `<img>`.
 * @param children The content of the Table.
 * @param contentWidth The minimum width of the content.
 * @param height The maximum height of the Table.
 *
 * @see {@link https://sk-components-demo.mysk.school/docs/data/table Table documentation}
 */
export const Table: StyleableFC<TableProps> = ({
  alt,
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
    <table
      aria-label={alt}
      style={{ minWidth: contentWidth }}
      className="skc-table__content"
    >
      {children}
    </table>
  </Element>
);
