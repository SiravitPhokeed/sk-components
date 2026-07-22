import BrowsersGridButton from "@/app/docs/components/BrowsersGridButton";
import { Text } from "@suankularb-components/react";
import type { FC, ReactNode } from "react";

/**
 * Browserslist `defaults` coverage for Thailand as of July 2026.
 * @see {@link https://browsersl.ist/#q=defaults&region=TH `defaults` on Browserslist}
 */
const DEFAULTS_COVERAGE_FIXED = "91.9";
const formatCoverage = (coverage: number) =>
  coverage.toLocaleString("en-US", { maximumFractionDigits: 1 });

const BrowsersGrid: FC<{
  children: ReactNode;
  coverage?: number;
  browsersList?: string;
  note?: ReactNode;
}> = ({ children, coverage, browsersList, note }) => {
  const coverageFixed =
    coverage !== undefined ? formatCoverage(coverage) : null;

  return (
    <section className="my-4 space-y-2">
      <div className="divide-outline-variant border-outline-variant bg-surface divide-y overflow-hidden rounded-lg border-2">
        <ul
          aria-label="Supported browsers"
          role="list"
          className="*:border-outline-variant grid grid-cols-2 max-sm:*:odd:border-e max-sm:*:nth-last-[n+3]:border-b sm:grid-cols-1 sm:max-md:divide-y md:grid-cols-4 md:divide-x"
        >
          {children}
        </ul>
        {coverage !== undefined && (
          <div className="bg-surface-container-low relative flex items-start justify-between">
            <div
              aria-hidden
              className="border-e-outline-variant absolute inset-0 border-e-2 border-dotted"
              style={{ width: `${DEFAULTS_COVERAGE_FIXED}%` }}
            />
            <div
              aria-hidden
              className="bg-surface-container-high ease-emphasized border-e-outline-variant absolute inset-0 origin-left scale-x-100 border-e transition-transform delay-200 duration-1000 rtl:origin-right motion-safe:starting:scale-x-0"
              style={{ width: `${coverageFixed}%` }}
            />
            <Text
              type="title-small"
              element="p"
              className="relative z-10 my-2.5 ms-3"
            >
              {coverageFixed}% audience coverage
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
};

export default BrowsersGrid;
