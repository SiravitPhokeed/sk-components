import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/material-icon.css";

export interface MaterialIconProps extends ElementCustomizableProps {
  /**
   * Material Icon uses the “Material Symbol” font, where each icon has its own
   * corresponding text string. You can find the list of all icons at
   * {@link https://fonts.google.com/icons Google Fonts}.
   *
   * - Always required.
   */
  icon: string;

  /**
   * A description of the Material Icon for screen readers, similar to `alt` on
   * `<img>`.
   *
   * - Required if the Material Icon is used alone and conveys meaning.
   */
  alt?: string;

  /**
   * If the icon is filled or not.
   *
   * - An icon should be outlined by default, filling it should have a specific
   *   meaning, like if a Navigation Bar Item is selected.
   * - Uses the `FILL` font variation setting on the Material Symbol font.
   * - Optional.
   */
  fill?: boolean;

  /**
   * How thick the strokes are.
   *
   * - Keep the weight consistent throughout an application. Hovering/focusing
   *   can affect the weight, however.
   * - Uses the `wght` font variation setting on the Material Symbol font.
   * - Optional.
   */
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;

  /**
   * `grade` also adjusts the icon’s thickness, but more subtly.
   *
   * - A lower grade is used in light icons on a dark background. A higher
   *   grade is used to emphasize an icon.
   * - Uses the `GRAD` font variation setting on the Material Symbol font.
   * - Optional.
   */
  grade?: -25 | 0 | 200;

  /**
   * How large/small the icon is.
   *
   * - Uses the `opsz` font variation setting on the Material Symbol font.
   * - Optional.
   */
  size?: 20 | 24 | 40 | 48;

  /**
   * If the icon should flip horizontally in right-to-left (RTL) languages.
   *
   * - This includes that indicate direction, like arrows and chevrons, and
   *   icons that depict forward movement, like a person walking.
   * - Media controls, like play/pause and volume, should not flip.
   * - Optional.
   */
  directional?: boolean;
}

/**
 * Icons are essential to any web design. They orient the users, help user navigate, and save space.
 * Material Icon uses the “Material Symbol” icon font from Google.
 *
 * @param icon Material Icon uses the “Material Symbol” font, where each icon has its own corresponding text string. You can find the list of all icons at {@link https://fonts.google.com/icons Google Fonts}.
 * @param alt A description of the Material Icon for screen readers, similar to `alt` on `<img>`.
 * @param fill If the icon is filled or not.
 * @param weight How thick the strokes are.
 * @param grade `grade` also adjusts the icon’s thickness, but more subtly.
 * @param size How large/small the icon is.
 * @param directional If the icon should flip horizontally in right-to-left (RTL) languages.
 */
export const MaterialIcon: StyleableFC<MaterialIconProps> = ({
  icon,
  alt,
  fill,
  weight,
  grade,
  size,
  directional,
  element: Element = "i",
  className,
  style,
}) => (
  <Element
    {...(alt ? { role: "img", "aria-label": alt } : { "aria-hidden": true })}
    style={{
      ...style,
      fontSize: size ? `${size / 16}rem` : undefined,
      fontVariationSettings: (() => {
        let value = "";
        // `fill` and `grade` can be 0, so we explicitly check for undefined.
        if (fill !== undefined) value += `"FILL" ${fill ? 1 : 0}, `;
        if (weight) value += `"wght" ${weight}, `;
        if (grade !== undefined) value += `"GRAD" ${grade}, `;
        if (size) value += `"opsz" ${size}, `;
        return value ? value.slice(0, -2) : undefined; // Remove the last comma and space
      })(),
    }}
    className={cn(
      `skc-material-icon`,
      directional && `skc-material-icon--directional`,
      className,
    )}
    translate="no"
  >
    {icon}
  </Element>
);
