"use client";

import RemoveStudentsDialog from "@/app/components/communication/components/RemoveStudentsDialog";
import {
  Actions,
  Button,
  Header,
  MaterialIcon,
  Section,
} from "@suankularb-components/react";
import type { FC } from "react";

const DialogSection: FC = () => {
  return (
    <Section>
      <Header>Dialog</Header>

      <Actions align="left">
        <Button
          appearance="filled"
          icon={<MaterialIcon icon="delete" />}
          dangerous
          command="show-modal"
          commandfor="remove-students-dialog"
        >
          Remove students
        </Button>
        <RemoveStudentsDialog />

        <Button
          appearance="outlined"
          icon={<MaterialIcon icon="bug_report" />}
          command="show-modal"
          commandfor="report-dialog"
        >
          Report issue
        </Button>
      </Actions>
    </Section>
  );
};

export default DialogSection;
