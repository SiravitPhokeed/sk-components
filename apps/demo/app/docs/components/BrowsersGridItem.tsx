import ChromeLogo from "@/public/images/browsers/chrome.svg";
import EdgeLogo from "@/public/images/browsers/edge.svg";
import FirefoxLogo from "@/public/images/browsers/firefox.svg";
import SafariLogo from "@/public/images/browsers/safari.svg";
import { Text } from "@suankularb-components/react";
import type { ImageProps } from "next/image";
import Image from "next/image";
import type { FC } from "react";

const BROWSERS_MAP = new Map<string, { name: string; icon: ImageProps["src"] }>(
  [
    ["chrome", { name: "Chrome", icon: ChromeLogo }],
    ["edge", { name: "Edge", icon: EdgeLogo }],
    ["firefox", { name: "Firefox", icon: FirefoxLogo }],
    ["safari", { name: "Safari", icon: SafariLogo }],
  ],
);

const BrowsersGridItem: FC<{
  browser: "chrome" | "edge" | "firefox" | "safari";
  version: string;
  releaseDate: `${number}-${number}-${number}`;
  imagePriority?: boolean;
}> = ({ browser, version, releaseDate, imagePriority }) => {
  const { name, icon } = BROWSERS_MAP.get(browser) ?? {
    name: "Unknown",
    icon: null as ImageProps["src"] | null,
  };

  const releaseDateShort = new Date(releaseDate).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });
  const releaseDateFull = new Date(releaseDate).toLocaleDateString("en-US", {
    dateStyle: "long",
  });

  return (
    <li
      aria-label={`${name} ${version} and up, released on ${releaseDateFull}`}
      className="flex flex-col p-3"
    >
      <span className="flex items-center gap-1.5">
        {icon && (
          <Image
            src={icon}
            alt=""
            width={16}
            height={16}
            priority={imagePriority}
          />
        )}
        <Text type="title-medium">{name} </Text>
        {/* Space after to make Reader mode readable */}
      </span>
      <Text type="title-large">{version}+ </Text>
      <Text type="body-medium" className="text-on-surface-variant mt-1">
        <time title={releaseDateFull}>{releaseDateShort}</time>
      </Text>
    </li>
  );
};

export default BrowsersGridItem;
