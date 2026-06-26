import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/chip-set.css";

/**
 * Props for {@link ChipSet}.
 */
export interface ChipSetProps extends ElementCustomizableProps {
  /**
   * Chips.
   *
   * - Must include ≥2 Chips.
   * - Must be the same type of Chips.
   * - Always required.
   */
  children: React.ReactNode;

  /**
   * If the parent element is not wide enough for all Chips to be visible, the
   * Chip Set can be scrolled horizontally.
   *
   * - Optional.
   */
  scrollable?: boolean;
}

/**
 * Chips are normally alongside each other. A Chip Set is a container for
 * Chips, handling gaps, wrap, etc.
 *
 * @param children Chips.
 * @param scrollable If the parent element is not wide enough for all Chips to be visible, the Chip Set can be scrolled horizontally.
 */
export const ChipSet: StyleableFC<ChipSetProps> = ({
  children,
  scrollable,
  element: Element = "div",
  style,
  className,
}) => {
  if (scrollable)
    return (
      <Element className={cn("skc-chip-set__wrapper", className)} style={style}>
        <div className="skc-chip-set">{children}</div>
      </Element>
    );

  return (
    <Element className={cn("skc-chip-set", className)} style={style}>
      {children}
    </Element>
  );
};
