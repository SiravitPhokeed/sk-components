import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/content-layout.css";
import type { ElementType, ReactNode } from "react";

/**
 * Props for {@link ContentLayout Content Layout}.
 */
export interface ContentLayoutProps {
  /**
   * The main content of a page is grouped into Sections inside of a Content
   * Layout.
   *
   * - Must only have Sections.
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
 * A simple width-clamped vertical flow of content with minimal default styling.
 */
export const ContentLayout: StyleableFC<ContentLayoutProps> = ({
  children,
  element: Element = "main",
  style,
  className,
}) => {
  return (
    <Element className={cn("skc-content-layout", className)} style={style}>
      <div className="skc-content-layout__content">{children}</div>
    </Element>
  );
};
