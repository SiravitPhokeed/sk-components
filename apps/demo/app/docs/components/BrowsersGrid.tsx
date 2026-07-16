import BrowsersGridButton from "@/app/docs/components/BrowsersGridButton";
import { Text } from "@suankularb-components/react";
import type { FC, ReactNode } from "react";

const DEFAULTS_COVERAGE = 91.9;
const toFixed = (coverage: number) =>
  coverage.toLocaleString("en-US", { maximumFractionDigits: 1 });

const BrowsersGrid: FC<{
  children: ReactNode;
  coverage?: number;
  browsersList?: string;
  note?: ReactNode;
}> = ({ children, coverage, browsersList, note }) => (
  <section className="my-4 space-y-2">
    <div className="divide-outline-variant border-outline-variant bg-surface divide-y overflow-hidden rounded-lg border-2">
      <ul
        role="list"
        className="*:border-outline-variant grid grid-cols-2 max-sm:*:odd:border-e max-sm:*:nth-last-[n+3]:border-b sm:grid-cols-1 sm:max-md:divide-y md:grid-cols-4 md:divide-x"
      >
        {children}
      </ul>
      {coverage !== undefined && (
        <div className="bg-surface-container-low relative flex items-start justify-between">
          <div
            className="border-e-outline-variant absolute inset-0 border-e-2 border-dotted"
            style={{ width: `${toFixed(DEFAULTS_COVERAGE)}%` }}
          />
          <div
            aria-hidden
            className="bg-surface-container-high ease-emphasized border-e-outline-variant absolute inset-0 origin-left scale-x-100 border-e transition-transform delay-200 duration-1000 rtl:origin-right starting:scale-x-0"
            style={{ width: `${toFixed(coverage)}%` }}
          />
          <Text
            type="title-small"
            element="p"
            className="relative z-10 my-2.5 ms-3"
          >
            {toFixed(coverage)}% audience coverage
          </Text>
          {browsersList && <BrowsersGridButton browsersList={browsersList} />}
        </div>
      )}
    </div>
    {note && (
      <Text type="body-medium" className="text-on-surface-variant">
        {note}
      </Text>
    )}
  </section>
);

export default BrowsersGrid;
