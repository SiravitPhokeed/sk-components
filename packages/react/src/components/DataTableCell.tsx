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
   * The scope of the cell, which defines the cells that the header cell relates
   * to.
   *
   * - Must be `"col"`, `"row"`, `"colgroup"`, or `"rowgroup"`.
   * - Only effective when {@link header `header`} is `true`.
   * - Optional. Defaults to `"col"` for header cells.
   */
  scope?: "col" | "row" | "colgroup" | "rowgroup";

  /**
   * How the content should be positioned. It can be aligned to the left, the
   * center (default), or the right.
   *
   * - Must be `"left"`, `"center"`, `"right"`.
   * - Optional.
   */
  align?: "left" | "center" | "right";

  /**
   * If the cell is sortable.
   *
   * - Only effective when {@link header `header`} is `true`.
   * - Optional.
   */
  sortable?: boolean;

  /**
   * The current sort direction of this column. When set, a sort indicator is
   * shown and the cell becomes sortable with a state layer and ripple effect.
   *
   * - Must be `"asc"` or `"desc"`.
   * - Only effective when {@link header `header`} and
   *   {@link sortable `sortable`} are `true`.
   * - Optional.
   */
  sortDirection?: "asc" | "desc";

  /**
   * The function called when the user toggles the sort direction.
   *
   * - Only effective when {@link header `header`} and
   *   {@link sortable `sortable`} are `true`.
   * - Optional.
   */
  onSortDirectionChange?: (event?: unknown) => void;

  /**
   * Allows for translation of the accessibility labels.
   *
   * - Must be `"en-US"` or `"th"`, as SKCom currently only supports these two
   *   languages.
   * - Optional.
   */
  locale?: "en-US" | "th";
}

const STRINGS = {
  "en-US": {
    tooltip: "Click to toggle sort",
  },
  th: {
    tooltip: "คลิกเพื่อเรียง",
  },
};

/**
 * A cell of a Data Table. Acts like a regular Table Cell, but header cells
 * can be made sortable with a state layer, ripple effect, and sort indicator.
 *
 * @param children The content of the cell.
 * @param header If the cell is a header cell.
 * @param scope The scope of the cell, which defines the cells that the header cell relates to.
 * @param align How the content should be positioned.
 * @param sortable If the cell is sortable.
 * @param sortDirection The current sort direction of this column.
 * @param onSortDirectionChange The function called when the user toggles the sort direction.
 * @param locale Allows for translation of the accessibility labels.
 *
 * @private
 */
export const DataTableCell: StyleableFC<DataTableCellProps> = ({
  children,
  header,
  // Data Table Head only renders column headers, so `"col"` is always the
  // right scope there; Data Table Cell is private, so nothing else sets it.
  scope = header ? "col" : undefined,
  align = "center",
  sortable,
  sortDirection,
  onSortDirectionChange,
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
        scope={scope}
        element={Element}
        style={style}
        className={className}
      >
        {children}
      </TableCell>
    );
  }

  // Header cell, optionally sortable
  const ContentElement = sortable ? Interactive : "div";

  return (
    <Element
      style={style}
      {...(sortDirection && {
        "aria-sort": sortDirection === "asc" ? "ascending" : "descending",
      })}
      {...(header && { scope })}
      className={cn(
        "skc-data-table-cell",
        "skc-data-table-cell--header",
        sortable && "skc-data-table-cell--sortable",
        `skc-data-table-cell--${align}`,
        className,
      )}
    >
      <ContentElement
        {...(sortable && {
          title: STRINGS[locale].tooltip,
          onClick: onSortDirectionChange,
        })}
        className="skc-data-table-cell__content"
      >
        {/* Sort indicator. Decorative: the sort state lives in aria-sort on
            the th, so a label here would be announced twice. */}
        {sortable && (
          <MaterialIcon
            icon="arrow_downward"
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
