"use client";

import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/tabs-container.css";
import useArrowKeyFocus from "@/lib/hooks/useArrowKeyFocus";
import { createContext, useContext, useEffect, useId, useRef } from "react";
import type { ReactNode, RefObject } from "react";

const TabsContainerContext = createContext<{
  appearance: TabsContainerProps["appearance"];
  indicatorRef: RefObject<HTMLDivElement | null>;
} | null>(null);

export const useTabsContainerContext = () => useContext(TabsContainerContext);

/**
 * Props for {@link TabsContainer Tabs Container}.
 */
export interface TabsContainerProps extends ElementCustomizableProps {
  /**
   * Tabs to select from.
   */
  children: ReactNode;

  /**
   * Where the Tabs Container is placed affects its appearance. A Tabs Container
   * responsible for the entire content pane (`primary`) has a different
   * appearance as that for only a section (`secondary`).
   *
   * - Must be `primary` or `secondary`.
   * - Always required.
   */
  appearance: "primary" | "secondary";
}

/**
 * A group of Tabs. Tabs allow the user to switch between pages on the same
 * level of a page hierarchy. For example, an Overview, Students, and Teachers
 * page of a class.
 *
 * @param children Tabs to select from.
 * @param appearance Where the Tabs Container is placed affects its appearance. A Tabs Container responsible for the entire content pane (`primary`) has a different appearance as that for only a section (`secondary`).
 */
export const TabsContainer: StyleableFC<TabsContainerProps> = ({
  children,
  appearance,
  element: Element = "div",
  style,
  className,
}) => {
  const id = `tabs-container-${useId()}`;
  const indicatorRef = useRef<HTMLDivElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);

  /** Gets the non-disabled Tab elements inside this Tabs Container. */
  const getItems = () =>
    Array.from(
      tablistRef.current?.querySelectorAll<HTMLElement>('[role="tab"]') ?? [],
    );

  const handleTabKeyDown = useArrowKeyFocus(getItems, "horizontal");

  // Ensure at least one Tab is in the tab order when none is selected, per
  // the ARIA tabs pattern.
  useEffect(() => {
    const tablist = tablistRef.current;
    if (!tablist) return;
    const tabs = Array.from(
      tablist.querySelectorAll<HTMLElement>('[role="tab"]'),
    );
    const hasSelected = tabs.some(
      (tab) => tab.getAttribute("aria-selected") === "true",
    );
    if (!hasSelected) {
      tabs.forEach((tab) => (tab.tabIndex = -1));
      if (tabs.length > 0) tabs[0].removeAttribute("tabIndex");
    }
  });

  return (
    <TabsContainerContext.Provider value={{ appearance, indicatorRef }}>
      <Element
        key={[id, appearance].join("-")}
        style={style}
        className={cn(
          "skc-tabs-container",
          `skc-tabs-container--${appearance}`,
        )}
      >
        <div
          ref={tablistRef}
          role="tablist"
          onKeyDown={handleTabKeyDown}
          style={style}
          className={cn("skc-tabs-container__content", className)}
        >
          {children}
        </div>
        <div
          ref={indicatorRef}
          // Selected tab is already indicated by `aria-selected` on the Tab
          // itself, so this indicator is purely decorative.
          aria-hidden
          className="skc-tabs-container__indicator"
        />
      </Element>
    </TabsContainerContext.Provider>
  );
};
