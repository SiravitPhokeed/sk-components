"use client";

import {
  Checkbox,
  // FormItem,
  Header,
  Section,
} from "@suankularb-components/react";
import type { FC } from "react";
import { useState } from "react";

const CheckboxSection: FC = () => {
  const [termsAgreed, setTermsAgreed] = useState(false);

  const [checked, setChecked] = useState(false);
  const [tristateChecked, setTristateChecked] = useState<boolean | null>(null);

  return (
    <Section>
      <Header>Checkbox</Header>
      {/* <FormItem label="I agree to the terms and conditions">
        <Checkbox value={termsAgreed} onChange={setTermsAgreed} />
      </FormItem> */}
      <div className="flex flex-row flex-wrap gap-4">
        <Checkbox value={checked} onChange={setChecked} />
        <Checkbox
          value={tristateChecked}
          onChange={setTristateChecked}
          tristate
        />
        <Checkbox value={false} disabled />
        <Checkbox value={true} disabled />
      </div>
    </Section>
  );
};

export default CheckboxSection;
