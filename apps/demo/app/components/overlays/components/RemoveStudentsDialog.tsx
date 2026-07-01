import {
  Actions,
  Avatar,
  Button,
  Dialog,
  DialogContent,
  DialogHeader,
  List,
  ListItem,
  ListItemContent,
} from "@suankularb-components/react";
import { snackbar } from "@suankularb-components/react/helpers";

const RemoveStudentsDialog = () => (
  <Dialog id="remove-students-dialog">
    <DialogHeader
      title="Remove students?"
      desc="The following students will no longer have access to the organization “Kornor.”"
    />
    <DialogContent>
      <List divided>
        <ListItem align="center" lines={1}>
          <Avatar>PS</Avatar>
          <ListItemContent title="Pansa Santisakul" />
        </ListItem>
        <ListItem align="center" lines={1}>
          <Avatar>WR</Avatar>
          <ListItemContent title="Wasapol Rassameechot" />
        </ListItem>
      </List>
    </DialogContent>
    <Actions>
      <Button
        appearance="text"
        command="request-close"
        commandfor="remove-students-dialog"
      >
        Cancel
      </Button>
      <Button
        appearance="text"
        autoFocus
        command="request-close"
        commandfor="remove-students-dialog"
        onClick={() => snackbar.push("Students removed")}
      >
        Remove
      </Button>
    </Actions>
  </Dialog>
);

export default RemoveStudentsDialog;
