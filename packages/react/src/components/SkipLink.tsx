import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/skip-link.css";

/**
 * Props for {@link SkipLink Skip Link}.
 */
export interface SkipLinkProps {
  /**
   * Allows for translation of the accessibility labels.
   *
   * - Must be `"en-US"` or `"th"`.
   * - Optional.
   */
  locale?: "en-US" | "th";
}

const STRINGS = {
  "en-US": {
    label: "Skip to content",
  },
  th: {
    label: "ข้ามไปยังเนื้อหา",
  },
};

/**
 * A link that skips to the main content of a page, visually hidden until
 * focused. When focused via keyboard, it appears as a floating filled Button
 * at the top of the page.
 *
 * Typically rendered automatically by Root Layout. Use the `skipToContent`
 * prop on Root Layout to opt out.
 *
 * @param locale Allows for translation of the accessibility labels.
 */
export const SkipLink: StyleableFC<SkipLinkProps> = ({
  locale = "en-US",
  className,
  style,
}) => (
  <a href="#content" className={cn("skc-skip-link", className)} style={style}>
    <Text type="label-large" className="skc-skip-link__label">
      {STRINGS[locale].label}
    </Text>
  </a>
);
