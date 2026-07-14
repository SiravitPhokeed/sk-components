import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/divider.css";

/**
 * Props for {@link Divider}.
 */
export interface DividerProps extends ElementCustomizableProps {}

/**
 * A Divider draws a thin line between items to separate them visually. Use
 * it when spacing alone or Cards aren’t enough to distinguish groups.
 */
export const Divider: StyleableFC<DividerProps> = ({
  element: Element = "hr",
  style,
  className,
}) => <Element className={cn("skc-divider", className)} style={style} />;
