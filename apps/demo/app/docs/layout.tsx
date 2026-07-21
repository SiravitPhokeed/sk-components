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
      <PageHeader>Documentation</PageHeader>
      <SideSheet id="docs-nav" className="sm:hidden">
        <DocsNav />
      </SideSheet>
      <div>
        <FAB
          color="primary"
          icon={<MaterialIcon icon="menu_book" />}
          command="show-modal"
          commandfor="docs-nav"
          className="sm:hidden"
        >
          Docs menu
        </FAB>
      </div>
      <SplitLayout ratio="list-detail" prefer="right">
        <DocsNav />
        <main id="content" tabIndex={-1} className="pt-0 pb-18 sm:pb-6">
          <Text type="body-large" element="article">
            {children}
          </Text>
        </main>
      </SplitLayout>
    </>
  );
};

export default DocsLayout;
