import AboutSection from "@/app/components/AboutSection";
import DemoSection from "@/app/components/DemoSection";
import ResourcesSection from "@/app/components/ResourcesSection";
import PageHeader from "@/components/PageHeader";
import { ContentLayout } from "@suankularb-components/react";
import type { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "About",
};

const AboutPage: FC = () => (
  <>
    <PageHeader>About</PageHeader>
    <ContentLayout>
      <AboutSection />
      <ResourcesSection />
      <DemoSection />
    </ContentLayout>
  </>
);

export default AboutPage;
