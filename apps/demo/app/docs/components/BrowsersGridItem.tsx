import { Text } from "@suankularb-components/react";
import type { FC } from "react";

const BROWSERS_MAP = new Map([
  // TODO: Add icons for each browser
  ["chrome", { name: "Chrome", icon: null }],
  ["edge", { name: "Edge", icon: null }],
  ["firefox", { name: "Firefox", icon: null }],
  ["safari", { name: "Safari", icon: null }],
]);

const BrowsersGrid: FC<{
  browser: "chrome" | "edge" | "firefox" | "safari";
  version: string;
  releaseDate: `${number}-${number}-${number}`;
}> = ({ browser, version, releaseDate }) => (
  <li className="flex flex-col p-3">
    <Text type="title-medium">{BROWSERS_MAP.get(browser)?.name}</Text>
    <Text type="title-large">{version}</Text>
    <Text type="body-medium" className="text-on-surface-variant mt-1">
      <time
        title={new Date(releaseDate).toLocaleDateString("en-US", {
          dateStyle: "long",
        })}
      >
        {new Date(releaseDate).toLocaleDateString("en-US", {
          month: "long",
          year: "numeric",
        })}
      </time>
    </Text>
  </li>
);

export default BrowsersGrid;
