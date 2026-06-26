import cn from "@/lib/helpers/cn";
import type { ElementCustomizableProps, StyleableFC } from "@/lib/types";
import "@suankularb-components/css/progress.css";

/**
 * Props for {@link Progress}.
 */
export interface ProgressProps extends ElementCustomizableProps {
  /**
   * Progress can be either a loading spinner or a linear loading bar.
   *
   * - Must be `linear` or `circular`.
   * - Keep the appearance consistent for the same actions. For example, if
   *   loading a post uses `linear` in one place, the same action should always
   *   use `linear` elsewhere.
   * - Always required.
   */
  appearance: "linear" | "circular";

  /**
   * A description of the Progress for screen readers, similar to `alt` on
   * `<img>`.
   *
   * - Always required, because a Progress has no significance to screenreaders.
   */
  alt: string;

  /**
   * The progress percentage (out of 100) of an activity.
   *
   * - If undefined, the Progress will be in an indeterminate state.
   * - Optional.
   */
  value?: number;

  /**
   * If this Progress is visible.
   *
   * - Optional.
   */
  visible?: boolean;
}

/**
 * A Progress indicates that something is ongoing. It can also indicate how
 * much of that something has been done.
 *
 * @param appearance Progress can be either a loading spinner or a linear loading bar.
 * @param alt A description of the Progress for screen readers, similar to `alt` on `<img>`.
 * @param value The progress percentage (out of 100) of an activity.
 * @param visible If this Progress is visible.
 */
export const Progress: StyleableFC<ProgressProps> = ({
  appearance,
  alt,
  value,
  visible,
  element: Element = "div",
  style,
  className,
}) => {
  return (
    <Element
      role="progressbar"
      aria-label={alt}
      aria-valuenow={value}
      aria-hidden={visible === false}
      className={cn(
        "skc-progress",
        `skc-progress--${appearance}`,
        visible && "skc-progress--visible",
        value === undefined && "skc-progress--indeterminate",
        className,
      )}
      style={style}
    >
      {appearance === "linear" ? (
        // Linear Progress
        <div role="presentation" className="skc-progress__track">
          <div
            className="skc-progress__indicator"
            style={{ width: value !== undefined ? `${value}%` : undefined }}
          />
          {(value === undefined || value < 100) && (
            <div className="skc-progress__remainder" />
          )}
          <div className="skc-progress__stop" />
        </div>
      ) : (
        // Circular Progress
        // prettier-ignore
        <svg role="presentation" viewBox="0 0 48 48" className="skc-progress__track">
          <circle cx={24} cy={24} r={22} strokeWidth={4} fill="none"
            className="skc-progress__remainder" />
          <circle cx={24} cy={24} r={22} strokeWidth={4}
            strokeDashoffset={
              value !== undefined ? 200 - value * 1.35 : undefined
            }
            fill="none"
            className="skc-progress__indicator"
          />
        </svg>
      )}
    </Element>
  );
};
