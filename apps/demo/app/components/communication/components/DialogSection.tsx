"use client";

import {
  Actions,
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  Header,
  List,
  ListItem,
  ListItemContent,
  MaterialIcon,
  Section,
} from "@suankularb-components/react";
import type { FC } from "react";

const DialogSection: FC = () => {
  return (
    <Section>
      <Header>Dialog</Header>

      {/* Dialog triggers */}
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
        <Button
          appearance="outlined"
          icon={<MaterialIcon icon="bug_report" />}
          command="show-modal"
          commandfor="report-dialog"
        >
          Report issue
        </Button>
      </Actions>

      {/* Remove students Dialog */}
      <Dialog id="remove-students-dialog">
        <DialogHeader
          title="Remove students?"
          desc="The following students will no longer have access to the
            organization “Kornor.”"
        />
        <DialogContent>
          <List divided>
            <ListItem align="center" lines={1}>
              <Avatar>ST</Avatar>
              <ListItemContent title="Sadudee Theparree" />
            </ListItem>
            <ListItem align="center" lines={1}>
              <Avatar>TL</Avatar>
              <ListItemContent title="Tempoom Leelacharoen" />
            </ListItem>
          </List>
        </DialogContent>
        <Actions>
          <Button
            appearance="text"
            command="close"
            commandfor="remove-students-dialog"
          >
            Cancel
          </Button>
          <Button
            appearance="text"
            command="close"
            commandfor="remove-students-dialog"
          >
            Remove
          </Button>
        </Actions>
      </Dialog>
    </Section>
  );
};

export default DialogSection;
