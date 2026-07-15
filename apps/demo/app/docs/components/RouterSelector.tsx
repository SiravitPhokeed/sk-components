"use client";

import { Button, SegmentedButton, Text } from "@suankularb-components/react";
import Link from "next/link";
import type { FC } from "react";

const RouterSelector: FC<{ value: "app" | "pages" }> = ({ value }) => (
  <section className="mt-4 space-y-2">
    <Text type="title-small" element="h3" className="ms-2">
      Next.js router
    </Text>
    <SegmentedButton alt="Router selection">
      <Button
        appearance="outlined"
        selected={value === "app"}
        href="/docs/integrations/nextjs-app"
        element={Link}
      >
        App Router
      </Button>
      <Button
        appearance="outlined"
        selected={value === "pages"}
        href="/docs/integrations/nextjs-pages"
        element={Link}
      >
        Pages Router
      </Button>
    </SegmentedButton>
  </section>
);

export default RouterSelector;
