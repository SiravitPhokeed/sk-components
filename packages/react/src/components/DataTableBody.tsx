import { TableBody } from "@/components/TableBody";
import { TableCell } from "@/components/TableCell";
import { TableRow } from "@/components/TableRow";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/table-body.css";
import { flexRender, type RowModel } from "@tanstack/react-table";
import type { ElementType } from "react";

/**
 * Props for {@link DataTableBody Data Table Body}.
 */
export interface DataTableBodyProps<RowShape extends {} = any> {
  /**
   * The return of `getRowModel`, one of the functions of the Tanstack Table
   * instance.
   *
   * - Always required.
   */
  rowModel: RowModel<RowShape>;

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
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

/**
 * The body section of a Data Table specified via Tanstack Table.
 *
 * @param rowModel The return of `getRowModel`, one of the functions of the Tanstack Table instance.
 */
export const DataTableBody: StyleableFC<DataTableBodyProps> = ({
  rowModel,
  align = "left",
  element,
  style,
  className,
}) => (
  <TableBody element={element} style={style} className={className}>
    {rowModel.rows.map((row) => (
      <TableRow key={row.id}>
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id} align={align}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);
