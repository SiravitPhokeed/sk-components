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
import { useState, type FC } from "react";

const DialogSection: FC = () => {
  const [showRemoveStudents, setShowRemoveStudents] = useState(false);

  return (
    <Section>
      <Header>Dialog</Header>

      {/* Dialog triggers */}
      <Actions align="left">
        <Button
          appearance="filled"
          icon={<MaterialIcon icon="delete" />}
          dangerous
          onClick={() => setShowRemoveStudents(true)}
        >
          Remove students
        </Button>
        <Button
          appearance="outlined"
          icon={<MaterialIcon icon="bug_report" />}
          // onClick={() => setShowReport(true)}
        >
          Report issue
        </Button>
      </Actions>

      {/* Remove students Dialog */}
      <Dialog
        open={showRemoveStudents}
        onClose={() => setShowRemoveStudents(false)}
      >
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
            onClick={() => setShowRemoveStudents(false)}
          >
            Cancel
          </Button>
          <Button
            appearance="text"
            onClick={() => setShowRemoveStudents(false)}
          >
            Remove
          </Button>
        </Actions>
      </Dialog>
    </Section>
  );
};

export default DialogSection;
