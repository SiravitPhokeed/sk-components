import PageCard from "@/app/components/components/PageCard";
import PageHeader from "@/components/PageHeader";
import DataDark from "@/public/images/screenshots/data-dark.png";
import DataLight from "@/public/images/screenshots/data-light.png";
import InputsDark from "@/public/images/screenshots/inputs-dark.png";
import InputsLight from "@/public/images/screenshots/inputs-light.png";
import LayoutDark from "@/public/images/screenshots/layout-dark.png";
import LayoutLight from "@/public/images/screenshots/layout-light.png";
import OverlaysDark from "@/public/images/screenshots/overlays-dark.png";
import OverlaysLight from "@/public/images/screenshots/overlays-light.png";
import {
  Columns,
  ContentLayout,
  MaterialIcon,
  Section,
} from "@suankularb-components/react";
import type { Metadata } from "next";
import type { FC } from "react";

export const metadata: Metadata = {
  title: "Components",
};

const ComponentsPage: FC = () => (
  <>
    <PageHeader>Components</PageHeader>
    <ContentLayout>
      <Section>
        <Columns columns={2}>
          <PageCard
            title="Layout & navigation"
            icon={<MaterialIcon icon="view_quilt" directional />}
            src={[LayoutLight, LayoutDark]}
            href="/components/layout"
          >
            <li>Root Layout</li>
            <li>Content Layout</li>
            <li>Page Header</li>
            <li>Header</li>
            <li>Section</li>
            <li>Columns</li>
            <li>Nav Bar</li>
            <li>Nav Drawer</li>
            <li>App Drawer</li>
            <li>Tabs Container and Tab</li>
            <li>Theme Provider</li>
            <li>Divider</li>
          </PageCard>

          <PageCard
            title="Inputs"
            icon={<MaterialIcon icon="input" directional />}
            src={[InputsLight, InputsDark]}
            href="/components/inputs"
          >
            <li>Button</li>
            <li>Segmented Button</li>
            <li>Toggle Button</li>
            <li>Floating Action Button</li>
            <li>Actions</li>
            <li>Checkbox</li>
            <li>Radio</li>
            <li>Switch</li>
            <li>Select</li>
            <li>Chip Field</li>
            <li>Text Field</li>
            <li>Search</li>
            <li>Form Group and Form Item</li>
          </PageCard>

          <PageCard
            title="Data display"
            icon={<MaterialIcon icon="table_chart" />}
            src={[DataLight, DataDark]}
            href="/components/data"
          >
            <li>Table</li>
            <li>Data Table</li>
            <li>List</li>
            <li>Card</li>
            <li>Assist Chip</li>
            <li>Filter Chip</li>
            <li>Input Chip</li>
            <li>Suggestion Chip</li>
            <li>Chip Set</li>
            <li>Text</li>
            <li>Avatar</li>
            <li>Material Icon</li>
            <li>Interactive</li>
          </PageCard>

          <PageCard
            title="Overlays"
            icon={<MaterialIcon icon="picture_in_picture_center" />}
            src={[OverlaysLight, OverlaysDark]}
            href="/components/overlays"
          >
            <li>Dialog</li>
            <li>Full-screen Dialog</li>
            <li>Anchor</li>
            <li>Menu</li>
            <li>Menu Item</li>
            <li>Snackbar</li>
            <li>Progress</li>
          </PageCard>
        </Columns>
      </Section>
    </ContentLayout>
  </>
);

export default ComponentsPage;
