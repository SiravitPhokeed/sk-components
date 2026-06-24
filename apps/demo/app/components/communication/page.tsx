import DialogSection from "@/app/components/communication/components/DialogSection";
import ProgressSection from "@/app/components/communication/components/ProgressSection";
import PageHeader from "@/components/PageHeader";
import { ContentLayout } from "@suankularb-components/react";
import type { FC } from "react";

const CommunicationPage: FC = () => (
  <>
    <PageHeader parentURL="/components">Communication</PageHeader>
    <ContentLayout>
      <DialogSection />
      <ProgressSection />
      {/* <SnackbarSection /> */}
    </ContentLayout>
  </>
);

export default CommunicationPage;
