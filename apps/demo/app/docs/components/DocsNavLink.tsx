"use client";

import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Interactive, Text } from "@suankularb-components/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const DocsNavLink: StyleableFC<{
  children: ReactNode;
  href: string;
}> = ({ children, href, className, style }) => {
  const pathname = usePathname();
  const selected = pathname === href;

  return (
    <Interactive
      aria-current={selected ? "page" : undefined}
      href={href}
      element={Link}
      className={cn(
        "rounded-full px-3 py-1.5 transition-colors",
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
