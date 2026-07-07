import {
  Interactive,
  MaterialIcon,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Text,
} from "@suankularb-components/react";
import type { FC, ReactNode } from "react";

const SummaryTableSection: FC<{
  children: ReactNode;
  name: string;
}> = ({ children, name }) => (
  <details className="group">
    <Interactive
      element="summary"
      className="state-layer-on-surface flex items-center gap-2 p-4 ps-6 marker:hidden"
    >
      <Text type="title-medium" className="grow">
        {name}
      </Text>
      <MaterialIcon
        icon="chevron_right"
        className="text-on-surface-variant group-open:rotate-90"
      />
    </Interactive>
    <table className="-mb-px w-full">
      <TableHead>
        <TableRow>
          <TableCell header className="w-2/5">
            Change
          </TableCell>
          <TableCell header className="w-3/5">
            Details
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>{children}</TableBody>
    </table>
  </details>
);

export default SummaryTableSection;
