import ChromeLogo from "@/public/images/browsers/chrome.svg";
import EdgeLogo from "@/public/images/browsers/edge.svg";
import FirefoxLogo from "@/public/images/browsers/firefox.svg";
import SafariLogo from "@/public/images/browsers/safari.svg";
import { Text } from "@suankularb-components/react";
import Image, { type ImageProps } from "next/image";
import type { FC } from "react";

const BROWSERS_MAP = new Map([
  ["chrome", { name: "Chrome", icon: ChromeLogo }],
  ["edge", { name: "Edge", icon: EdgeLogo }],
  ["firefox", { name: "Firefox", icon: FirefoxLogo }],
  ["safari", { name: "Safari", icon: SafariLogo }],
]);

const BrowsersGrid: FC<{
  browser: "chrome" | "edge" | "firefox" | "safari";
  version: string;
  releaseDate: `${number}-${number}-${number}`;
}> = ({ browser, version, releaseDate }) => {
  const { name, icon } = (BROWSERS_MAP.get(browser) ?? {
    name: "Unknown",
    icon: null,
  }) as { name: string; icon: ImageProps["src"] | null };

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
        {icon && <Image src={icon} alt="" width={16} height={16} />}
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

export default BrowsersGrid;
