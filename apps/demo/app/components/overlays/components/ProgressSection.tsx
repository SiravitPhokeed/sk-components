"use client";

import {
  Columns,
  Header,
  Progress,
  Section,
} from "@suankularb-components/react";
import type { FC } from "react";
import { useEffect, useState } from "react";

const ProgressSection: FC = () => {
  const [progress, setProgress] = useState(70);
  useEffect(() => {
    const interval = setInterval(() => {
      const increment = Math.floor(Math.random() * 10);
      setProgress((prev) => (prev >= 100 ? 0 : prev + increment));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section>
      <Header>Progress</Header>
      <Columns columns={2}>
        <Progress
          appearance="linear"
          alt="Linear determinate Progress demo"
          value={progress}
          visible
        />
        <Progress
          appearance="linear"
          alt="Linear indeterminate Progress demo"
          visible
        />
        <Progress
          appearance="circular"
          alt="Circular determinate Progress demo"
          value={progress}
          visible
        />
        <Progress
          appearance="circular"
          alt="Circular indeterminate Progress demo"
          visible
        />
      </Columns>
    </Section>
  );
};

export default ProgressSection;
