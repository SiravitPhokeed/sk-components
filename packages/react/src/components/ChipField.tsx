"use client";

import type { ChipSet } from "@/components/ChipSet";
import { Progress } from "@/components/Progress";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/chip-field.css";
import { sift } from "radash";
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
   * - Must be a [Chip Set](/docs/data/chip-set) with only [Input Chips](/docs/data/input-chip).
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
   * Called when the user makes changes to the field value. The value is passed
   * in via the function.
   *
   * - Optional.
   */
  onChange?: (value: string) => any;

  /** @deprecated Use `onNewEntries` instead. */
  onNewEntry?: (value: string) => any;

  /**
   * Called when the user hits a separator or pastes separator-delimited text.
   *
   * - When triggered by a key press, receives an array with a single entry.
   * - When triggered by a paste, receives all split and trimmed values.
   * - Optional.
   */
  onNewEntries?: (values: string[]) => any;

  /**
   * Called when the user hits backspace twice while in the field.
   *
   * - Should remove the last Chip in the preceding Chip Set.
   * - Optional.
   */
  onDeleteLast?: () => any;

  /**
   * An array of keys that trigger the creation of a new Input Chip.
   *
   * - Optional.
   */
  entrySeparators?: string[];

  /**
   * The field can have some faint text guiding the user about what to write to
   * create an Input Chip. For example, a Chip Field for entering students into
   * a class by student code could have a placeholder say “Enter student
   * code.”
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
   * - Must be `th` or `en-US`. SKCom supports two languages: th and en-US.
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
        <kbd>⌫ backspace</kbd> again to delete this item, <kbd>→</kbd> to cancel
      </>
    ),
  },
  th: {
    loading: "กำลังตรวจสอบข้อมูลของคุณ…",
    deleteLast: (
      <>
        กด <kbd>⌫ backspace</kbd> อีกครั้งเพื่อลบรายการนี้ • กด <kbd>→</kbd>{" "}
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
 * @param label The placeholder text (if no placeholder specified or when not focused and no value) and the label text (when focused or has value).
 * @param helperMsg A short description of the Chip Field.
 * @param value The value inside the field that is used to create Input Chips.
 * @param onChange Called when the user makes changes to the field value.
 * @param onNewEntries Called when the user hits a separator or pastes separator-delimited text.
 * @param onDeleteLast Called when the user hits backspace twice while in the field.
 * @param entrySeparators An array of keys that trigger the creation of a new Input Chip.
 * @param placeholder The field can have some faint text guiding the user about what to write to create an Input Chip.
 * @param required Adds an asterisk to the label.
 * @param loading Add a Progress linear beneath the component to signify loading status.
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
  onNewEntries,
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

  /**
   * Strip any single-char separator from the end of a value — the browser
   * inserts the separator before keyup fires, so the raw input value carries
   * a trailing separator like "123," that callers shouldn't see.
   */
  const stripSeparator = (val: string) => {
    for (const sep of entrySeparators) {
      if (sep.length === 1 && val.endsWith(sep)) return val.slice(0, -1);
    }
    return val;
  };

  /**
   * Handle paste events in the input field. If the pasted text contains any of
   * the entry separators, the text is split into multiple values and sent to
   * `onNewEntries` or `onNewEntry`.
   */
  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    if (!onNewEntries && !onNewEntry) return;
    const pastedText = event.clipboardData.getData("text");

    // Map keyboard-key separators to paste-time characters.
    // "Enter" → newline; single-char separators stay as-is; others are skipped.
    const pasteEntrySeperators: string[] = [];
    for (const separator of entrySeparators) {
      if (separator === "Enter") pasteEntrySeperators.push("\n");
      else if (separator.length === 1) pasteEntrySeperators.push(separator);
    }

    const hasSeparator = pasteEntrySeperators.some((sep) =>
      pastedText.includes(sep),
    );
    if (!hasSeparator) return;

    event.preventDefault();

    // Build regex from paste-time separators (escape special regex chars).
    const escaped = pasteEntrySeperators.map((s) =>
      s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
    );
    const sepRegex = new RegExp(`[${escaped.join("")}]+`);
    const values = sift(pastedText.split(sepRegex).map((v) => v.trim()));
    if (values.length === 0) return;

    if (onNewEntries) {
      onNewEntries(values);
      onChange?.("");
    } else {
      // Backward compat: send first value, keep remaining in input.
      console.warn(
        "[SKCom] `ChipField.onNewEntry` is deprecated. Use " +
          "`onNewEntries` instead.",
      );
      onNewEntry?.(values[0]);
      onChange?.(values.slice(1).join(", "));
    }
  };

  /**
   * If the user presses backspace on an empty input, the last chip is selected.
   * If the user presses backspace again, the last chip is deleted.
   * If the user presses any other key, the last chip is deselected.
   *
   * If the user presses an entry separator, the input value is sent to
   * `onNewEntries` or `onNewEntry`.
   */
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
      const entryValue = stripSeparator(currentValue).trim();
      if (entryValue) {
        if (onNewEntries) onNewEntries([entryValue]);
        else onNewEntry?.(entryValue);
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
            onChange={(e) => onChange?.(stripSeparator(e.target.value))}
            onFocus={() => setLastChipSelected(false)}
            onBlur={() => setLastChipSelected(false)}
            onKeyUp={handleKeyUp}
            onPaste={handlePaste}
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
