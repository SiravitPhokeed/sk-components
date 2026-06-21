import ButtonsSection from "@/app/components/actions/components/ButtonsSection";
import SegmentedButtonSection from "@/app/components/actions/components/SegmentedButtonSection";
import PageHeader from "@/components/PageHeader";
import { ContentLayout } from "@suankularb-components/react";
import type { FC } from "react";

const ActionsPage: FC = () => (
  <>
    <PageHeader parentURL="/components">Actions</PageHeader>
    <ContentLayout>
      <ButtonsSection />
      <SegmentedButtonSection />
    </ContentLayout>
  </>
);

export default ActionsPage;
