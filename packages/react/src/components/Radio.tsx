"use client";

import { useFormgroupContext } from "@/components/FormGroup";
import { useFormItemContext } from "@/components/FormItem";
import { Interactive } from "@/components/Interactive";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/radio.css";
import { useState } from "react";

/**
 * Props for {@link Radio}.
 */
export interface RadioProps extends ElementCustomizableProps {
  /**
   * The ID of the Radio, passed to the underlying `<input>` element.
   *
   * - Optional.
   */
  id?: string;

  /**
   * The name of the Radio, used to group Radios together for form submission.
   * If not provided, falls back to the parent Form Item’s `name`, then the
   * parent Form Group’s `name`.
   *
   * - Optional.
   */
  name?: string;

  /**
   * The state of the Radio. This is useful if you want a controlled input.
   *
   * - Optional.
   */
  value?: boolean;

  /**
   * Called when the user toggles the Radio. The state is passed in via the
   * function as a boolean.
   *
   * - Optional.
   */
  onChange?: (value: boolean) => any;

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
 * @param value The state of the Radio. This is useful if you want a controlled input.
 * @param onChange Called when the user toggles the Radio. The state is passed in via the function as a boolean.
 * @param disabled Turns the Radio gray and blocks any action associated with it.
 * @param name The name of the Radio, used to group Radios together for form submission.
 * @param id The ID of the Radio, passed to the underlying `<input>` element.
 */
export const Radio: StyleableFC<RadioProps> = ({
  id,
  name,
  value,
  onChange,
  disabled,
  element = "label",
  className,
  style,
}) => {
  const [internalValue, setInternalValue] = useState(value ?? false);
  const resolvedValue = value ?? internalValue;
  const resolvedOnChange = onChange ?? setInternalValue;

  const formGroupContext = useFormgroupContext();
  const formItemContext = useFormItemContext();
  const formGroupName = formGroupContext?.name;
  const formItemName = formItemContext?.name;

  // Resolution: own name > Form Item > Form Group
  const resolvedName = name ?? formItemName ?? formGroupName;

  return (
    <>
      <Interactive
        tabIndex={undefined}
        element={element}
        className={cn(
          "skc-radio",
          resolvedValue && "skc-radio--selected",
          disabled && "skc-radio--disabled",
          className,
        )}
        style={style}
      >
        <input
          aria-disabled={disabled}
          type="radio"
          id={id}
          name={resolvedName}
          checked={resolvedValue}
          onChange={(event) => {
            console.log(event.target.checked);
            if (!disabled) resolvedOnChange(event.target.checked);
          }}
          className="skc-radio__input"
        />

        <div aria-hidden className="skc-radio__circle">
          <div className="skc-radio__marker" />
        </div>
      </Interactive>
    </>
  );
};
