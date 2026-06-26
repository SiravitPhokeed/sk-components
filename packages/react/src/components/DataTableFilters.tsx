import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/data-table-filters.css";
import type { ElementType, ReactNode } from "react";
import { MaterialIcon } from "@/components/MaterialIcon";

/**
 * Props for {@link DataTableFilters Data Table Filters}.
 */
export interface DataTableFiltersProps {
  /**
   * A set of Filter Chips responsible for filtering the Data Table.
   *
   * - Must be a Chip Set, which must consist of Filter Chips.
   * - Always required.
   */
  children: ReactNode;

  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

/**
 * Allows the user to filter the Data Table's content by selecting from a list
 * of filters.
 *
 * @param children A set of Filter Chips responsible for filtering the Data Table.
 */
export const DataTableFilters: StyleableFC<DataTableFiltersProps> = ({
  children,
  element: Element = "div",
  style,
  className,
}) => {
  return (
    <Element style={style} className={cn("skc-data-table-filters", className)}>
      <MaterialIcon icon="filter_list" />

      {/* Chip Set */}
      {children}
    </Element>
  );
};
