import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/section.css";
import type { ElementType, ReactNode } from "react";

export interface SectionProps {
  /**
   * Section must have exactly 1 Header as the first direct descendent. After
   * that, it can include anything.
   *
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

export const Section: StyleableFC<SectionProps> = ({
  children,
  element: Element = `section`,
  className,
  style,
}) => {
  return (
    <Element className={cn("skc-section", className)} style={style}>
      {children}
    </Element>
  );
};
