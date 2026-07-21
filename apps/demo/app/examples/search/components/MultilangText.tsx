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
    {(["th", "en-US"] as const).map((lang) => (
      <Fragment key={lang}>
        <div
          title={lang === "en-US" ? "English" : "ภาษาไทย"}
          className="bg-surface-variant text-primary font-display grid h-5 w-5 place-content-center rounded-xs text-[0.6875rem] font-bold tracking-tight select-none"
        >
          {{ "en-US": "EN", th: "TH" }[lang]}
        </div>
        <p lang={lang}>{text[lang]}</p>
      </Fragment>
    ))}
  </div>
);

export default MultilangText;
