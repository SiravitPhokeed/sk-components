"use client";

import { Button, SegmentedButton, Text } from "@suankularb-components/react";
import Link from "next/link";
import type { FC } from "react";

const TailwindSelector: FC<{ value: "v3" | "v4" }> = ({ value }) => (
  <section className="mt-4 space-y-2">
    <Text type="title-small" element="h3" className="ms-2">
      Tailwind CSS version
    </Text>
    <SegmentedButton alt="Tailwind CSS version selection">
      <Button
        appearance="outlined"
        selected={value === "v4"}
        href="/docs/integrations/tailwindcss-v4"
        element={Link}
      >
        v4
      </Button>
      <Button
        appearance="outlined"
        selected={value === "v3"}
        href="/docs/integrations/tailwindcss-v3"
        element={Link}
      >
        v3
      </Button>
    </SegmentedButton>
  </section>
);

export default TailwindSelector;
