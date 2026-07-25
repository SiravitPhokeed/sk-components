import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/table-head.css";
import type { ReactNode } from "react";

/**
 * Props for {@link TableHead Table Head}.
 */
export interface TableHeadProps extends ElementCustomizableProps {
  /**
   * Table Head has the same behavior as `<thead>`.
   *
   * - Must consist of Table Row(s), which must consist of Table Cells with the
   *   `header` enabled.
   * - Always required.
   */
  children: ReactNode;

  /**
   * If the Table Head stays put on scroll.
   *
   * - Table Head will be fixed to the top of the parent Table, not the screen.
   * - Only effective if `height` is set on the parent Table.
   * - Optional.
   */
  fixed?: boolean;
}

/**
 * The head area of a Table.
 *
 * @param children Table Head has the same behavior as `<thead>`.
 * @param fixed If the Table Head stays put on scroll.
 *
 * @see https://sk-components-demo.mysk.school/docs/data/table-head
 */
export const TableHead: StyleableFC<TableHeadProps> = ({
  children,
  fixed,
  element: Element = "thead",
  style,
  className,
}) => (
  <Element
    className={cn(
      "skc-table-head",
      fixed && "skc-table-head--fixed",
      className,
    )}
    style={style}
  >
    {children}
  </Element>
);
