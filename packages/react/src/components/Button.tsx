"use client";

import "@suankularb-components/css/button.css";
import type { ReactNode } from "react";
import type { JSX } from "react/jsx-runtime";
import type { StyleableFC } from "@/lib/types";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";

export interface ButtonProps {
  /**
   * The text displayed inside the Button.
   *
   * - Must be a string or a JSX Element.
   * - Required if `icon` is undefined, as a Button cannot be empty.
   */
  children?: ReactNode;

  /**
   * The appearance of the Button.
   *
   * Each appearance has a priority. For example, in a log in page, the log in
   * button has higher priority than the password recovery button. In this
   * case, the log in button is “filled,” and the password recovery is “text.”
   *
   * - Must be `filled`, `tonal`, `outlined`, or `text`, from highest to lowest
   *   priority.
   * - Always required.
   */
  appearance: "filled" | "tonal" | "outlined" | "text";

  /**
   * An icon can appear before the text (`children`) in a Button. In a page
   * with many buttons, icons can quickly orient users.
   *
   * - You are encouraged to use {@link MaterialIcon Material Icons} as the value for `icon`.
   * - Normally optional but required if `children` is undefined, as a Button
   *   cannot be empty.
   */
  icon?: JSX.Element;

  /**
   * A description of the Button for screen readers, similar to `alt` on
   * `<img>`.
   *
   * - Required if the Button just includes `icon`, because an icon has no
   *   significance for screen readers.
   */
  alt?: string;

  /**
   * A message shown in a tooltip when the user hovers over the Button.
   *
   * - Optional.
   */
  tooltip?: string;

  /** @private */
  selected?: boolean;

  /**
   * If the action the Button accomplishes is dangerous, like deleting your
   * account. If it is, the Button turns red (defined as `error` in the
   * palette).
   *
   * - Optional.
   */
  dangerous?: boolean;

  /**
   * {@link disabled Disable} the Button and add a Progress spinner in front of
   * the text to signify loading status. `onClick` and `href` will have no
   * effect.
   *
   * - Optional.
   */
  loading?: boolean | number;

  /**
   * Turns the Button gray and block any action associated with it. `onClick`
   * and `href` will have no effect.
   * {@link https://codium.one/index.php/en/blog/77-disabled-buttons-don-t-have-to-suck Learn when to disable something.}
   *
   * - Optional.
   */
  disabled?: boolean;

  /**
   * Allows for translation of the accessibility labels.
   *
   * - Must be `th` or `en-US`, as SKCom currently only support those 2
   *   languages.
   * - Optional.
   */
  locale?: "en-US" | "th";

  /**
   * The function called when the user interacts with the Button, similar to
   * `onClick` on `<button>`.
   */
  onClick?: () => any;

  /**
   * The URL of the page this Button leads to, similar to `href` on `<a>`.
   */
  href?: string;
}

/**
 * Button helps users take action, whether it’s logging in, liking a post, or
 * going to a page.
 */
export const Button: StyleableFC<ButtonProps> = ({
  children,
  appearance,
  icon,
  alt,
  tooltip,
  selected,
  dangerous,
  loading,
  disabled,
  locale,
  onClick,
  href,
  className,
  style,
}) => {
  return (
    <button
      className={cn(
        "skc-button",
        `skc-button--${appearance}`,
        dangerous && "skc-button--dangerous",
        selected && "skc-button--selected",
        loading && "skc-button--loading",
        disabled && "skc-button--disabled",
        className,
      )}
      style={style}
      aria-label={alt}
      title={tooltip}
      onClick={onClick}
      disabled={disabled || typeof loading === "number" || loading === true}
    >
      {icon}
      <Text type="label-large" className="skc-button__label">
        {children}
      </Text>
    </button>
  );
};
