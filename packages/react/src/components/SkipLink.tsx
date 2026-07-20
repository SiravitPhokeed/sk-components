"use client";

import { Text } from "@/components/Text";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import "@suankularb-components/css/skip-link.css";
import { useEffect } from "react";

/**
 * Props for {@link SkipLink Skip Link}.
 */
export interface SkipLinkProps {
  /**
   * Allows for translation of the accessibility labels.
   *
   * - Must be `en-US` or `th`.
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
}) => {
  useEffect(() => {
    if (!document.getElementById("content")) {
      console.warn(
        "Skip Link: no element with id `content` was found on the page. " +
          "Add id='content' to your <main> element, or use Content Layout " +
          "which adds it automatically.",
      );
    }
  }, []);

  return (
    <a
      href="#content"
      className={cn("skc-skip-link", className)}
      style={style}
    >
      <Text type="label-large">{STRINGS[locale].label}</Text>
    </a>
  );
};
