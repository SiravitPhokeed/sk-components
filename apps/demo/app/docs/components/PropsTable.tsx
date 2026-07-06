import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@suankularb-components/react";
import type { FC, ReactNode } from "react";

const PropsTable: FC<{ children: ReactNode }> = ({ children }) => (
  <Table contentWidth={800} className="my-6">
    <TableHead>
      <TableRow>
        <TableCell header className="w-1/5">
          Prop
        </TableCell>
        <TableCell header className="w-1/5">
          Type
        </TableCell>
        <TableCell header className="w-3/5">
          Description
        </TableCell>
      </TableRow>
    </TableHead>
    <TableBody className="[&_td>*]:my-5 [&_td>*]:justify-start [&_td>*]:py-0 [&_td>*]:text-start">
      {children}
    </TableBody>
  </Table>
);

export default PropsTable;
