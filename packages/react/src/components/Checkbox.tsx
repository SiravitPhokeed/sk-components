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
   */
  value?: boolean | null;

  /**
   * Called when the user toggles the Checkbox. The state is passed in via the
   * function as a boolean.
   *
   * - Optional.
   */
  onChange?: (value: boolean) => any;

  /**
   * Turns the Checkbox gray and blocks any action associated with it.
   *
   * - [Learn how to make disabled elements less frustrating.](/docs/guides/disabling-elements)
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
 * A choice from a multi-select set of choices. When used alone, a Checkbox
 * typically handles acknowledgments or agreements — like accepting terms and
 * conditions.
 *
 * @param value The state of the Checkbox. This is useful if you want a controlled input.
 * @param onChange Called when the user toggles the Checkbox.
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
