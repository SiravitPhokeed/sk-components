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
          subtitle="A list-detail view for finding students, inspired by MySK’s Search feature"
          href="/examples/search"
        >
          <p>
            This example demonstrates how to use the Split Layout component to
            create a list-detail view, inspired by the Search Students feature
            at{" "}
            <a
              href="https://mysk.school/search/students"
              className="text-primary font-bold underline"
            >
              mysk.school/search/students
            </a>
            .
          </p>
          <p>
            It also showcases components like Search, Card, and Assist Chip, as
            well as features like inset cards and component customization.
          </p>
        </ExampleCard>
      </Section>
    </ContentLayout>
  </>
);

export default ExamplesPage;
