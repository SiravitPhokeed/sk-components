"use client";

import { Button } from "@/components/Button";
import { Chip } from "@/components/Chip";
import { MaterialIcon } from "@/components/MaterialIcon";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type {
  ActionableProps,
  CommandProps,
  ElementCustomizableProps,
  StyleableFC,
} from "@/lib/types";
import "@suankularb-components/css/input-chip.css";
import type { ReactElement, ReactNode } from "react";

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
  avatar?: ReactElement;

  /**
   * An icon can appear before the text in an Input Chip. In a page with many
   * chips, icons can quickly orient users.
   *
   * - You are encouraged to use {@link MaterialIcon Material Icon} as the
   *   value for `icon`.
   * - Incompatible with {@link avatar `avatar`}.
   * - Optional.
   */
  icon?: ReactElement;

  /**
   * A message shown in a tooltip when the user hovers over the Input Chip.
   *
   * - Optional.
   */
  tooltip?: string;

  /**
   * If the Input Chip is selected. {@link avatar `avatar`} or
   * {@link icon `icon`} is replaced with a checkmark if this is `true`.
   *
   * - Optional.
   */
  selected?: boolean;

  /**
   * Allows for translation of the accessibility labels.
   *
   * - Must be `en-US` or `th`.
   * - Optional.
   *
   * @default "en-US"
   */
  locale?: "en-US" | "th";

  /**
   * The command the delete button sends to the element specified in
   * {@link deleteCommandfor `deleteCommandfor`}.
   *
   * - Optional.
   */
  deleteCommand?: CommandProps["command"];

  /**
   * The element the delete button sends the command specified in
   * {@link deleteCommand `deleteCommand`} to.
   *
   * - Optional.
   */
  deleteCommandfor?: CommandProps["commandfor"];

  /**
   * Called when the user clicks the delete button.
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
 * Input Chips appear in a {@link ChipSet Chip Set} or
 * {@link ChipField Chip Field}.
 *
 * @param children The text displayed inside the chip.
 * @param avatar An avatar is placed before all content in an Input Chip.
 * @param icon An icon can appear before the text in an Input Chip.
 * @param tooltip A message shown in a tooltip when the user hovers over the Input Chip.
 * @param selected If the Input Chip is selected.
 * @param locale Allows for translation of the accessibility labels.
 * @param onDelete Called when the user clicks the delete button.
 * @param deleteCommand The command the delete button sends to the element specified in
 *   `deleteCommandfor`.
 * @param deleteCommandfor The element the delete button sends the command specified in
 *   `deleteCommand` to.
 */
export const InputChip: StyleableFC<InputChipProps> = ({
  children,
  avatar,
  icon,
  tooltip,
  selected,
  locale = "en-US",
  command,
  commandfor,
  onClick,
  href,
  onDelete,
  deleteCommand,
  deleteCommandfor,
  element,
  style,
  className,
}) => (
  <Chip
    tooltip={tooltip}
    selected={selected}
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
    ) : (
      // Icon (or checkmark when selected)
      (selected || icon) && (
        <div className="skc-chip__icon">
          {selected ? <MaterialIcon icon="done" /> : icon}
        </div>
      )
    )}

    {/* Label */}
    <Text type="label-large" className="skc-chip__label">
      {children}
    </Text>

    {/* Delete button */}
    {(deleteCommand || deleteCommandfor || onDelete) && (
      <span
        // Prevent the chip’s onClick from firing when the delete button is
        // clicked.
        onClick={(e) => e.stopPropagation()}
      >
        <Button
          appearance="text"
          className="skc-chip__trailing-button"
          alt={
            typeof children === "string"
              ? `${STRINGS[locale].remove}: ${children}`
              : STRINGS[locale].remove
          }
          icon={<MaterialIcon icon="close" />}
          onClick={onDelete}
          command={deleteCommand}
          commandfor={deleteCommandfor}
        />
      </span>
    )}
  </Chip>
);
