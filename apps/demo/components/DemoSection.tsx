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
        href="/components/layout"
        element={Link}
      >
        <CardHeader
          icon={<MaterialIcon icon="view_quilt" />}
          title="Layout & navigation"
          subtitle="Layouts, drawers, tabs"
        />
      </Card>
      <Card
        appearance="outlined"
        stateLayerEffect
        href="/components/inputs"
        element={Link}
      >
        <CardHeader
          icon={<MaterialIcon icon="input" className="rtl:-scale-x-100" />}
          title="Inputs"
          subtitle="Buttons, form elements"
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
        />
      </Card>
    </Columns>
  </Section>
);

export default DemoSection;
