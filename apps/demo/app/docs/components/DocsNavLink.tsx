"use client";

import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Interactive, Text } from "@suankularb-components/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

const DocsNavLink: StyleableFC<{
  children: ReactNode;
  href: string;
}> = ({ children, href, className, style }) => {
  const pathname = usePathname();
  const selected = pathname === href;

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!selected) return;
    const details = ref.current?.parentElement?.parentElement;
    if (details) {
      (details as HTMLDetailsElement).open = true;
      ref.current?.scrollIntoView({ block: "nearest" });
    }
  }, [selected]);

  return (
    <li
      className={cn(
        "before:bg-secondary relative before:absolute before:inset-y-0 before:-inset-s-2 before:w-px before:transition-opacity forced-colors:before:w-0.5 forced-colors:before:bg-[Highlight]",
        selected
          ? "before:opacity-100"
          : "before:opacity-0 hover:before:opacity-20",
        className,
      )}
      style={style}
    >
      <Interactive
        ref={ref}
        aria-current={selected ? "page" : undefined}
        onClick={() => {
          // Invoker Commands are ignored on `<a>` elements.
          // Imperatively close the Side Sheet instead.
          const docsNav = document.getElementById(
            "docs-nav",
          ) as HTMLDialogElement | null;
          docsNav?.requestClose?.();
        }}
        href={href}
        element={Link}
        className={cn(
          "w-full scroll-my-12 rounded-full px-3 py-1.5 text-start transition-colors forced-colors:transition-none",
          selected
            ? "bg-secondary-container text-on-secondary-container state-layer-on-secondary-container forced-colors:bg-[Highlight]"
            : "state-layer-on-surface-variant text-on-surface-variant",
          className,
        )}
        style={style}
      >
        <Text type="title-small">{children}</Text>
      </Interactive>
    </li>
  );
};

export default DocsNavLink;
