import { MaterialIcon } from "@/components/MaterialIcon";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/data-table-search.css";
import type { ComponentProps } from "react";

/**
 * Props for {@link DataTableSearch Data Table Search}.
 */
export interface DataTableSearchProps extends ElementCustomizableProps {
  /**
   * A description of the search field for screen readers, similar to `alt` on
   * `<img>`.
   *
   * - Optional. Defaults to a localized "Search" string.
   */
  alt?: string;

  /**
   * The value inside the search field. This is useful if you want a
   * controlled input.
   *
   * - Optional.
   *
   * @see {@link https://reactjs.org/docs/forms.html#controlled-components React documention on controlled input documentation}
   */
  value?: string;

  /**
   * Allows for translation of the default placeholder message.
   *
   * - Must be `"en-US"` or `"th"`.
   * - Optional.
   */
  locale?: "en-US" | "th";

  /**
   * Called when the user makes changes to the field value. The value is passed
   * in via the function.
   *
   * - With [TanStack Table](https://tanstack.com/table/), this function
   *   can be hooked up to `setGlobalFilter`.
   * - Optional.
   */
  onChange?: (value: string) => any;

  /**
   * A faint text displayed inside the field guiding the user.
   *
   * - Optional.
   */
  placeholder?: string;

  /**
   * Attributes for the underlying `<input>` element used as the field.
   *
   * - Optional.
   */
  inputAttr?: ComponentProps<"input">;
}

const STRINGS = {
  "en-US": {
    alt: "Search",
    placeholder: "Search",
  },
  th: {
    alt: "ค้นหา",
    placeholder: "ค้นหา",
  },
};

/**
 * Allows the user to filter the Data Table's content using a text query.
 *
 * @param alt A description of the search field for screen readers, similar to `alt` on `<img>`.
 * @param value The value inside the search field. This is useful if you want a controlled input.
 * @param locale Allows for translation of the default placeholder message.
 * @param onChange Called when the user makes changes to the field value. The value is passed in via the function.
 * @param placeholder A faint text displayed inside the field guiding the user.
 * @param inputAttr Attributes for the underlying `<input>` element used as the field.
 */
export const DataTableSearch: StyleableFC<DataTableSearchProps> = ({
  alt,
  value,
  locale = "en-US",
  onChange,
  placeholder,
  inputAttr,
  element = "div",
  style,
  className,
}) => {
  return (
    <Text
      type="body-medium"
      element={element}
      className={cn("skc-data-table-search", className)}
      style={style}
    >
      <MaterialIcon icon="search" />

      {/* Search field */}
      <input
        type="search"
        aria-label={alt ?? STRINGS[locale].alt}
        className="skc-data-table-search__input"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder || STRINGS[locale].placeholder}
        {...inputAttr}
      />
    </Text>
  );
};
