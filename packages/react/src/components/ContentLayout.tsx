import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/content-layout.css";
import type { ReactNode } from "react";

/**
 * Props for {@link ContentLayout Content Layout}.
 */
export interface ContentLayoutProps extends ElementCustomizableProps {
  /**
   * The main content of a page is grouped into Sections inside of a Content
   * Layout.
   *
   * - Must only have Sections.
   * - Always required.
   */
  children: ReactNode;
}

/**
 * A centered, single-column container for page content. It limits the
 * maximum width and arranges children vertically, with minimal built-in
 * styling.
 *
 * @param children The main content of a page is grouped into Sections inside of a Content Layout.
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
