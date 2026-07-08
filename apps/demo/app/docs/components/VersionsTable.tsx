import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@suankularb-components/react";
import type { FC, ReactNode } from "react";

const VersionsTable: FC<{ children: ReactNode }> = ({ children }) => (
  <Table contentWidth={480}>
    <TableHead>
      <TableRow>
        <TableCell header className="w-28">
          Version
        </TableCell>
        <TableCell header>Changes</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>{children}</TableBody>
  </Table>
);

export default VersionsTable;
