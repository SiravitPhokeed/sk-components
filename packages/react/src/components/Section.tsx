"use client";

import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/section.css";
import type { ReactNode } from "react";
import { createContext, useContext, useId } from "react";

/**
 * Context that allows a Header inside a Section to pick up the Sectionʼs
 * generated ID for `aria-labelledby`.
 */
const SectionContext = createContext<string | null>(null);

/**
 * Returns the Section ID if the component is inside a Section, or `null`
 * otherwise.
 */
export const useSectionId = (): string | null => useContext(SectionContext);

export interface SectionProps extends ElementCustomizableProps {
  /**
   * Section must have exactly 1 Header as the first direct descendant. After
   * that, it can include anything.
   *
   * - Always required.
   */
  children: ReactNode;
}

/**
 * Groups content under a single Header.
 *
 * @param children Section must have exactly 1 Header as the first direct descendant. After that, it can include anything.
 *
 * @see https://sk-components-demo.mysk.school/docs/layout/section
 */
export const Section: StyleableFC<SectionProps> = ({
  children,
  element: Element = `section`,
  className,
  style,
}) => {
  const id = `section-${useId()}`;

  return (
    <SectionContext.Provider value={id}>
      <Element
        aria-labelledby={id}
        className={cn("skc-section", className)}
        style={style}
      >
        {children}
      </Element>
    </SectionContext.Provider>
  );
};
