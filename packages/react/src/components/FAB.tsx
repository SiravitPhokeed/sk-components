"use client";

import { Interactive } from "@/components/Interactive";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { ActionableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/fab.css";
import type { ReactElement, ReactNode } from "react";

/**
 * Props for {@link FAB}.
 */
export interface FABProps extends ActionableProps {
  /**
   * The text displayed inside the FAB.
   *
   * - Must be a string or a React Element.
   * - Incompatible with `size`.
   * - Optional.
   */
  children?: ReactNode;

  /**
   * The color of the FAB.
   *
   * - Must be `surface`, `primary`, `secondary`, or `tertiary`. These colors
   *   are defined in the palette.
   * - Always required.
   */
  color: "surface" | "primary" | "secondary" | "tertiary";

  /**
   * How large/small the FAB is.
   *
   * - Must be `small`, `standard`, or `large`.
   * - Defaults to `standard`.
   * - Incompatible with `children`.
   */
  size?: "small" | "standard" | "large";

  /**
   * The icon displayed inside the FAB or alongside the label.
   *
   * - You are encouraged to use [Material Icon](/docs/data/material-icon) as the value for `icon`.
   * - Always required.
   */
  icon: ReactElement;

  /**
   * A description of the FAB for screen readers, similar to `alt` on `<img>`.
   *
   * - Required if the FAB just includes `icon` and has no `tooltip`, because an
   *   icon has no significance for screen readers.
   */
  alt?: string;

  /**
   * A message shown in a tooltip when the user hovers over the FAB.
   *
   * - Required if the FAB just includes `icon` and has no `alt`.
   */
  tooltip?: string;
}

/**
 * The Floating Action Button or FAB is the main action of a page.
 *
 * @param children The text displayed inside the FAB.
 * @param color The color of the FAB.
 * @param size How large/small the FAB is.
 * @param icon The icon displayed inside the FAB or alongside the label.
 * @param alt A description of the FAB for screen readers, similar to `alt` on `<img>`.
 * @param tooltip A message shown in a tooltip when the user hovers over the FAB.
 */
export const FAB: StyleableFC<FABProps> = ({
  children,
  color,
  size = "standard",
  icon,
  alt,
  tooltip,
  command,
  commandfor,
  onClick,
  href,
  className,
  style,
}) => {
  return (
    <Interactive
      aria-label={alt}
      title={tooltip ?? children?.toString()}
      onClick={onClick}
      href={href}
      command={command}
      commandfor={commandfor}
      element="button"
      className={cn(
        "skc-fab",
        `skc-fab--${color}`,
        children ? "skc-fab--extended" : `skc-fab--${size}`,
        className,
      )}
      style={style}
    >
      {icon}
      {children && (
        <Text type="label-large" className="skc-fab__label">
          {children}
        </Text>
      )}
    </Interactive>
  );
};
