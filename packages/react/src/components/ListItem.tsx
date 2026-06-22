"use client";

import { Interactive } from "@/components/Interactive";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/list-item.css";
import {
  createContext,
  useContext,
  useId,
  type ElementType,
  type ReactNode,
} from "react";

/**
 * Context that allows a ListItemContent inside a ListItem to pick up the
 * ListItemʼs generated ID for `aria-labelledby`.
 */
const ListItemContext = createContext<string | null>(null);

/**
 * Returns the List Item ID if the component is inside a List Item, or `null`
 * otherwise.
 */
export const useListItemId = (): string | null => useContext(ListItemContext);

/**
 * The number of lines a List Item can contain.
 */
type ListItemLines = 1 | 2 | 3;

/**
 * Props for {@link ListItem List Item}.
 */
export interface ListItemProps {
  /**
   * The content of a List Item consists of the leading section, the content
   * section, and the trailing section.
   *
   * - Any components placed before List Item Content is put into the leading
   *   section, and any after is put into the trailing section.
   * - Always required.
   */
  children: ReactNode;

  /**
   * The vertical alignment of the List Item's content.
   *
   * - Must be `top`, `center`, or `bottom`.
   * - Always required.
   */
  align: "top" | "center" | "bottom";

  /**
   * The number of lines contained by the List Item. The height is set from this prop.
   *
   * - Must be an integer (or a list of 4 integers, each corresponding to a breakpoint) from 1 to 3.
   * - Always required.
   */
  lines:
    | ListItemLines
    | [ListItemLines, ListItemLines, ListItemLines, ListItemLines];

  /**
   * In interactive components like Button, the state layer reacts to changes
   * to the state to signify its interactivity. For example, a Button's state
   * layer turns up its opacity on hover.
   *
   * - This effect can be enabled on List Item as well, letting the user know
   *   that this List Item is interactive.
   * - Optional.
   */
  stateLayerEffect?: boolean;

  /**
   * The function called when the user interacts with the List Item, similar to
   * `onClick` on `<button>`.
   *
   * - If this is defined, a state layer is added.
   * - Optional.
   */
  onClick?: () => any;

  /**
   * The URL of the page this List Item leads to, similar to `href` on `<a>`.
   *
   * - If this is defined, a state layer is added.
   * - Optional.
   */
  href?: string;

  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

/**
 * An item inside a List.
 *
 * @param children The content of a List Item consists of the leading section, the content section, and the trailing section.
 * @param align The vertical alignment of the List Item's content.
 * @param lines The number of lines contained by the List Item.
 * @param stateLayerEffect The state layer reacts to changes to the state to signify its interactivity. This effect can be enabled on List Item as well.
 * @param onClick The function called when the user interacts with the List Item, similar to `onClick` on `<button>`.
 * @param href The URL of the page this List Item leads to, similar to `href` on `<a>`.
 */
export const ListItem: StyleableFC<ListItemProps> = ({
  children,
  align,
  lines,
  stateLayerEffect,
  onClick,
  href,
  element = href ? "a" : onClick || stateLayerEffect ? "button" : "div",
  style,
  className,
}) => {
  const id = `list-item-${useId()}`;

  const isInteractive = Boolean(href || onClick || stateLayerEffect);
  const Element = isInteractive ? Interactive : element;

  return (
    <ListItemContext.Provider value={id}>
      <li aria-labelledby={id}>
        <Element
          {...(isInteractive && { href, onClick, element })}
          className={cn(
            "skc-list-item",
            `skc-list-item--${align}`,
            `skc-list-item--${lines}-line`,
            stateLayerEffect && "skc-list-item--state-layer",
            className,
          )}
          style={style}
        >
          {children}
        </Element>
      </li>
    </ListItemContext.Provider>
  );
};
