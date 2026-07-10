"use client";

import {
  Card,
  CardHeader,
  Columns,
  Header,
  MaterialIcon,
  Section,
} from "@suankularb-components/react";
import Link from "next/link";
import type { FC } from "react";

const DemoSection: FC = () => (
  <Section>
    <Header level={3} className="sr-only">
      Components
    </Header>
    <Columns columns={4}>
      <Card
        appearance="outlined"
        stateLayerEffect
        href="/components/layout"
        element={Link}
      >
        <CardHeader
          icon={<MaterialIcon icon="view_quilt" directional />}
          title="Layout & navigation"
          subtitle="Layouts, drawers, tabs"
          truncate
        />
      </Card>
      <Card
        appearance="outlined"
        stateLayerEffect
        href="/components/inputs"
        element={Link}
      >
        <CardHeader
          icon={<MaterialIcon icon="input" directional />}
          title="Inputs"
          subtitle="Buttons, form elements"
          truncate
        />
      </Card>
      <Card
        appearance="outlined"
        stateLayerEffect
        href="/components/data"
        element={Link}
      >
        <CardHeader
          icon={<MaterialIcon icon="table_chart" />}
          title="Data display"
          subtitle="Tables, lists, cards"
          truncate
        />
      </Card>
      <Card
        appearance="outlined"
        stateLayerEffect
        href="/components/overlays"
        element={Link}
      >
        <CardHeader
          icon={<MaterialIcon icon="picture_in_picture_center" />}
          title="Overlays"
          subtitle="Dialog, snackbar, menu"
          truncate
        />
      </Card>
    </Columns>
  </Section>
);

export default DemoSection;
