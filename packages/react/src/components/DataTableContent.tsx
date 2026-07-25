import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/data-table-content.css";
import type { ReactNode } from "react";

/**
 * Props for {@link DataTableContent Data Table Content}.
 */
export interface DataTableContentProps extends ElementCustomizableProps {
  /**
   * A description of the Data Table for screen readers, similar to `alt` on
   * `<img>`. Applied as `aria-label` on the `<table>` element.
   *
   * - Optional.
   */
  alt?: string;

  /**
   * A Data Table Content's content depends on whether you decide to use TanStack
   * Table or not.
   *
   * - If you opt in to TanStack Table: must include both Data Table Head and
   *   Data Table Body.
   * - If you opt to use your own table solution: must include both Table Head
   *   and Table Body.
   * - Always required.
   */
  children: ReactNode;

  /**
   * The minimum width of the content. When the table's width is lower than
   * this value, it becomes scrollable. Otherwise, the content fills the width
   * of the Data Table.
   *
   * - Optional.
   */
  contentWidth?: number;
}

/**
 * The main part of a Data Table.
 *
 * @param alt A description of the Data Table for screen readers, similar to `alt` on `<img>`.
 * @param children A Data Table Content's content depends on whether you decide to
 *   use TanStack Table or not.
 * @param contentWidth The minimum width of the content.
 * @see https://sk-components-demo.mysk.school/docs/data/data-table-content
 */
export const DataTableContent: StyleableFC<DataTableContentProps> = ({
  alt,
  children,
  contentWidth,
  element: Element = "div",
  style,
  className,
}) => (
  <Element className="skc-data-table-content" style={style}>
    <table
      aria-label={alt}
      className={cn("skc-data-table-content__content", className)}
      style={{ ...style, minWidth: contentWidth }}
    >
      {children}
    </table>
  </Element>
);
