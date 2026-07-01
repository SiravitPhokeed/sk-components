"use client";

import {
  Columns,
  Header,
  MaterialIcon,
  MenuItem,
  Section,
  Select,
} from "@suankularb-components/react";
import type { FC } from "react";
import { useState } from "react";

type Frequency = "one-off" | "daily" | "weekly" | "monthly" | "annually";

const SelectSection: FC = () => {
  const [frequency, setFrequency] = useState<Frequency>();

  return (
    <Section>
      <Header>Select</Header>
      <Columns columns={3} className="gap-y-8!">
        <Select<Frequency>
          appearance="outlined"
          label="Frequency"
          helperMsg="How often students must do this form"
          value={frequency}
          onChange={setFrequency}
        >
          <MenuItem value="one-off">One-off</MenuItem>
          <MenuItem value="daily">Daily</MenuItem>
          <MenuItem value="weekly">Weekly</MenuItem>
          <MenuItem value="monthly">Monthly</MenuItem>
          <MenuItem
            disabled
            icon={<MaterialIcon icon="lock" />}
            value="annually"
          >
            Annually
          </MenuItem>
        </Select>

        <Select
          appearance="outlined"
          leading={<MaterialIcon icon="schedule" />}
          label="Frequency"
        />
        <Select appearance="filled" label="Frequency" className="col-start-1" />
        <Select
          appearance="filled"
          leading={<MaterialIcon icon="schedule" />}
          label="Frequency"
        />
      </Columns>
    </Section>
  );
};

export default SelectSection;
