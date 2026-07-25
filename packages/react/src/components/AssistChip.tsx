"use client";

import type { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type {
  ActionableProps,
  ElementCustomizableProps,
  StyleableFC,
} from "@/lib/types";
import "@suankularb-components/css/assist-chip.css";
import type { ReactElement, ReactNode } from "react";

/**
 * Props for {@link AssistChip Assist Chip}.
 */
export interface AssistChipProps
  extends ActionableProps, ElementCustomizableProps {
  /**
   * The text shown inside the Assist Chip.
   *
   * - The label should start with a verb, i.e. “_Turn on_ lights” or “_Save_
   *   to favorites.”
   * - Always required.
   */
  children: ReactNode;

  /**
   * An icon can appear before the text in an Assist Chip. In a Chip Set with
   * many chips, an icon can help the user find the right one more quickly.
   *
   * - You are encouraged to use Material Icon as the value for `icon`.
   * - Favicons and branded icons can also be used here.
   * - Optional.
   */
  icon?: ReactElement;

  /**
   * A message shown in a tooltip when the user hovers over the Assist Chip.
   *
   * - Optional.
   */
  tooltip?: string;

  /**
   * Use elevation instead of an outline to signify the Assist Chip’s boundary.
   *
   * - **Use sparingly.** Only elevate an Assist Chip when its placement
   *   requires visual protection, such as on top of an image.
   * - Optional.
   */
  elevated?: boolean;

  /**
   * If the action the Assist Chip accomplishes is dangerous, like deleting
   * your account. If it is, the Assist Chip turns red (defined as `error` in
   * the palette).
   *
   * - Optional.
   */
  dangerous?: boolean;

  /**
   * Disable the Assist Chip to signify loading status. `onClick` and `href`
   * will have no effect.
   *
   * - Optional.
   */
  loading?: boolean;

  /**
   * Turns the Assist Chip gray and blocks any action associated with it.
   * `onClick` and `href` will have no effect.
   *
   * - Optional.
   */
  disabled?: boolean;
}

/**
 * Assist Chips are similar to {@link Button Buttons} in that they help users
 * take action. The difference is a Button is persistent (doesn't change) and
 * an Assist Chip is dynamic and contextual (changes according to the context).
 *
 * Assist Chips appear in a Chip Set.
 *
 * The label of an Assist Chip should start with a verb, i.e. “_Turn on_
 * lights” or “_Save_ to favorites.”
 *
 * @param children The text shown inside the Assist Chip.
 * @param icon An icon can appear before the text in an Assist Chip.
 * @param tooltip A message shown in a tooltip when the user hovers over the Assist Chip.
 * @param elevated Use elevation instead of an outline to signify the Assist Chip’s boundary.
 * @param dangerous If the action the Assist Chip accomplishes is dangerous, like deleting your account.
 * @param loading Disable the Assist Chip to signify loading status.
 * @param disabled Turns the Assist Chip gray and blocks any action associated with it.
 */
export const AssistChip: StyleableFC<AssistChipProps> = ({
  children,
  icon,
  tooltip,
  elevated,
  dangerous,
  loading,
  disabled,
  command,
  commandfor,
  onClick,
  href,
  element = "button",
  style,
  className,
}) => (
  <Chip
    tooltip={tooltip}
    elevated={elevated}
    dangerous={dangerous}
    loading={loading}
    disabled={disabled}
    command={command}
    commandfor={commandfor}
    onClick={onClick}
    href={href}
    element={element}
    className={cn("skc-assist-chip", className)}
    style={style}
  >
    {icon && <div className="skc-chip__icon">{icon}</div>}
    <Text type="label-large" className="skc-chip__label">
      {children}
    </Text>
  </Chip>
);
