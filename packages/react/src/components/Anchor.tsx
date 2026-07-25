"use client";

import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import type { ReactNode } from "react";
import { createContext, useContext, useId } from "react";
import "@suankularb-components/css/anchor.css";
import useAnchorName from "@/lib/hooks/useAnchorName";

const AnchorContext = createContext<{ anchorName: `--${string}` } | null>(null);

/**
 * Returns the Anchor context if inside an Anchor, or `null` otherwise.
 */
export const useAnchorContext = () => useContext(AnchorContext);

export interface AnchorProps extends ElementCustomizableProps {
  /**
   * Elements to anchor together — typically a trigger element (e.g. a Button)
   * followed by the positioned element (e.g. a Menu).
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * The anchor name (dashed-ident) used for CSS Anchor Positioning.
   *
   * - Optional. Auto-generated if omitted.
   * - When using the explicit pattern (Anchor wraps trigger only, Menu
   *   positioned elsewhere), set this explicitly and pass the same value
   *   to the Menu's `anchor` prop.
   * - Must be a valid dashed-ident (e.g. `--menu-trigger`).
   */
  name?: `--${string}`;
}

/**
 * Associates a trigger element (e.g. a Button) with a positioned element (e.g.
 * a Menu) using CSS Anchor Positioning.
 *
 * @param children Elements to anchor together.
 * @param name The anchor name (dashed-ident) for CSS Anchor Positioning.
 *
 * @see https://sk-components-demo.mysk.school/docs/overlays/anchor
 */
export const Anchor: StyleableFC<AnchorProps> = ({
  children,
  name,
  element: Element = "span",
  style,
  className,
}) => {
  const anchorName = useAnchorName(name);
  return (
    <AnchorContext.Provider value={{ anchorName }}>
      <Element
        style={{ anchorName, ...style }}
        className={cn("skc-anchor", className)}
      >
        {children}
      </Element>
    </AnchorContext.Provider>
  );
};
