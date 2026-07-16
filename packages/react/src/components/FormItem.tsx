"use client";

import type { Checkbox } from "@/components/Checkbox";
import type { Radio } from "@/components/Radio";
import type { Switch } from "@/components/Switch";
import { Text } from "@/components/Text";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/form-item.css";
import type { ReactElement, ReactNode } from "react";
import { createContext, useContext } from "react";

const FormItemContext = createContext<{
  name: string;
} | null>(null);

/**
 * Returns the Form Item context if inside a Form Item, or `null` otherwise.
 */
export const useFormItemContext = () => useContext(FormItemContext);

/**
 * Props for {@link FormItem Form Item}.
 */
export interface FormItemProps extends ElementCustomizableProps {
  /**
   * The input.
   *
   * - Must be a Checkbox, Radio, or Switch.
   * - Always required.
   */
  children: ReactElement<typeof Checkbox | typeof Radio | typeof Switch>;

  /**
   * The name for the input, passed down to form controls like Checkbox, Radio,
   * and Switch via context. The child’s own `name` prop takes precedence.
   *
   * - Optional.
   */
  name?: string;

  /**
   * The label for the input.
   *
   * - Must be a React Node, e.g., a string or an element.
   * - Always required.
   */
  label: ReactNode;
}

/**
 * A wrapper for form control components like Checkbox, Radio, and Switch with
 * a label.
 *
 * @param children The input.
 * @param label The label for the input.
 * @param name The name for the input, passed down to form controls like Checkbox, Radio, and Switch via context.
 */
export const FormItem: StyleableFC<FormItemProps> = ({
  children,
  name,
  label,
  element: Element = "label",
}) => (
  <Element className="skc-form-item">
    <FormItemContext.Provider value={name ? { name } : null}>
      {children}
    </FormItemContext.Provider>
    <Text type="body-medium" className="skc-form-item__label">
      {label}
    </Text>
  </Element>
);
