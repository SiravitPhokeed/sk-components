"use client";

import {
  Columns,
  FormGroup,
  FormItem,
  Header,
  Radio,
  Section,
} from "@suankularb-components/react";
import { useState, type FC } from "react";

const RadioSection: FC = () => {
  const [atkResult, setATKResult] = useState<"negative" | "positive">();

  return (
    <Section>
      <Header>Radio</Header>
      <Columns columns={3}>
        <FormGroup label="ATK result">
          <FormItem label="Negative">
            <Radio
              value={atkResult === "negative"}
              onChange={() => setATKResult("negative")}
            />
          </FormItem>
          <FormItem label="Positive">
            <Radio
              value={atkResult === "positive"}
              onChange={() => setATKResult("positive")}
            />
          </FormItem>
        </FormGroup>
      </Columns>
      <div className="flex flex-row flex-wrap gap-4">
        <Radio value={false} disabled />
        <Radio value={true} disabled />
      </div>
    </Section>
  );
};

export default RadioSection;
