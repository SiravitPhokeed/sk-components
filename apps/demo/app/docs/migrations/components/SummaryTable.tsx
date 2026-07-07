"use client";

import { Actions, Button, MaterialIcon } from "@suankularb-components/react";
import type { FC, ReactNode } from "react";
import { useRef } from "react";

const SummaryTable: FC<{ children: ReactNode }> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);

  function setAllDetailsOpenState(open: boolean) {
    if (!ref.current) return;
    for (const child of ref.current.children) {
      (child as HTMLDetailsElement).open = open;
    }
  }

  return (
    <>
      <Actions
        align="left"
        element={(props) => (
          <div {...props} aria-controls="figure-all-changes" />
        )}
        className="mt-6 mb-3"
      >
        <Button
          appearance="filled"
          icon={<MaterialIcon icon="expand_all" />}
          onClick={() => setAllDetailsOpenState(true)}
        >
          Open all
        </Button>
        <Button
          appearance="outlined"
          icon={<MaterialIcon icon="collapse_all" />}
          onClick={() => setAllDetailsOpenState(false)}
        >
          Collapse all
        </Button>
      </Actions>
      <figure
        id="figure-all-changes"
        className="border-outline-variant bg-surface mb-6 overflow-x-scroll overflow-y-hidden rounded-lg border-2"
      >
        <div
          ref={ref}
          className="divide-outline-variant w-full min-w-152 divide-y"
        >
          {children}
        </div>
      </figure>
    </>
  );
};

export default SummaryTable;
