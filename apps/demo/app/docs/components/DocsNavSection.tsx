import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Interactive, MaterialIcon, Text } from "@suankularb-components/react";
import type { ReactNode } from "react";

const DocsNavSection: StyleableFC<{
  children: ReactNode;
  title: string;
  open?: boolean;
}> = ({ children, title, open, className, style }) => (
  <details open={open} className={cn("group", className)} style={style}>
    <Interactive
      element="summary"
      className="state-layer-on-surface flex items-center gap-2 rounded-full px-2 py-1.5 marker:hidden"
    >
      <Text type="title-medium" className="grow">
        {title}
      </Text>
      <MaterialIcon
        icon="chevron_right"
        className="text-on-surface-variant group-open:rotate-90"
      />
    </Interactive>
    <div className="border-s-outline-variant ms-2 mt-1 border-s ps-2">
      {children}
    </div>
  </details>
);

export default DocsNavSection;
