import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/table-foot.css";
import type { ReactNode } from "react";

/**
 * Props for {@link TableFoot Table Foot}.
 */
export interface TableFootProps extends ElementCustomizableProps {
  /**
   * Table Foot has the same behaviour as `<tfoot>`.
   *
   * - Must consist of Table Rows, which must consist of Table Cells.
   * - Always required.
   */
  children: ReactNode;
}

/**
 * The foot area of a Table.
 *
 * @param children Table Foot has the same behaviour as `<tfoot>`.
 */
export const TableFoot: StyleableFC<TableFootProps> = ({
  children,
  element: Element = "tfoot",
  style,
  className,
}) => (
  <Element className={cn("skc-table-foot", className)} style={style}>
    {children}
  </Element>
);
