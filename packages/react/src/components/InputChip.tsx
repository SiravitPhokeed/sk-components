"use client";

import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { MaterialIcon } from "@/components/MaterialIcon";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type {
  ActionableProps,
  ElementCustomizableProps,
  StyleableFC,
} from "@/lib/types";
import "@suankularb-components/css/input-chip.css";
import type { JSX, ReactNode } from "react";

/**
 * Props for {@link InputChip Input Chip}.
 */
export interface InputChipProps
  extends ActionableProps, ElementCustomizableProps {
  /**
   * The text displayed inside the chip.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * An avatar is placed before all content in an Input Chip. A use case would
   * be the profile picture of a user.
   *
   * - You are encouraged to use {@link Avatar Avatar} as the value for `avatar`.
   * - Incompatible with {@link icon `icon`}.
   * - Optional.
   */
  avatar?: JSX.Element;

  /**
   * An icon can appear before the text in an Input Chip. In a page with many
   * chips, icons can quickly orient users.
   *
   * - You are encouraged to use {@link MaterialIcon Material Icons} as the
   *   value for `icon`.
   * - Incompatible with {@link avatar `avatar`}.
   * - Optional.
   */
  icon?: JSX.Element;

  /**
   * A message shown in a tooltip when the user hovers over the Input Chip.
   *
   * - Optional.
   */
  tooltip?: string;

  /**
   * Use elevation instead of an outline to signify the Input Chip's boundary.
   *
   * - **Important**: do not use this prop if you don't have to. Only elevate
   *   an Input Chip when its placement requires visual protection, such as on
   *   top of an image.
   * - Optional.
   */
  elevated?: boolean;

  /**
   * If the Input Chip is selected. {@link avatar `avatar`} or
   * {@link icon `icon`} is replaced with a checkmark if this is `true`.
   *
   * - Optional.
   */
  selected?: boolean;

  /**
   * If the action the Input Chip accomplishes is dangerous, like deleting your
   * account. If it is, the Input Chip turns red (defined as `error` in the
   * palette).
   *
   * - Optional.
   */
  dangerous?: boolean;

  /**
   * Disable the Input Chip and signify loading status. {@link onClick `onClick`},
   * {@link href `href`}, and {@link onDelete `onDelete`} will have no effect.
   *
   * - Optional.
   */
  loading?: boolean;

  /**
   * Allows for translation of the accessibility labels.
   *
   * - Must be `th` or `en-US`, as SKCom currently only support those 2
   *   languages.
   * - Optional.
   *
   * @default "en-US"
   */
  locale?: "en-US" | "th";

  /**
   * Turns the Input Chip gray and blocks any action associated with it.
   * {@link onClick `onClick`}, {@link href `href`}, and
   * {@link onDelete `onDelete`} will have no effect.
   *
   * - Optional.
   */
  disabled?: boolean;

  /**
   * Triggers when the user clicks the delete button.
   *
   * - Optional.
   */
  onDelete?: () => any;
}

const STRINGS = {
  "en-US": {
    remove: "Remove",
  },
  th: {
    remove: "ลบ",
  },
};

/**
 * A Chip displaying a piece of information entered by the user is an Input
 * Chip. This type of Chip can be added and deleted by the user.
 *
 * Like all Chips, an Input Chip appears alongside other Input Chips, but
 * these can also appear inside a text field like in Chip Field.
 *
 * @param children The text displayed inside the chip.
 * @param avatar An avatar is placed before all content in an Input Chip.
 * @param icon An icon can appear before the text in an Input Chip.
 * @param tooltip A message shown in a tooltip when the user hovers over the Input Chip.
 * @param elevated Use elevation instead of an outline to signify the Input Chip's boundary.
 * @param selected If the Input Chip is selected.
 * @param dangerous If the action the Input Chip accomplishes is dangerous.
 * @param loading Disable the Input Chip and signify loading status.
 * @param disabled Turns the Input Chip gray and blocks any action associated with it.
 * @param locale Allows for translation of the accessibility labels.
 * @param onDelete Triggers when the user clicks the delete button.
 */
export const InputChip: StyleableFC<InputChipProps> = ({
  children,
  avatar,
  icon,
  tooltip,
  elevated,
  selected,
  dangerous,
  loading,
  disabled,
  locale = "en-US",
  command,
  commandfor,
  onClick,
  href,
  onDelete,
  element,
  style,
  className,
}) => (
  <Chip
    tooltip={tooltip}
    elevated={elevated}
    selected={selected}
    dangerous={dangerous}
    loading={loading}
    disabled={disabled}
    command={command}
    commandfor={commandfor}
    onClick={onClick}
    href={href}
    element={element}
    className={cn("skc-input-chip", className)}
    style={style}
  >
    {/* Avatar (takes precedence over icon) */}
    {avatar ? (
      <div className="skc-input-chip__avatar">
        {selected ? <MaterialIcon icon="done" /> : avatar}
      </div>
    ) : /* Icon (or checkmark when selected) */
    selected ? (
      <MaterialIcon icon="done" />
    ) : (
      icon
    )}

    {/* Label */}
    <Text type="label-large" className="skc-chip__label">
      {children}
    </Text>

    {/* Delete button */}
    {onDelete && (
      <span
        // Prevent the chip's onClick from firing when the delete button is
        // clicked.
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          appearance="text"
          className="skc-chip__trailing-button"
          alt={STRINGS[locale].remove}
          icon={<MaterialIcon icon="close" />}
          onClick={onDelete}
          disabled={disabled || loading}
        />
      </span>
    )}
  </Chip>
);
