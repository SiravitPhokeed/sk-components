"use client";

import {
  Actions,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@suankularb-components/react";
import Link from "next/link";
import type { FC, ReactElement, ReactNode } from "react";

const PageCard: FC<{
  children: ReactNode;
  icon: ReactElement;
  title: string;
  href: string;
}> = ({ children, icon, title, href }) => (
  <Card appearance="outlined">
    <CardHeader icon={icon} title={title} />
    <div className="bg-surface-container aspect-5/2" />
    <CardContent>
      <ul className="list-disc ps-3 md:columns-2">{children}</ul>
      <Actions>
        <Button appearance="tonal" href={href} element={Link}>
          View showcase
        </Button>
      </Actions>
    </CardContent>
  </Card>
);

export default PageCard;
