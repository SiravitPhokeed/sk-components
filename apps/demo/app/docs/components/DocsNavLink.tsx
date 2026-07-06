"use client";

import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Interactive, Text } from "@suankularb-components/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

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
    <Interactive
      ref={ref}
      aria-current={selected ? "page" : undefined}
      onClick={() => {
        // next/link does not accept Invoker Commands so we have to manually
        // close Docs Nav.
        const docsNav = document.getElementById("docs-nav");
        if (docsNav) (docsNav as HTMLDialogElement).requestClose?.();
      }}
      href={href}
      element={Link}
      className={cn(
        "w-full scroll-my-12 rounded-full px-3 py-1.5 text-start transition-colors",
        selected
          ? "bg-secondary-container text-on-secondary-container state-layer-on-secondary-container"
          : "state-layer-on-surface-variant text-on-surface-variant",
        className,
      )}
      style={style}
    >
      <Text type="title-small">{children}</Text>
    </Interactive>
  );
};

export default DocsNavLink;
