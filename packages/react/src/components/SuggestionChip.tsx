"use client";

import { Chip } from "@/components/Chip";
import { MaterialIcon } from "@/components/MaterialIcon";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type {
  ActionableProps,
  ElementCustomizableProps,
  StyleableFC,
} from "@/lib/types";
import "@suankularb-components/css/suggestion-chip.css";
import type { ReactElement, ReactNode } from "react";

/**
 * Props for {@link SuggestionChip Suggestion Chip}.
 */
export interface SuggestionChipProps
  extends ActionableProps, ElementCustomizableProps {
  /**
   * The text shown inside the Suggestion Chip.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * An icon can appear before the text (`children`) in a Suggestion Chip. In
   * a Chip Set with many chips, an icon can help the user find the right one
   * more quickly.
   *
   * - You are encouraged to use Material Icon as the value for `icon`.
   * - Optional.
   */
  icon?: ReactElement;

  /**
   * A message shown in a tooltip when the user hovers over the Suggestion
   * Chip.
   *
   * - Optional.
   */
  tooltip?: string;

  /**
   * Use elevation instead of an outline to signify the Suggestion Chip’s
   * boundary.
   *
   * - **Use sparingly.** Only elevate a Suggestion Chip when its placement
   *   requires visual protection, such as on top of an image.
   * - Optional.
   */
  elevated?: boolean;

  /**
   * Turns the Suggestion Chip gray and blocks any action associated with it.
   * `onClick` and `href` will have no effect.
   *
   * - Optional.
   */
  disabled?: boolean;
}

/**
 * Dynamically generated suggestions, such as quick-reply options.
 *
 * Suggestion Chips appear in a Chip Set.
 *
 * @param children The text shown inside the Suggestion Chip.
 * @param icon An icon can appear before the text (`children`) in a Suggestion Chip.
 * @param tooltip A message shown in a tooltip when the user hovers over the Suggestion Chip.
 * @param elevated Use elevation instead of an outline to signify the Suggestion Chip’s boundary.
 * @param disabled Turns the Suggestion Chip gray and blocks any action associated with it.
 * @see https://sk-components-demo.mysk.school/docs/data/suggestion-chip
 */
export const SuggestionChip: StyleableFC<SuggestionChipProps> = ({
  children,
  icon,
  tooltip,
  elevated,
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
    disabled={disabled}
    command={command}
    commandfor={commandfor}
    onClick={onClick}
    href={href}
    element={element}
    className={cn("skc-suggestion-chip", className)}
    style={style}
  >
    {icon && <div className="skc-chip__icon">{icon}</div>}
    <Text type="label-large" className="skc-chip__label">
      {children}
    </Text>
  </Chip>
);
