import DialogSection from "@/app/components/communication/components/DialogSection";
import ProgressSection from "@/app/components/communication/components/ProgressSection";
import PageHeader from "@/components/PageHeader";
import { ContentLayout } from "@suankularb-components/react";
import type { Metadata } from "next";
import type { FC } from "react";

export const metadata: Metadata = {
  title: "Communication",
};


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
