import {
  Card,
  Columns,
  Header,
  Section,
  Text,
} from "@suankularb-components/react";
import type { FC } from "react";

const ColumnsSection: FC = () => (
  <Section>
    <Header>Columns</Header>
    <Columns columns={6}>
      {[...Array(12)].map((_, i) => (
        <Card
          key={i}
          appearance="outlined"
          className="grid h-20 place-content-center"
        >
          <Text type="headline-large">{i + 1}</Text>
        </Card>
      ))}
    </Columns>
  </Section>
);

export default ColumnsSection;
