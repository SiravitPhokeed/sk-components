import type { Checkbox } from "@/components/Checkbox";
import type { Radio } from "@/components/Radio";
import type { Switch } from "@/components/Switch";
import { Text } from "@/components/Text";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/form-item.css";
import type { ReactElement, ReactNode } from "react";

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
 */
export const FormItem: StyleableFC<FormItemProps> = ({
  children,
  label,
  element: Element = "label",
}) => (
  <Element className="skc-form-item">
    {children}
    <Text type="body-medium" className="skc-form-item__label">
      {label}
    </Text>
  </Element>
);
