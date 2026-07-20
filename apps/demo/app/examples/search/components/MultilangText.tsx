import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Fragment } from "react/jsx-runtime";

const MultilangText: StyleableFC<{
  text: { "en-US": string; th: string };
}> = ({ text, className, style }) => (
  <div
    className={cn("grid grid-cols-[1.25rem_1fr] gap-1", className)}
    style={style}
  >
    {["th", "en-US"].map((lang) => (
      <Fragment key={lang}>
        <div
          title={lang === "en-US" ? "English" : "ภาษาไทย"}
          className="bg-surface-variant text-primary font-display grid h-5 w-5 place-content-center rounded-xs text-[0.6875rem] font-bold tracking-tight select-none"
        >
          {lang === "en-US" ? "EN" : "TH"}
        </div>
        <p lang={lang === "th" ? "th" : undefined}>{text[lang as keyof typeof text]}</p>
      </Fragment>
    ))}
  </div>
);

export default MultilangText;
