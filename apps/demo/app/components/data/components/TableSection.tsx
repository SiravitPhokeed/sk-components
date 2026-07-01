import {
  Header,
  Section,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@suankularb-components/react";
import type { FC } from "react";

const TableSection: FC = () => (
  <Section>
    <Header>Table</Header>
    <Table contentWidth={480}>
      <TableHead>
        <TableRow>
          <TableCell header>Test date</TableCell>
          <TableCell header>Method</TableCell>
          <TableCell header>Result</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        <TableRow>
          <TableCell>Jan 8, 2023</TableCell>
          <TableCell>ATK via saliva</TableCell>
          <TableCell>Negative</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jan 1, 2023</TableCell>
          <TableCell>RT-PCR</TableCell>
          <TableCell>Positive</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Jan 1, 2023</TableCell>
          <TableCell>ATK via saliva</TableCell>
          <TableCell>Positive</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  </Section>
);

export default TableSection;
