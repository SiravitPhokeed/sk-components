import cn from "@/lib/helpers/cn";
import type { MaterialIconProps } from "@suankularb-components/react";
import { MaterialIcon } from "@suankularb-components/react";
import type { FC } from "react";

const TIER_ICONS = {
  full: { icon: "check_circle", className: "text-primary" },
  partial: { icon: "do_not_disturb_on", className: "text-outline -rotate-45" },
  none: { icon: "cancel", className: "text-error" },
} as const;

const SupportTierIcon: FC<{
  tier: keyof typeof TIER_ICONS;
  inline?: boolean;
  size?: MaterialIconProps["size"];
}> = ({ tier, inline, size }) => {
  const { icon, className: tierClassName } = TIER_ICONS[tier];
  return (
    <MaterialIcon
      icon={icon}
      size={size ?? (inline ? 20 : undefined)}
      className={cn(tierClassName, inline && "-mb-1 inline-block")}
    />
  );
};

export default SupportTierIcon;
