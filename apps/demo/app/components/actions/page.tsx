import AssistChipSection from "@/app/components/actions/components/AssistChipSection";
import ButtonsSection from "@/app/components/actions/components/ButtonsSection";
import FilterChipSection from "@/app/components/actions/components/FilterChipSection";
import InputChipSection from "@/app/components/actions/components/InputChipSection";
import MenuSection from "@/app/components/actions/components/MenuSection";
import SegmentedButtonSection from "@/app/components/actions/components/SegmentedButtonSection";
import SuggestionChipSection from "@/app/components/actions/components/SuggestionChipSection";
import ToggleButtonsSection from "@/app/components/actions/components/ToggleButtonsSection";
import PageHeader from "@/components/PageHeader";
import { ContentLayout, Header, Section } from "@suankularb-components/react";
import type { Metadata } from "next";
import type { FC } from "react";

export const metadata: Metadata = {
  title: "Actions",
};

const ActionsPage: FC = () => (
  <>
    <PageHeader parentURL="/components">Actions</PageHeader>
    <ContentLayout>
      <Section>
        <Header>Button</Header>
        <ButtonsSection />
        <SegmentedButtonSection />
        <ToggleButtonsSection />
        {/* <FABsSection /> */}
      </Section>
      <Section>
        <Header>Chips</Header>
        <InputChipSection />
        <AssistChipSection />
        <FilterChipSection />
        <SuggestionChipSection />
      </Section>
      <MenuSection />
    </ContentLayout>
  </>
);

export default ActionsPage;
