import { TableBody } from "@/components/TableBody";
import { TableCell } from "@/components/TableCell";
import { TableRow, type TableRowProps } from "@/components/TableRow";
import type {
  ElementCustomizableProps,
  StyleableFC,
  StyleableProps,
} from "@/lib/types";
import "@suankularb-components/css/table-body.css";
import type { RowModel } from "@tanstack/react-table";
import { flexRender } from "@tanstack/react-table";

/**
 * Props for {@link DataTableBody Data Table Body}.
 */
export interface DataTableBodyProps<
  RowShape extends {} = any,
> extends ElementCustomizableProps {
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
   * Actions related to a row, shown on hover.
   *
   * - Must be a Segmented Button.
   * - Optional.
   *
   * @param row The data for the row this is place in.
   */
  rowActions?:
    | Required<TableRowProps["actions"]>
    | ((row: RowShape) => Required<TableRowProps["actions"]>);
}

/**
 * The body section of a Data Table specified via Tanstack Table.
 *
 * @param rowModel The return of `getRowModel`, one of the functions of the Tanstack Table instance.
 */
export const DataTableBody = <RowShape extends {}>({
  rowModel,
  align = "left",
  rowActions,
  element,
  style,
  className,
}: StyleableProps & DataTableBodyProps<RowShape>) => (
  <TableBody element={element} style={style} className={className}>
    {rowModel.rows.map((row) => (
      <TableRow
        key={row.id}
        actions={
          typeof rowActions === "function"
            ? rowActions(row.original)
            : rowActions
        }
      >
        {row.getVisibleCells().map((cell) => (
          <TableCell key={cell.id} align={align}>
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </TableCell>
        ))}
      </TableRow>
    ))}
  </TableBody>
);
