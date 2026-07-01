"use client";

import {
  Header,
  MaterialIcon,
  Section,
  Tab,
  TabsContainer,
} from "@suankularb-components/react";
import type { FC } from "react";
import { useState } from "react";

const TabSection: FC = () => {
  const [primaryView, setPrimaryView] = useState<
    "overview" | "students" | "teachers"
  >("overview");
  const [secondaryView, setSecondaryView] = useState<"list" | "gallery">(
    "list",
  );

  return (
    <Section>
      <Header>Tab</Header>
      <TabsContainer appearance="primary">
        <Tab
          icon={<MaterialIcon icon="info" />}
          label="Overview"
          selected={primaryView === "overview"}
          onClick={() => setPrimaryView("overview")}
        />
        <Tab
          icon={<MaterialIcon icon="groups" />}
          label="Students"
          selected={primaryView === "students"}
          onClick={() => setPrimaryView("students")}
        />
        <Tab
          icon={<MaterialIcon icon="group" />}
          label="Teachers"
          selected={primaryView === "teachers"}
          onClick={() => setPrimaryView("teachers")}
        />
      </TabsContainer>
      <TabsContainer appearance="secondary">
        <Tab
          icon={<MaterialIcon icon="list" />}
          label="List"
          selected={secondaryView === "list"}
          onClick={() => setSecondaryView("list")}
        />
        <Tab
          icon={<MaterialIcon icon="photo" />}
          label="Gallery"
          selected={secondaryView === "gallery"}
          onClick={() => setSecondaryView("gallery")}
        />
      </TabsContainer>
    </Section>
  );
};

export default TabSection;
