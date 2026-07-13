"use client";

import { Chip } from "@/components/Chip";
import { MaterialIcon } from "@/components/MaterialIcon";
import { Menu } from "@/components/Menu";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import useAnchorName from "@/lib/hooks/useAnchorName";
import type {
  CommandProps,
  ElementCustomizableProps,
  StyleableFC,
} from "@/lib/types";
import "@suankularb-components/css/filter-chip.css";
import type { Fragment, ReactElement, ReactNode } from "react";
import { useId } from "react";

/**
 * Props for {@link FilterChip Filter Chip}.
 */
export interface FilterChipProps
  extends CommandProps, ElementCustomizableProps {
  /**
   * The text displayed inside the chip.
   *
   * - Must be a React Node, e.g., a string or an element.
   * - Always required.
   */
  children: ReactNode;

  /**
   * An icon can appear before all content in an Filter Chip. In a page with
   * many cards, icons can quickly orient users.
   *
   * - You are encouraged to use Material Icons as the value for `icon`.
   * - Optional.
   */
  icon?: ReactElement;

  /**
   * A message shown in a tooltip when the user hovers over the Filter Chip.
   *
   * - Optional.
   */
  tooltip?: string;

  /**
   * Turns the Filter Chip into a dropdown, displaying a Menu underneath the
   * chip.
   *
   * - Must be a Fragment containing Menu Items.
   * - Optional.
   */
  menu?: ReactElement<typeof Fragment>;

  /**
   * Use elevation instead of an outline to signify the Filter Chip's boundary.
   *
   * - Important: do not use this prop if you don't have to. Only elevate an
   *   Filter Chip when its placement requires visual protection, such as on
   *   top of an image.
   * - Optional.
   */
  elevated?: boolean;

  /**
   * If the Filter Chip is selected. `icon` is replaced with a checkmark if
   * this is `true`.
   *
   * - Optional.
   */
  selected?: boolean;

  /**
   * Turns the Filter Chip gray and blocks any action associated with it.
   * `onClick` will have no effect.
   *
   * - Optional.
   */
  disabled?: boolean;

  /**
   * Triggers when the user toggles the Filter Chip on or off.
   *
   * - Optional.
   */
  onClick?: (state: boolean) => any;

  /**
   * The URL of the page this Filter Chip leads to, similar to `href` on `<a>`.
   *
   * - Optional.
   */
  href?: string;
}

/**
 * A set of Filter Chips provide product-authored options to narrow down
 * content. A Filter Chip should never appear alone and should be a child of
 * Chip Set.
 *
 * @param children The text displayed inside the chip.
 * @param icon An icon can appear before all content in an Filter Chip.
 * @param tooltip A message shown in a tooltip when the user hovers over the Filter Chip.
 * @param menu Turns the Filter Chip into a dropdown, displaying a Menu underneath the chip.
 * @param elevated Use elevation instead of an outline to signify the Filter Chip's boundary.
 * @param selected If the Filter Chip is selected.
 * @param disabled Turns the Filter Chip gray and blocks any action associated with it.
 * @param onClick Triggers when the user toggles the Filter Chip on or off.
 */
export const FilterChip: StyleableFC<FilterChipProps> = ({
  children,
  icon,
  tooltip,
  menu,
  elevated,
  selected,
  disabled,
  command,
  commandfor,
  onClick,
  href,
  element = "button",
  style,
  className,
}) => {
  const id = `chip-${useId()}`;
  const anchorName = useAnchorName();
  const menuId = `menu-${useId()}`;

  const resolvedCommand = command ?? (menu ? "show-popover" : undefined);
  const resolvedCommandFor = commandfor ?? (menu ? menuId : undefined);

  return (
    <>
      <Chip
        id={id}
        tooltip={tooltip}
        elevated={elevated}
        selected={selected}
        disabled={disabled}
        command={resolvedCommand}
        commandfor={resolvedCommandFor}
        onClick={onClick ? () => onClick(!selected) : undefined}
        href={href}
        element={element}
        className={cn("skc-filter-chip", className)}
        style={{ anchorName, ...style }}
      >
        {(selected || icon) && (
          <div className="skc-chip__icon">
            {selected ? <MaterialIcon icon="done" /> : icon}
          </div>
        )}
        <Text type="label-large" className="skc-chip__label">
          {children}
        </Text>
        {menu && (
          <MaterialIcon
            icon="arrow_drop_down"
            className="skc-filter-chip__arrow"
          />
        )}
      </Chip>

      {menu && (
        <Menu id={menuId} anchor={anchorName} density={-2}>
          {menu}
        </Menu>
      )}
    </>
  );
};
