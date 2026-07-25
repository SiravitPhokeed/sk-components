import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Interactive, MaterialIcon, Text } from "@suankularb-components/react";
import type { ReactElement, ReactNode } from "react";

const DocsNavSection: StyleableFC<{
  children: ReactNode;
  icon: ReactElement<typeof MaterialIcon>;
  title: string;
  open?: boolean;
}> = ({ children, icon, title, open, className, style }) => (
  <details
    open={open}
    className={cn(
      "details group -m-3 -mb-4 p-3 details-content:opacity-0 open:details-content:opacity-100 supports-interpolate-size:details-content:transition-[height,opacity,content-visibility]",
      className,
    )}
    style={style}
  >
    <Interactive
      element="summary"
      className="state-layer-on-surface flex items-center gap-2 rounded-full px-2 py-1.5 marker:hidden"
    >
      <span className="text-on-surface-variant">{icon}</span>
      <Text type="title-medium" element="h3" className="grow">
        {title}
      </Text>
      <MaterialIcon
        icon="chevron_right"
        directional
        className="text-on-surface-variant group-open:rotate-90 supports-interpolate-size:transition-transform group-open:rtl:-rotate-90"
      />
    </Interactive>
    <ul
      aria-label={title}
      role="list"
      className="before:bg-outline-variant relative ms-4 ps-2 pt-1 before:absolute before:inset-s-0 before:top-1 before:bottom-0 before:w-px forced-colors:before:bg-[CanvasText]"
    >
      {children}
    </ul>
  </details>
);

export default DocsNavSection;
