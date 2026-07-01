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
      className="bg-secondary-container! text-on-secondary-container state-layer-on-secondary-container grid! h-14 w-24 rounded-sm px-4 py-2 text-start transition-[border,background-color,color]"
      element="button"
    >
      <Text type="title-medium">English</Text>
      <Text type="body-small">Atipol</Text>
    </Interactive>
  </Section>
);

export default InteractiveSection;
