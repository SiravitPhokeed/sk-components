import PageCard from "@/app/components/components/PageCard";
import PageHeader from "@/components/PageHeader";
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
            title="Layout and navigation"
            icon={<MaterialIcon icon="view_quilt" />}
            href="/components/layout"
          >
            <li>Root Layout</li>
            <li>Content Layout</li>
            <li>Split Layout</li>
            <li>Columns</li>
            <li>Section</li>
            <li>Nav Bar</li>
            <li>Nav Drawer</li>
            <li>App Drawer</li>
            <li>Tabs Container and Tab</li>
            <li>Theme Provider</li>
            <li>Anchor</li>
          </PageCard>

          <PageCard
            title="Inputs"
            icon={<MaterialIcon icon="input" />}
            href="/components/inputs"
          >
            <li>Button</li>
            <li>Segmented Button</li>
            <li>Toggle Button</li>
            <li>Actions</li>
            <li>Checkbox</li>
            <li>Radio</li>
            <li>Switch</li>
            <li>Select</li>
            <li>Text Field</li>
            <li>Search</li>
            <li>Form Group and Form Item</li>
          </PageCard>

          <PageCard
            title="Data display"
            icon={<MaterialIcon icon="table_chart" />}
            href="/components/data"
          >
            <li>Table</li>
            <li>Data Table</li>
            <li>List</li>
            <li>Card</li>
            <li>Assistive Chip</li>
            <li>Filter Chip</li>
            <li>Input Chip</li>
            <li>Suggestion Chip</li>
            <li>Text</li>
            <li>Header</li>
            <li>Page Header</li>
            <li>Avatar</li>
            <li>Material Icon</li>
            <li>Divider</li>
            <li>Interactive</li>
          </PageCard>

          <PageCard
            title="Overlays"
            icon={<MaterialIcon icon="picture_in_picture_center" />}
            href="/components/overlays"
          >
            <li>Dialog</li>
            <li>Fullscreen Dialog</li>
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
