import {
  Header,
  Interactive,
  Section,
  Text,
} from "@suankularb-components/react";
import type { FC } from "react";

const InteractiveSection: FC = () => (
  <Section>
    <Header>Interactive</Header>
    <Interactive
      shadowEffect
      className="bg-secondary-container text-on-secondary-container state-layer-on-secondary-container flex h-14 w-24 flex-col rounded-sm px-4 py-2 text-left transition-[border,background-color,color] *:w-full *:truncate *:break-all"
      element="button"
    >
      <Text type="title-medium" className="bg-transparent">
        English
      </Text>
      <Text type="body-small" className="bg-transparent">
        Atipol
      </Text>
    </Interactive>
  </Section>
);

export default InteractiveSection;
