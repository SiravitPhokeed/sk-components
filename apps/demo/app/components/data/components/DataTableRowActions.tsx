import type { Task } from "@/app/components/data/components/DataTableSection";
import {
  Button,
  MaterialIcon,
  SegmentedButton,
} from "@suankularb-components/react";
import type { FC } from "react";

const DataTableRowActions: FC<{ task: Task }> = ({ task }) => {
  return (
    <SegmentedButton alt={`Row actions: ${task.task}`}>
      <Button
        appearance="text"
        icon={<MaterialIcon icon="edit" />}
        alt={`Edit: ${task.task}`}
        tooltip="Edit"
      />
      <Button
        appearance="text"
        icon={<MaterialIcon icon="delete" />}
        dangerous
        alt={`Delete: ${task.task}`}
        tooltip="Delete"
      />
    </SegmentedButton>
  );
};

export default DataTableRowActions;
