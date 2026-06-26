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
      {/* <CheckboxSection /> */}
      {/* <ChipFieldSection /> */}
      {/* <SearchSection /> */}
      {/* <SelectSection /> */}
      {/* <TextFieldSection /> */}
      {/* <RadioSection /> */}
      <SwitchSection />
    </ContentLayout>
  </>
);

export default InputPage;
