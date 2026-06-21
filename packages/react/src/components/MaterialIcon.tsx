import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/material-icon.css";
import { shake } from "radash";

export interface MaterialIconProps {
  /**
   * Material Icon uses the “Material Symbol” font, where each icon has its own
   * corresponding text string. You can find the list of all icons at
   * {@link https://fonts.google.com/icons Google Fonts}.
   *
   * - Always required.
   */
  icon: string;

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
}

const FONT_VARIATION_KEYS = {
  fill: "FILL",
  weight: "wght",
  grade: "GRAD",
  size: "opsz",
} as Record<string, string>;

/**
 * Icons are essential to any web design. They orient the users, help user navigate, and save space.
 * Material Icon uses the “Material Symbol” icon font from Google.
 *
 * @param icon Material Icon uses the “Material Symbol” font, where each icon has its own corresponding text string. You can find the list of all icons at {@link https://fonts.google.com/icons Google Fonts}.
 * @param fill If the icon is filled or not.
 * @param weight How thick the strokes are.
 * @param grade `grade` also adjusts the icon’s thickness, but more subtly.
 * @param size How large/small the icon is.
 */
export const MaterialIcon: StyleableFC<MaterialIconProps> = ({
  icon,
  fill,
  weight,
  grade,
  size,
  className,
  style,
}) => {
  return (
    <i
      // Hide the icon name from screen readers because sometimes the name
      // doesn't really make sense. In most cases, icons are just a visual aid,
      // except for notably an icon-only button where the screen reader label
      // should already be set from the button itself.
      aria-hidden
      style={{
        ...style,
        fontSize: size ? `${size / 16}rem` : undefined,
        // Only include specified font variation settings.
        fontVariationSettings: Object.entries(
          shake({ fill, weight, grade, size }),
        )
          .map(([key, value]) => `"${FONT_VARIATION_KEYS[key]}" ${value}`)
          .join(", "),
      }}
      className={cn(`skc-material-icon`, className)}
      translate="no"
    >
      {icon}
    </i>
  );
};
