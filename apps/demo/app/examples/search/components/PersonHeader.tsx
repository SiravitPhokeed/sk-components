import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import {
  Avatar,
  Header,
  ChipSet,
  AssistChip,
  MaterialIcon,
} from "@suankularb-components/react";

const PersonHeader: StyleableFC<{
  name: string;
}> = ({ name, className, style }) => (
  <div
    className={cn("flex flex-col gap-6 p-4 md:flex-row", className)}
    style={style}
  >
    <Avatar className="h-16 w-16 shrink-0" />
    <div className="flex flex-col gap-4 md:gap-2">
      <Header>{name}</Header>
      <ChipSet scrollable className="-m-4 p-4 md:ms-0 md:ps-0">
        <AssistChip icon={<MaterialIcon icon="download" />}>
          Save contact
        </AssistChip>
        <AssistChip icon={<MaterialIcon icon="groups" />}>See class</AssistChip>
        <AssistChip icon={<MaterialIcon icon="dashboard" />}>
          See schedule
        </AssistChip>
      </ChipSet>
    </div>
  </div>
);

export default PersonHeader;
