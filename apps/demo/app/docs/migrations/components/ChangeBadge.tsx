import cn from "@/lib/helpers/cn";
import { MaterialIcon, Text } from "@suankularb-components/react";
import type { FC } from "react";

const STYLES_BY_TYPE = {
  new: {
    className:
      "bg-primary-container text-primary contrast-more:text-on-primary-container",
    icon: "star",
    string: "New",
  },
  changed: {
    className:
      "bg-secondary-container text-secondary contrast-more:text-on-secondary-container",
    icon: "edit",
    string: "Changed",
  },
  removed: {
    className:
      "bg-error-container text-error contrast-more:text-on-error-container",
    icon: "delete",
    string: "Removed",
  },
};

const ChangeBadge: FC<{
  type: "new" | "changed" | "removed";
}> = ({ type }) => (
  <Text
    type="title-small"
    className={cn(
      "inline-flex items-center gap-1 rounded-sm p-1 pr-2 forced-colors:border",
      STYLES_BY_TYPE[type].className,
    )}
  >
    <MaterialIcon icon={STYLES_BY_TYPE[type].icon} size={20} />{" "}
    {STYLES_BY_TYPE[type].string}
  </Text>
);

export default ChangeBadge;
