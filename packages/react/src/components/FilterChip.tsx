"use client";

import { Chip } from "@/components/Chip";
import { MaterialIcon } from "@/components/MaterialIcon";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { CommandProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/filter-chip.css";
import type { ElementType, JSX } from "react";

/**
 * Props for {@link FilterChip Filter Chip}.
 */
export interface FilterChipProps extends CommandProps {
  /**
   * The text displayed inside the chip.
   *
   * - Must be a string or a JSX Element.
   * - Always required.
   */
  children: string | JSX.Element;

  /**
   * An icon can appear before all content in an Filter Chip. In a page with
   * many cards, icons can quickly orient users.
   *
   * - You are encouraged to use Material Icons as the value for `icon`.
   * - Optional.
   */
  icon?: JSX.Element;

  /**
   * A message shown in a tooltip when the user hovers over the Filter Chip.
   *
   * - Optional.
   */
  tooltip?: string;

  /**
   * Use elevation instead of an outline to signify the Filter Chip's boundary.
   *
   * - Important: do not use this prop if you don't have to. Only elevate an
   *   Filter Chip when its placement requires visual protection, such as on
   *   top of an image.
   * - Optional.
   */
  elevated?: boolean;

  /**
   * If the Filter Chip is selected. `icon` is replaced with a checkmark if
   * this is `true`.
   *
   * - Optional.
   */
  selected?: boolean;

  /**
   * Turns the Filter Chip gray and block any action associated with it.
   * `onClick` will have no effect.
   *
   * - Optional.
   */
  disabled?: boolean;

  /**
   * Triggers when the user toggles the Filter Chip on or off.
   *
   * - Optional.
   */
  onClick?: (state: boolean) => any;

  /**
   * The URL of the page this Filter Chip leads to, similar to `href` on `<a>`.
   *
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
 * A set of Filter Chips provide product-authored options to narrow down
 * content. A Filter Chip should never appear alone and should be a child of
 * Chip Set.
 *
 * @param children The text displayed inside the chip.
 * @param icon An icon can appear before all content in an Filter Chip.
 * @param tooltip A message shown in a tooltip when the user hovers over the Filter Chip.
 * @param elevated Use elevation instead of an outline to signify the Filter Chip's boundary.
 * @param selected If the Filter Chip is selected.
 * @param disabled Turns the Filter Chip gray and block any action associated with it.
 * @param onClick Triggers when the user toggles the Filter Chip on or off.
 */
export const FilterChip: StyleableFC<FilterChipProps> = ({
  children,
  icon,
  tooltip,
  elevated,
  selected,
  disabled,
  command,
  commandfor,
  onClick,
  href,
  element = "button",
  style,
  className,
}) => (
  <Chip
    tooltip={tooltip}
    elevated={elevated}
    selected={selected}
    disabled={disabled}
    command={command}
    commandfor={commandfor}
    onClick={onClick ? () => onClick(!selected) : undefined}
    href={href}
    element={element}
    className={cn("skc-filter-chip", className)}
    style={style}
  >
    {selected ? <MaterialIcon icon="done" /> : icon}
    <Text type="label-large" className="skc-chip__label">
      {children}
    </Text>
  </Chip>
);
