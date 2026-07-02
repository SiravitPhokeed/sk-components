import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Text } from "@suankularb-components/react";

const AgeCircle: StyleableFC = ({ className, style }) => (
  <div
    style={style}
    className={cn(
      "bg-surface-variant relative grid aspect-square h-10 place-items-center overflow-hidden rounded-full",
      className,
    )}
  >
    <div className="absolute top-2/3 -mt-1">
      <svg
        width={40}
        height={44}
        viewBox="0 0 40 44"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5 2L4 3.33333C3 4.66667 1 4.66667 0 3.33333V44H40V3.33333C39
              4.66667 37 4.66667 36 3.33333L35 2C33.5 0 30.5 0 29 2C27.5 4 24.5
              4 23 2C21.5 0 18.5 0 17 2C15.5 4 12.5 4 11 2C9.5 0 6.5 0 5 2Z"
          className="fill-inverse-primary"
        />
      </svg>
    </div>

    <Text
      type="title-medium"
      className="text-on-primary-container relative z-10"
    >
      18
    </Text>
  </div>
);

export default AgeCircle;
