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
   * List contains List Items, each containing a List Item Content and other
   * elements.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * The number of columns in the list. Internally uses Columns for layout.
   *
   * - Must be an integer: 2, 3, 4, 6, or 12.
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
 * @param children List contains List Items, each containing a List Item Content and other elements.
 * @param columns The number of columns in the list. Internally uses Columns for layout.
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
