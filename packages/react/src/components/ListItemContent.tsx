"use client";

import { useListItemId } from "@/components/ListItem";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/list-item-content.css";
import { type ElementType, type ReactNode } from "react";

/**
 * Props for {@link ListItemContent List Item Content}.
 */
export interface ListItemContentProps {
  /**
   * Small text on top of the title text.
   *
   * - Optional.
   */
  overline?: string | ReactNode;

  /**
   * The main text of the List Item Content.
   *
   * - Always required.
   */
  title: string | ReactNode;

  /**
   * A description supplementing the title text.
   *
   * - Optional.
   */
  desc?: string | ReactNode;

  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

/**
 * The text content of a List Item.
 *
 * @param overline Small text on top of the title text.
 * @param title The main text of the List Item Content.
 * @param desc A description supplementing the title text.
 */
export const ListItemContent: StyleableFC<ListItemContentProps> = ({
  overline,
  title,
  desc,
  element: Element = "div",
  style,
  className,
}) => {
  const id = useListItemId();

  return (
    <Element className={cn("skc-list-item-content", className)} style={style}>
      {/* Overline */}
      {overline && (
        <Text type="label-small" className="skc-list-item-content__overline">
          {overline}
        </Text>
      )}

      {/* Title */}
      <Text
        id={id ?? undefined}
        type="body-large"
        className="skc-list-item-content__title"
      >
        {title}
      </Text>

      {/* Description */}
      {desc && (
        <Text type="body-medium" className="skc-list-item-content__desc">
          {desc}
        </Text>
      )}
    </Element>
  );
};
