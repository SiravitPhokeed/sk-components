"use client";

import {
  Section,
  Header,
  Columns,
  Card,
  CardHeader,
  MaterialIcon,
} from "@suankularb-components/react";
import Link from "next/link";
import type { FC } from "react";

const DemoSection: FC = () => (
  <Section>
    <Header className="sr-only">Let’s start! Choose a page:</Header>
    <Columns columns={4}>
      <Card
        appearance="outlined"
        stateLayerEffect
        href="/components/actions"
        element={Link}
      >
        <CardHeader
          icon={<MaterialIcon icon="touch_app" />}
          title="Actions"
          subtitle="Buttons, chips"
        />
      </Card>
      <Card
        appearance="outlined"
        stateLayerEffect
        href="/components/input"
        element={Link}
      >
        <CardHeader
          icon={<MaterialIcon icon="input" />}
          title="Input"
          subtitle="Form elements"
        />
      </Card>
      <Card
        appearance="outlined"
        stateLayerEffect
        href="/components/communication"
        element={Link}
      >
        <CardHeader
          icon={<MaterialIcon icon="swap_horiz" />}
          title="Communication"
          subtitle="Dialog, snackbar"
        />
      </Card>
      <Card
        appearance="outlined"
        stateLayerEffect
        href="/components/containers"
        element={Link}
      >
        <CardHeader
          icon={<MaterialIcon icon="dashboard" />}
          title="Containers"
          subtitle="Cards, layouts"
        />
      </Card>
    </Columns>
  </Section>
);

export default DemoSection;
