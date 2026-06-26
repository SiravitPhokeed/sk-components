"use client";

import { Actions, Button, Header, Section } from "@suankularb-components/react";
import { snackbar } from "@suankularb-components/react/helpers";
import type { FC } from "react";

const SnackbarSection: FC = () => {
  return (
    <Section>
      <Header>Snackbar</Header>

      <Actions align="left">
        <Button
          appearance="filled"
          onClick={() => {
            const dismiss = snackbar.push(
              "Task failed successfully",
              <Button appearance="text" onClick={() => dismiss()}>
                Dismiss
              </Button>,
            );
          }}
        >
          Show snackbar
        </Button>

        <Button
          appearance="outlined"
          onClick={() => {
            const dismiss = snackbar.push(
              "Task appeared more complicated to fail than expected, failed to fail task",
              <Button appearance="text" onClick={() => dismiss()}>
                Try again
              </Button>,
              { stacked: true },
            );
          }}
        >
          Show stacked snackbar
        </Button>
      </Actions>
    </Section>
  );
};

export default SnackbarSection;
