import { TableCell, TableRow } from "@suankularb-components/react";
import type { FC, ReactNode } from "react";

const VersionsTableRow: FC<{
  version: string;
  children: ReactNode;
}> = ({ version, children }) => (
  <TableRow>
    <TableCell align="left">{version}</TableCell>
    <TableCell align="left" className="*:block *:py-2">
      {children}
    </TableCell>
  </TableRow>
);

export default VersionsTableRow;
