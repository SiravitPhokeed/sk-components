"use client";

import { Interactive } from "@/components/Interactive";
import { MaterialIcon } from "@/components/MaterialIcon";
import { Menu } from "@/components/Menu";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import useAnchorName from "@/lib/hooks/useAnchorName";
import type { ElementCustomizableProps, StyleableProps } from "@/lib/types";
import "@suankularb-components/css/select.css";
import type { ReactNode } from "react";
import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";

const SelectContext = createContext<{
  value: string | null;
  onChange: (value: string) => void;
} | null>(null);

export const useSelectContext = () => useContext(SelectContext);

/**
 * Props for {@link Select}.
 */
export interface SelectProps<
  Value extends string = string,
> extends ElementCustomizableProps {
  /**
   * The options to select from.
   *
   * - Must be Menu Items, each with `value` defined.
   * - Always required.
   */
  children?: ReactNode;

  /**
   * How the Select looks. An outlined Select has a lower emphasis than filled,
   * so it is great for a form with many fields.
   *
   * - Keep the appearance consistent across Selects. Separate different
   *   appearances by region.
   * - Must be `outlined` or `filled`.
   * - Always required.
   */
  appearance: "outlined" | "filled";

  /**
   * The placeholder text (when not focused and no value) and the label text
   * (when focused or has value).
   *
   * - Always required.
   */
  label: string;

  /**
   * The leading text or icon, aligned to the left.
   *
   * - Optional.
   */
  leading?: ReactNode;

  /**
   * A short description of the Select, or an error message during an error
   * state.
   *
   * - Optional but recommended during an error state.
   */
  helperMsg?: ReactNode;

  /**
   * Allows for translation of the message shown when there are no options.
   *
   * - Must be `th` or `en-US`, as SKCom currently only support those 2
   *   languages.
   * - Optional.
   */
  locale?: "en-US" | "th";

  /**
   * Tells Select that it contains an invalid value and activates the error
   * state.
   *
   * - Optional.
   */
  error?: boolean;

  /**
   * The value of the selected option. This is useful if you want a controlled
   * input.
   *
   * - Must be one of the values entered via the `value` prop of the Menu Items.
   * - Optional.
   */
  value?: string;

  /**
   * This function triggers when the user chooses an option. The value is
   * passed in via the function.
   *
   * - Optional.
   */
  onChange?: (value: Value) => any;
}

const STRINGS = {
  "en-US": {
    noOptions: "No options",
  },
  th: {
    noOptions: "ไม่มีตัวเลือก",
  },
};

/**
 * Sometimes it’s impractical to show all options at a time with a radio group.
 * Select allows the user to choose from options shown on a temporary surface.
 *
 * @param children The options to select from.
 * @param appearance How the Select looks.
 * @param label The label text.
 * @param leading The leading text or icon, aligned to the left.
 * @param helperMsg A short description of the Select, or an error message during an error state.
 * @param locale Allows for translation of the message shown when there are no options.
 * @param error Tells Select that it contains an invalid value and activates the error state.
 * @param value The value of the selected option. This is useful if you want a controlled input.
 * @param onChange This function triggers when the user chooses an option.
 */
export const Select = <Value extends string = string>({
  children,
  appearance,
  label,
  leading,
  helperMsg,
  locale = "en-US",
  error,
  value,
  onChange,
  element = "button",
  style,
  className,
}: StyleableProps & SelectProps<Value>): ReactNode => {
  const id = `select-${useId()}`;
  const anchorName = useAnchorName();
  const menuId = `menu-${useId()}`;

  const [internalValue, setInternalValue] = useState<string | null>(null);
  const resolvedValue = value ?? internalValue;
  const resolvedOnChange = onChange ?? setInternalValue;

  const triggerRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const menu = document.getElementById(menuId) as HTMLUListElement;
    menuRef.current = menu;
    updateDisplayedValue(resolvedValue);
  }, []);

  const [displayedValue, setDisplayedValue] = useState<ReactNode>(null);

  /** Gets the text content of a Menu Item element. */
  const getOptionText = (element: HTMLButtonElement) => {
    // Without this, the text content of a Menu Item with an icon will include
    // the icon’s name.
    const label = element.querySelector(".skc-menu-item__label");
    if (label) return label.textContent;
    else return element.textContent;
  };

  /** Updates the displayed value based on the selected option. */
  const updateDisplayedValue = (newValue: string | null) => {
    if (!menuRef.current) return;

    // If the new value is found in the Menu, display that option’s text.
    const selectedItem = menuRef.current.querySelector(
      `[data-value="${newValue}"]`,
    ) as HTMLButtonElement | null;
    if (selectedItem) {
      setDisplayedValue(getOptionText(selectedItem));
      return;
    }

    // Otherwise, show the first option’s text, or the no options message if
    // there are no options.
    const firstItem = menuRef.current.querySelector(
      '[data-value]:not([aria-disabled="true"])',
    ) as HTMLButtonElement | null;
    if (firstItem) {
      setDisplayedValue(getOptionText(firstItem));
      const firstValue = firstItem.dataset.value as Value | undefined;
      if (firstValue) resolvedOnChange(firstValue);
    } else setDisplayedValue(STRINGS[locale].noOptions);
  };

  return (
    <>
      <div
        className={cn(
          "skc-select",
          `skc-select--${appearance}`,
          error && "skc-select--error",
          className,
        )}
        style={{ anchorName, ...style }}
      >
        {leading && <div className="skc-select__leading">{leading}</div>}

        <Text
          id={id}
          type="body-small"
          element="label"
          className="skc-select__label"
        >
          <span>{label}</span>
        </Text>

        <Interactive
          ref={triggerRef}
          aria-labelledby={id}
          {...(children && { command: "show-popover", commandfor: menuId })}
          element={element}
          className="skc-select__box"
        >
          <Text type="body-large" className="skc-select__value">
            {displayedValue}
          </Text>

          <MaterialIcon icon="arrow_drop_down" className="skc-select__icon" />
        </Interactive>

        <Text type="body-small" className="skc-select__helper-msg">
          {helperMsg}
        </Text>
      </div>

      <Menu id={menuId} anchor={anchorName} density={-2}>
        <SelectContext.Provider
          value={{
            value: resolvedValue,
            onChange: (newValue) => {
              resolvedOnChange?.(newValue as Value);
              updateDisplayedValue(newValue);
              triggerRef.current?.focus();
            },
          }}
        >
          {children}
        </SelectContext.Provider>
      </Menu>
    </>
  );
};
