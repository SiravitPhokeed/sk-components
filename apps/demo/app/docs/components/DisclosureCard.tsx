import {
  Card,
  Interactive,
  MaterialIcon,
  Text,
} from "@suankularb-components/react";
import type { FC, ReactNode } from "react";

const DisclosureCard: FC<{
  children: ReactNode;
  summary: string;
}> = ({ children, summary }) => (
  <Card
    element="details"
    appearance="outlined"
    className="group my-4 overflow-hidden"
  >
    <Interactive
      element="summary"
      className="state-layer-on-surface flex items-center gap-1 px-4 py-3"
    >
      <Text type="title-medium">{summary}</Text>
      <MaterialIcon
        icon="chevron_right"
        directional
        className="text-on-surface-variant shrink-0 group-open:rotate-90 group-open:rtl:-rotate-90"
      />
    </Interactive>
    <section className="px-4 pt-1 pb-3">{children}</section>
  </Card>
);

export default DisclosureCard;
