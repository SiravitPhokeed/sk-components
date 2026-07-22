import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Avatar, Card, CardHeader } from "@suankularb-components/react";

const StudentCard: StyleableFC<{
  name: string;
  classroom: `${number}`;
  selected?: boolean;
}> = ({ name, classroom, selected, className, style }) => (
  <li>
    <Card
      appearance="filled"
      direction="row"
      stateLayerEffect
      className={cn(
        "w-full rounded-none border-transparent bg-transparent sm:rounded-full forced-colors:border-0",
        selected &&
          "sm:border-outline-variant sm:bg-primary-container sm:text-on-primary-container sm:forced-colors:bg-[Highlight]",
        className,
      )}
      style={style}
    >
      <CardHeader
        avatar={
          <Avatar
            className={
              selected ? "sm:bg-primary sm:text-on-primary" : undefined
            }
          >
            {name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </Avatar>
        }
        title={name}
        subtitle={`M.${classroom}`}
      />
    </Card>
  </li>
);

export default StudentCard;
