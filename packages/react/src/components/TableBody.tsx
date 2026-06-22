import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/table-body.css";
import type { ElementType, ReactNode } from "react";

/**
 * Props for {@link TableBody Table Body}.
 */
export interface TableBodyProps {
  /**
   * Table Body has the same behaviour as `<tbody>`.
   *
   * - Must consist of Table Rows, which must consist of Table Cells.
   * - Always required.
   */
  children: ReactNode;

  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

/**
 * The body area of a Table.
 *
 * @param children Table Body has the same behaviour as `<tbody>`.
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
