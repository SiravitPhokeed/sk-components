import { FilterChip, MenuItem } from "@suankularb-components/react";
import type { FC } from "react";

const DemoCardChip: FC<{
  prop: string;
  values: string[] | "boolean";
  adjustedProps: Record<string, string | boolean>;
  setAdjustedProps: React.Dispatch<
    React.SetStateAction<Record<string, string | boolean>>
  >;
}> = ({ prop, values, adjustedProps, setAdjustedProps }) => {
  if (values === "boolean") {
    return (
      <FilterChip
        selected={prop in adjustedProps && adjustedProps[prop] === true}
        onClick={(state) =>
          setAdjustedProps((prev) => ({ ...prev, [prop]: state }))
        }
      >
        <code>{prop}</code>
      </FilterChip>
    );
  }

  return (
    <FilterChip
      selected={prop in adjustedProps && adjustedProps[prop] !== undefined}
      menu={
        <>
          {values.map((value) => (
            <MenuItem
              key={value}
              value={value}
              selected={prop in adjustedProps && adjustedProps[prop] === value}
              command="hide-popover"
              onClick={() =>
                setAdjustedProps((prev) => ({
                  ...prev,
                  [prop]: value,
                }))
              }
            >
              <code>{value}</code>
            </MenuItem>
          ))}
        </>
      }
    >
      <code>{prop}</code>
    </FilterChip>
  );
};

export default DemoCardChip;
