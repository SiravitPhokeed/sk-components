import {
  Header,
  MaterialIcon,
  Section,
  type MaterialIconProps,
} from "@suankularb-components/react";
import { list } from "radash";
import type { FC } from "react";

const FILLS = [false, true];
const SIZES = [20, 24, 40, 48] as const;
const WEIGHTS = [300, 400, 500, 600, 700] as const;

const MaterialIconSection: FC = () => (
  <Section>
    <Header>Material Icon</Header>
    <div className="text-on-surface-variant">
      {WEIGHTS.map((weight) => (
        <div key={weight} className="flex items-center">
          {FILLS.map((fill) =>
            SIZES.map((size) => (
              <MaterialIcon
                key={`${fill}-${size}`}
                icon="assignment"
                fill={fill}
                size={size}
                weight={weight}
              />
            )),
          )}
        </div>
      ))}
    </div>
  </Section>
);

export default MaterialIconSection;
