"use client";

import { Interactive } from "@/components/Interactive";
import { useMenuContext } from "@/components/Menu";
import { useSelectContext } from "@/contexts/SelectContext";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type {
  ActionableProps,
  ElementCustomizableProps,
  StyleableFC,
} from "@/lib/types";
import "@suankularb-components/css/menu-item.css";
import type { ElementType, ReactElement, ReactNode } from "react";

/**
 * Props for {@link MenuItem Menu Item}.
 */
export interface MenuItemProps
  extends ActionableProps, ElementCustomizableProps {
  /**
   * The text displayed inside the Menu Item.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * An icon can appear before the text (`children`) in a Menu Item. In a long
   * Menu, icons can quickly orient users.
   *
   * - If one Menu Item in a Menu has an icon, the rest should have one too.
   * - You are encouraged to use Material Icon as the value for `icon`.
   * - Optional.
   */
  icon?: ReactElement;

  /**
   * A message shown in a tooltip when the user hovers over the Menu Item.
   *
   * - Optional.
   */
  metadata?: ReactNode;

  /**
   * If this Menu Item is selected in a dropdown Menu.
   *
   * - Optional.
   */
  selected?: boolean;

  /**
   * If the action the Menu Item accomplishes is dangerous, like deleting your
   * account. If it is, the Menu Item turns red (defined as `error` in the
   * palette).
   *
   * - Optional.
   */
  dangerous?: boolean;

  /**
   * Turns the Menu Item text gray and blocks any action associated with it.
   * `onClick` and `href` will have no effect.
   *
   * - Learn how to make disabled elements less frustrating.
   * - Optional.
   */
  disabled?: boolean;

  /**
   * The value of a Select item, similar to `value` on `<option>`.
   *
   * - **Important:** this is intended to be used only when the Menu Item is
   *   inside a Select. This prop is not functional otherwise.
   * - Optional.
   */
  value?: string;

  /**
   * The element to use as the container of the Menu Item.
   *
   * - Defaults to `<li>`.
   * - Optional.
   */
  containerElement?: ElementType;
}

/**
 * An action/option inside a temporary list.
 *
 * @param children The text displayed inside the Menu Item.
 * @param icon An icon can appear before the text (`children`) in a Menu Item.
 * @param metadata A message shown in a tooltip when the user hovers over the Menu Item.
 * @param selected If this Menu Item is selected in a dropdown Menu.
 * @param dangerous If the action the Menu Item accomplishes is dangerous, like deleting your account.
 * @param disabled Turns the Menu Item text gray and blocks any action associated with it.
 * @param value The value of a Select item, similar to `value` on `<option>`.
 * @param containerElement The element to use as the container of the Menu Item.
 *
 * @see {@link https://sk-components-demo.mysk.school/docs/overlays/menu-item Menu Item documentation}
 */
export const MenuItem: StyleableFC<MenuItemProps> = ({
  children,
  icon,
  metadata,
  selected,
  dangerous,
  disabled,
  value,
  containerElement: ContainerElement = "li",
  command,
  commandfor,
  onClick,
  href,
  element = href ? "a" : "button",
  style,
  className,
}) => {
  const selectContext = useSelectContext();
  const menuContext = useMenuContext();

  // ––– Command resolution –––––––––––––––––––––––––––––––––––––––––––––––––––—

  // Auto-resolve commandfor from parent Menu context, and use animated
  // close for hide-popover (instead of calling hidePopover() directly,
  // which would skip the exit animation).
  let resolvedCommand = command;
  let resolvedCommandFor = commandfor;
  let resolvedOnClick = onClick;

  const clearCommand = () => {
    resolvedCommand = undefined;
    resolvedCommandFor = undefined;
  };

  if (menuContext && command && !commandfor) {
    if (command === "hide-popover") {
      // Use the context's close() for animated exit. Chain with the
      // consumer's onClick if provided.
      clearCommand();
      resolvedOnClick = () => {
        onClick?.();
        menuContext.close();
      };
    } else {
      // Auto-fill commandfor for other commands (e.g. show-modal,
      // show-popover targeting an element inside the Menu trigger area).
      resolvedCommandFor = menuContext.menuID;
    }
  }

  // If the Menu Item is an option in a Select, call the Select's onChange() and
  // close the Menu when clicked.
  if (selectContext && value && !(command || commandfor)) {
    resolvedOnClick = () => {
      onClick?.();
      selectContext.onChange(value);
      menuContext?.close();
    };
  }

  // If the Menu Item is disabled, clear `command` and `onClick` to prevent any
  // action.
  if (disabled) {
    clearCommand();
    resolvedOnClick = undefined;
  }

  // ––– ARIA role resolution ––––––––––––––––––––––––––––––––––––––––––––––––––

  // Menu Items are `role="menuitem"` by default.
  let role = "menuitem";
  let isSelected = selected;

  // In a Select, Menu Items are `role="option"` and `aria-selected` is used.
  if (selectContext && value !== undefined) {
    role = "option";
    isSelected = value === selectContext?.value;
  }
  // In a Menu with selectable items, Menu Items are `role="menuitemradio"` and
  // `aria-checked` is used.
  else if (selected !== undefined) {
    role = "menuitemradio";
    isSelected = selected ?? false;
  }

  // ––– Render –––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––––—

  return (
    // Inside a listbox or Menu, the container’s implicit listitem role is
    // invalid — both roles only permit item, group, and separator children — so
    // it is hidden from assistive technologies.
    <ContainerElement role={menuContext ? "none" : undefined}>
      <Interactive
        role={role}
        {...new Map([
          ["option", { "aria-selected": isSelected }],
          ["menuitemradio", { "aria-checked": isSelected }],
        ]).get(role)}
        data-value={value}
        aria-disabled={disabled}
        // Inside a Menu, focus is managed by the Menu (moved in on open, then
        // with arrow keys), so Menu Items stay out of the tab order.
        tabIndex={menuContext ? -1 : undefined}
        href={href}
        onClick={resolvedOnClick}
        command={resolvedCommand}
        commandfor={resolvedCommandFor}
        element={element}
        className={cn(
          "skc-menu-item",
          isSelected && "skc-menu-item--selected",
          dangerous && "skc-menu-item--dangerous",
          className,
        )}
        style={style}
      >
        {icon && <div className="skc-menu-item__icon">{icon}</div>}
        <Text type="body-large" className="skc-menu-item__label">
          {children}
        </Text>
        {metadata && (
          <Text type="body-large" className="skc-menu-item__metadata">
            {metadata}
          </Text>
        )}
      </Interactive>
    </ContainerElement>
  );
};
