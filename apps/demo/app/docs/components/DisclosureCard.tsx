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
    className="details group has-focus-visible:animate-focus my-4 block"
  >
    <Interactive
      element="summary"
      className="state-layer-on-surface flex items-center gap-1 px-4 py-3 focus-visible:animate-none"
    >
      <Text type="title-medium" className="text-balance">
        {summary}
      </Text>
      <MaterialIcon
        icon="chevron_right"
        directional
        className="text-on-surface-variant shrink-0 group-open:rotate-90 supports-interpolate-size:transition-transform group-open:rtl:-rotate-90"
      />
    </Interactive>
    <section className="px-4 pt-2 pb-3 *:first:mt-0 *:last:mb-0 **:[blockquote,pre]:-mx-4 **:[blockquote,pre]:rounded-none">
      {children}
    </section>
  </Card>
);

export default DisclosureCard;
