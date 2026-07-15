"use client";

import { useFormgroupContext } from "@/components/FormGroup";
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
 */
export const Radio: StyleableFC<RadioProps> = ({
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
  const name = formGroupContext?.name;

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
          name={name}
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
