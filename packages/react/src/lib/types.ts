import type { CSSProperties, ElementType, FC } from "react";

/** A function component stylable through `className` and `style`. */
export type StyleableFC<Props extends object = object> = FC<
  Props & Partial<{ className: string; style: CSSProperties }>
>;

/** Props for the HTML Invoker Commands API (`command` and `commandfor` attributes). */
export type CommandProps = {
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
};

/**
 * Props for interaction handling — what happens when the user interacts with
 * the component (callback or navigation).
 */
export type ActionableProps = CommandProps & {
  /**
   * The function called when the user interacts with the component, similar to
   * `onClick` on `<button>`.
   *
   * - Optional.
   */
  onClick?: () => any;

  /**
   * The URL of the page the component leads to, similar to `href` on `<a>`.
   *
   * - Optional.
   */
  href?: string;
};

/** Props for customizing the underlying HTML element. */
export type ElementCustomizableProps = {
  /**
   * The HTML element type used to render the component.
   *
   * - Optional.
   */
  element?: ElementType;
};
