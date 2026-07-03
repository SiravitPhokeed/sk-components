"use client";

import type { ChipSet } from "@/components/ChipSet";
import { Progress } from "@/components/Progress";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/chip-field.css";
import type {
  ComponentProps,
  KeyboardEvent,
  ReactElement,
  ReactNode,
} from "react";
import { useId, useRef, useState } from "react";

/**
 * Props for {@link ChipField Chip Field}.
 */
export interface ChipFieldProps {
  /**
   * The Input Chips that the user have already entered.
   *
   * - Must be a Chip Set with only Input Chips.
   * - Always required.
   */
  children: ReactElement<typeof ChipSet>;

  /**
   * The placeholder text (if no placeholder specified or when not focused and
   * no value) and the label text (when focused or has value).
   *
   * - Always required.
   */
  label: ReactNode;

  /**
   * A short description of the Chip Field.
   *
   * - Optional.
   */
  helperMsg?: ReactNode;

  /**
   * The value inside the field that is used to create Input Chips. This is
   * useful if you want a controlled input.
   *
   * - Optional.
   */
  value?: string;

  /**
   * This function triggers when the user makes changes to the field value. The
   * value is passed in via the function.
   *
   * - Optional.
   */
  onChange?: (value: string) => any;

  /**
   * This function triggers when the user hits the spacebar while in the field.
   *
   * - The behavior expected to be implemented by the developer is that a new
   *   Input Chip is created in the preceding Chip Set with the data passed
   *   through this function.
   * - Optional.
   */
  onNewEntry?: (value: string) => any;

  /**
   * This function triggers when the user hits backspace twice while in the
   * field.
   *
   * - The behavior expected to be implemented by the developer is that the
   *   last Chip in the preceding Chip Set should be removed.
   * - Optional.
   */
  onDeleteLast?: () => any;

  /**
   * An array of keys that trigger the creation of a new Input Chip.
   *
   * - Optional.
   *
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key/Key_Values A list of key values}.
   * @default [" ", ",", ";", "Enter"]
   */
  entrySeparators?: string[];

  /**
   * The field can have some faint text guiding the user about what to write to
   * create an Input Chip. For example, a Chip Field for entering students into
   * a class by student code could have a placeholder say "Enter student code."
   *
   * - Optional.
   */
  placeholder?: string;

  /**
   * Adds an asterisk to the label.
   *
   * - Unlike in Text Field, this prop is purely cosmetic and does not affect
   *   the validity of the form.
   * - Optional.
   */
  required?: boolean;

  /**
   * Add a Progress linear beneath the component to signify loading status.
   *
   * - If `true`, a linear indeterminate Progress is shown.
   * - If a number, a linear determinate Progress with the given value is shown.
   * - Optional.
   */
  loading?: boolean | number;

  /**
   * The field cannot be edited.
   *
   * - Optional.
   */
  disabled?: boolean;

  /**
   * Allows for translation of the accessibility labels.
   *
   * - Must be `th` or `en-US`, as SKCom currently only support those 2
   *   languages.
   * - Optional.
   */
  locale?: "en-US" | "th";

  /**
   * Attributes for the underlying `<input>` element used as the field.
   *
   * - Optional.
   */
  inputAttr?: ComponentProps<"input">;
}

const DEFAULT_SEPARATORS = [" ", ",", ";", "Enter"];
const DELETE_KEY = "Backspace";

const STRINGS = {
  "en-US": {
    loading: "Checking your input…",
    deleteLast: (
      <>
        <kbd>⌫ backspace</kbd> again to delete this item, <kbd>⎋ esc</kbd> to
        cancel
      </>
    ),
  },
  th: {
    loading: "กำลังตรวจสอบข้อมูลของคุณ…",
    deleteLast: (
      <>
        กด <kbd>⌫ backspace</kbd> อีกครั้งเพื่อลบรายการนี้ • กด <kbd>⎋ esc</kbd>{" "}
        เพื่อยกเลิก
      </>
    ),
  },
};

/**
 * A combination of Input Chips and a Text Field. Users can simply start typing
 * into the Chip Field; their input is converted into an Input Chip on spacebar
 * press.
 *
 * @param children The Input Chips that the user have already entered.
 * @param label The placeholder text and the label text.
 * @param helperMsg A short description of the Chip Field.
 * @param value The value inside the field that is used to create Input Chips.
 * @param onChange This function triggers when the user makes changes to the field value.
 * @param onNewEntry This function triggers when the user hits a separator while in the field.
 * @param onDeleteLast This function triggers when the user hits backspace twice while in the field.
 * @param entrySeparators An array of characters that trigger the creation of a new Input Chip.
 * @param placeholder Faint text guiding the user about what to write.
 * @param loading Disable the Chip Field and signify loading status.
 * @param disabled The field cannot be edited.
 * @param locale Allows for translation of the accessibility labels.
 * @param inputAttr Attributes for the underlying `<input>` element used as the field.
 */
export const ChipField: StyleableFC<ChipFieldProps> = ({
  children,
  label,
  helperMsg,
  value,
  onChange,
  onNewEntry,
  onDeleteLast,
  entrySeparators = DEFAULT_SEPARATORS,
  placeholder,
  required,
  loading,
  disabled,
  locale = "en-US",
  inputAttr,
  className,
  style,
}) => {
  const id = `chip-field-${useId()}`;
  const inputRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  // Track if the last chip is selected (via backspace on empty input).
  const [lastChipSelected, setLastChipSelected] = useState(false);

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    const input = e.currentTarget;
    const currentValue = input.value;

    // Backspace on empty input
    if (e.key === DELETE_KEY && currentValue === "") {
      if (lastChipSelected) {
        // Delete the last chip
        onDeleteLast?.();
        setLastChipSelected(false);
      } else {
        // Check if there are chips in the Chip Set
        const chipSet = contentRef.current?.querySelector(".skc-chip-set");
        if (chipSet && chipSet.children.length > 0) setLastChipSelected(true);
      }
      return;
    }

    // Cancel last chip selection if the user types anything else.
    if (lastChipSelected) setLastChipSelected(false);

    // Check if the pressed key is an entry separator.
    if (entrySeparators.includes(e.key)) {
      e.preventDefault();
      if (currentValue.trim()) {
        onNewEntry?.(currentValue.trim());
        onChange?.("");
      }
    }
  };

  return (
    <Text
      type="body-large"
      element="div"
      className={cn(
        "skc-chip-field",
        required && "skc-chip-field--required",
        loading && "skc-chip-field--loading",
        disabled && "skc-chip-field--disabled",
        lastChipSelected && "skc-chip-field--last-chip-selected",
        className,
      )}
      style={style}
    >
      {/* Hide a portion of the box border to make space for the label */}
      <Text
        type="body-small"
        className="skc-chip-field__clip"
        element={(props) => <span {...props} aria-hidden />}
      >
        {label /* For measurement */}
      </Text>

      {/* Label */}
      <Text
        id={`${id}-label`}
        type="body-large"
        className="skc-chip-field__label"
      >
        <span>{label}</span>
      </Text>

      {/* Box */}
      <div className="skc-chip-field__box">
        <div ref={contentRef} className="skc-chip-field__content">
          {/* Chip Set (consumer-provided) */}
          {children}

          {/* Input */}
          <input
            ref={inputRef}
            id={`${id}-input`}
            aria-labelledby={`${id}-label`}
            aria-describedby={helperMsg ? `${id}-helper` : undefined}
            type="text"
            disabled={disabled}
            value={value}
            // Defaulting to a space so the `:not(:placeholder-shown)` trick for
            // detecting input value works even if the user doesn't provide a
            // placeholder.
            placeholder={placeholder ?? " "}
            onChange={(e) => onChange?.(e.target.value)}
            onFocus={() => setLastChipSelected(false)}
            onBlur={() => setLastChipSelected(false)}
            onKeyUp={handleKeyUp}
            className="skc-chip-field__input"
            {...inputAttr}
          />
        </div>
      </div>

      {/* Helper/error message */}
      {(helperMsg || lastChipSelected) && (
        <Text
          id={`${id}-helper`}
          type="body-small"
          className="skc-chip-field__helper-msg"
        >
          {lastChipSelected ? STRINGS[locale].deleteLast : helperMsg}
        </Text>
      )}

      {/* Loading progress bar */}
      <Progress
        appearance="linear"
        alt={STRINGS[locale].loading}
        value={typeof loading === "number" ? loading : undefined}
        visible={Boolean(loading)}
      />
    </Text>
  );
};
