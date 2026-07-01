import AssistChipSection from "@/app/components/data/components/AssistChipSection";
import AvatarSection from "@/app/components/data/components/AvatarSection";
import CardSection from "@/app/components/data/components/CardSection";
import DataTableSection from "@/app/components/data/components/DataTableSection";
import FilterChipSection from "@/app/components/data/components/FilterChipSection";
import HeaderSection from "@/app/components/data/components/HeaderSection";
import InputChipSection from "@/app/components/data/components/InputChipSection";
import InteractiveSection from "@/app/components/data/components/InteractiveSection";
import ListSection from "@/app/components/data/components/ListSection";
import SuggestionChipSection from "@/app/components/data/components/SuggestionChipSection";
import TableSection from "@/app/components/data/components/TableSection";
import TextSection from "@/app/components/data/components/TextSection";
import PageHeader from "@/components/PageHeader";
import { ContentLayout, Header, Section } from "@suankularb-components/react";
import type { Metadata } from "next";
import type { FC } from "react";

export const metadata: Metadata = {
  title: "Data display",
};

const DataDisplayPage: FC = () => (
  <>
    <PageHeader parentURL="/components">Data display</PageHeader>
    <ContentLayout>
      <TableSection />
      <DataTableSection />
      <ListSection />
      <CardSection />
      <Section>
        <Header>Chips</Header>
        <AssistChipSection />
        <FilterChipSection />
        <InputChipSection />
        <SuggestionChipSection />
      </Section>
      <HeaderSection />
      <TextSection />
      <AvatarSection />
      <InteractiveSection />
    </ContentLayout>
  </>
);

export default DataDisplayPage;
