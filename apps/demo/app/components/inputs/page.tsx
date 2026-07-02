import ButtonsSection from "@/app/components/inputs/components/ButtonsSection";
import CheckboxSection from "@/app/components/inputs/components/CheckboxSection";
import RadioSection from "@/app/components/inputs/components/RadioSection";
import ReportIssueFAB from "@/app/components/inputs/components/ReportIssueFAB";
import SearchSection from "@/app/components/inputs/components/SearchSection";
import SegmentedButtonSection from "@/app/components/inputs/components/SegmentedButtonSection";
import SelectSection from "@/app/components/inputs/components/SelectSection";
import SwitchSection from "@/app/components/inputs/components/SwitchSection";
import TextFieldSection from "@/app/components/inputs/components/TextFieldSection";
import ToggleButtonsSection from "@/app/components/inputs/components/ToggleButtonsSection";
import PageHeader from "@/components/PageHeader";
import { ContentLayout, Header, Section } from "@suankularb-components/react";
import type { Metadata } from "next";
import type { FC } from "react";

export const metadata: Metadata = {
  title: "Inputs",
};

const InputsPage: FC = () => (
  <>
    <ReportIssueFAB />
    <PageHeader parentURL="/components">Inputs</PageHeader>
    <ContentLayout>
      <Section>
        <Header>Button</Header>
        <ButtonsSection />
        <SegmentedButtonSection />
        <ToggleButtonsSection />
      </Section>
      <CheckboxSection />
      <RadioSection />
      <SwitchSection />
      <SelectSection />
      <TextFieldSection />
      <SearchSection />
    </ContentLayout>
  </>
);

export default InputsPage;
