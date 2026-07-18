import { MaterialIcon } from "@/components/MaterialIcon";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/data-table-filters.css";
import type { ReactNode } from "react";

/**
 * Props for {@link DataTableFilters Data Table Filters}.
 */
export interface DataTableFiltersProps extends ElementCustomizableProps {
  /**
   * A set of Filter Chips responsible for filtering the Data Table.
   *
   * - Must be a Chip Set, which must consist of Filter Chips.
   * - Always required.
   */
  children: ReactNode;

  /**
   * A description of the filters group for screen readers, applied as
   * `aria-label` on a `role="group"` container.
   *
   * - Optional.
   */
  alt?: string;
}

/**
 * Allows the user to filter the Data Table's content by selecting from a list
 * of filters.
 *
 * @param children A set of Filter Chips responsible for filtering the Data Table.
 * @param alt A description of the filters group for screen readers.
 */
export const DataTableFilters: StyleableFC<DataTableFiltersProps> = ({
  children,
  alt,
  element: Element = "div",
  style,
  className,
}) => {
  return (
    <Element
      role="group"
      aria-label={alt}
      style={style}
      className={cn("skc-data-table-filters", className)}
    >
      <MaterialIcon icon="filter_list" />

      {/* Chip Set */}
      {children}
    </Element>
  );
};
