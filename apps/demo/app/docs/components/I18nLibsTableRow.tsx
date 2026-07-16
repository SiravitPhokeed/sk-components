import {
  MaterialIcon,
  TableCell,
  TableRow,
} from "@suankularb-components/react";
import type { FC } from "react";

const I18nLibsTableRow: FC<{
  library: string;
  href: string;
  imports: string[];
  client: string;
  server?: string;
}> = ({ library, href, imports, client, server }) => (
  <TableRow>
    <TableCell header scope="row" align="left">
      <a href={href} target="_blank" className="link">
        {library}
        <MaterialIcon
          icon="arrow_outward"
          size={20}
          directional
          className="-mt-1 inline-block"
        />
      </a>
    </TableCell>
    <TableCell align="left">
      {imports.length > 1 ? (
        <ul role="list" className="marker:text-outline list-inside list-disc">
          {imports.map((imp) => (
            <li key={imp}>
              <code>{imp}</code>
            </li>
          ))}
        </ul>
      ) : (
        <code>{imports[0]}</code>
      )}
    </TableCell>
    <TableCell align="left">
      <code>{client}</code>
    </TableCell>
    {server ? (
      <TableCell align="left">
        <code>{server}</code>
      </TableCell>
    ) : (
      <TableCell className="bg-surface-container">
        <span title="Not supported in Server Components">—</span>
      </TableCell>
    )}
  </TableRow>
);

export default I18nLibsTableRow;
