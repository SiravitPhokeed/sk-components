"use client";

import { Interactive } from "@/components/Interactive";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import { invokerCommands } from "@/lib/helpers/invokerCommands";
import type {
  ActionableProps,
  ElementCustomizableProps,
  StyleableFC,
} from "@/lib/types";
import "@suankularb-components/css/nav-bar-item.css";
import type { ReactNode } from "react";
import { useId } from "react";

/**
 * Props for {@link NavBarItem Navigation Bar Item}.
 */
export interface NavBarItemProps
  extends ActionableProps, ElementCustomizableProps {
  /**
   * Icons help users identify pages more quickly, which is crucial for
   * frequent destinations like those from the Navigation Bar.
   *
   * - If the icon is sufficiently representative of the page, a label isn't
   *   needed.
   * - Always required.
   */
  icon: ReactNode;

  /**
   * A description of the Navigation Bar Item for screen readers, similar to
   * `alt` on `<img>`.
   *
   * - Required if `label` is not defined, because an icon has no significance
   *   for screen readers.
   */
  alt?: string;

  /**
   * An additional text label underneath the icon. This is useful if the icon
   * isn't sufficiently representative of the page.
   *
   * - Optional.
   */
  label?: ReactNode;

  /**
   * A message shown in a tooltip when the user hovers over the Navigation Bar
   * Item.
   *
   * - Optional.
   */
  tooltip?: string;

  /**
   * Highlights the Navigation Bar Item. If the user is currently on this
   * page, the Navigation Bar Item should be highlighted.
   *
   * - Optional.
   */
  selected?: boolean;

  /**
   * This Navigation Bar Item will only show on the Navigation Rail visible on
   * larger screens and disappears on smaller screens. Since there can only be
   * a maximum of 5 destinations on a Navigation Bar, other destinations must
   * be hidden with `railOnly`.
   *
   * - Optional.
   */
  railOnly?: boolean;
}

/**
 * One of the destinations in a Navigation Bar.
 *
 * @param icon Icons help users identify pages more quickly, which is crucial for frequent destinations like those from the Navigation Bar.
 * @param alt A description of the Navigation Bar Item for screen readers, similar to `alt` on `<img>`.
 * @param label An additional text label underneath the icon.
 * @param tooltip A message shown in a tooltip when the user hovers over the Navigation Bar Item.
 * @param selected Highlights the Navigation Bar Item. If the user is currently on this page, the Navigation Bar Item should be highlighted.
 * @param railOnly This Navigation Bar Item will only show on the Navigation Rail visible on larger screens and disappears on smaller screens.
 */
export const NavBarItem: StyleableFC<NavBarItemProps> = ({
  icon,
  alt,
  label,
  tooltip,
  selected,
  railOnly,
  command,
  commandfor,
  onClick,
  href,
  element: Element = href ? "a" : "button",
  style,
  className,
}) => {
  const labelID = `nav-bar-${useId()}`;

  return (
    <Element
      href={href}
      aria-current={selected ? "page" : undefined}
      aria-label={!label ? alt : undefined}
      aria-labelledby={label ? labelID : undefined}
      title={tooltip}
      // `command`/`commandfor` land on the raw element here (not on
      // Interactive), so imitate the command for browsers without the Invoker
      // Commands API, same as Interactive does.
      onClick={
        onClick || (command && commandfor)
          ? (event: React.MouseEvent) => {
              onClick?.();
              if (!(command && commandfor) || event.defaultPrevented) return;
              invokerCommands.synthesize(
                command,
                commandfor,
                event.currentTarget.getRootNode() as Document | ShadowRoot,
              );
            }
          : undefined
      }
      command={command}
      commandfor={commandfor}
      className={cn(
        "skc-nav-bar-item",
        selected && "skc-nav-bar-item--selected",
        railOnly && "skc-nav-bar-item--rail-only",
        className,
      )}
      style={style}
    >
      <Interactive
        tabIndex={-1}
        element="div"
        className="skc-nav-bar-item__pill"
      >
        {icon}
      </Interactive>
      {label && (
        <Text
          id={labelID}
          type="label-medium"
          className="skc-nav-bar-item__label"
        >
          {label}
        </Text>
      )}
    </Element>
  );
};

NavBarItem.displayName = "NavBarItem";
