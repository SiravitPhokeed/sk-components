"use client";

import { Interactive } from "@/components/Interactive";
import { MaterialIcon } from "@/components/MaterialIcon";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/chip.css";
import type { ElementType, JSX, ReactNode } from "react";

/**
 * Props shared by all chip types.
 *
 * @private
 */
export interface ChipProps {
  /**
   * The text displayed inside the chip.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * An icon can appear before the text in a Chip. In a Chip Set with many
   * chips, an icon can help the user find the right one more quickly.
   *
   * - You are encouraged to use Material Icons as the value for `icon`.
   * - Optional.
   */
  icon?: JSX.Element;

  /**
   * Content placed after the label, typically a trailing icon or button.
   *
   * - Optional.
   */
  trailing?: ReactNode;

  /**
   * A message shown in a tooltip when the user hovers over the Chip.
   *
   * - Optional.
   */
  tooltip?: string;

  /**
   * Use elevation instead of an outline to signify the Chip's boundary.
   *
   * - **Important**: do not use this prop if you don't have to. Only elevate
   *   a Chip when its placement requires visual protection, such as on top of
   *   an image.
   * - Optional.
   */
  elevated?: boolean;

  /**
   * If the Chip is selected. `icon` is replaced with a checkmark if this is
   * `true`.
   *
   * - Optional.
   */
  selected?: boolean;

  /**
   * If the action the Chip accomplishes is dangerous, like deleting your
   * account. If it is, the Chip turns red (defined as `error` in the palette).
   *
   * - Optional.
   */
  dangerous?: boolean;

  /**
   * Disable the Chip and signify loading status. `onClick` and `href` will
   * have no effect.
   *
   * - Optional.
   */
  loading?: boolean;

  /**
   * Turns the Chip gray and blocks any action associated with it. `onClick`
   * and `href` will have no effect.
   *
   * - Optional.
   */
  disabled?: boolean;

  /**
   * The function called when the user interacts with the Chip, similar to
   * `onClick` on `<button>`.
   */
  onClick?: () => any;

  /**
   * The URL of the page this Chip leads to, similar to `href` on `<a>`.
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
 * The base Chip component shared by all chip types. Not exported — use Filter
 * Chip, Suggestion Chip, Assist Chip, or Input Chip instead.
 *
 * @private
 */
export const Chip: StyleableFC<ChipProps> = ({
  children,
  icon,
  trailing,
  tooltip,
  elevated,
  selected,
  dangerous,
  loading,
  disabled,
  onClick,
  href,
  element = onClick || href ? "button" : "div",
  style,
  className,
}) => {
  const isFunctional = !(disabled || loading);

  return (
    <Interactive
      onClick={isFunctional ? onClick : undefined}
      href={isFunctional ? href : undefined}
      element={element}
      aria-disabled={!isFunctional}
      title={tooltip}
      className={cn(
        "skc-chip",
        elevated && "skc-chip--elevated",
        selected && "skc-chip--selected",
        dangerous && "skc-chip--dangerous",
        className,
      )}
      style={style}
    >
      {/* Icon */}
      {selected ? <MaterialIcon icon="done" /> : icon}

      {/* Label */}
      <Text type="label-large" className="skc-chip__label">
        {children}
      </Text>

      {trailing}
    </Interactive>
  );
};
