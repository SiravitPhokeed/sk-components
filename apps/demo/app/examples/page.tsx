import ExampleCard from "@/app/examples/components/ExampleCard";
import PageHeader from "@/components/PageHeader";
import { ContentLayout, Section } from "@suankularb-components/react";
import type { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "Examples",
};

const ExamplesPage: FC = () => (
  <>
    <PageHeader>Examples</PageHeader>
    <ContentLayout>
      <Section>
        <ExampleCard
          title="Search Students"
          description="A list-detail view for finding students"
          components={[
            "Card",
            "Input Chip",
            "Assist Chip",
            "Filter Chip",
            "Chip Field",
            "Chip Set",
            "Dialog",
            "Full-screen Dialog",
            "Form Item",
            "Content Layout",
            "Vertical Split Layout",
            "Search",
            "Snackbar",
          ]}
          href="/examples/search"
        />
      </Section>
    </ContentLayout>
  </>
);

export default ExamplesPage;
