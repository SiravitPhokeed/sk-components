import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@suankularb-components/react";
import type { FC, ReactNode } from "react";

const I18nLibsTable: FC<{ children: ReactNode }> = ({ children }) => (
  <Table contentWidth={1200} className="my-6">
    <TableHead>
      <TableRow>
        <TableCell header>Library</TableCell>
        <TableCell header>Import</TableCell>
        <TableCell header>Client Components</TableCell>
        <TableCell header>Server Components</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>{children}</TableBody>
  </Table>
);

export default I18nLibsTable;
