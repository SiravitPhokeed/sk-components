"use client";

import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/tabs-container.css";
import { createContext, useContext, useId, useRef } from "react";
import type { ReactNode, RefObject } from "react";

const TabsContainerContext = createContext<{
  id: string;
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
   * Where Tabs Container is placed affects its appearance. A Tabs Container
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
 * @param appearance Where Tabs Container is placed affects its appearance. A Tabs Container responsible for the entire content pane (`primary`) has a different appearance as that for only a section (`secondary`).
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

  return (
    <TabsContainerContext.Provider value={{ id, appearance, indicatorRef }}>
      <Element
        style={style}
        className={cn(
          "skc-tabs-container",
          `skc-tabs-container--${appearance}`,
        )}
      >
        <div
          role="tablist"
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
