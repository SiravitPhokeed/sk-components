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
   * - Must be `left`, `center`, `right`.
   * - Optional.
   */
  align?: "left" | "center" | "right";
}

/**
 * A cell of a Table.
 *
 * @param children The content of the cell.
 * @param header If the cell is a header cell, Table Cell will use `<th>` instead of `<td>`.
 * @param align How the content should be positioned. It can be aligned to the left, the center (default), or the right.
 */
export const TableCell: StyleableFC<TableCellProps> = ({
  children,
  header,
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
    style={style}
    className={cn(
      "skc-table-cell",
      header && "skc-table-cell--header",
      `skc-table-cell--${align}`,
      className,
    )}
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
