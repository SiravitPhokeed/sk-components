import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/data-table.css";
import type { ReactNode } from "react";

/**
 * Props for {@link DataTable Data Table}.
 */
export interface DataTableProps extends ElementCustomizableProps {
  /**
   * There is a set of components especially designed to be used here: Data
   * Table Search, Data Table Filters, Data Table Content, and Data Table
   * Pagination.
   *
   * - A Data Table cannot have both Data Table Search and Data Table Filters.
   * - A Data Table must have a Data Table Content.
   * - If present, Data Table Search/Data Table Filters must be the first
   *   component.
   * - If present, Data Table Pagination must be the last component.
   * - Always required.
   */
  children: ReactNode;
}

/**
 * A richer Table with support for filtering, search, and pagination; and
 * integrates directly with TanStack Table.
 *
 * @param children There is a set of components especially designed to be used here: Data Table Search, Data Table Filters, Data Table Content, and Data Table Pagination.
 */
export const DataTable: StyleableFC<DataTableProps> = ({
  children,
  element: Element = "figure",
  style,
  className,
}) => (
  <Element style={style} className={cn("skc-data-table", className)}>
    {children}
  </Element>
);
