import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/split-layout.css";
import type { CSSProperties, ReactNode } from "react";

/**
 * Props for {@link SplitLayout Split Layout}.
 */
export interface SplitLayoutProps extends ElementCustomizableProps {
  /**
   * The content should have 2 sides; each element entered corresponds to a
   * side.
   *
   * - Must have 2 elements.
   * - Always required.
   */
  children: ReactNode;

  /**
   * Choose between two presets or provide custom values. Uses the same
   * 12-column grid as Columns, so the two values must add up to 12.
   *
   * - `"list-detail"` — a wide list and a narrower detail pane.
   * - `"supporting-panel"` — main content with a small supporting column.
   * - `[number, number]` — custom column widths (e.g., `[8, 4]`).
   * - Always required.
   */
  ratio: "list-detail" | "supporting-panel" | [number, number];

  /**
   * The side to show on mobile.
   *
   * - On mobile, there is not enough space to have 2 columns on screen at once.
   *   Choose which side to show on mobile, or show both with the right side
   *   below the left.
   * - Optional.
   */
  prefer?: "left" | "right" | "both";
}

/**
 * List-detail views and supporting panel layouts can be created with Split
 * Layout.
 *
 * In a list-detail view, the left side is a list and the right is the list’s
 * detail. In a supporting panel layout, the main content takes focus with a
 * small column set aside for supporting content.
 *
 * @param children The content should have 2 sides; each element entered corresponds to a side.
 * @param ratio Choose between two presets or provide custom values. Uses the same 12-column grid as Columns, so the two values must add up to 12.
 * @param prefer The side to show on mobile.
 *
 * @see {@link https://sk-components-demo.mysk.school/docs/layout/split-layout Split Layout documentation}
 */
export const SplitLayout: StyleableFC<SplitLayoutProps> = ({
  children,
  ratio,
  prefer = "left",
  element: Element = "section",
  style,
  className,
}) => {
  const colSpans = [
    { sm: 2, md: 2, lg: 1 },
    { sm: 2, md: 2, lg: 2 },
    { sm: 3, md: 4, lg: 3 },
    { sm: 3, md: 4, lg: 4 },
    { sm: 4, md: 6, lg: 5 },
    { sm: 4, md: 6, lg: 6 },
    { sm: 4, md: 6, lg: 7 },
    { sm: 5, md: 8, lg: 8 },
    { sm: 5, md: 8, lg: 9 },
    { sm: 6, md: 10, lg: 10 },
    { sm: 6, md: 10, lg: 11 },
  ];
  const totalColumns = { sm: 8, md: 12, lg: 12 };
  const specifiedColSpan =
    typeof ratio !== "string" ? colSpans[ratio[0] - 1] : undefined;

  return (
    <Element
      style={style}
      className={cn(
        "skc-split-layout",
        typeof ratio === "string"
          ? `skc-split-layout--${ratio}`
          : "skc-split-layout--custom",
        `skc-split-layout--prefer-${prefer}`,
        className,
      )}
    >
      <div
        className="skc-split-layout__content"
        style={
          specifiedColSpan
            ? ({
                "--_left-col-span-lg": `${specifiedColSpan.lg}fr`,
                "--_right-col-span-lg": `${totalColumns.lg - specifiedColSpan.lg}fr`,
                "--_left-col-span-md": `${specifiedColSpan.md}fr`,
                "--_right-col-span-md": `${totalColumns.md - specifiedColSpan.md}fr`,
                "--_left-col-span-sm": `${specifiedColSpan.sm}fr`,
                "--_right-col-span-sm": `${totalColumns.sm - specifiedColSpan.sm}fr`,
              } as CSSProperties)
            : undefined
        }
      >
        {children}
      </div>
    </Element>
  );
};
