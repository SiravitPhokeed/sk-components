"use client";

import DemoCardChip from "@/app/docs/components/DemoCardChip";
import { ChipSet } from "@suankularb-components/react";
import { useState, type FC } from "react";

const DemoCard: FC<{
  component: FC;
  initialProps?: Record<string, unknown>;
  adjustableProps?: Record<string, string[] | "boolean">;
}> = ({ component: Component, initialProps, adjustableProps }) => {
  const [adjustedProps, setAdjustedProps] = useState<
    Record<string, string | boolean>
  >({});

  return (
    <section className="bg-surface-container border-outline-variant my-6 rounded-lg border">
      <div className="bg-surface grid min-h-48 place-items-center rounded-[inherit] p-10">
        <Component {...initialProps} {...adjustedProps} />
      </div>
      <ChipSet
        scrollable
        className="light:[--adaptive-secondary-container:var(--secondary-fixed-dim)] px-4 py-3"
      >
        {Object.entries(adjustableProps || {}).map(([prop, values]) => (
          <DemoCardChip
            key={prop}
            prop={prop}
            values={values}
            adjustedProps={adjustedProps}
            setAdjustedProps={setAdjustedProps}
          />
        ))}
      </ChipSet>
    </section>
  );
};

export default DemoCard;
