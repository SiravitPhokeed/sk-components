import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/dialog-header.css";
import type { ElementType, JSX } from "react";
import { useId } from "react";

/**
 * Props for {@link DialogHeader Dialog Header}.
 */
export interface DialogHeaderProps {
  /**
   * The hero icon shown above the title text (`title`).
   *
   * - You are encouraged to use Material Icons as the value for `icon`.
   * - Optional.
   */
  icon?: JSX.Element;

  /**
   * The title text. This is useful when the supporting text is long and needs
   * a summary.
   *
   * - Optional.
   */
  title?: string | JSX.Element;

  /**
   * With a title (`title`), the supporting text complements the title text
   * with more details.
   *
   * On its own, it succinctly presents the purpose of the Dialog, like
   * "Discard draft?," for a confirmation on exiting a page without saving.
   *
   * - Always required.
   */
  desc: string | JSX.Element;

  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

/**
 * The header section houses the main content of a Dialog. It should clearly and
 * succinctly communicate a Dialog's purpose, and allow the user to quickly make
 * a decision or enter information.
 *
 * @param icon The hero icon shown above the title text (`title`).
 * @param title The title text.
 * @param desc Complements the title text or succinctly presents the purpose of the Dialog.
 */
export const DialogHeader: StyleableFC<DialogHeaderProps> = ({
  icon,
  title,
  desc,
  element: Element = "div",
  style,
  className,
}) => {
  // TODO: Consume this from Dialog
  const dialogID = `dialog-${useId()}`;

  return (
    <Element style={style} className={cn("skc-dialog-header", className)}>
      {icon}
      {title && (
        <Text id={`${dialogID}-title`} type="headline-small" element="h2">
          {title}
        </Text>
      )}
      <Text id={`${dialogID}-desc`} type="body-medium">
        {desc}
      </Text>
    </Element>
  );
};
