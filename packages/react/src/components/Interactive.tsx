"use client";

import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/interactive.css";
import type { ComponentProps, ElementType, ReactNode } from "react";
import { useRef, useState } from "react";

export interface InteractiveProps {
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
   * Show an ink ripple effect, a soft-edge translucent circle, radiating out
   * of the click/tap position every click/tap to signify interactivity.
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

  /**
   * The command to send to the element specified in {@link commandfor `commandfor`}.
   *
   * - Optional.
   */
  command?:
    | "show-modal"
    | "close"
    | "request-close"
    | "show-popover"
    | "hide-popover"
    | "toggle-popover"
    | `--${string}`;

  /**
   * The element to send the command specified in {@link command `command`} to.
   *
   * - Optional.
   */
  commandfor?: string;

  /**
   * The function called when the user interacts with the content, similar to
   * `onClick` on `<button>`.
   *
   * - Optional.
   */
  onClick?: () => any;

  /**
   * The URL of the page the content leads to, similar to `href` on `<a>`.
   *
   * - Optional.
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
 * Indicates interactivity with a state layer and a ripple effect.
 *
 * @param children The content to make interactive.
 * @param stateLayerEffect Show a state layer on top of the content that reacts in color to hover and focus to signify its interactivity.
 * @param rippleEffect Show an ink ripple effect, a soft-edge translucent circle, radiating out of the click/tap position every click/tap to signify interactivity.
 * @param shadowEffect Elevates the content on hover and focus to signify its interactivity.
 * @param command The command to send to the element specified in `commandfor`.
 * @param commandfor The element to send the command specified in `command` to.
 * @param onClick The function called when the user interacts with the content, similar to `onClick` on `<button>`.
 * @param href The URL of the page the content leads to, similar to `href` on `<a>`.
 */
export const Interactive: StyleableFC<
  InteractiveProps & ComponentProps<"button" | "a">
> = ({
  children,
  stateLayerEffect,
  rippleEffect,
  shadowEffect,
  onClick,
  href,
  element: Element = href ? "a" : onClick ? "button" : "div",
  style,
  className,
  ...props
}) => {
  const rippleContainerRef = useRef<HTMLSpanElement>(null);
  const [touched, setTouched] = useState(false);
  const isLink = href !== undefined || Element === "a";

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
      tabIndex={0}
      onClick={onClick}
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
        // Disallow ripple effect on spacebar for links, since it scrolls the
        // page instead of activating the link.
        const allowedKeys = [`Enter`, ...(!isLink ? [` `] : [])];
        if (!allowedKeys.includes(event.key) || touched) return;
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
      {...({ onClick, href, ...props } as object)}
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
