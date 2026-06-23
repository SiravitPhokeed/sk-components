import AvatarSection from "@/app/components/containers/components/AvatarSection";
import CardSection from "@/app/components/containers/components/CardSection";
import ColumnsSection from "@/app/components/containers/components/ColumnsSection";
import HeaderSection from "@/app/components/containers/components/HeaderSection";
import InteractiveSection from "@/app/components/containers/components/InteractiveSection";
import ListSection from "@/app/components/containers/components/ListSection";
import TableSection from "@/app/components/containers/components/TableSection";
import PageHeader from "@/components/PageHeader";
import { ContentLayout } from "@suankularb-components/react";
import type { FC } from "react";

const ContainersPage: FC = () => (
  <>
    <PageHeader parentURL="/components">Containers</PageHeader>
    <ContentLayout>
      <AvatarSection />
      <CardSection />
      <ColumnsSection />
      {/* <DataTableSection /> */}
      <HeaderSection />
      <InteractiveSection />
      {/* <SplitLayoutSection /> */}
      <ListSection />
      <TableSection />
      {/* <TabSection /> */}
    </ContentLayout>
  </>
);

export default ContainersPage;
