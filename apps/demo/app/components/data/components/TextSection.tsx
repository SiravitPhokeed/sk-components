import {
  Card,
  Columns,
  Header,
  Section,
  Text,
} from "@suankularb-components/react";
import type { FC } from "react";

const TextSection: FC = () => (
  <Section>
    <Header>Text</Header>

    <Columns columns={3}>
      {(["display", "headline", "title", "label", "body"] as const).map(
        (type) => (
          <Card
            key={type}
            appearance="outlined"
            className="gap-1 overflow-hidden px-4 py-2"
          >
            {(["large", "medium", "small"] as const).map((size) => (
              <Text
                key={size}
                type={`${type}-${size}`}
                className="whitespace-nowrap"
              >
                {type}-{size}
              </Text>
            ))}
          </Card>
        ),
      )}
    </Columns>
  </Section>
);

export default TextSection;
