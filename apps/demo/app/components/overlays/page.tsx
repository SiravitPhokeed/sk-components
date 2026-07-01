import DialogSection from "@/app/components/overlays/components/DialogSection";
import MenuSection from "@/app/components/overlays/components/MenuSection";
import ProgressSection from "@/app/components/overlays/components/ProgressSection";
import SnackbarSection from "@/app/components/overlays/components/SnackbarSection";
import PageHeader from "@/components/PageHeader";
import { ContentLayout } from "@suankularb-components/react";
import type { Metadata } from "next";
import type { FC } from "react";

export const metadata: Metadata = {
  title: "Overlays",
};

const OverlaysPage: FC = () => (
  <>
    <PageHeader parentURL="/components">Overlays</PageHeader>
    <ContentLayout>
      <DialogSection />
      <MenuSection />
      <SnackbarSection />
      <ProgressSection />
    </ContentLayout>
  </>
);

export default OverlaysPage;
