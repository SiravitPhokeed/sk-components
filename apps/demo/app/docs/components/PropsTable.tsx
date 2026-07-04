import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@suankularb-components/react";
import type { FC, ReactNode } from "react";

const PropsTable: FC<{ children: ReactNode }> = ({ children }) => (
  <Table contentWidth={600} className="my-6">
    <TableHead>
      <TableRow>
        <TableCell header>Prop</TableCell>
        <TableCell header>Type</TableCell>
        <TableCell header>Description</TableCell>
      </TableRow>
    </TableHead>
    <TableBody className="[&_td>*]:justify-start [&_td>*]:py-0 [&_td>*]:my-5 [&_td>*]:text-start">
      {children}
    </TableBody>
  </Table>
);

export default PropsTable;
