import DocsNav from "@/app/docs/components/DocsNav";
import PageHeader from "@/components/PageHeader";
import {
  FAB,
  MaterialIcon,
  SideSheet,
  SplitLayout,
  Text,
} from "@suankularb-components/react";
import type { FC, ReactNode } from "react";

const DocsLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <FAB
        color="primary"
        icon={<MaterialIcon icon="menu_book" />}
        visible="corner"
        command="show-modal"
        commandfor="docs-nav"
      >
        Docs menu
      </FAB>
      <PageHeader>Documentation</PageHeader>
      <SideSheet id="docs-nav" className="sm:hidden">
        <DocsNav />
      </SideSheet>
      <SplitLayout ratio="list-detail" prefer="right">
        <DocsNav />
        <main id="content" tabIndex={-1} className="pt-0 sm:pb-6">
          <Text type="body-large" element="article">
            {children}
          </Text>
        </main>
      </SplitLayout>
    </>
  );
};

export default DocsLayout;
