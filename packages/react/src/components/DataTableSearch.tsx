import { MaterialIcon } from "@/components/MaterialIcon";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/data-table-search.css";
import type { ComponentProps } from "react";

/**
 * Props for {@link DataTableSearch Data Table Search}.
 */
export interface DataTableSearchProps extends ElementCustomizableProps {
  /**
   * The value inside the search field. This is useful if you want a
   * controlled input.
   *
   * - Optional.
   *
   * @see {@link https://reactjs.org/docs/forms.html#controlled-components React documention on controlled input}
   */
  value?: string;

  /**
   * Allows for translation of the default placeholder message.
   *
   * - Must be `th` or `en-US`, as SKCom currently only support those 2
   *   languages.
   * - Optional.
   */
  locale?: "en-US" | "th";

  /**
   * This function triggers when the user make changes to the field value. The
   * value is passed in via the function.
   *
   * - With {@link https://tanstack.com/table/ Tanstack Table}, this function
   *   can be hooked up to
   *   {@link https://tanstack.com/table/v8/docs/api/features/filters#setglobalfilter setGlobalFitler}.
   *   {@link https://tanstack.com/table/v8/docs/examples/react/filters See an example.}
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
 * @param value The value inside the search field. This is useful if you want a controlled input.
 * @param locale Allows for translation of the default placeholder message.
 * @param onChange This function triggers when the user make changes to the field value.
 * @param placeholder A faint text displayed inside the field guiding the user.
 * @param inputAttr Attributes for the underlying `<input>` element used as the field.
 */
export const DataTableSearch: StyleableFC<DataTableSearchProps> = ({
  value,
  locale = "en-US",
  onChange,
  placeholder,
  inputAttr,
  element: Element = "div",
  style,
  className,
}) => {
  return (
    <Element style={style} className={cn("skc-data-table-search", className)}>
      <MaterialIcon icon="search" />

      {/* Search field */}
      <input
        type="search"
        aria-label={STRINGS[locale].alt}
        className="skc-data-table-search__input"
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        placeholder={placeholder || STRINGS[locale].placeholder}
        {...inputAttr}
      />
    </Element>
  );
};
