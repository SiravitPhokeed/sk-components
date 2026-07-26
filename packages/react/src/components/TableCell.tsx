import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/table-cell.css";
import type { ReactNode } from "react";

/**
 * Props for {@link TableCell Table Cell}.
 */
export interface TableCellProps extends ElementCustomizableProps {
  /**
   * The content of the cell.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * If the cell is a header cell, Table Cell will use `<th>` instead of `<td>`.
   *
   * - Optional.
   */
  header?: boolean;

  /**
   * The scope of the cell, which defines the cells that the header cell relates
   * to.
   *
   * - Must be `"col"`, `"row"`, `"colgroup"`, or `"rowgroup"`.
   * - Only effective when `header` is `true`.
   * - Optional.
   */
  scope?: "col" | "row" | "colgroup" | "rowgroup";

  /**
   * The number of columns the cell should span.
   *
   * - Optional.
   */
  colSpan?: number;

  /**
   * The number of rows the cell should span.
   *
   * - Optional.
   */
  rowSpan?: number;

  /**
   * How the content should be positioned. It can be aligned to the left, the
   * center (default), or the right.
   *
   * - Must be `"left"`, `"center"`, `"right"`.
   * - Optional.
   */
  align?: "left" | "center" | "right";
}

/**
 * A cell of a Table.
 *
 * @param children The content of the cell.
 * @param header If the cell is a header cell, Table Cell will use `<th>` instead of `<td>`.
 * @param scope The scope of the cell, which defines the cells that the header cell relates to.
 * @param colSpan The number of columns the cell should span.
 * @param rowSpan The number of rows the cell should span.
 * @param align How the content should be positioned. It can be aligned to the left, the center (default), or the right.
 *
 * @see {@link https://sk-components-demo.mysk.school/docs/data/table-cell Table Cell documentation}
 */
export const TableCell: StyleableFC<TableCellProps> = ({
  children,
  header,
  scope,
  colSpan,
  rowSpan,
  align = "center",
  element: Element = header ? "th" : "td",
  style,
  className,
}) => (
  <Element
    colSpan={colSpan}
    rowSpan={rowSpan}
    {...(header && { scope })}
    className={cn(
      "skc-table-cell",
      header && "skc-table-cell--header",
      `skc-table-cell--${align}`,
      className,
    )}
    style={style}
  >
    <Text
      type={header ? "title-small" : "body-medium"}
      className="skc-table-cell__content"
      element="div"
    >
      {children}
    </Text>
  </Element>
);
