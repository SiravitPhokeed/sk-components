"use client";

import { Interactive } from "@/components/Interactive";
import cn from "@/lib/helpers/cn";
import type {
  ActionableProps,
  ElementCustomizableProps,
  StyleableFC,
} from "@/lib/types";
import "@suankularb-components/css/chip.css";
import type { ElementType, ReactNode } from "react";

/**
 * Props shared by all chip types.
 *
 * @private
 */
export interface ChipProps extends ActionableProps, ElementCustomizableProps {
  /**
   * A unique identifier for the Chip.
   *
   * - Optional.
   */
  id?: string;

  /**
   * The full content of the Chip — leading elements, label, and trailing
   * elements.
   *
   * - Always required.
   */
  children: ReactNode;

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
   * If the Chip is selected.
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
}

/**
 * The base Chip component shared by all chip types. Provides the Interactive
 * shell, BEM classes, and state management. Consumers compose their own
 * leading content, label, and trailing content via {@link children `children`}.
 *
 * Not exported — use Filter Chip, Suggestion Chip, Assist Chip, or Input Chip
 * instead.
 *
 * @private
 */
export const Chip: StyleableFC<ChipProps> = ({
  children,
  tooltip,
  elevated,
  selected,
  dangerous,
  loading,
  disabled,
  command,
  commandfor,
  onClick,
  href,
  element = onClick || href || command ? "button" : "div",
  style,
  className,
}) => {
  const isFunctional = !(disabled || loading);
  const isInteractive =
    onClick ||
    href ||
    (["button", "a"] as ElementType[]).includes(element) ||
    command !== undefined;
  const Element = isInteractive ? Interactive : element;

  return (
    <Element
      {...(isFunctional && { onClick, href })}
      {...(isInteractive && { element, command, commandfor })}
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
      {children}
    </Element>
  );
};
