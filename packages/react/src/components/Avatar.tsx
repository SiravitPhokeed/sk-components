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
   *     string should be no more that 2 characters long.
   *   - If the value is an element, it is displayed as the user’s profile
   *     picture. Note that the picture is cropped to a circle.
   *   - If not defined, a placeholder avatar is displayed.
   * - Optional.
   */
  children?: ReactNode;
}

/**
 * An avatar represents the user, whether by their initials or their picture.
 *
 * @param children A user’s initials or their profile image.
 */
export const Avatar: StyleableFC<AvatarProps> = ({
  children,
  element: Element = "div",
  style,
  className,
}) => (
  <Element className={cn("skc-avatar", className)} style={style}>
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
