import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Card, Text } from "@suankularb-components/react";

const CurrentPeriodCard: StyleableFC = ({ className, style }) => (
  <Card
    appearance="outlined"
    stateLayerEffect
    style={style}
    className={cn("bg-surface relative overflow-hidden rounded-md", className)}
  >
    <div className="bg-surface-variant h-10 w-1/4" />
    <Text type="title-medium" element="p" className="absolute inset-s-3 top-2">
      Learning Chemistry 6
    </Text>
  </Card>
);

export default CurrentPeriodCard;
