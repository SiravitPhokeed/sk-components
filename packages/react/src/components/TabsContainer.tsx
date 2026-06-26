"use client";

import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/tabs-container.css";
import { createContext, useContext, useId, type ReactNode } from "react";

/**
 * Context that allows a Tab inside a Tabs Container to pick up the containerʼs
 * generated ID for coordinated animation.
 */
const TabsContainerContext = createContext<string | null>(null);

/**
 * Returns the Tabs Container ID if the component is inside a Tabs Container,
 * or `null` otherwise.
 */
export const useTabsContainerId = (): string | null =>
  useContext(TabsContainerContext);

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

  /**
   * A description of the Tabs Container for screen readers, similar to `alt`
   * on `<img>`.
   *
   * - Always required.
   */
  alt: string;
}

/**
 * A group of Tabs. Tabs allow the user to switch between pages on the same
 * level of a page hierarchy. For example, an Overview, Students, and Teachers
 * page of a class.
 *
 * @param children Tabs to select from.
 * @param appearance Where Tabs Container is placed affects its appearance. A Tabs Container responsible for the entire content pane (`primary`) has a different appearance as that for only a section (`secondary`).
 * @param alt A description of the Tabs Container for screen readers, similar to `alt` on `<img>`.
 */
export const TabsContainer: StyleableFC<TabsContainerProps> = ({
  children,
  appearance,
  alt,
  element: Element = "div",
  style,
  className,
}) => {
  const id = `tabs-container-${useId()}`;

  return (
    <TabsContainerContext.Provider value={id}>
      <Element
        style={style}
        className={cn(
          "skc-tabs-container",
          `skc-tabs-container--${appearance}`,
        )}
      >
        <div
          role="tablist"
          aria-label={alt}
          style={style}
          className={cn("skc-tabs-container__content", className)}
        >
          {children}
        </div>
      </Element>
    </TabsContainerContext.Provider>
  );
};
