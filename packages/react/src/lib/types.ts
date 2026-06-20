import type { FC } from "react";

/** A function component stylable through `className` and `style`. */
export type StyleableFC<Props extends object = object> = FC<
  Props & Partial<{ className: string; style: React.CSSProperties }>
>;
