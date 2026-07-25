"use client";

import { useFormgroupContext } from "@/components/FormGroup";
import { useFormItemContext } from "@/components/FormItem";
import { Interactive } from "@/components/Interactive";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableProps } from "@/lib/types";
import "@suankularb-components/css/radio.css";
import type { ReactNode } from "react";

/**
 * Props for {@link Radio}.
 */
export interface RadioProps<
  Value extends string = string,
> extends ElementCustomizableProps {
  /**
   * The name of the Radio, used to group Radios together for form submission.
   * If not provided, falls back to the parent Form Item’s `name`, then the
   * parent Form Group’s `name`.
   *
   * - Optional.
   */
  name?: string;

  /**
   * The value submitted when this Radio is selected, similar to `value` on
   * `<input type="radio">`. Defaults to `on`.
   *
   * - Optional.
   */
  value?: Value;

  /**
   * Whether the Radio is selected. This is useful if you want a controlled
   * input.
   *
   * - Optional.
   */
  checked?: boolean;

  /**
   * Called when the user selects the Radio. The value is passed in via the
   * function.
   *
   * - Optional.
   */
  onChange?: (value: Value) => any;

  /**
   * Turns the Radio gray and blocks any action associated with it.
   *
   * - {@link https://sk-components-demo.mysk.school/docs/guides/disabling-elements Learn how to make disabled elements less frustrating.}
   * - Optional.
   */
  disabled?: boolean;
}

/**
 * A choice from a single-select set of choices. Unlike Checkbox and Switch,
 * Radio always appears in a group.
 *
 * @param name The name of the Radio, used to group Radios together for form submission.
 * @param value The value submitted when this Radio is selected, similar to `value` on `<input type="radio">`.
 * @param checked Whether the Radio is selected. This is useful if you want a controlled input.
 * @param onChange Called when the user selects the Radio. The value is passed in via the function.
 * @param disabled Turns the Radio gray and blocks any action associated with it.
 *
 * @see {@link https://sk-components-demo.mysk.school/docs/inputs/radio Radio documentation}
 */
export const Radio = <Value extends string = string>({
  name,
  value = "on" as Value,
  checked,
  onChange,
  disabled,
  element,
  className,
  style,
}: StyleableProps & RadioProps<Value>): ReactNode => {
  const formGroupContext = useFormgroupContext();
  const formItemContext = useFormItemContext();
  const formGroupName = formGroupContext?.name;
  const formItemName = formItemContext?.name;

  // Resolution: own name > Form Item > Form Group
  const resolvedName = name ?? formItemName ?? formGroupName;

  // Avoid nested <label> when inside FormItem (which is already a <label>).
  const resolvedElement =
    element ?? (formItemContext ? "div" : "label");

  return (
    <Interactive
      tabIndex={undefined}
      element={resolvedElement}
      className={cn("skc-radio", disabled && "skc-radio--disabled", className)}
      style={style}
    >
      <input
        type="radio"
        name={resolvedName}
        value={value}
        disabled={disabled}
        checked={checked}
        onChange={(event) => {
          if (!disabled && event.target.checked) onChange?.(value);
        }}
        className="skc-radio__input"
      />

      <div aria-hidden className="skc-radio__circle">
        <div className="skc-radio__marker" />
      </div>
    </Interactive>
  );
};
