import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import { AvatarPlaceholder } from "@/svg/AvatarPlaceholder";
import "@suankularb-components/css/avatar.css";
import type { ReactNode } from "react";

/**
 * Props for {@link Avatar}.
 */
export interface AvatarProps extends ElementCustomizableProps {
  /**
   * A user’s initials or their profile image.
   *
   * - Depending on the type of value, the Avatar will display differently:
   *   - If the value is a string, it is displayed as the user’s initials. The
   *     string should be no more than 2 characters long.
   *   - If the value is an element, it is displayed as the user’s profile
   *     picture. Note that the picture is cropped to a circle.
   *   - If not defined, a placeholder avatar is displayed.
   * - Optional.
   */
  children?: ReactNode;

  /**
   * A description of the Avatar for screen readers, similar to `alt` on
   * `<img>`.
   *
   * - Set this when the Avatar conveys meaningful information (e.g., the
   *   user’s name). When omitted, the Avatar is treated as decorative and
   *   hidden from assistive technologies, unless `children` is a string
   *   (initials), which is used as the accessible name.
   * - Optional.
   */
  alt?: string;
}

/**
 * An avatar represents the user, whether by their initials or their picture.
 *
 * @param children A user’s initials or their profile image.
 * @param alt A description of the Avatar for screen readers, similar to `alt` on `<img>`.
 */
export const Avatar: StyleableFC<AvatarProps> = ({
  children,
  alt,
  element: Element = "div",
  style,
  className,
}) => {
  const isDecorative = !alt && typeof children !== "string";

  return (
    <Element
      aria-label={alt}
      aria-hidden={isDecorative || undefined}
      className={cn("skc-avatar", className)}
      style={style}
    >
      {typeof children === "string" ? (
        // User initials
        <Text type="title-medium" className="skc-avatar__initials">
          {children}
        </Text>
      ) : children ? (
        // User profile picture
        children
      ) : (
        // Placeholder avatar
        <AvatarPlaceholder />
      )}
    </Element>
  );
};
