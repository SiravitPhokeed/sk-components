"use client";

import {
  Columns,
  FormGroup,
  FormItem,
  Header,
  Radio,
  Section,
} from "@suankularb-components/react";
import type { FC } from "react";
import { useState } from "react";

const RadioSection: FC = () => {
  const [atkResult, setATKResult] = useState<"negative" | "positive">();

  return (
    <Section>
      <Header>Radio</Header>
      <Columns columns={3}>
        <FormGroup label="ATK result">
          <FormItem label="Negative">
            <Radio
              value="negative"
              checked={atkResult === "negative"}
              onChange={setATKResult}
            />
          </FormItem>
          <FormItem label="Positive">
            <Radio
              value="positive"
              checked={atkResult === "positive"}
              onChange={setATKResult}
            />
          </FormItem>
        </FormGroup>
      </Columns>
      <div className="flex flex-row flex-wrap gap-4">
        <Radio disabled />
        <Radio checked disabled />
      </div>
    </Section>
  );
};

export default RadioSection;
