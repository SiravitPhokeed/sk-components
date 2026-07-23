"use client";

import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/form-group.css";
import type { ReactNode } from "react";
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
   * The name for the form group, passed down to form controls like Radio via
   * context. If not provided, a random name is generated.
   *
   * - Optional.
   */
  name?: string;

  /**
   * The legend for the entire group.
   *
   * - Must be a React Node, e.g., a string or an element.
   * - Always required.
   */
  label: ReactNode;
}

/**
 * A group of related Form Items, like options in a radio group.
 *
 * @param children Form Items within this group, be it a set of options to choose from or related settings in a preferences page.
 * @param label The legend for the entire group.
 * @param name The name for the form group, passed down to form controls like Radio via context.
 */
export const FormGroup: StyleableFC<FormGroupProps> = ({
  children,
  name,
  label,
  element: Element = "fieldset",
  style,
  className,
}) => {
  // <legend> is only valid inside <fieldset>; only <legend> provides the
  // accessible name for a <fieldset>.
  const labelElement = Element === "fieldset" ? "legend" : "span";
  const generatedName = `form-group-${useId()}`;

  return (
    <Element style={style} className={cn("skc-form-group", className)}>
      <Text
        type="title-small"
        element={labelElement}
        className="skc-form-group__label"
      >
        {label}
      </Text>
      <FormGroupContext.Provider value={{ name: name ?? generatedName }}>
        {children}
      </FormGroupContext.Provider>
    </Element>
  );
};
