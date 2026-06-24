import { Interactive } from "@/components/Interactive";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/nav-drawer-item.css";
import type { ElementType, JSX } from "react";

/**
 * Props for {@link NavDrawerItem Navigation Drawer Item}.
 */
export interface NavDrawerItemProps {
  /**
   * Icons help users identify pages more quickly.
   *
   * - Always required.
   */
  icon: JSX.Element;

  /**
   * The title of the destination page.
   *
   * - Always required.
   */
  label?: string | JSX.Element;

  /**
   * Some text aligned to the right of a Navigation Drawer Item. This is useful
   * for, for instance, displaying the number of new messages.
   *
   * - Optional.
   */
  metadata?: string | JSX.Element;

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

  /**
   * The function called when the user interacts with the Navigation Drawer
   * Item, similar to `onClick` on `<button>`.
   *
   * - Required if `href` is not defined.
   */
  onClick?: () => any;

  /**
   * The URL of the page this Navigation Drawer Item leads to, similar to
   * `href` on `<a>`.
   *
   * - Required if `onClick` is not defined.
   */
  href?: string;

  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
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
 * @param onClick The function called when the user interacts with the Navigation Drawer Item.
 * @param href The URL of the page this Navigation Drawer Item leads to, similar to `href` on `<a>`.
 */
export const NavDrawerItem: StyleableFC<NavDrawerItemProps> = ({
  icon,
  label,
  metadata,
  tooltip,
  selected,
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
        element={element}
        className={cn(
          "skc-nav-drawer-item",
          selected && "skc-nav-drawer-item--selected",
          className,
        )}
        style={style}
      >
        {icon}
        <Text
          type="label-large"
          className="skc-nav-drawer-item__label"
          element="span"
        >
          {label}
        </Text>
        {metadata && (
          <Text
            type="label-large"
            className="skc-nav-drawer-item__metadata"
            element="span"
          >
            {metadata}
          </Text>
        )}
      </Interactive>
    </li>
  );
};
