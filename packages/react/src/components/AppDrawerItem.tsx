import { Interactive } from "@/components/Interactive";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { ActionableProps, ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/app-drawer-item.css";
import { useId, type JSX } from "react";

/**
 * Props for {@link AppDrawerItem App Drawer Item}.
 */
export interface AppDrawerItemProps extends ActionableProps, ElementCustomizableProps {
  /**
   * The logo image of the app.
   */
  logo: JSX.Element;

  /**
   * The name of the app.
   */
  name: string;
}

/**
 * An app inside the App Drawer. A child of App Drawer Segment.
 *
 * @param logo The logo image of the app.
 * @param name The name of the app.
 */
export const AppDrawerItem: StyleableFC<AppDrawerItemProps> = ({
  logo,
  name,
  command,
  commandfor,
  onClick,
  href,
  element: Element = "li",
  style,
  className,
}) => {
  const id = `app-${useId()}`;

  return (
    <Element className={cn("skc-app-drawer-item", className)} style={style}>
      <Interactive
        onClick={onClick}
        href={href}
        command={command}
        commandfor={commandfor}
        element={
          href
            ? (props) => <a {...props} aria-labelledby={id} target="_blank" />
            : (props) => <button {...props} aria-labelledby={id} />
        }
        className="skc-app-drawer-item__logo"
      >
        {logo}
      </Interactive>
      <Text id={id} type="body-small" className="skc-app-drawer-item__name">
        {name}
      </Text>
    </Element>
  );
};
