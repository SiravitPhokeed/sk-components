"use client";

import { Interactive } from "@/components/Interactive";
import { MaterialIcon } from "@/components/MaterialIcon";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/toggle-button.css";
import type { ElementType, JSX } from "react";

/**
 * Props for {@link ToggleButton Toggle Button}.
 */
export interface ToggleButtonProps {
  /**
   * The appearance of the Toggle Button.
   *
   * Each appearance has a priority. For example, in a video conference
   * application, the end call button has higher priority than the raise hand
   * button. In this case, the end call is "filled," and the raise hand is
   * "outlined."
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
   * - You are encouraged to use {@link MaterialIcon Material Icons} as the
   *   value for `icon`.
   * - Always required, as a Toggle Button cannot be empty.
   */
  icon: JSX.Element;

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
   * - Always required, just in case the icon is not clear enough for the user
   *   to infer its action.
   */
  tooltip: string;

  /**
   * If the action the Toggle Button accomplishes is dangerous, like unmuting.
   * If it is, the Toggle Button turns red (defined as `error` in the palette).
   *
   * - Optional.
   */
  dangerous?: boolean;

  /**
   * Turns the Toggle Button gray and blocks any action associated with it.
   * `onChange` will have no effect.
   * {@link https://codium.one/index.php/en/blog/77-disabled-buttons-don-t-have-to-suck Learn when to disable something.}
   *
   * - Optional.
   */
  disabled?: boolean;

  /**
   * Whether the Toggle Button is toggled on or off. This is useful if you want
   * a controlled input.
   *
   * - Optional.
   *
   * @see {@link https://reactjs.org/docs/forms.html#controlled-components React documentation on controlled input}
   */
  value?: boolean;

  /**
   * This function triggers when the user toggles the Toggle Button.
   *
   * - Optional.
   *
   * @param state Whether the Toggle Button is toggled on or off.
   */
  onChange?: (state: boolean) => void;

  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

/**
 * A Button with just an icon that can be toggled on and off.
 *
 * @param appearance The appearance of the Toggle Button.
 * @param icon A Toggle Button's action is only communicated via its icon, so keep the icon clear.
 * @param alt A description of the Toggle Button for screen readers, similar to `alt` on `<img>`.
 * @param tooltip A message shown in a tooltip when the user hovers over the Toggle Button.
 * @param dangerous If the action the Toggle Button accomplishes is dangerous, like unmuting.
 * @param disabled Turns the Toggle Button gray and blocks any action associated with it.
 * @param value Whether the Toggle Button is toggled on or off.
 * @param onChange This function triggers when the user toggles the Toggle Button.
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
  return (
    <Interactive
      element={element}
      onClick={onChange && !disabled ? () => onChange(!value) : undefined}
      // We're using `aria-disabled` instead of `disabled` because it does
      // not disable tabbing in, which is better for accessibility.
      aria-disabled={disabled}
      aria-pressed={value}
      aria-label={alt}
      title={tooltip}
      style={style}
      className={cn(
        "skc-toggle-button",
        `skc-toggle-button--${appearance}`,
        value && "skc-toggle-button--selected",
        dangerous && "skc-toggle-button--dangerous",
        className,
      )}
    >
      {icon}
    </Interactive>
  );
};
