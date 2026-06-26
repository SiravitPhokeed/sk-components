import type { ButtonProps } from "@/components/Button";
import { Button } from "@/components/Button";
import { MaterialIcon } from "@/components/MaterialIcon";
import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import { PageHeaderBlobs } from "@/svg/PageHeaderBlobs";
import PageHeaderMinimizedBlobs from "@/svg/PageHeaderMinimizedBlob";
import "@suankularb-components/css/page-header.css";
import type { JSX, ReactNode } from "react";

/**
 * Props for {@link PageHeader Page Header}.
 */
export interface PageHeaderProps extends ElementCustomizableProps {
  /**
   * The title text: the biggest text on a page and the only within a `<h1>`
   * tag.
   *
   * - Always required.
   */
  children: ReactNode;

  /**
   * @deprecated
   */
  alt?: string;

  /**
   * The link the back Button navigates to.
   *
   * - Important: the Back button is not for going back, but for going up a
   *   hierarchy in the sitemap. As a page can sometimes be navigated to from
   *   many places, this ensures that the Back button of a page always goes to
   *   the same place.
   *   {@link https://m2.material.io/design/navigation/understanding-navigation.html Learn more about navigation.}
   * - Required if `onBack` is not defined, as the back Button cannot have no
   *   functionality.
   * - Incompatible with `onBack`.
   */
  parentURL?: string;

  /**
   * @deprecated
   */
  homeURL?: string;

  /**
   * An App Drawer placed on the right edge of the Page Header.
   *
   * - Recommended if this app is part of a family of apps.
   * - Optional.
   */
  appDrawer?: JSX.Element;

  /**
   * Allows for translation of the accessibility labels.
   *
   * - Must be `th` or `en-US`, as SKCom currently only support those 2
   *   languages.
   * - Optional.
   */
  locale?: "en-US" | "th";

  /**
   * Change the underlying element from `<a>` to a custom element. This is
   * useful when a framework you’re using has a Link component for routing. An
   * example is `next/link` from Next.js.
   *
   * - Optional.
   * - Incompatible with `onBack`.
   */
  buttonElement?: ButtonProps["element"];

  /**
   * The function triggered when the back Button is clicked.
   *
   * - Required if `parentURL` is not defined, as the back Button cannot have
   *   no functionality.
   * - Incompatible with `parentURL`.
   */
  onBack?: () => any;

  /**
   * The function called when the user clicks on the navigation Button.
   *
   * - Optional.
   */
  onNavToggle?: () => any;
}

const STRINGS = {
  "en-US": {
    nav: "Open navigation",
    back: "Navigate up",
  },
  th: {
    nav: "เปิดเมนู",
    back: "กลับ",
  },
};

/**
 * There’s exactly one Page Header on every page. It displays the title (in
 * the only `<h1>` on the page), the back Button for navigating up, and
 * the App Drawer.
 *
 * @param children The title text: the biggest text on a page and the only within a `<h1>` tag.
 * @param parentURL The link the back Button navigates to.
 * @param locale Allows for translation of the accessibility labels.
 * @param buttonElement Change the underlying element of the back Button from `<a>` to a custom element.
 * @param onBack The function triggered when the back Button is clicked.
 * @param onNavToggle The function called when the user clicks on the navigation Button.
 */
export const PageHeader: StyleableFC<PageHeaderProps> = ({
  children,
  parentURL,
  appDrawer,
  locale = "en-US",
  buttonElement,
  onBack,
  onNavToggle,
  element: Element = "header",
  style,
  className,
}) => {
  const isTopLevel = !parentURL && !onBack;

  const action = isTopLevel ? (
    <Button
      appearance="text"
      icon={<MaterialIcon icon="menu" />}
      alt={STRINGS[locale].nav}
      onClick={onNavToggle}
      command="show-modal"
      commandfor="nav-drawer"
    />
  ) : (
    <Button
      appearance="text"
      icon={<MaterialIcon icon="arrow_back" />}
      alt={STRINGS[locale].back}
      onClick={onBack}
      href={parentURL}
      element={buttonElement}
    />
  );

  return (
    <>
      <PageHeaderBlobs />
      <div aria-hidden className="skc-page-header__fade" />
      <Element className={cn("skc-page-header", className)} style={style}>
        <div className="skc-page-header__content">
          {/* Nav toggle / Back Button */}
          {action}

          {/* Header text */}
          <Text
            type="headline-large"
            className="skc-page-header__text"
            element="h1"
          >
            {children}
          </Text>

          {/* App Drawer */}
          {appDrawer}
        </div>

        <div aria-hidden className="skc-page-header__minimized">
          <PageHeaderMinimizedBlobs />
          {action}
        </div>
      </Element>
    </>
  );
};
