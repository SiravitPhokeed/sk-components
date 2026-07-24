"use client";

import cn from "@/lib/helpers/cn";
import { Button, MaterialIcon } from "@suankularb-components/react";
import { tryit } from "radash";
import { useRef, useState } from "react";
import type { ComponentProps, FC } from "react";
import { snackbar } from "@suankularb-components/react/helpers";

const FEEDBACK_DURATION_MS = 6000;
const COPY_STATUS_ICONS = new Map([
  [
    true,
    <MaterialIcon key="true" icon="check" className="state-layer-primary-80" />,
  ],
  [
    false,
    <MaterialIcon key="false" icon="error" className="state-layer-error-80" />,
  ],
  [
    null,
    <MaterialIcon
      key="null"
      icon="content_copy"
      className="state-layer-neutral-variant-60"
    />,
  ],
]);

const CodeBlock: FC<ComponentProps<"figure">> = ({ className, ...props }) => {
  const [copyStatus, setCopyStatus] = useState<boolean | null>(null);

  const figureRef = useRef<HTMLElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const handleCopy = async () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (!figureRef.current) return;
    const code = figureRef.current.querySelector("code");
    if (!code?.textContent) return;

    const content = code.textContent + "\n";
    const [error] = await tryit(() => navigator.clipboard.writeText(content))();
    if (error) {
      setCopyStatus(false);
      snackbar.push("Failed to copy snippet");
    } else {
      setCopyStatus(true);
      snackbar.push("Snippet copied to clipboard");
    }
    timerRef.current = setTimeout(
      () => setCopyStatus(null),
      FEEDBACK_DURATION_MS,
    );
  };

  return (
    <figure ref={figureRef} className={cn("shiki group", className)} {...props}>
      <Button
        appearance="text"
        icon={COPY_STATUS_ICONS.get(copyStatus)}
        tooltip="Copy to clipboard"
        onClick={handleCopy}
        className={cn(
          "absolute inset-e-1 transition-opacity",
          // Always show the icon on devices that don’t have hover as a primary
          // input method, which includes iPads.
          copyStatus === null
            ? "group-hover:opacity-100 group-has-focus-visible:opacity-100 [@media(hover:hover)]:opacity-0"
            : "opacity-100",
        )}
      />
      {props.children}
    </figure>
  );
};

export default CodeBlock;
