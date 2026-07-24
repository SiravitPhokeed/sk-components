"use client";

import {
  Card,
  CardContent,
  Columns,
  Header,
  MaterialIcon,
  Section,
  Text,
} from "@suankularb-components/react";
import Link from "next/link";
import type { FC } from "react";

const ResourcesSection: FC = () => (
  <Columns columns={4}>
    {/* Left side: text */}
    <Section className="mb-2 sm:col-span-2 md:mb-0">
      <Header>Resources</Header>
      <Text type="body-medium" element="p">
        Visit the{" "}
        <Link href="/components" className="link">
          Components page
        </Link>{" "}
        to see a display of all components in ReSKCom, and the{" "}
        <Link href="/docs" className="link">
          Documentation page
        </Link>{" "}
        to see guides and API references for all components.
      </Text>
      <Text type="body-small" element="p">
        The code for this demo website is available on{" "}
        <a
          href="https://github.com/suankularb-wittayalai-school/sk-components"
          target="_blank"
          className="link"
        >
          this repository
        </a>
        .
      </Text>
    </Section>

    {/* Right side: links */}
    <Card
      appearance="filled"
      stateLayerEffect
      href="/docs"
      className="mx-4 justify-end self-stretch sm:mx-0"
      element={Link}
    >
      <CardContent>
        <MaterialIcon icon="description" size={48} className="text-primary" />
        <Text
          type="headline-small"
          element="h3"
          className="leading-none text-balance"
        >
          Guides & API reference
        </Text>
      </CardContent>
    </Card>
    <Card
      appearance="filled"
      stateLayerEffect
      href="https://github.com/suankularb-wittayalai-school/sk-components"
      className="mx-4 justify-end self-stretch sm:mx-0"
      element={(props) => <a {...props} target="_blank" />}
    >
      <CardContent>
        <MaterialIcon icon="code" size={48} className="text-primary" />
        <Text
          type="headline-small"
          element="h3"
          className="leading-none text-balance"
        >
          Demo repository
        </Text>
      </CardContent>
    </Card>
  </Columns>
);

export default ResourcesSection;
