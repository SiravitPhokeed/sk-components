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
        <FormGroup name="atk-result" label="ATK result">
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
        <Radio value="disabled-a" disabled />
        <Radio value="disabled-b" checked disabled />
      </div>
    </Section>
  );
};

export default RadioSection;
