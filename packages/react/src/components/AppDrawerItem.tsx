import { Interactive } from "@/components/Interactive";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/app-drawer-item.css";
import { useId, type ElementType, type JSX } from "react";

/**
 * Props for {@link AppDrawerItem App Drawer Item}.
 */
export interface AppDrawerItemProps {
  /**
   * The logo image of the app.
   */
  logo: JSX.Element;

  /**
   * The name of the app.
   */
  name: string;

  /**
   * Triggers when the App Drawer Item is pressed.
   */
  onClick?: () => any;

  /**
   * The link to the app or the app’s install page.
   */
  href?: string;

  /**
   * The element of the most relevant underlying element.
   *
   * - Optional.
   */
  element?: ElementType;
}

/**
 * An app inside the App Drawer. A child of App Drawer Segment.
 *
 * @param logo The logo image of the app.
 * @param name The name of the app.
 * @param onClick Triggers when the App Drawer Item is pressed.
 * @param href The link to the app or the app’s install page.
 */
export const AppDrawerItem: StyleableFC<AppDrawerItemProps> = ({
  logo,
  name,
  onClick,
  href,
  element: Element = "li",
  style,
  className,
}) => {
  const id = `app-${useId()}`;

  return (
    <Element style={style} className={cn("skc-app-drawer-item", className)}>
      <Interactive
        onClick={onClick}
        href={href}
        element={
          href
            ? (props) => <a {...props} aria-labelledby={id} target="_blank" />
            : (props) => <button {...props} aria-labelledby={id} />
        }
        className="skc-app-drawer-item__logo"
      >
        {logo}
      </Interactive>
      <Text
        type="body-small"
        className="skc-app-drawer-item__name"
        element={(props) => <span {...props} id={id} />}
      >
        {name}
      </Text>
    </Element>
  );
};
