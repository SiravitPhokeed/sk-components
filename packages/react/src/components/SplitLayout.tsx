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
   * Choose from 2 presets or create your own. This uses the same grid system
   * as Columns, so ensure each side of the ratio adds up to 12.
   *
   * - If you choose to use a preset: must be `list-detail` or
   *   `supporting-panel`. Learn more about these Material Design’s
   *   documentation.
   * - If you choose to create a custom ratio: must be an array with 2
   *   numbers, the first being the left and the last being the right.
   * - Always required.
   */
  ratio: "list-detail" | "supporting-panel" | [number, number];

  /**
   * On mobile, there is not enough space 2 have to columns on screen at once,
   * so the right side disappears by default. Enabling `showRightOnMobile`
   * will show the right side below the left side.
   *
   * - Optional.
   */
  showRightOnMobile?: boolean;
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
 * @param ratio Choose from 2 presets or create your own. This uses the same grid system as Columns, so ensure each side of the ratio adds up to 12.
 * @param showRightOnMobile Show the right side below the left side instead of hiding it on mobile.
 */
export const SplitLayout: StyleableFC<SplitLayoutProps> = ({
  children,
  ratio,
  showRightOnMobile,
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
        showRightOnMobile && "skc-split-layout--persist-right",
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
