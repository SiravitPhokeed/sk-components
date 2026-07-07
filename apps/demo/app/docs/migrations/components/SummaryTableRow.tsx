import ChangeBadge from "@/app/docs/migrations/components/ChangeBadge";
import { TableCell, TableRow } from "@suankularb-components/react";
import type { ComponentProps, FC, ReactNode } from "react";

const SummaryTableRow: FC<{
  children: ReactNode;
  name: string;
  type: ComponentProps<typeof ChangeBadge>["type"];
}> = ({ children, name, type }) => (
  <TableRow>
    <TableCell align="left" className="*:gap-2 *:py-2">
      <ChangeBadge type={type} />
      <code>{name}</code>
    </TableCell>
    <TableCell align="left" className="*:py-2">
      {children}
    </TableCell>
  </TableRow>
);

export default SummaryTableRow;
