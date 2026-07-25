"use client";

import { Interactive } from "@/components/Interactive";
import { useTabsContainerContext } from "@/components/TabsContainer";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type {
  ActionableProps,
  ElementCustomizableProps,
  StyleableFC,
} from "@/lib/types";
import "@suankularb-components/css/tab.css";
import { throttle } from "radash";
import type { ReactElement, ReactNode } from "react";
import { useEffect, useRef } from "react";

/**
 * Props for {@link Tab}.
 */
export interface TabProps extends ActionableProps, ElementCustomizableProps {
  /**
   * An icon appears before or above the label. Icons help users identify pages
   * more quickly.
   *
   * - If the icon is sufficiently representative of the page, a label isn’t
   *   needed.
   * - Normally optional, but required if `label` is not defined, as a Tab cannot
   *   be empty.
   */
  icon?: ReactElement;

  /**
   * An additional text label next to or underneath the icon.
   *
   * - Required if `icon` is not defined, as a Tab cannot be empty.
   */
  label?: ReactNode;

  /**
   * A description of the Tab for screen readers, similar to `alt` on `<img>`.
   *
   * - Required if the Tab just includes `icon`, because an icon has no
   *   significance for screen readers.
   */
  alt?: string;

  /**
   * The `id` of the tab panel this Tab controls, applied as `aria-controls`. Each
   * Tab should point to its own panel — not the container — because each Tab
   * controls a different panel, even though only one is visible at a time.
   *
   * - Optional.
   */
  controls?: string;

  /**
   * A message shown in a tooltip when the user hovers over the Tab.
   *
   * - Optional.
   */
  tooltip?: string;

  /**
   * Highlights the Tab. If the user is currently on this page, the Tab should
   * be highlighted.
   *
   * - Optional.
   */
  selected?: boolean;
}

/**
 * Tabs allow the user to switch between pages on the same level of a page
 * hierarchy. For example, an Overview, Students, and Teachers page of a class.
 *
 * @param icon An icon appears before or above the label. Icons help users identify pages more quickly.
 * @param label An additional text label next to or underneath the icon.
 * @param alt A description of the Tab for screen readers, similar to `alt` on `<img>`.
 * @param controls The `id` of the tab panel this Tab controls, applied as `aria-controls`.
 * @param tooltip A message shown in a tooltip when the user hovers over the Tab.
 * @param selected Highlights the Tab. If the user is currently on this page, the Tab should be highlighted.
 * @see https://sk-components-demo.mysk.school/docs/layout/tab
 */
export const Tab: StyleableFC<TabProps> = ({
  icon,
  label,
  alt,
  controls,
  tooltip,
  selected,
  className,
  ...rest
}) => {
  const context = useTabsContainerContext();
  const { appearance, indicatorRef } = context ?? {};

  const tabRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const animateIndicator = () => {
    if (!selected) return;

    const tab = tabRef.current;
    const content = contentRef.current;
    const indicator = indicatorRef?.current;

    if (!(tab && content && indicator)) return;

    const tabRect = tab.getBoundingClientRect();
    const labelRect = content?.getBoundingClientRect();
    // .skc-tabs-container (positioned ancestor) > .skc-tabs-container__content > .skc-tab
    const containerRect =
      tab.parentElement?.parentElement?.getBoundingClientRect();

    if (!containerRect) return;

    let width = tabRect.width;
    let left = tabRect.left - containerRect.left;
    if (appearance === "primary" && labelRect) {
      width = labelRect.width;
      left = labelRect.left - containerRect.left;
    }

    indicator.style.display = "block";
    indicator.style.transform = `translateX(${left}px)`;
    indicator.style.width = `${width}px`;
  };

  // animateIndicator reads refs and state — it changes every render.
  // Adding it to deps would re-attach the resize listener on every render.
  useEffect(() => {
    const throttledAnimate = throttle({ interval: 100 }, animateIndicator);
    window.addEventListener("resize", throttledAnimate);
    return () => window.removeEventListener("resize", throttledAnimate);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    animateIndicator();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, label]); // Width of primary indicator depends on label width.

  return (
    <Interactive
      role="tab"
      ref={tabRef}
      aria-selected={selected}
      aria-controls={controls}
      aria-label={alt}
      title={tooltip}
      className={cn("skc-tab", selected && "skc-tab--selected", className)}
      {...rest}
    >
      <div ref={contentRef} className="skc-tab__content">
        {icon && <span className="skc-tab__icon">{icon}</span>}
        {label && (
          <Text type="title-small" className="skc-tab__label">
            {label}
          </Text>
        )}
      </div>
    </Interactive>
  );
};
