"use client";

import {
  Actions,
  Button,
  Header,
  MaterialIcon,
  Section,
} from "@suankularb-components/react";
import { useState, type FC } from "react";

const ButtonsSection: FC = () => {
  const [loading, setLoading] = useState(false);

  return (
    <Section>
      <Header level={3}>Common Button</Header>
      <Actions align="left">
        <Button appearance="filled">Button</Button>
        <Button appearance="filled" icon={<MaterialIcon icon="add" />}>
          Button
        </Button>
        <Button appearance="filled" dangerous>
          Button
        </Button>
        <Button appearance="filled" disabled>
          Button
        </Button>
        <Button appearance="tonal">Button</Button>
        <Button appearance="tonal" dangerous>
          Button
        </Button>
        <Button appearance="tonal" disabled>
          Button
        </Button>
        <Button appearance="outlined">Button</Button>
        <Button appearance="outlined" dangerous>
          Button
        </Button>
        <Button appearance="outlined" disabled>
          Button
        </Button>
        <Button appearance="text">Button</Button>
        <Button appearance="text" dangerous>
          Button
        </Button>
        <Button appearance="text" disabled>
          Button
        </Button>
      </Actions>
      <Actions align="full">
        <Button
          appearance="filled"
          icon={<MaterialIcon icon="add" />}
          onClick={() => {
            setLoading(true);
            setTimeout(() => setLoading(false), 2000);
          }}
          loading={loading}
        >
          Add
        </Button>
        <Button
          appearance="outlined"
          icon={<MaterialIcon icon="delete" />}
          dangerous
        >
          Delete
        </Button>
      </Actions>
    </Section>
  );
};

export default ButtonsSection;
