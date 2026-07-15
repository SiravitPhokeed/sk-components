import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/table-foot.css";
import type { ReactNode } from "react";

/**
 * Props for {@link TableFoot Table Foot}.
 */
export interface TableFootProps extends ElementCustomizableProps {
  /**
   * Table Foot has the same behavior as `<tfoot>`.
   *
   * - Must consist of Table Rows, which must consist of Table Cells.
   * - Always required.
   */
  children: ReactNode;

  /**
   * If the Table Foot stays put on scroll.
   *
   * - Table Foot will be fixed to the bottom of the parent Table, not the
   *   screen.
   * - Only effective if `height` is set on the parent Table.
   * - Optional.
   */
  fixed?: boolean;
}

/**
 * The foot area of a Table.
 *
 * @param children Table Foot has the same behavior as `<tfoot>`.
 * @param fixed If the Table Foot stays put on scroll.
 */
export const TableFoot: StyleableFC<TableFootProps> = ({
  children,
  fixed,
  element: Element = "tfoot",
  style,
  className,
}) => (
  <Element
    className={cn(
      "skc-table-foot",
      fixed && "skc-table-foot--fixed",
      className,
    )}
    style={style}
  >
    {children}
  </Element>
);
