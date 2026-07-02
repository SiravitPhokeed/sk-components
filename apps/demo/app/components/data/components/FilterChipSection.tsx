"use client";

import {
  ChipSet,
  FilterChip,
  Header,
  MenuItem,
  // MenuItem,
  Section,
} from "@suankularb-components/react";
import { toggle } from "radash";
import type { FC } from "react";
import { useState } from "react";

type FilterChipFilter = "juniors" | "seniors" | "teachers" | "parents";

const FilterChipSection: FC = () => {
  const [filters, setFilters] = useState<FilterChipFilter[]>(["juniors"]);

  const toggleFilter = (toToggle: FilterChipFilter) =>
    setFilters((prev) => toggle(prev, toToggle));

  const toggleStudentsOptions = (toToggle: FilterChipFilter) =>
    setFilters((prev) => {
      const hasJuniorsOrSeniors = prev.some((filter) =>
        ["juniors", "seniors"].includes(filter),
      );
      if (hasJuniorsOrSeniors) {
        const newFilters = prev.filter(
          (filter) => !["juniors", "seniors"].includes(filter),
        );
        return prev.includes(toToggle)
          ? newFilters.filter((filter) => filter !== toToggle)
          : [...newFilters, toToggle];
      }
      return [...prev, toToggle];
    });

  return (
    <Section>
      <Header level={3}>Filter Chip</Header>
      <ChipSet>
        <FilterChip
          selected={filters.some((filter) =>
            ["juniors", "seniors"].includes(filter),
          )}
          menu={
            <>
              <MenuItem
                command="hide-popover"
                onClick={() => {
                  toggleStudentsOptions("juniors");
                }}
                selected={filters.includes("juniors")}
              >
                Juniors
              </MenuItem>
              <MenuItem
                command="hide-popover"
                onClick={() => {
                  setFilters((prev) => {
                    const newFilters = toggle(prev, "seniors");
                    return newFilters.filter((filter) => filter !== "juniors");
                  });
                }}
                selected={filters.includes("seniors")}
              >
                Seniors
              </MenuItem>
            </>
          }
        >
          {filters.includes("juniors")
            ? "Juniors"
            : filters.includes("seniors")
              ? "Seniors"
              : "Students"}
        </FilterChip>

        <FilterChip
          selected={filters.includes("teachers")}
          onClick={() => toggleFilter("teachers")}
        >
          Teachers
        </FilterChip>

        <FilterChip
          selected={filters.includes("parents")}
          onClick={() => toggleFilter("parents")}
        >
          Parents
        </FilterChip>
      </ChipSet>
    </Section>
  );
};

export default FilterChipSection;
