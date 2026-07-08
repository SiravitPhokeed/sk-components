import type { MaterialIconProps } from "@suankularb-components/react";
import type { ComponentProps, FC, ReactElement } from "react";

const ICONS = new Map<string, ReactElement>([
  [
    "material_design",
    // prettier-ignore
    <g key="material_design" stroke="currentColor">
      <circle cx={12} cy={12} r={9} strokeWidth={2}/>
      <rect x={6} y={6} width={12} height={12} strokeWidth={2}/>
      <path d="M6 6L12 17L18 6" strokeWidth={2} strokeLinejoin="bevel"/>
    </g>,
  ],
]);

const BrandIcon: FC<
  {
    icon: string;
    size?: MaterialIconProps["size"];
  } & ComponentProps<"svg">
> = ({ icon, size = 24, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    {ICONS.get(icon)}
  </svg>
);

export default BrandIcon;
