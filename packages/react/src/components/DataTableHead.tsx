"use client";

import { DataTableCell } from "@/components/DataTableCell";
import { TableRow } from "@/components/TableRow";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/table-head.css";
import { flexRender, type HeaderGroup } from "@tanstack/react-table";
import { sum } from "radash";
import type { ElementType } from "react";

/**
 * Props for {@link DataTableHead Data Table Head}.
 */
export interface DataTableHeadProps {
  /**
   * The return of `getHeaderGroups`, one of the functions of the Tanstack Table
   * instance.
   *
   * - Always required.
   */
  headerGroups: HeaderGroup<any>[];

  /**
   * How the content in each cell should be positioned. It can be aligned to the
   * left, the center (default), or the right.
   *
   * - Must be `left`, `center`, `right`.
   * - Optional.
   *
   * @default "center"
   */
  align?: "left" | "center" | "right";

  /**
   * The fractional width of each column, in the same order as the columns are
   * defined.
   *
   * - Must be an array of numbers.
   * - Optional.
   *
   * @example [1, 2, 1]
   */
  colSpans?: number[];

  /**
   * Allows for translation of the accessibility labels.
   *
   * - Must be `th` or `en-US`, as SKCom currently only support those 2 languages.
   * - Optional.
   *
   * @default "en-US"
   */
  locale?: "en-US" | "th";

  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

const STRINGS = {
  "en-US": {
    sortBy: "Click to toggle sort",
  },
  th: {
    sortBy: "คลิกเพื่อเรียง",
  },
};

/**
 * The head area of a Data Table.
 *
 * @param headerGroups The return of `getHeaderGroups`, one of the functions of the Tanstack Table instance.
 * @param align How the content in each cell should be positioned.
 * @param locale Allows for translation of the accessibility labels.
 */
export const DataTableHead: StyleableFC<DataTableHeadProps> = ({
  headerGroups,
  align = "center",
  colSpans,
  locale = "en-US",
  element: Element = "thead",
  style,
  className,
}) => {
  const totalColSpan = colSpans ? sum(colSpans) : 1;

  return (
    <Element style={style} className={cn("skc-table-head", className)}>
      {/* For each Header Group, render a Table Row */}
      {headerGroups.map((headerGroup) => (
        <TableRow key={headerGroup.id}>
          {/* For each Header, render a header Data Table Cell */}
          {headerGroup.headers.map((header) => (
            <DataTableCell
              key={header.id}
              header
              align={align}
              tooltip={
                header.column.getCanSort() ? STRINGS[locale].sortBy : undefined
              }
              sortDirection={header.column.getIsSorted() || undefined}
              onSortDirectionChange={
                header.column.getCanSort()
                  ? header.column.getToggleSortingHandler()
                  : undefined
              }
              style={{
                width: colSpans
                  ? `${(colSpans[header.index] / totalColSpan) * 100}%`
                  : undefined,
              }}
            >
              {flexRender(header.column.columnDef.header, header.getContext())}
            </DataTableCell>
          ))}
        </TableRow>
      ))}
    </Element>
  );
};
