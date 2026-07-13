"use client";

import { Interactive } from "@/components/Interactive";
import { MaterialIcon } from "@/components/MaterialIcon";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/checkbox.css";
import { useState } from "react";

/**
 * Props for {@link Checkbox}.
 */
export interface CheckboxProps extends ElementCustomizableProps {
  /**
   * The state of the Checkbox. This is useful if you want a controlled input.
   *
   * - If `tristate` is `true`, a `value` of `null` means indeterminate, which
   *   displays a dash. If not, `value` cannot be `null`.
   * - Optional.
   *
   * @see {@link https://reactjs.org/docs/forms.html#controlled-components React documention on controlled input}
   */
  value?: boolean | null;

  /**
   * This function triggers when the user toggles the Checkbox. The state is
   * passed in via the function as a boolean.
   *
   * - Optional.
   */
  onChange?: (value: boolean) => any;

  /**
   * Turns the Checkbox gray and blocks any action associated with it.
   * {@link https://codium.one/index.php/en/blog/77-disabled-buttons-don-t-have-to-suck Learn when to disable something.}
   *
   * - Optional.
   */
  disabled?: boolean;

  /**
   * Allows the Checkbox to have 3 states: off, on, and indeterminate.
   *
   * - Optional.
   */
  tristate?: boolean;
}

/**
 * A choice from a multi-select set of choices. When alone, a Checkbox is
 * usually used for acknowledgement of or agreement to something, like a terms
 * and conditions.
 *
 * @param value The state of the Checkbox. This is useful if you want a controlled input.
 * @param onChange This function triggers when the user toggles the Checkbox.
 * @param disabled Turns the Checkbox gray and blocks any action associated with it.
 * @param tristate Allows the Checkbox to have 3 states: off, on, and indeterminate.
 */
export const Checkbox: StyleableFC<CheckboxProps> = ({
  value,
  onChange,
  tristate,
  disabled,
  element,
  className,
  style,
}) => {
  const [internalValue, setInternalValue] = useState<boolean | null>(
    value ?? false,
  );
  const resolvedValue = value ?? internalValue;
  const resolvedOnChange = onChange ?? setInternalValue;

  return (
    <Interactive
      role="checkbox"
      aria-checked={resolvedValue === null ? "mixed" : resolvedValue}
      aria-disabled={disabled}
      onClick={() => {
        if (!disabled) resolvedOnChange(!resolvedValue);
      }}
      element={element}
      className={cn(
        "skc-checkbox",
        resolvedValue === true && "skc-checkbox--selected",
        resolvedValue === null && tristate && "skc-checkbox--indeterminate",
        disabled && "skc-checkbox--disabled",
        className,
      )}
      style={style}
    >
      <div className="skc-checkbox__box">
        <div className="skc-checkbox__icon">
          {resolvedValue === true ? (
            <MaterialIcon icon="check_small" />
          ) : (
            resolvedValue === null &&
            tristate && <MaterialIcon icon="check_indeterminate_small" />
          )}
        </div>
      </div>
    </Interactive>
  );
};
