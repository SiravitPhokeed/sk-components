import AboutSection from "@/components/AboutSection";
import DemoSection from "@/components/DemoSection";
import FeaturesSection from "@/components/FeaturesSection";
import PageHeader from "@/components/PageHeader";
import ResourcesSection from "@/components/ResourcesSection";
import { ContentLayout } from "@suankularb-components/react";
import type { Metadata } from "next";
import { FC } from "react";

export const metadata: Metadata = {
  title: "About - SK Components",
};

const AboutPage: FC = () => (
  <>
    <PageHeader>About</PageHeader>
    <ContentLayout>
      <AboutSection />
      <FeaturesSection />
      <ResourcesSection />
      <DemoSection />
    </ContentLayout>
  </>
);

export default AboutPage;
