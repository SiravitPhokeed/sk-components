"use client";

import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { StyleableProps } from "@/lib/types";
import "@suankularb-components/css/text-field.css";
import type { ChangeEventHandler, ComponentProps, ReactNode } from "react";
import { useId, useState } from "react";

/**
 * Props for {@link TextField Text Field}.
 */
export interface TextFieldProps<Value extends string | File = string> {
  /**
   * The name of the Text Field, used for form submission. Passed to the
   * underlying `<input>` or `<textarea>` element.
   *
   * - Optional.
   */
  name?: string;

  /**
   * How the Text Field looks. An outlined Text Field has a lower emphasis than
   * filled, so it is great for a form with many fields.
   *
   * - Keep the appearance consistent across Text Fields. For example, use
   *   `outlined` for form fields and `filled` for search bars, rather than mixing
   *   both in the same context.
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
  label: ReactNode;

  /**
   * The type of the input field. This is useful if you want a specialized input
   * field, like a date picker or a color picker.
   *
   * - Optional. Defaults to `text`.
   */
  type?:
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "month"
    | "number"
    | "password"
    | "search"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";

  /**
   * How the Text Field behaves if the field value exceeds the visual space.
   *
   * - A single line Text Field can only accommodate 1 line of text. Field value
   *   never wraps and instead scrolls.
   * - A multi-line Text Field starts with just accommodating 1 line but
   *   vertically extends to fit the field value as needed.
   * - A text area Text Field has a fixed height and wraps text.
   * - Optional.
   */
  behavior?: "single-line" | "multi-line" | "textarea";

  /**
   * The text alignment inside the input. Use `right` when the input value
   * should sit next to trailing text — for example, a username field with a
   * `@domain` suffix so the value reads naturally with the suffix.
   *
   * - Optional.
   */
  align?: "left" | "right";

  /**
   * The leading text or icon, aligned to the left.
   *
   * - Optional.
   */
  leading?: ReactNode;

  /**
   * The trailing text or icon, aligned to the right.
   *
   * - Incompatible with `canClear`, as that requires the space of the trailing
   *   icon for the clear button.
   * - Optional.
   */
  trailing?: ReactNode;

  /**
   * A short description of the Text Field, or an error message during an error state.
   *
   * - Optional but recommended during an error state.
   */
  helperMsg?: ReactNode;

  /**
   * If the user has to enter text in this field for the form to be valid.
   *
   * - Activates the error state after the user exits the Text Field without
   *   entering anything, even if `error` is false.
   * - Optional.
   */
  required?: boolean;

  /**
   * Turns the Text Field gray and blocks user input. `onChange` will not fire.
   *
   * - {@link https://sk-components-demo.mysk.school/docs/guides/disabling-elements Learn how to make disabled elements less frustrating.}
   * - Optional.
   */
  disabled?: boolean;

  /**
   * Tells Text Field that it contains an invalid value and activates the error
   * state.
   *
   * - Browser validation may override this if the field value is invalid, even
   *   if `error` is false.
   * - Optional.
   */
  error?: boolean;

  /**
   * The value inside the field. This is useful if you want a controlled input.
   *
   * - Optional.
   */
  value?: string;

  /**
   * Allows for translation of the “No files attached” text, which is put in
   * place of the file name when no files have been attached yet.
   *
   * - Only valid if `type` is `file`.
   * - Must be `en-US` or `th`.
   * - Optional.
   */
  locale?: "en-US" | "th";

  /**
   * Called when the user makes changes to the field value. The value is passed
   * in via the function.
   *
   * - Optional.
   */
  onChange?: (value: Value) => any;

  /**
   * Attributes for the underlying `<input>` element used as the field.
   *
   * - Optional.
   */
  inputAttr?: ComponentProps<"input">;
}

/**
 * Input types without built-in browser UI, whose label can animate between
 * placeholder and floating positions. Types with native pickers (color, date
 * etc.) and the file type are excluded. Consumers can still request a static
 * label by providing a placeholder via `inputAttr`.
 */
const INPUT_TYPE_CONFIG: Record<
  string,
  { animatable?: true; placeholder?: string; pattern?: string }
> = {
  text: { animatable: true },
  number: { animatable: true },
  search: { animatable: true },
  url: { animatable: true },
  tel: { animatable: true },
  email: { animatable: true },
  password: { animatable: true },
  color: {
    placeholder: "#000000",
    pattern: "^#[0-9a-fA-F]{6}$",
  },
  date: {
    placeholder: "YYYY-MM-DD",
    pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}$",
  },
  "datetime-local": {
    placeholder: "YYYY-MM-DDThh:mm",
    pattern: "^[0-9]{4}-[0-9]{2}-[0-9]{2}T[0-9]{2}:[0-9]{2}$",
  },
  month: {
    placeholder: "YYYY-MM",
    pattern: "^[0-9]{4}-[0-9]{2}$",
  },
  time: {
    placeholder: "hh:mm",
    pattern: "^[0-9]{2}:[0-9]{2}$",
  },
  week: {
    placeholder: "YYYY-Www",
    pattern: "^[0-9]{4}-W[0-9]{2}$",
  },
};

const STRINGS = {
  "en-US": {
    noFiles: "No files attached",
  },
  th: {
    noFiles: "ยังไม่ได้แนบไฟล์",
  },
};

/**
 * A field where users enter text — from short passwords to long-form  answers.
 *
 * @param appearance How the Text Field looks. An outlined Text Field has a lower emphasis than filled, so it is great for a form with many fields.
 * @param label The placeholder text (when not focused and no value) and the label text (when focused or has value).
 * @param type The type of the input field.
 * @param behavior How the Text Field behaves if the field value exceeds the visual space.
 * @param align The text alignment inside the input. Use `right` when the input value should sit next to trailing text — for example, a username field with a `@domain` suffix so the value reads naturally with the suffix.
 * @param leading The leading text or icon, aligned to the left.
 * @param trailing The trailing text or icon, aligned to the right.
 * @param helperMsg A short description of the Text Field, or an error message during an error state.
 * @param required If the user has to enter text in this field for the form to be valid.
 * @param disabled Turns the Text Field gray and blocks user input. `onChange` will not fire.
 * @param error Tells Text Field that it contains an invalid value and activates the error state.
 * @param value The value inside the field. This is useful if you want a controlled input.
 * @param locale Allows for translation of the “No files attached” text, which is put in place of the file name when no files have been attached yet.
 * @param onChange Called when the user makes changes to the field value. The value is passed in via the function.
 * @param inputAttr Attributes for the underlying `<input>` element used as the field.
 */
export const TextField = <Value extends string | File = string>({
  name,
  appearance,
  label,
  type = "text",
  behavior = "single-line",
  align,
  leading,
  trailing,
  helperMsg,
  required,
  disabled,
  error,
  value,
  locale = "en-US",
  onChange,
  inputAttr,
  className,
  style,
}: StyleableProps & TextFieldProps<Value>): ReactNode => {
  const id = `input-${useId()}`;
  const Element = (
    behavior === "single-line" ? "input" : "textarea"
  ) as "input";

  const [hasFile, setHasFile] = useState(false);
  const [hasValue, setHasValue] = useState(Boolean(value));

  const typeConfig = INPUT_TYPE_CONFIG[type];
  const isLabelStatic =
    !typeConfig?.animatable || Boolean(inputAttr?.placeholder);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (type === "file") {
      const file = (e.target as HTMLInputElement).files?.[0] as Value;
      if (file) {
        setHasFile(true);
        setHasValue(true);
        onChange?.(file);
      } else {
        setHasFile(false);
        setHasValue(false);
      }
      return;
    }
    const newValue = e.target.value as Value;
    setHasValue(Boolean(newValue));
    onChange?.(newValue);

    if (behavior === "multi-line" && !CSS.supports("field-sizing", "content"))
      e.currentTarget.style.height = `${e.currentTarget.scrollHeight}px`;
  };

  return (
    <Text
      type="body-large"
      element="label"
      className={cn(
        "skc-text-field",
        `skc-text-field--${appearance}`,
        align && `skc-text-field--${align}`,
        behavior !== "single-line" && `skc-text-field--${behavior}`,
        disabled && "skc-text-field--disabled",
        error && "skc-text-field--error",
        hasValue && "skc-text-field--has-value",
        className,
      )}
      style={style}
    >
      {/* Hide a portion of the box border to make space for the label */}
      {appearance === "outlined" && (
        <Text
          type="body-small"
          className="skc-text-field__clip"
          element={(props) => <span {...props} aria-hidden />}
        >
          {label /* For measurement */}
        </Text>
      )}

      {/* Label */}
      <Text
        id={`${id}-label`}
        type="body-large"
        className="skc-text-field__label"
      >
        <span>{label}</span>
      </Text>

      {/* Box */}
      <div className="skc-text-field__box">
        {leading && <div className="skc-text-field__leading">{leading}</div>}
        <Element
          aria-labelledby={`${id}-label`}
          aria-describedby={helperMsg ? `${id}-helper` : undefined}
          aria-invalid={error || undefined}
          name={name}
          disabled={disabled}
          required={required}
          value={value}
          // Format hints for types that lack a native browser UI.
          placeholder={typeConfig?.placeholder}
          pattern={typeConfig?.pattern}
          onChange={handleChange}
          className={cn(
            "skc-text-field__input",
            isLabelStatic && "skc-text-field__input--static",
            hasFile && "skc-text-field__input--has-file",
          )}
          // Textareas don't have a type attribute.
          {...(Element === "input" && { type })}
          {...inputAttr}
        />
        {type === "file" && !hasFile && (
          <span className="skc-text-field__no-files">
            {STRINGS[locale].noFiles}
          </span>
        )}
        {trailing && <div className="skc-text-field__trailing">{trailing}</div>}
      </div>

      {/* Helper/error message */}
      {helperMsg && (
        <Text
          id={`${id}-helper`}
          type="body-small"
          className="skc-text-field__helper-msg"
        >
          {helperMsg}
        </Text>
      )}
    </Text>
  );
};
