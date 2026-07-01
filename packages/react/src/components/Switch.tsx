"use client";

import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/switch.css";
import type { ReactNode } from "react";

/**
 * Props for {@link Switch}.
 */
export interface SwitchProps extends ElementCustomizableProps {
  /**
   * The state of the Switch. This is useful if you want a controlled input.
   *
   * - Optional.
   */
  value?: boolean;

  /**
   * This function triggers when the user toggles the switch. The state is
   * passed in via the function as a boolean.
   *
   * - Optional.
   */
  onChange?: (value: boolean) => any;

  /**
   * An icon inside the Thumb when the switch is off.
   *
   * - You are encouraged to use Material Icons as the value for `offIcon`.
   * - Optional.
   */
  offIcon?: ReactNode;

  /**
   * An icon inside the Thumb when the switch is on.
   *
   * - You are encouraged to use Material Icons as the value for `onIcon`.
   * - Optional.
   */
  onIcon?: ReactNode;

  /**
   * Turns the Switch gray and block any action associated with it.
   *
   * - Optional.
   */
  disabled?: boolean;
}

/**
 * A Switch toggles something on and off. It is usually in a Form Item. Unlike
 * Checkbox and Radio, a Switch is independent.
 *
 * @param value The state of the Switch.
 * @param onChange This function triggers when the user toggles the switch.
 * @param offIcon An icon inside the Thumb when the switch is off.
 * @param onIcon An icon inside the Thumb when the switch is on.
 * @param disabled Turns the Switch gray and block any action associated with it.
 */
export const Switch: StyleableFC<SwitchProps> = ({
  value,
  onChange,
  offIcon,
  onIcon,
  disabled,
  element: Element = "button",
  style,
  className,
}) => (
  <Element
    aria-disabled={disabled}
    aria-pressed={value}
    style={style}
    className={cn("skc-switch", value && "skc-switch--selected", className)}
    onClick={() => onChange?.(!value)}
  >
    <div className="skc-switch__handle">{value ? onIcon : offIcon}</div>
  </Element>
);
