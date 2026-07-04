"use client";

import DemoCardChip from "@/app/docs/components/DemoCardChip";
import { ChipSet, Text } from "@suankularb-components/react";
import Link from "next/link";
import type { FC, ReactNode } from "react";
import { useState } from "react";

const DemoCard = ({
  children,
  component: Component,
  initialProps,
  adjustableProps,
}: {
  children?: ReactNode;
  component: FC;
  initialProps?: Record<string, unknown>;
  adjustableProps?: Record<string, string[] | "boolean">;
}) => {
  const [adjustedProps, setAdjustedProps] = useState<
    Record<string, string | boolean>
  >({});

  return (
    <section className="my-6 space-y-3">
      <div className="bg-surface-container border-outline-variant rounded-lg border">
        <div className="bg-surface grid min-h-48 list-none place-items-center overflow-x-auto rounded-[inherit] p-10 *:first:relative *:first:inset-0">
          <Component {...initialProps} {...adjustedProps} />
        </div>
        {adjustableProps && (
          <ChipSet
            scrollable
            className="light:[--adaptive-secondary-container:var(--secondary-fixed-dim)] px-4 py-3"
          >
            {Object.entries(adjustableProps).map(([prop, values]) => (
              <DemoCardChip
                key={prop}
                prop={prop}
                values={values}
                adjustedProps={adjustedProps}
                setAdjustedProps={setAdjustedProps}
              />
            ))}
          </ChipSet>
        )}
      </div>
      <Text
        type="body-small"
        element="span"
        className="text-on-surface-variant *:my-1"
      >
        <p>
          Visit the{" "}
          <Link href="/components" className="text-primary font-bold underline">
            Components page
          </Link>{" "}
          for an interactive demo.
        </p>
        {children}
      </Text>
    </section>
  );
};

export default DemoCard;
