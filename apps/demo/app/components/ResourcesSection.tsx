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
import type { FC } from "react";

const ResourcesSection: FC = () => (
  <Columns columns={4}>
    {/* Left side: text */}
    <Section className="mb-2 sm:col-span-2 md:mb-0">
      <Header>Resources</Header>
      <p>
        <strong>
          In addition to the demo website (which you’re on right now!), we also
          have a{" "}
          <a
            className="text-primary font-bold underline"
            href="https://docs.google.com/document/d/1ks5DrzfC_xLg48EFtZALoVQpJpxhsK2It3GDhAhZCcE/edit?usp=sharing"
            target="_blank"
          >
            full API reference
          </a>{" "}
          on all components in ReSKCom.
        </strong>{" "}
        You can interact with all the examples shown in the reference on this
        demo, and the interactive code on the “demo” app in{" "}
        <a
          className="text-primary font-bold underline"
          href="https://github.com/suankularb-wittayalai-school/sk-components"
          target="_blank"
        >
          this repository
        </a>
        .
      </p>
    </Section>

    {/* Right side: links */}
    <Card
      appearance="filled"
      stateLayerEffect
      href="https://docs.google.com/document/d/1ks5DrzfC_xLg48EFtZALoVQpJpxhsK2It3GDhAhZCcE/edit?usp=sharing"
      className="mx-4 justify-end self-stretch sm:mx-0"
      element={(props) => <a {...props} target="_blank" />}
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
