"use client";

import {
  Button,
  Header,
  Section,
  SegmentedButton,
} from "@suankularb-components/react";
import { type FC, useState } from "react";

const SegmentedButtonSection: FC = () => {
  const [view, setView] = useState<"schedule" | "list">("schedule");

  return (
    <Section>
      <Header level={3}>Segmented Button</Header>
      <SegmentedButton alt="View">
        <Button
          appearance="outlined"
          selected={view === "schedule"}
          onClick={() => setView("schedule")}
        >
          Schedule view
        </Button>
        <Button
          appearance="outlined"
          selected={view === "list"}
          onClick={() => setView("list")}
        >
          List view
        </Button>
      </SegmentedButton>
    </Section>
  );
};

export default SegmentedButtonSection;
