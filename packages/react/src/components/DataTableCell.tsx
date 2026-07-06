"use client";

import { Interactive } from "@/components/Interactive";
import { MaterialIcon } from "@/components/MaterialIcon";
import { TableCell } from "@/components/TableCell";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/data-table-cell.css";
import type { ReactNode } from "react";

/**
 * Props for {@link DataTableCell Data Table Cell}.
 *
 * @private
 */
export interface DataTableCellProps extends ElementCustomizableProps {
  /**
   * The content of the cell.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * If the cell is a header cell. When `true`, the cell renders as `<th>` and
   * can be made sortable via {@link sortDirection `sortDirection`}.
   *
   * - Optional.
   */
  header?: boolean;

  /**
   * How the content should be positioned. It can be aligned to the left, the
   * center (default), or the right.
   *
   * - Must be `left`, `center`, `right`.
   * - Optional.
   */
  align?: "left" | "center" | "right";

  /**
   * The current sort direction of this column. When set, a sort indicator is
   * shown and the cell becomes sortable with a state layer and ripple effect.
   *
   * - Must be `asc` or `desc`.
   * - Only effective when {@link header `header`} is `true`.
   * - Optional.
   */
  sortDirection?: "asc" | "desc";

  /**
   * The function called when the user toggles the sort direction.
   *
   * - Only effective when {@link header `header`} is `true`.
   * - Optional.
   */
  onSortDirectionChange?: (event?: unknown) => void;

  /**
   * A message shown in a tooltip when the user hovers over the Data Table Cell.
   *
   * - Optional.
   */
  tooltip?: string;

  /**
   * Allows for translation of the accessibility labels.
   *
   * - Must be `th` or `en-US`, as SKCom currently only support those 2 languages.
   * - Optional.
   */
  locale?: "en-US" | "th";
}

const STRINGS = {
  "en-US": {
    asc: "Sorted ascending",
    desc: "Sorted descending",
  },
  th: {
    asc: "เรียงจากน้อยไปมาก",
    desc: "เรียงจากมากไปน้อย",
  },
};

/**
 * A cell of a Data Table. Acts like a regular Table Cell, but header cells
 * can be made sortable with a state layer, ripple effect, and sort indicator.
 *
 * @param children The content of the cell.
 * @param header If the cell is a header cell.
 * @param align How the content should be positioned.
 * @param sortDirection The current sort direction of this column.
 * @param onSortDirectionChange The function called when the user toggles the sort direction.
 * @param tooltip A message shown in a tooltip when the user hovers over the Data Table Cell.
 * @param locale Allows for translation of the accessibility labels.
 *
 * @private
 */
export const DataTableCell: StyleableFC<DataTableCellProps> = ({
  children,
  header,
  align = "center",
  sortDirection,
  onSortDirectionChange,
  tooltip,
  locale = "en-US",
  element: Element = header ? "th" : "td",
  style,
  className,
}) => {
  // Non-header cells delegate to TableCell
  if (!header) {
    return (
      <TableCell
        align={align}
        element={Element}
        style={style}
        className={className}
      >
        {children}
      </TableCell>
    );
  }

  // Header cell, optionally sortable
  const sortable = Boolean(onSortDirectionChange);
  const ContentElement = sortable ? Interactive : "div";

  return (
    <Element
      title={tooltip}
      style={style}
      className={cn(
        "skc-data-table-cell",
        "skc-data-table-cell--header",
        sortable && "skc-data-table-cell--sortable",
        `skc-data-table-cell--${align}`,
        className,
      )}
    >
      <ContentElement
        {...(sortable && { onClick: onSortDirectionChange })}
        className="skc-data-table-cell__content"
      >
        {/* Sort indicator */}
        {sortable && (
          <MaterialIcon
            icon="arrow_downward"
            alt={sortDirection ? STRINGS[locale][sortDirection] : undefined}
            size={20}
            className={cn(
              "skc-data-table-cell__arrow",
              sortDirection && `skc-data-table-cell__arrow--${sortDirection}`,
            )}
          />
        )}
        <Text type="title-small">{children}</Text>
      </ContentElement>
    </Element>
  );
};
