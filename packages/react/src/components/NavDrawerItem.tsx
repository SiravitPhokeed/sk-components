"use client";

import { Interactive } from "@/components/Interactive";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type {
  ActionableProps,
  ElementCustomizableProps,
  StyleableFC,
} from "@/lib/types";
import "@suankularb-components/css/nav-drawer-item.css";
import type { ReactNode } from "react";

/**
 * Props for {@link NavDrawerItem Navigation Drawer Item}.
 */
export interface NavDrawerItemProps
  extends ActionableProps, ElementCustomizableProps {
  /**
   * Icons help users identify pages more quickly.
   *
   * - Always required.
   */
  icon: ReactNode;

  /**
   * The title of the destination page.
   *
   * - Always required.
   */
  label?: ReactNode;

  /**
   * Some text aligned to the right of a Navigation Drawer Item. This is useful
   * for, for instance, displaying the number of new messages.
   *
   * - Optional.
   */
  metadata?: ReactNode;

  /**
   * A message shown in a tooltip when the user hovers over the Navigation
   * Drawer Item.
   *
   * - Optional.
   */
  tooltip?: string;

  /**
   * Highlights the Navigation Drawer Item. If the user is currently on this
   * page, the Navigation Drawer Item should be highlighted.
   *
   * - Optional.
   */
  selected?: boolean;
}

/**
 * A destination in a Navigation Drawer. Should be a child of a Navigation
 * Drawer Section.
 *
 * @param icon Icons help users identify pages more quickly.
 * @param label The title of the destination page.
 * @param metadata Some text aligned to the right of a Navigation Drawer Item.
 * @param tooltip A message shown in a tooltip when the user hovers over the Navigation Drawer Item.
 * @param selected Highlights the Navigation Drawer Item.
 */
export const NavDrawerItem: StyleableFC<NavDrawerItemProps> = ({
  icon,
  label,
  metadata,
  tooltip,
  selected,
  command,
  commandfor,
  onClick,
  href,
  element = "a",
  style,
  className,
}) => {
  return (
    <li>
      <Interactive
        href={href}
        aria-current={selected ? "page" : undefined}
        title={tooltip}
        onClick={onClick}
        command={command}
        commandfor={commandfor}
        element={element}
        className={cn(
          "skc-nav-drawer-item",
          selected && "skc-nav-drawer-item--selected",
          className,
        )}
        style={style}
      >
        {icon}
        <Text type="label-large" className="skc-nav-drawer-item__label">
          {label}
        </Text>
        {metadata && (
          <Text type="label-large" className="skc-nav-drawer-item__metadata">
            {metadata}
          </Text>
        )}
      </Interactive>
    </li>
  );
};
