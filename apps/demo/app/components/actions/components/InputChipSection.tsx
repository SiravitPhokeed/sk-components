"use client";

import {
  Avatar,
  ChipSet,
  Header,
  InputChip,
  Section,
} from "@suankularb-components/react";
import type { FC } from "react";

const InputChipSection: FC = () => {
  return (
    <Section>
      <Header level={3}>Input Chip</Header>
      <ChipSet>
        <InputChip onClick={() => {}}>Siravit Phokeed</InputChip>
        <InputChip onDelete={() => {}}>Siravit Phokeed</InputChip>
        <InputChip selected onDelete={() => {}}>
          Siravit Phokeed
        </InputChip>
        <InputChip avatar={<Avatar />} onClick={() => {}}>
          Siravit Phokeed
        </InputChip>
        <InputChip avatar={<Avatar />} onDelete={() => {}}>
          Siravit Phokeed
        </InputChip>
        <InputChip avatar={<Avatar />} selected onDelete={() => {}}>
          Siravit Phokeed
        </InputChip>
      </ChipSet>
    </Section>
  );
};

export default InputChipSection;
