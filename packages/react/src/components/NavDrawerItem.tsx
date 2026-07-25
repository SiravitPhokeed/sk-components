"use client";

import { Interactive } from "@/components/Interactive";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import { invoker } from "@/lib/helpers/invoker";
import type {
  ActionableProps,
  ElementCustomizableProps,
  StyleableFC,
} from "@/lib/types";
import "@suankularb-components/css/nav-drawer-item.css";
import type { ReactElement, ReactNode } from "react";
import { useRef } from "react";

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
  icon: ReactElement;

  /**
   * The title of the destination page.
   *
   * - Always required.
   */
  label: ReactNode;

  /**
   * Some text aligned to the right of a Navigation Drawer Item. This is useful
   * for example, displaying the number of new messages.
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
 * A destination in a Navigation Drawer. Always place inside a Navigation Drawer
 * Section.
 *
 * @param icon Icons help users identify pages more quickly.
 * @param label The title of the destination page.
 * @param metadata Some text aligned to the right of a Navigation Drawer Item.
 * @param tooltip A message shown in a tooltip when the user hovers over the Navigation Drawer Item.
 * @param selected Highlights the Navigation Drawer Item.
 *
 * @see https://sk-components-demo.mysk.school/docs/layout/nav-drawer-item
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
  // Invoker Commands are ignored on `<a>` elements. Imperatively close the
  // Navigation Drawer (or synthesize the consumer-provided command) when the
  // user clicks on a Navigation Drawer Item.
  const containerRef = useRef<HTMLLIElement>(null);
  const handleClick = () => {
    onClick?.();
    const container = containerRef.current;
    if (command && commandfor) {
      const root = container?.getRootNode() as Document | ShadowRoot;
      invoker.synthesize(command, commandfor, root);
      return;
    }
    const navDrawer = container?.closest(
      "#nav-drawer",
    ) as HTMLDialogElement | null;
    navDrawer?.requestClose?.();
  };

  return (
    <li ref={containerRef}>
      <Interactive
        aria-current={selected ? "page" : undefined}
        title={tooltip}
        command={command}
        commandfor={commandfor}
        onClick={handleClick}
        href={href}
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
