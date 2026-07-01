import ColumnsSection from "@/app/components/layout/components/ColumnsSection";
import NavBarSection from "@/app/components/layout/components/NavBarSection";
import NavDrawerSection from "@/app/components/layout/components/NavDrawerSection";
import SplitLayoutSection from "@/app/components/layout/components/SplitLayoutSection";
import TabSection from "@/app/components/layout/components/TabSection";
import PageHeader from "@/components/PageHeader";
import { ContentLayout } from "@suankularb-components/react";
import type { Metadata } from "next";
import type { FC } from "react";

export const metadata: Metadata = {
  title: "Layout and navigation",
};

const LayoutPage: FC = () => (
  <>
    <PageHeader parentURL="/components">Layout and navigation</PageHeader>
    <ContentLayout>
      <SplitLayoutSection />
      <ColumnsSection />
      <NavBarSection />
      <NavDrawerSection />
      <TabSection />
    </ContentLayout>
  </>
);

export default LayoutPage;
