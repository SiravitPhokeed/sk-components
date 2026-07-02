import type { StyleableFC } from "@/lib/types";
import type { ReactNode } from "react";

const SearchDetailsCard: StyleableFC<{
  children: ReactNode;
}> = ({ children, className, style }) => (
  <div className={className} style={style}>
    <div className="border-outline-variant bg-surface-container-highest relative flex h-full flex-col overflow-hidden rounded-xl border sm:overflow-auto md:overflow-hidden">
      {children}
    </div>
  </div>
);

export default SearchDetailsCard;
