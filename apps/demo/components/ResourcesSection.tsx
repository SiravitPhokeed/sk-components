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
        <strong>
          In addition to the demo website (which you’re on right now!), we also
          have a{" "}
          <Link href="/docs" className="link">
            full API reference
          </Link>{" "}
          on all components in ReSKCom.
        </strong>{" "}
        You can interact with all the examples shown in the reference on this
        demo, and the interactive code on the “demo” app in{" "}
        <a
          href="https://github.com/suankularb-wittayalai-school/sk-components"
          target="_blank"
          className="link"
        >
          this repository
          <span className="sr-only"> (opens in new tab)</span>
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
        <Text type="headline-small" element="h3" className="leading-none!">
          API reference
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
        <Text type="headline-small" element="h3" className="leading-none!">
          Demo repository
        </Text>
      </CardContent>
    </Card>
  </Columns>
);

export default ResourcesSection;
