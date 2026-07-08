"use client";

import BrandIcon from "@/components/BrandIcon";
import {
  AssistChip,
  ChipSet,
  MaterialIcon,
} from "@suankularb-components/react";
import type { FC } from "react";

const MATERIAL_BASE_URL = "https://m3.material.io";
const SOURCE_BASE_URL =
  "https://github.com/suankularb-wittayalai-school/sk-components/tree/main/packages/react/src/components";

const LinksChipSet: FC<{
  material?: string;
  source?: string;
}> = ({ material, source }) => (
  <ChipSet className="mt-5">
    <AssistChip
      icon={<BrandIcon icon="material_design" />}
      disabled={!material}
      href={MATERIAL_BASE_URL + material}
      element={(props) => <a {...props} target="_blank" />}
    >
      M3 guidelines
    </AssistChip>
    <AssistChip
      icon={<MaterialIcon icon="code" />}
      disabled={!source}
      href={SOURCE_BASE_URL + source}
      element={(props) => <a {...props} target="_blank" />}
    >
      View source
    </AssistChip>
  </ChipSet>
);

export default LinksChipSet;
