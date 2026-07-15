"use client";

import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/switch.css";
import type { MaterialIcon } from "@/components/MaterialIcon";
import type { ReactElement } from "react";
import { useState } from "react";

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
   * Called when the user toggles the Switch. The state is passed in via the
   * function as a boolean.
   *
   * - Optional.
   */
  onChange?: (value: boolean) => any;

  /**
   * An icon inside the thumb when the Switch is off.
   *
   * - You are encouraged to use {@link MaterialIcon Material Icon} as
   *   the value for `offIcon`.
   * - Optional.
   */
  offIcon?: ReactElement;

  /**
   * An icon inside the thumb when the Switch is on.
   *
   * - You are encouraged to use {@link MaterialIcon Material Icon} as
   *   the value for `onIcon`.
   * - Optional.
   */
  onIcon?: ReactElement;

  /**
   * Turns the Switch gray and blocks any action associated with it.
   *
   * - Optional.
   */
  disabled?: boolean;
}

/**
 * A Switch toggles something on and off. It is usually in a Form Item. Unlike
 * Checkbox and Radio, a Switch is independent.
 *
 * @param value The state of the Switch. This is useful if you want a controlled input.
 * @param onChange Called when the user toggles the Switch. The state is passed in via the function as a boolean.
 * @param offIcon An icon inside the thumb when the Switch is off.
 * @param onIcon An icon inside the thumb when the Switch is on.
 * @param disabled Turns the Switch gray and blocks any action associated with it.
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
}) => {
  const [internalValue, setInternalValue] = useState(value ?? false);
  const resolvedValue = value ?? internalValue;
  const resolvedOnChange = onChange ?? setInternalValue;

  return (
    <Element
      aria-disabled={disabled}
      aria-pressed={resolvedValue}
      style={style}
      className={cn(
        "skc-switch",
        resolvedValue && "skc-switch--selected",
        className,
      )}
      onClick={() => {
        if (!disabled) resolvedOnChange(!resolvedValue);
      }}
    >
      <div className="skc-switch__handle">
        {resolvedValue ? onIcon : offIcon}
      </div>
    </Element>
  );
};
