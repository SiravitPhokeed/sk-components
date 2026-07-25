"use client";

import { Interactive } from "@/components/Interactive";
import { MaterialIcon } from "@/components/MaterialIcon";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/toggle-button.css";
import type { ReactElement } from "react";
import { useState } from "react";

/**
 * Props for {@link ToggleButton Toggle Button}.
 */
export interface ToggleButtonProps extends ElementCustomizableProps {
  /**
   * The appearance of the Toggle Button.
   *
   * Each appearance has a priority. For example, in a video conference
   * application, the end call Button has higher priority than the raise hand
   * button. In this case, the end call is “filled,” and the raise hand is
   * “outlined.”
   *
   * - Must be `filled`, `tonal`, `outlined`, or `standard`, from highest to
   *   lowest priority.
   * - Always required.
   */
  appearance: "filled" | "tonal" | "outlined" | "standard";

  /**
   * A Toggle Button's action is only communicated via its icon, so keep the
   * icon clear.
   *
   * - You are encouraged to use {@link MaterialIcon Material Icon} as the value for `icon`.
   * - Always required, as a Toggle Button cannot be empty.
   */
  icon: ReactElement;

  /**
   * A description of the Toggle Button for screen readers, similar to `alt` on
   * `<img>`.
   *
   * - Always required, as an icon has no significance for screen readers.
   */
  alt: string;

  /**
   * A message shown in a tooltip when the user hovers over the Toggle Button.
   *
   * - Always required, since the icon alone may not be clear enough for the user
   *   to infer the action.
   */
  tooltip: string;

  /**
   * Set to `true` if the action is destructive, such as deleting an item. When
   * `true`, the Toggle Button turns red (defined as `error` in the palette).
   *
   * - Optional.
   */
  dangerous?: boolean;

  /**
   * Turns the Toggle Button gray and blocks any action associated with it.
   * `onChange` will have no effect.
   *
   * - {@link https://sk-components-demo.mysk.school/docs/guides/disabling-elements Learn how to make disabled elements less frustrating.}
   * - Optional.
   */
  disabled?: boolean;

  /**
   * Whether the Toggle Button is toggled on or off. This is useful if you want
   * a controlled input.
   *
   * - Optional.
   */
  value?: boolean;

  /**
   * Called when the user toggles the Toggle Button. The state is passed in via
   * the function as a boolean.
   *
   * - Optional.
   */
  onChange?: (state: boolean) => void;
}

/**
 * A Button with just an icon that can be toggled on and off.
 *
 * @param appearance The appearance of the Toggle Button.
 * @param icon A Toggle Button's action is only communicated via its icon, so keep the icon clear.
 * @param alt A description of the Toggle Button for screen readers, similar to `alt` on `<img>`.
 * @param tooltip A message shown in a tooltip when the user hovers over the Toggle Button.
 * @param dangerous Set to `true` if the action is destructive, such as deleting an item. When `true`, the Toggle Button turns red (defined as `error` in the palette).
 * @param disabled Turns the Toggle Button gray and blocks any action associated with it. `onChange` will have no effect.
 * @param value Whether the Toggle Button is toggled on or off. This is useful if you want a controlled input.
 * @param onChange Called when the user toggles the Toggle Button. The state is passed in via the function as a boolean.
 *
 * @see {@link https://sk-components-demo.mysk.school/docs/inputs/toggle-button Toggle Button documentation}
 */
export const ToggleButton: StyleableFC<ToggleButtonProps> = ({
  appearance,
  icon,
  alt,
  tooltip,
  dangerous,
  disabled,
  value,
  onChange,
  element,
  style,
  className,
}) => {
  const [internalValue, setInternalValue] = useState(false);
  const resolvedValue = value ?? internalValue;
  const resolvedOnChange = onChange ?? setInternalValue;

  return (
    <Interactive
      element={element}
      onClick={() => {
        if (!disabled) resolvedOnChange(!resolvedValue);
      }}
      // We're using `aria-disabled` instead of `disabled` because it does
      // not disable tabbing in, which is better for accessibility.
      aria-disabled={disabled}
      aria-pressed={resolvedValue}
      aria-label={alt}
      title={tooltip}
      style={style}
      className={cn(
        "skc-toggle-button",
        `skc-toggle-button--${appearance}`,
        resolvedValue && "skc-toggle-button--selected",
        dangerous && "skc-toggle-button--dangerous",
        className,
      )}
    >
      {icon}
    </Interactive>
  );
};
