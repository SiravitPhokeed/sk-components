import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/divider.css";

/**
 * Props for {@link Divider}.
 */
export interface DividerProps extends ElementCustomizableProps {}

/**
 * A Divider separates items in a list with a thin line. This is used when
 * separation cannot be accomplished with Cards or white space.
 */
export const Divider: StyleableFC<DividerProps> = ({
  element: Element = "hr",
  style,
  className,
}) => <Element className={cn("skc-divider", className)} style={style} />;
