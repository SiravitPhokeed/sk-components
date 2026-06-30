import CheckboxSection from "@/app/components/input/components/CheckboxSection";
import RadioSection from "@/app/components/input/components/RadioSection";
import SearchSection from "@/app/components/input/components/SearchSection";
import SelectSection from "@/app/components/input/components/SelectSection";
import SwitchSection from "@/app/components/input/components/SwitchSection";
import PageHeader from "@/components/PageHeader";
import { ContentLayout } from "@suankularb-components/react";
import type { Metadata } from "next";
import type { FC } from "react";

export const metadata: Metadata = {
  title: "Input",
};

const InputPage: FC = () => (
  <>
    <PageHeader parentURL="/components">Input</PageHeader>
    <ContentLayout>
      <CheckboxSection />
      {/* <ChipFieldSection /> */}
      {/* <FileInputSection /> */}
      <RadioSection />
      <SearchSection />
      <SelectSection />
      <SwitchSection />
      {/* <TextFieldSection /> */}
    </ContentLayout>
  </>
);

export default InputPage;
