import {
  ChipSet,
  Header,
  MaterialIcon,
  Section,
  SuggestionChip,
} from "@suankularb-components/react";
import type { FC } from "react";

const SuggestionChipSection: FC = () => (
  <Section>
    <Header level={3}>Suggestion Chip</Header>
    <ChipSet>
      <SuggestionChip>Looks good to me</SuggestionChip>
      <SuggestionChip icon={<MaterialIcon icon="thumb_up" />}>
        Looks good to me
      </SuggestionChip>
      <SuggestionChip icon={<MaterialIcon icon="thumb_up" />} disabled>
        Looks good to me
      </SuggestionChip>
    </ChipSet>
  </Section>
);

export default SuggestionChipSection;
