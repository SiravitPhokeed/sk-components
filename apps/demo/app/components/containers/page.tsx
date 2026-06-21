import AvatarSection from "@/app/components/containers/components/AvatarSection";
import CardSection from "@/app/components/containers/components/CardSection";
import ColumnsSection from "@/app/components/containers/components/ColumnsSection";
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
    </ContentLayout>
  </>
);

export default ContainersPage;
