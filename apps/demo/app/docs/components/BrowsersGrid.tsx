import { Text } from "@suankularb-components/react";
import type { FC, ReactNode } from "react";

const BrowsersGrid: FC<{ children: ReactNode; note: ReactNode }> = ({
  children,
  note,
}) => (
  <section className="my-4 space-y-2">
    <ul
      role="list"
      className="border-outline-variant *:border-outline-variant grid grid-cols-2 overflow-hidden rounded-lg border-2 max-sm:*:odd:border-r max-sm:*:nth-last-[n+3]:border-b sm:grid-cols-1 sm:max-md:divide-y md:grid-cols-4 md:divide-x"
    >
      {children}
    </ul>
    {note && (
      <Text type="body-medium" className="text-on-surface-variant">
        {note}
      </Text>
    )}
  </section>
);

export default BrowsersGrid;
