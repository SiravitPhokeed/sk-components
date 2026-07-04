import cn from "@/lib/helpers/cn";
import { TableCell, TableRow } from "@suankularb-components/react";
import type { FC, ReactNode } from "react";

const PropsTableRow: FC<{
  children: ReactNode;
  prop: string;
  required?: "always" | "conditional" | "never";
}> = ({ children, prop, required = "never" }) => (
  <TableRow className="*:last:*:block [&_pre]:rounded-sm [&_pre]:p-1.5">
    <TableCell>
      <code
        className={cn(
          "rounded-xs px-1.5 text-[0.9em]",
          new Map([
            ["always", "bg-secondary text-on-secondary"],
            ["conditional", "bg-primary-container text-on-primary-container"],
            ["never", "bg-surface-variant text-on-surface-variant"],
          ]).get(required),
        )}
      >
        {prop}
      </code>
      {required !== "never" && (
        <span
          title={new Map([
            ["always", "Required"],
            [
              "conditional",
              "See the description for when this prop is required",
            ],
          ]).get(required)}
          className="text-primary"
        >
          *
        </span>
      )}
    </TableCell>
    {children}
  </TableRow>
);

export default PropsTableRow;
