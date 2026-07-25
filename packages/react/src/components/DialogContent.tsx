import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/dialog-content.css";
import type { ReactNode } from "react";

/**
 * Props for {@link DialogContent Dialog Content}.
 */
export interface DialogContentProps extends ElementCustomizableProps {
  /**
   * A Dialog Content can include anything. A common use case is
   * {@link List List}.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * The height of this component. If its content is taller than this value,
   * Dialog Content scrolls.
   *
   * - Setting a height will show Dividers on top of and below the component.
   * - Optional.
   */
  height?: number;
}

/**
 * Additional content that supplements the
 * {@link DialogHeader Dialog Header}. This is where the
 * user can see more details about a decision or enter information.
 *
 * @param children A Dialog Content can include anything. A common use case is List.
 * @param height The height of this component. If its content is taller than this value, Dialog Content scrolls.
 */
export const DialogContent: StyleableFC<DialogContentProps> = ({
  children,
  height,
  element: Element = "div",
  style,
  className,
}) => (
  <Element
    className={cn(
      "skc-dialog-content",
      height !== undefined && "skc-dialog-content--scrollable",
      className,
    )}
    style={{ ...style, height }}
  >
    {children}
  </Element>
);
