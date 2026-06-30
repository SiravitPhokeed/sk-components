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
        <Columns columns={4}>
          {/* Actions */}
          <PageCard
            icon={<MaterialIcon icon="touch_app" />}
            title="Actions"
            href="/components/actions"
            components={[
              "Actions",
              "Button",
              "Segmented Button",
              "Toggle Button",
              "Input Chip",
              "Assist Chip",
              "Filter Chip",
              "Suggestion Chip",
              "Chip Set",
              "FAB",
            ]}
          />

          {/* Input */}
          <PageCard
            icon={<MaterialIcon icon="input" />}
            title="Input"
            href="/components/input"
            components={[
              "Checkbox",
              "File Input",
              "Form Group",
              "Form Item",
              "Radio",
              "Search",
              "Select",
              "Switch",
              "Text Field",
            ]}
          />

          {/* Communication */}
          <PageCard
            icon={<MaterialIcon icon="swap_horiz" />}
            title="Communication"
            href="/components/communication"
            components={[
              "Dialog",
              "Dialog Header",
              "Dialog Content",
              "Full-screen Dialog",
              "Progress",
              "Snackbar",
            ]}
          />

          {/* Dashboard */}
          <PageCard
            icon={<MaterialIcon icon="dashboard" />}
            title="Containers"
            href="/components/containers"
            components={[
              "Card",
              "Card Header",
              "Card Content",
              "Columns",
              "Data Table",
              "Data Table Search",
              "Data Table Filters",
              "Data Table Content",
              "Data Table Head",
              "Data Table Body",
              "Data Table Pagination",
              "Divider",
              "List",
              "List Item",
              "List Item Content",
              "Table",
              "Table Head",
              "Table Body",
              "Table Foot",
              "Table Row",
              "Table Cell",
            ]}
          />
        </Columns>
      </Section>
    </ContentLayout>
  </>
);

export default ComponentsPage;
