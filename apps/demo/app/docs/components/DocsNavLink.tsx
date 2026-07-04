"use client";

import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Interactive, Text } from "@suankularb-components/react";
import { usePathname, useRouter } from "next/navigation";
import type { ReactNode } from "react";

const DocsNavLink: StyleableFC<{
  children: ReactNode;
  href: string;
}> = ({ children, href, className, style }) => {
  const pathname = usePathname();
  const router = useRouter();
  const selected = pathname === href;

  return (
    <Interactive
      role="link" // `command` does not work on `next/link`
      aria-current={selected ? "page" : undefined}
      command="request-close"
      commandfor="docs-nav"
      onClick={() => router.push(href)}
      className={cn(
        "w-full rounded-full px-3 py-1.5 text-start transition-colors",
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
