"use client";

import { Button } from "@/components/Button";
import { MaterialIcon } from "@/components/MaterialIcon";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/search.css";
import { useEffect, useRef, type ComponentProps } from "react";

/**
 * Props for {@link Search}.
 */
export interface SearchProps extends ElementCustomizableProps {
  /**
   * The value inside the field. This is useful if you want a controlled input.
   *
   * - Optional.
   *
   * @see {@link https://reactjs.org/docs/forms.html#controlled-components React documention on controlled input}
   */
  value?: string;

  /**
   * Enables the user to focus on the field by pressing `/`, or any other key
   * you specify.
   *
   * - Must be either boolean or a single character string.
   * - Optional.
   */
  hotkey?: boolean | string;

  /**
   * Allows for translation of the default placeholder message.
   *
   * - Must be `th` or `en-US`, as SKCom currently only support those 2
   *   languages.
   * - Optional.
   *
   * @default "en-US"
   */
  locale?: "en-US" | "th";

  /**
   * This function triggers when the user make changes to the field value. The
   * value is passed in via the function.
   *
   * - Optional.
   */
  onChange?: (value: string) => any;

  /**
   * This function triggers when the search button is clicked. The value is
   * passed in via the function.
   *
   * - Optional.
   */
  onSearch?: (value: string) => any;

  /**
   * A faint text displayed inside the field guiding the user.
   *
   * - Optional.
   */
  placeholder?: string;

  /**
   * Turns the Search gray and block any action associated with it. The user
   * will not be able to type in the field or click the search button.
   *
   * - Optional.
   */
  disabled?: boolean;

  /**
   * Attributes for the underlying `<input>` element.
   *
   * - Optional.
   */
  inputAttr?: ComponentProps<"input">;
}

const STRINGS = {
  "en-US": {
    placeholder: "Search",
    action: "Search",
  },
  th: {
    placeholder: "ค้นหา",
    action: "ค้นหา",
  },
};

/**
 * Search allows the user to quickly find something using a query.
 *
 * @param value The value inside the field. This is useful if you want a controlled input.
 * @param locale Allows for translation of the default placeholder message.
 * @param onChange This function triggers when the user make changes to the field value.
 * @param onSearch This function triggers when the search button is clicked.
 * @param placeholder A faint text displayed inside the field guiding the user.
 * @param disabled Turns the Search gray and block any action associated with it.
 * @param inputAttr Attributes for the underlying `<input>` element.
 */
export const Search: StyleableFC<SearchProps> = ({
  value,
  hotkey,
  locale = "en-US",
  onChange,
  onSearch,
  placeholder,
  disabled = false,
  inputAttr,
  element = "div",
  className,
  style,
}) => {
  const ref = useRef<HTMLInputElement>(null);

  const handleHotkey = (event: KeyboardEvent) => {
    // Prevent false positives when the user is typing in a field or textarea.
    if (
      event.target instanceof HTMLInputElement ||
      event.target instanceof HTMLTextAreaElement
    )
      return;
    // Listen for the hotkey and focus the input field when pressed.
    const listenedHotkey = hotkey === true ? "/" : hotkey;
    if (event.key === listenedHotkey && ref.current) {
      event.preventDefault();
      ref.current.focus();
    }
  };
  useEffect(() => {
    if (hotkey) document.addEventListener("keyup", handleHotkey);
    return () => document.removeEventListener("keyup", handleHotkey);
  }, [hotkey]);

  return (
    <Text
      type="body-large"
      element={element}
      className={cn("skc-search", className)}
      style={style}
    >
      <Button
        appearance="text"
        alt={STRINGS[locale].action}
        icon={<MaterialIcon icon="search" />}
        onClick={() => {
          const input = ref.current;
          if (!input) return;
          onSearch?.(input.value);
          input.focus();
        }}
        disabled={disabled}
        className="skc-search__button"
      />
      <input
        ref={ref}
        role="searchbox"
        aria-disabled={disabled}
        value={value}
        readOnly={disabled}
        enterKeyHint="search"
        placeholder={placeholder ?? STRINGS[locale].placeholder}
        onChange={(event) => onChange?.(event.target.value)}
        onKeyUp={(event) => {
          if (event.key !== "Enter") return;
          const input = event.currentTarget;
          onSearch?.(input.value);
          if (input.value) input.blur();
        }}
        className="skc-search__input"
        {...inputAttr}
      />
    </Text>
  );
};
