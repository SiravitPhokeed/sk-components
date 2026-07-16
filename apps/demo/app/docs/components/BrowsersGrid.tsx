import type { FC, ReactNode } from "react";

const BrowsersGrid: FC<{ children: ReactNode }> = ({ children }) => (
  <ul
    role="list"
    className="border-outline-variant *:border-outline-variant my-4 grid grid-cols-2 overflow-hidden rounded-lg border-2 max-sm:*:odd:border-r max-sm:*:nth-last-[n+3]:border-b sm:grid-cols-1 sm:max-md:divide-y md:grid-cols-4 md:divide-x"
  >
    {children}
  </ul>
);

export default BrowsersGrid;
