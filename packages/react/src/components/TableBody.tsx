import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/table-body.css";
import type { ReactNode } from "react";

/**
 * Props for {@link TableBody Table Body}.
 */
export interface TableBodyProps extends ElementCustomizableProps {
  /**
   * Table Body has the same behavior as `<tbody>`.
   *
   * - Must consist of Table Rows, which must consist of Table Cells.
   * - Always required.
   */
  children: ReactNode;
}

/**
 * The body area of a Table.
 *
 * @param children Table Body has the same behavior as `<tbody>`.
 *
 * @see https://sk-components-demo.mysk.school/docs/data/table-body
 */
export const TableBody: StyleableFC<TableBodyProps> = ({
  children,
  element: Element = "tbody",
  style,
  className,
}) => {
  return (
    <Element className={cn("skc-table-body", className)} style={style}>
      {children}
    </Element>
  );
};
