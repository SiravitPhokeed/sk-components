"use client";

import {
  Card,
  Columns,
  FormItem,
  Header,
  MaterialIcon,
  Section,
  Switch,
} from "@suankularb-components/react";
import { useState, type FC } from "react";

const SwitchSection: FC = () => {
  const [allow, setAllow] = useState(false);
  const [switchOn, setSwitchOn] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [done, setDone] = useState(true);

  return (
    <Section>
      <Header>Switch</Header>
      <Columns columns={3}>
        <Card appearance="outlined" className="p-4 min-w-60">
          <FormItem label="Allow notifications">
            <Switch value={allow} onChange={setAllow} />
          </FormItem>
        </Card>
      </Columns>
      <div className="flex flex-row flex-wrap gap-2">
        <Switch value={switchOn} onChange={setSwitchOn} />
        <Switch disabled />
        <Switch
          value={done}
          onChange={setDone}
          onIcon={<MaterialIcon icon="done" />}
        />
        <Switch
          value={darkMode}
          onChange={setDarkMode}
          offIcon={<MaterialIcon icon="light_mode" />}
          onIcon={<MaterialIcon icon="dark_mode" />}
        />
        <Switch value={true} onIcon={<MaterialIcon icon="edit" />} disabled />
      </div>
    </Section>
  );
};

export default SwitchSection;
