"use client";

import { useAnchorContext } from "@/components/Anchor";
import { useAnimatedPopover } from "@/hooks/useAnimatedPopover";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/menu.css";
import type { CSSProperties, ReactNode } from "react";
import { createContext, useContext, useEffect, useId, useRef } from "react";

const MenuContext = createContext<{
  menuID: string;
  close: () => void;
} | null>(null);

/**
 * Returns the Menu context if inside a Menu, or `null` otherwise.
 */
export const useMenuContext = () => useContext(MenuContext);

const EXITING_CLASS = "skc-menu--exiting";
const EXIT_ANIMATION_NAME = "skc-menu-exit";

export interface MenuProps extends ElementCustomizableProps {
  /**
   * Menu Items and other content inside the Menu.
   *
   * - Should mostly contain Menu Items.
   * - Always required.
   */
  children: ReactNode;

  /**
   * The ID of the popover element, for Invoker Commands API support.
   *
   * - Optional. Use with `command="show-popover"` and `commandfor={id}` on a
   *   trigger button to open the Menu declaratively via the Invoker Commands
   *   API.
   * - Menu Items inside this Menu will automatically use this ID for their
   *   `commandfor` when they have a `command` but no explicit `commandfor`.
   * - Defaults to an auto-generated ID.
   */
  id?: string;

  /**
   * If the Menu is open and shown.
   *
   * - Optional. When provided, the Menu is controlled: the consumer must
   *   call `onClose` on dismiss and set `open` to `false`.
   * - When omitted, use `id` together with a trigger button that has
   *   `command="show-popover"` and `commandfor={id}`.
   */
  open?: boolean;

  /**
   * The function triggered when the backdrop is clicked or Escape is pressed.
   *
   * - In controlled mode (`open` is provided), the consumer should set
   *   `open` to `false` in response.
   */
  onClose?: () => void;

  /**
   * The anchor name (dashed-ident) for CSS Anchor Positioning.
   *
   * - When inside an {@link Anchor `<Anchor>`}, this is auto-resolved from
   *   context — no need to set it.
   * - When outside an `<Anchor>`, set this to the same name used on the
   *   Anchor element (e.g. `anchor="--menu-trigger"`).
   * - Optional.
   */
  anchor?: string;
}

/**
 * Menus display a list of choices on temporary surfaces.
 *
 * @param children Menu Items and other content inside the Menu.
 * @param id The ID of the popover element, for Invoker Commands API support.
 * @param open If the Menu is open and shown.
 * @param onClose The function triggered when the backdrop is clicked or Escape is pressed.
 * @param anchor The anchor name (dashed-ident) for CSS Anchor Positioning.
 */
export const Menu: StyleableFC<MenuProps> = ({
  children,
  id: requestedId,
  open,
  onClose,
  anchor,
  element: Element = "ul",
  style,
  className,
}) => {
  const generatedId = useId();
  const menuID = requestedId ?? `menu-${generatedId}`;

  const ref = useRef<HTMLUListElement>(null);

  const anchorContext = useAnchorContext();

  // Resolve position-anchor: explicit prop wins over context.
  const positionAnchor =
    anchor ?? anchorContext?.anchorName;

  const { close, popoverProps } = useAnimatedPopover(ref, {
    exitingClass: EXITING_CLASS,
    exitAnimationName: EXIT_ANIMATION_NAME,
    onClose,
  });

  // Controlled mode: open is provided, so we need to open/close the popover
  // when it changes.
  useEffect(() => {
    const popover = ref.current;
    if (!popover || open === undefined) return;
    if (open && !popover.matches(":popover-open")) popover.showPopover();
    else if (!open && popover.matches(":popover-open")) close();
  }, [open, close]);

  return (
    <MenuContext.Provider value={{ menuID, close }}>
      <Element
        id={menuID}
        ref={ref}
        popover="manual"
        role="menu"
        {...popoverProps}
        className={cn("skc-menu", className)}
        style={{
          positionAnchor: positionAnchor as CSSProperties["positionAnchor"],
          ...style,
        }}
      >
        {children}
      </Element>
    </MenuContext.Provider>
  );
};
