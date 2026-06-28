"use client";

import {
  ChipSet,
  FilterChip,
  Header,
  // MenuItem,
  Section,
} from "@suankularb-components/react";
import { toggle } from "radash";
import type { FC } from "react";
import { useState } from "react";

type FilterChipFilter = "students" | "teachers" | "parents";

const FilterChipSection: FC = () => {
  const [filters, setFilters] = useState<FilterChipFilter[]>(["students"]);
  // const [showStudentsOptions, setShowStudentsOptions] =
  //   useState(false);

  const toggleFilter = (toToggle: FilterChipFilter) =>
    setFilters(toggle(filters, toToggle));

  return (
    <Section>
      <Header level={3}>Filter Chip</Header>
      <ChipSet>
        <FilterChip
          selected={filters.includes("students")}
          onClick={() => toggleFilter("students")}
          // onMenuToggle={() => setShowStudentsOptions(!showStudentsOptions)}
          // menu={
          //   <Menu open={showStudentsOptions} density={-4}>
          //     <MenuItem onClick={() => setShowStudentsOptions(false)} selected>
          //       Juniors
          //     </MenuItem>
          //     <MenuItem onClick={() => setShowStudentsOptions(false)}>
          //       Seniors
          //     </MenuItem>
          //   </Menu>
          // }
        >
          Students
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
