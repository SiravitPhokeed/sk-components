"use client";

import { useDialogContext } from "@/components/Dialog";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/dialog-header.css";
import type { ReactElement, ReactNode } from "react";

/**
 * Props for {@link DialogHeader Dialog Header}.
 */
export interface DialogHeaderProps extends ElementCustomizableProps {
  /**
   * The hero icon shown above the title text (`title`).
   *
   * - You are encouraged to use Material Icons as the value for `icon`.
   * - Optional.
   */
  icon?: ReactElement;

  /**
   * The title text. This is useful when the supporting text is long and needs
   * a summary.
   *
   * - Optional.
   */
  title?: ReactNode;

  /**
   * With a title (`title`), the supporting text complements the title text
   * with more details.
   *
   * On its own, it succinctly presents the purpose of the Dialog, like
   * "Discard draft?," for a confirmation on exiting a page without saving.
   *
   * - Always required.
   */
  desc: ReactNode;
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
  const dialogContext = useDialogContext();
  const dialogID = dialogContext?.dialogID;

  return (
    <Element className={cn("skc-dialog-header", className)} style={style}>
      {icon}
      {title && (
        <Text
          id={dialogID ? `${dialogID}-title` : undefined}
          type="headline-small"
          element="h2"
        >
          {title}
        </Text>
      )}
      <Text id={dialogID ? `${dialogID}-desc` : undefined} type="body-medium">
        {desc}
      </Text>
    </Element>
  );
};
