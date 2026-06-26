import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/table-row.css";
import type { ReactNode } from "react";

/**
 * Props for {@link TableRow Table Row}.
 */
export interface TableRowProps extends ElementCustomizableProps {
  /**
   * Table Row has the same behaviour as `<tr>`.
   *
   * - Must consist of Table Cells.
   * - Always required.
   */
  children: ReactNode;
}

/**
 * A row of a Table, must be within a table area (Table Head, Table Body, or
 * Table Foot).
 *
 * @param children Table Row has the same behaviour as `<tr>`.
 */
export const TableRow: StyleableFC<TableRowProps> = ({
  children,
  element: Element = "tr",
  style,
  className,
}) => (
  <Element className={cn("skc-table-row", className)} style={style}>
    {children}
  </Element>
);
