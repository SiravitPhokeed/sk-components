import type { SegmentedButton } from "@/components/SegmentedButton";
import cn from "@/lib/helpers/cn";
import useAnchorName from "@/lib/hooks/useAnchorName";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/table-row.css";
import type { ReactElement, ReactNode } from "react";

/**
 * Props for {@link TableRow Table Row}.
 */
export interface TableRowProps extends ElementCustomizableProps {
  /**
   * Table Row has the same behavior as `<tr>`.
   *
   * - Must consist of Table Cells.
   * - Always required.
   */
  children: ReactNode;

  /**
   * Actions related to a row, shown on hover.
   *
   * - Must be a Segmented Button.
   * - Optional.
   */
  actions?: ReactElement<typeof SegmentedButton>;
}

/**
 * A row of a Table, must be within a table area (Table Head, Table Body, or
 * Table Foot).
 *
 * @param children Table Row has the same behavior as `<tr>`.
 * @param actions Actions related to a row, shown on hover.
 *
 * @see {@link https://sk-components-demo.mysk.school/docs/data/table-row Table Row documentation}
 */
export const TableRow: StyleableFC<TableRowProps> = ({
  children,
  actions,
  element: Element = "tr",
  style,
  className,
}) => {
  const anchorName = useAnchorName();
  const ActionsElement = Element === "tr" ? "td" : "div";

  return (
    <>
      <Element
        className={cn("skc-table-row", className)}
        style={{ ...(actions && { anchorName }), ...style }}
      >
        {children}
        {actions && (
          <ActionsElement
            className="skc-table-row__actions"
            style={{ positionAnchor: anchorName }}
          >
            {actions}
          </ActionsElement>
        )}
      </Element>
    </>
  );
};
