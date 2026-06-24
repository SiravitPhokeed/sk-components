"use client";

import {
  Section,
  SplitLayout,
  Header,
  Card,
  Actions,
  Button,
  Text,
} from "@suankularb-components/react";
import Link from "next/link";
import type { FC } from "react";

const SplitLayoutSection: FC = () => (
  <Section>
    <Header>Split Layout</Header>
    <SplitLayout ratio={[4, 8]}>
      <div>
        <Card appearance="outlined" className="grid! h-20 place-content-center">
          <Text type="headline-large">Left</Text>
        </Card>
      </div>
      <div>
        <Card
          appearance="outlined"
          className="h-20 place-content-center sm:grid!"
        >
          <Text type="headline-large">Right</Text>
        </Card>
      </div>
    </SplitLayout>
    <Actions>
      <Button appearance="outlined" href="/example/lookup" element={Link}>
        See full demo
      </Button>
    </Actions>
  </Section>
);

export default SplitLayoutSection;
