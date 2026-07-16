"use client";

import type { StyleableFC } from "@/lib/types";
import { Button, MaterialIcon } from "@suankularb-components/react";

const BrowsersGridButton: StyleableFC<{
  browsersList: string;
}> = ({ browsersList, className, style }) => {
  const url = new URL("https://browsersl.ist");
  url.searchParams.set("q", browsersList);
  url.searchParams.set("region", "TH");

  return (
    <Button
      appearance="text"
      icon={<MaterialIcon icon="arrow_outward" directional />}
      tooltip="View on Browserslist"
      // Browserslist uses the query parameter syntax but with `#` instead of
      // `?`, weirdly.
      // "https://browsersl.ist/#q=...&region=TH"
      href={url.toString().replace("?", "#")}
      element={(props) => <a {...props} target="_blank" />}
      className={className}
      style={style}
    />
  );
};

export default BrowsersGridButton;
