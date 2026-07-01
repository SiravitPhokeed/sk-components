import {
  AssistChip,
  ChipSet,
  Header,
  MaterialIcon,
  Section,
} from "@suankularb-components/react";
import type { FC } from "react";

const AssistChipSection: FC = () => (
  <Section>
    <Header level={3}>Assist Chip</Header>
    <ChipSet>
      <AssistChip icon={<MaterialIcon icon="lightbulb" />}>
        Turn on lights
      </AssistChip>
      <AssistChip icon={<MaterialIcon icon="block" />} dangerous>
        Block number
      </AssistChip>
      <AssistChip icon={<MaterialIcon icon="lightbulb" />} disabled>
        Turn on lights
      </AssistChip>
    </ChipSet>
    <div className="from-primary-60 to-primary-30 flex flex-row flex-wrap place-content-center gap-2 rounded-md bg-linear-to-r px-4 py-8">
      <AssistChip icon={<MaterialIcon icon="lightbulb" />} elevated>
        Turn on lights
      </AssistChip>
      <AssistChip icon={<MaterialIcon icon="block" />} elevated dangerous>
        Block number
      </AssistChip>
      <AssistChip
        icon={<MaterialIcon icon="lightbulb" />}
        elevated
        dangerous
        disabled
      >
        Turn on lights
      </AssistChip>
    </div>
  </Section>
);

export default AssistChipSection;
