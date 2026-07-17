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
   * - Should mostly contain Menu Items and optionally Dividers.
   * - Always required.
   */
  children: ReactNode;

  /**
   * The ID of the popover element, for Invoker Commands API support.
   *
   * - Use with `command="show-popover"` and `commandfor={id}` on a trigger
   *   button to open the Menu declaratively via the Invoker Commands API.
   * - Menu Items inside this Menu will automatically use this ID for their
   *   `commandfor` when they have a `command` but no explicit `commandfor`.
   * - Optional. Defaults to an auto-generated ID.
   */
  id?: string;

  /**
   * A descriptive name for the Menu, read by screen readers when focus moves
   * into the Menu.
   *
   * - Set this when the Menu’s purpose isn’t clear from its trigger, or when
   *   multiple Menus exist in the same context.
   * - Optional.
   */
  label?: string;

  /**
   * The anchor name (dashed-ident) for CSS Anchor Positioning.
   *
   * - When inside an `<Anchor>`, this is auto-resolved from context — no
   *   need to set it.
   * - When outside an `<Anchor>`, set this to the same name used on the
   *   Anchor element (e.g. `anchor="--menu-trigger"`).
   * - Optional.
   */
  anchor?: string;

  /**
   * If the Menu is open and shown.
   *
   * - When provided, the Menu is controlled: the consumer must
   *   call `onClose` on dismiss and set `open` to `false`.
   * - When omitted, use `id` together with a trigger button that has
   *   `command="show-popover"` and `commandfor={id}`.
   * - Optional.
   */
  open?: boolean;

  /**
   * A lower number means a more dense interface. In this case, less height.
   *
   * - Must be an integer: 0, -2, or -4.
   * - Optional.
   */
  density?: 0 | -2 | -4;

  /**
   * The function triggered when the backdrop is clicked or Escape is pressed.
   *
   * - In controlled mode (`open` is provided), the consumer should set
   *   `open` to `false` in response.
   */
  onClose?: () => void;
}

/**
 * Menus show a list of actions or options in a popover that appears next to a
 * trigger element.
 *
 * @param children Menu Items and other content inside the Menu.
 * @param id The ID of the popover element, for Invoker Commands API support.
 * @param label A descriptive name for the Menu, read by screen readers when focus moves into the Menu.
 * @param anchor The anchor name (dashed-ident) for CSS Anchor Positioning.
 * @param open If the Menu is open and shown.
 * @param density A lower number means a more dense interface. In this case, less height.
 * @param onClose The function triggered when the backdrop is clicked or Escape is pressed.
 */
export const Menu: StyleableFC<MenuProps> = ({
  children,
  id: requestedId,
  label,
  anchor,
  open,
  density,
  onClose,
  element: Element = "ul",
  style,
  className,
}) => {
  const generatedId = useId();
  const menuID = requestedId ?? `menu-${generatedId}`;

  const ref = useRef<HTMLUListElement>(null);

  const anchorContext = useAnchorContext();

  // Resolve position-anchor: explicit prop wins over context.
  const positionAnchor = anchor ?? anchorContext?.anchorName;

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

  /** Gets the focusable (non-disabled) Menu Items inside the Menu. */
  const getItems = () =>
    Array.from(
      ref.current?.querySelectorAll<HTMLElement>(
        '.skc-menu-item:not([aria-disabled="true"])',
      ) ?? [],
    );

  // Manage focus per the ARIA menu pattern: focus moves onto the first Menu
  // Item when the Menu opens and returns to the trigger when it closes.
  const returnFocusRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const popover = ref.current;
    if (!popover) return;

    const handleToggle = (event: Event) => {
      if ((event as ToggleEvent).newState === "open") {
        // Remember the trigger to return focus to on close.
        const active = document.activeElement;
        returnFocusRef.current =
          active instanceof HTMLElement && !popover.contains(active)
            ? active
            : null;
        getItems()[0]?.focus();
      } else {
        // Only return focus if it was lost when the Menu closed, not if the
        // user has moved it elsewhere (e.g. by clicking another control).
        const active = document.activeElement;
        if (!active || active === document.body || popover.contains(active))
          returnFocusRef.current?.focus();
        returnFocusRef.current = null;
      }
    };

    popover.addEventListener("toggle", handleToggle);
    return () => popover.removeEventListener("toggle", handleToggle);
  }, []);

  return (
    <MenuContext.Provider value={{ menuID, close }}>
      <Element
        id={menuID}
        ref={ref}
        popover="manual"
        role="menu"
        aria-label={label}
        onKeyDown={(event: React.KeyboardEvent) => {
          // Tab is not part of the menu pattern — close the Menu and let
          // focus move on from it.
          if (event.key === "Tab") {
            close();
            return;
          }

          if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(event.key))
            return;
          const items = getItems();
          if (!items.length) return;
          event.preventDefault();

          // Move focus between Menu Items, wrapping around at both ends.
          const index = items.indexOf(document.activeElement as HTMLElement);
          (event.key === "ArrowDown"
            ? items[(index + 1) % items.length]
            : event.key === "ArrowUp"
              ? items[
                  index < 0
                    ? items.length - 1
                    : (index - 1 + items.length) % items.length
                ]
              : event.key === "Home"
                ? items[0]
                : items[items.length - 1]
          )?.focus();
        }}
        {...popoverProps}
        className={cn(
          "skc-menu",
          density &&
            (density < 0
              ? `skc-menu--density-[${density}]`
              : `skc-menu--density-${density}`),
          className,
        )}
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
