"use client";

import { Chip } from "@/components/Chip";
import { MaterialIcon } from "@/components/MaterialIcon";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { ActionableProps, ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/suggestion-chip.css";
import type { JSX } from "react";

/**
 * Props for {@link SuggestionChip Suggestion Chip}.
 */
export interface SuggestionChipProps extends ActionableProps, ElementCustomizableProps {
  /**
   * The text shown inside the Suggestion Chip.
   *
   * - Always required.
   */
  children: string | JSX.Element;

  /**
   * An icon can appear before the text (`children`) in an Suggestion Chip. In
   * a Chip Set with many chips, an icon can help the user find the right one
   * more quickly.
   *
   * - You are encouraged to use Material Icons as the value for `icon`.
   * - Optional.
   */
  icon?: JSX.Element;

  /**
   * A message shown in a tooltip when the user hovers over the Suggestion
   * Chip.
   *
   * - Optional.
   */
  tooltip?: string;

  /**
   * Use elevation instead of an outline to signify the Suggestion Chip's
   * boundary.
   *
   * - **Important**: do not use this prop if you don't have to. Only elevate
   *   an Suggestion Chip when its placement requires visual protection, such
   *   as on top of an image.
   * - Optional.
   */
  elevated?: boolean;

  /**
   * If the Suggestion Chip is selected.
   *
   * - Optional.
   */
  selected?: boolean;

  /**
   * Turns the Suggestion Chip gray and block any action associated with it.
   * `onClick` and `href` will have no effect.
   *
   * - Optional.
   */
  disabled?: boolean;
}

/**
 * Dynamically generated suggestions, like quick-reply options, for instance.
 *
 * @param children The text shown inside the Suggestion Chip.
 * @param icon An icon can appear before the text (`children`) in an Suggestion Chip.
 * @param tooltip A message shown in a tooltip when the user hovers over the Suggestion Chip.
 * @param elevated Use elevation instead of an outline to signify the Suggestion Chip's boundary.
 * @param selected If the Suggestion Chip is selected.
 * @param disabled Turns the Suggestion Chip gray and block any action associated with it.
 */
export const SuggestionChip: StyleableFC<SuggestionChipProps> = ({
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
    onClick={onClick}
    href={href}
    element={element}
    className={cn("skc-suggestion-chip", className)}
    style={style}
  >
    {selected ? <MaterialIcon icon="done" /> : icon}
    <Text type="label-large" className="skc-chip__label">
      {children}
    </Text>
  </Chip>
);
