"use client";

import { useDialogContext } from "@/components/Dialog";
import { useFullscreenDialogContext } from "@/components/FullscreenDialog";
import { Interactive } from "@/components/Interactive";
import { MaterialIcon } from "@/components/MaterialIcon";
import { Progress } from "@/components/Progress";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type {
  ActionableProps,
  ElementCustomizableProps,
  StyleableFC,
} from "@/lib/types";
import "@suankularb-components/css/button.css";
import type { ReactElement, ReactNode } from "react";

/**
 * Props for {@link Button}.
 */
export interface ButtonProps extends ActionableProps, ElementCustomizableProps {
  /**
   * The text displayed inside the Button.
   *
   * - Must be a React Node, e.g., a string or an element.
   * - Required if `icon` is undefined, as a Button cannot be empty.
   */
  children?: ReactNode;

  /**
   * The appearance of the Button.
   *
   * Each appearance has a priority. For example, in a log in page, the log in
   * button has higher priority than the password recovery Button. In this
   * case, the log in Button is “filled,” and the password recovery is “text.”
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
   * - You are encouraged to use {@link MaterialIcon Material Icon} as the
   *   value for `icon`.
   * - Normally optional but required if `children` is undefined, as a Button
   *   cannot be empty.
   */
  icon?: ReactElement;

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

  /**
   * If the Button is focused when the page loads.
   *
   * - Optional.
   */
  autoFocus?: boolean;

  /**
   * If the Button is selected. `icon` is replaced with a checkmark if this is
   * true.
   *
   * - **Important:** this is intended to be used only when the Button is
   *   inside a Segmented Button. This prop will still be functional
   *   otherwise, but it is against Material guidelines.
   * - Required when inside a Segmented Button.
   */
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
   * Disable the Button and add a Progress spinner in front of
   * the text to signify loading status. `onClick` and `href` will have no
   * effect.
   *
   * - Optional.
   */
  loading?: boolean | number;

  /**
   * Turns the Button gray and blocks any action associated with it. `onClick`
   * and `href` will have no effect.
   *
   * - {@link https://sk-components-demo.mysk.school/docs/guides/disabling-elements Learn how to make disabled elements less frustrating.}
   * - Optional.
   */
  disabled?: boolean;

  /**
   * Allows for translation of the accessibility labels.
   *
   * - Must be `en-US` or `th`.
   * - Optional.
   */
  locale?: "en-US" | "th";

  /**
   * The type of the Button, similar to `type` on `<button>`.
   *
   * - Must be `submit`, `reset`, or `button`.
   * - Optional. Defaults to `button`.
   */
  type?: "submit" | "reset" | "button";
}

const STRINGS = {
  "en-US": {
    loading: "Loading…",
  },
  th: {
    loading: "กำลังโหลด",
  },
};

/**
 * Button helps users take action, whether it’s logging in, liking a post, or
 * going to a page.
 *
 * @param children The text displayed inside the Button.
 * @param appearance The appearance of the Button.
 * @param icon An icon can appear before the text (`children`) in a Button.
 * @param alt A description of the Button for screen readers, similar to `alt` on `<img>`.
 * @param tooltip A message shown in a tooltip when the user hovers over the Button.
 * @param autoFocus If the Button is focused when the page loads.
 * @param selected If the Button is selected. `icon` is replaced with a checkmark if this is true.
 * @param dangerous If the action the Button accomplishes is dangerous, like deleting your account.
 * @param loading Disable the Button and add a Progress spinner in front of the text to signify loading status.
 * @param disabled Turns the Button gray and blocks any action associated with it.
 * @param locale Allows for translation of the accessibility labels.
 * @param type The type of the Button, similar to `type` on `<button>`.
 *
 * @see {@link https://sk-components-demo.mysk.school/docs/inputs/button Button documentation}
 */
export const Button: StyleableFC<ButtonProps> = ({
  children,
  appearance,
  icon,
  alt,
  tooltip,
  autoFocus,
  selected,
  dangerous,
  loading,
  disabled,
  locale = "en-US",
  type = "button",
  command,
  commandfor,
  onClick,
  href,
  element = href ? "a" : "button",
  className,
  style,
}) => {
  const loadingBool = typeof loading === "number" || loading || false;
  const isFunctional = !(disabled || loadingBool);

  const dialogContext = useDialogContext();
  const fullscreenDialogContext = useFullscreenDialogContext();
  const { dialogID } = dialogContext ?? fullscreenDialogContext ?? {};

  return (
    <Interactive
      aria-label={alt}
      aria-disabled={!isFunctional}
      aria-pressed={selected}
      title={tooltip}
      autoFocus={autoFocus}
      onClick={isFunctional ? onClick : undefined}
      href={isFunctional ? href : undefined}
      command={command}
      commandfor={commandfor ?? (command ? dialogID : undefined)}
      shadowEffect={["filled", "tonal"].includes(appearance)}
      element={element}
      type={element === "button" ? type : undefined}
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
    >
      <Progress
        appearance="circular"
        alt={STRINGS[locale].loading}
        value={typeof loading === "number" ? loading : undefined}
        visible={loadingBool}
      />
      {selected ? <MaterialIcon icon="done" /> : icon}
      {children && (
        <Text type="label-large" className="skc-button__label">
          {children}
        </Text>
      )}
    </Interactive>
  );
};
