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
    <section className="mt-4 mb-6 space-y-3">
      {/* Card */}
      <div className="bg-surface-container border-outline-variant rounded-lg border">
        {/* Sample */}
        <div className="bg-surface relative isolate grid max-h-108 min-h-48 list-none place-items-center overflow-y-hidden rounded-[inherit] p-10 *:first:relative *:first:inset-0">
          <Component {...initialProps} {...adjustedProps} />
        </div>

        {/* Adjustable props */}
        {adjustableProps && (
          <ChipSet
            scrollable
            className="light:[--adaptive-secondary-container:var(--color-secondary-fixed-dim)] px-4 py-3"
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

      {/* Development-only warning */}
      {process.env.NODE_ENV === "development" && (
        <Text
          type="title-small"
          element="p"
          className="text-on-error-container bg-error-container rounded-md px-4 py-2 md:text-center md:text-balance"
        >
          Do not rely on the output of this demo when developing components for
          SKCom. This demo is for the consumer&rsquo;s convenience only and does
          not reflect actual output.
        </Text>
      )}

      {/* Notes */}
      <Text
        type="body-small"
        element="span"
        className="text-on-surface-variant *:my-1"
      >
        <p>
          Visit the{" "}
          <Link href="/components" className="link">
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
