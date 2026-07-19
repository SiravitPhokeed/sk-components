"use client";

import cn from "@/lib/helpers/cn";
import { invokerCommands } from "@/lib/helpers/invokerCommands";
import type {
  ActionableProps,
  ElementCustomizableProps,
  StyleableFC,
} from "@/lib/types";
import "@suankularb-components/css/interactive.css";
import type { ComponentProps, ReactNode, RefObject } from "react";
import { useRef, useState } from "react";

export interface InteractiveProps
  extends ActionableProps, ElementCustomizableProps {
  /**
   * The content to make interactive.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * Show a state layer on top of the content that reacts in color to hover and
   * focus to signify its interactivity.
   *
   * - Enabled by default.
   * - Optional.
   *
   * @default true
   */
  stateLayerEffect?: boolean;

  /**
   * Show an ink ripple effect, a soft-edge translucent circle, radiating
   * outward from the point of each click/tap to signify interactivity.
   *
   * - Enabled by default.
   * - Optional.
   *
   * @default true
   */
  rippleEffect?: boolean;

  /**
   * Elevates the content on hover and focus to signify its interactivity.
   *
   * - Optional.
   *
   * @default false
   */
  shadowEffect?: boolean;
}

/**
 * Indicates interactivity with a state layer and a ripple effect.
 *
 * @param children The content to make interactive.
 * @param stateLayerEffect Show a state layer on top of the content that reacts in color to hover and focus to signify its interactivity.
 * @param rippleEffect Show an ink ripple effect, a soft-edge translucent circle, radiating outward from the point of each click/tap to signify interactivity.
 * @param shadowEffect Elevates the content on hover and focus to signify its interactivity.
 */
export const Interactive: StyleableFC<
  InteractiveProps &
    Omit<ComponentProps<"button" | "a">, "ref"> & {
      ref?: RefObject<HTMLDivElement | null>;
    }
> = ({
  children,
  stateLayerEffect,
  rippleEffect,
  shadowEffect,
  command,
  commandfor,
  onClick,
  href,
  onKeyDown,
  element: Element = href
    ? "a"
    : onClick || command || commandfor
      ? "button"
      : "div",
  style,
  className,
  ...props
}) => {
  const rippleContainerRef = useRef<HTMLSpanElement>(null);
  const [touched, setTouched] = useState(false);
  const isLink = href !== undefined || Element === "a";

  const isActionable =
    onClick !== undefined ||
    href !== undefined ||
    command !== undefined ||
    commandfor !== undefined;

  // Native interactive elements (and custom components, which are assumed to
  // render one) handle focus and keyboard activation themselves; generic
  // elements like `<div>` need `role`, `tabIndex`, and key handling added.
  const isNativelyInteractive =
    typeof Element !== "string" || ["button", "a"].includes(Element);

  /**
   * Call the consumer’s `onClick`, then imitate the `command` on browsers
   * without the Invoker Commands API. Browsers with support perform the
   * command themselves as the trigger’s default action, and the imitation
   * no-ops.
   *
   * @param event The mouse event, if any. Keyboard activation on generic
   *   elements calls this with no event.
   */
  function handleClick(event?: React.MouseEvent) {
    // The `button | a` union makes the consumer handler demand an
    // intersection event type; the runtime event is always correct for
    // whichever element was rendered.
    (onClick as ((event?: React.MouseEvent) => any) | undefined)?.(event);
    if (!(command && commandfor) || event?.defaultPrevented) return;
    invokerCommands.synthesize(
      command,
      commandfor,
      // The ripple container is always rendered inside the element, so its
      // root node is correct when keyboard activation provides no event.
      ((event?.currentTarget ?? rippleContainerRef.current)?.getRootNode() ??
        document) as Document | ShadowRoot,
    );
  }

  /**
   * Get the position of the ripple relative to the ripple container.
   *
   * @param clientX The x-coordinate of the mouse/touch event.
   * @param clientY The y-coordinate of the mouse/touch event.
   *
   * @returns The x and y coordinates of the ripple.
   */
  function getRipplePosition({
    clientX,
    clientY,
  }: Pick<Touch, "clientX" | "clientY">) {
    const rect = rippleContainerRef.current?.getBoundingClientRect();
    if (!rect) return [0, 0];
    return [clientX - rect.left, clientY - rect.top];
  }

  /**
   * Create a ripple effect at the given position.
   *
   * @param x The x-coordinate of the ripple.
   * @param y The y-coordinate of the ripple.
   */
  function startRipple(x: number, y: number) {
    if (rippleEffect === false) return;

    const rippleContainer = rippleContainerRef.current;
    if (!rippleContainer) return;

    const ripple = document.createElement(`span`);
    ripple.className = `skc-interactive__ripple`;
    rippleContainer.appendChild(ripple);

    const rect = rippleContainer.getBoundingClientRect();
    const diameter = Math.max(rect.width, 80);
    const blurRadius = Math.max(Math.round(rect.width / 10), 4);

    ripple.style.left = x - diameter / 2 + `px`;
    ripple.style.top = y - diameter / 2 + `px`;
    ripple.style.width = diameter + `px`;
    ripple.style.transform = `scale(4)`;
    ripple.style.filter = `blur(${blurRadius}px)`;
  }

  /**
   * Remove all ripples.
   */
  function endRipple() {
    const rippleContainer = rippleContainerRef.current;
    if (!rippleContainer) return;

    const ripples = rippleContainer.querySelectorAll(`span`);
    for (const ripple of ripples) {
      ripple.style.opacity = `0`;
      setTimeout(() => {
        ripple.remove();
        setTouched(false);
      }, 500);
    }
  }

  return (
    <Element
      // Native elements are focusable and announce their own role; generic
      // elements made actionable need both filled in.
      {...(!isNativelyInteractive &&
        isActionable && { role: "button", tabIndex: 0 })}
      {...(Element === "button" && { type: "button" })}
      onTouchStart={(event: React.TouchEvent) => {
        setTouched(true);
        const touch = event.touches[0];
        const [x, y] = getRipplePosition(touch);
        startRipple(x, y);
      }}
      onTouchCancel={endRipple}
      onTouchEnd={endRipple}
      onMouseDown={(event: React.MouseEvent) => {
        // Prevent double ripples on touch devices.
        if (touched) return;
        const [x, y] = getRipplePosition(event);
        startRipple(x, y);
      }}
      onMouseUp={endRipple}
      onMouseLeave={endRipple}
      onKeyDown={(event: React.KeyboardEvent) => {
        // The `button | a` union makes the consumer handler demand an
        // intersection event type; the runtime event is always correct for
        // whichever element was rendered.
        (onKeyDown as React.KeyboardEventHandler | undefined)?.(event);
        // Disallow activation and ripple effect on spacebar for links, since
        // it scrolls the page instead of activating the link.
        const allowedKeys = [`Enter`, ...(!isLink ? [` `] : [])];
        if (!allowedKeys.includes(event.key) || event.defaultPrevented) return;

        // Native elements fire `click` on Enter/Space themselves; generic
        // elements need activation synthesized for keyboard support.
        if (!isNativelyInteractive && isActionable) {
          event.preventDefault(); // Prevent spacebar from scrolling the page.
          handleClick();
        }

        if (touched) return;
        if (!rippleContainerRef?.current) return;
        const rect = rippleContainerRef.current.getBoundingClientRect();
        startRipple(rect.width / 2, rect.height / 2);
        setTimeout(endRipple, 200);
      }}
      className={cn(
        "skc-interactive",
        stateLayerEffect === false && "skc-interactive--no-state-layer",
        shadowEffect && "skc-interactive--shadow",
        className,
      )}
      style={style}
      {...{
        onClick: onClick || (command && commandfor) ? handleClick : undefined,
        href,
        command,
        commandfor,
        ...props,
      }}
    >
      <span
        aria-hidden
        ref={rippleContainerRef}
        className="skc-interactive__ripple-layer"
      />
      {children}
    </Element>
  );
};
