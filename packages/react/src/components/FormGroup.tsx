"use client";

import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/form-group.css";
import type { ElementType, ReactNode } from "react";
import { createContext, useContext, useId } from "react";

const FormGroupContext = createContext<{
  name: string;
} | null>(null);

/**
 * Returns the Form Group context if inside a Form Group, or `null` otherwise.
 */
export const useFormgroupContext = () => useContext(FormGroupContext);

/**
 * Props for {@link FormGroup Form Group}.
 */
export interface FormGroupProps extends ElementCustomizableProps {
  /**
   * Form Items within this group, be it a set of options to choose from or
   * related settings in a preferences page.
   *
   * - Must only be Form Items.
   * - Always required.
   */
  children?: ReactNode;

  /**
   * The legend for the entire group.
   *
   * - Must be a string or JSX Element.
   * - Always required.
   */
  label: ReactNode;

  /**
   * The element of the underlying `<legend>` element.
   *
   * - Optional.
   */
  legendElement?: ElementType;
}

/**
 * A group of related form items, like options in a radio group.
 *
 * @param children Form Items within this group, be it a set of options to choose from or related settings in a preferences page.
 * @param label The legend for the entire field.
 * @param legendElement Change the underlying element of the legend from `<legend>` to a custom element.
 */
export const FormGroup: StyleableFC<FormGroupProps> = ({
  children,
  label,
  legendElement = "legend",
  element: Element = "fieldset",
  style,
  className,
}) => (
  <Element style={style} className={cn("skc-form-group", className)}>
    <Text
      type="title-small"
      element={legendElement}
      className="skc-form-group__label"
    >
      {label}
    </Text>
    <FormGroupContext.Provider value={{ name: `form-group-${useId()}` }}>
      {children}
    </FormGroupContext.Provider>
  </Element>
);
