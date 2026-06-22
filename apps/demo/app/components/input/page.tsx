import SwitchSection from "@/app/components/input/components/SwitchSection";
import PageHeader from "@/components/PageHeader";
import { ContentLayout } from "@suankularb-components/react";
import type { FC } from "react";

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
