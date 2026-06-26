import type { ColumnsProps } from "@/components/Columns";
import { Columns } from "@/components/Columns";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/list.css";
import type { ReactNode } from "react";

/**
 * Props for {@link List}.
 */
export interface ListProps extends ElementCustomizableProps {
  /**
   * List contains List Items, Buttons, or Cards. You can put as many items
   * inside List as needed, but the recommended limit is 3.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * Uses Columns under the hood. Number of columns.
   *
   * - Must be an integer from 2, 3, 4, 6, or 12.
   * - Optional.
   */
  columns?: ColumnsProps["columns"];

  /**
   * Puts a Divider between List Items.
   *
   * - Optional.
   */
  divided?: boolean;
}

/**
 * A vertical index of texts or images.
 *
 * @param children Items inside the List.
 * @param columns Uses Columns under the hood. Number of columns.
 * @param divided Puts a Divider between List Items.
 */
export const List: StyleableFC<ListProps> = ({
  children,
  columns,
  divided,
  element: Element = "ul",
  style,
  className,
}) => {
  const props = {
    style,
    className: cn("skc-list", divided && "skc-list--divided", className),
  };

  return columns ? (
    <Columns columns={columns} element={Element} {...props}>
      {children}
    </Columns>
  ) : (
    <Element {...props} role="list">
      {children}
    </Element>
  );
};
