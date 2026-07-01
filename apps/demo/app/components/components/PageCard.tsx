"use client";

import {
  Actions,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@suankularb-components/react";
import Image from "next/image";
import Link from "next/link";
import type { ComponentProps, FC, ReactElement, ReactNode } from "react";

const PageCard: FC<{
  children: ReactNode;
  icon: ReactElement;
  title: string;
  src: ComponentProps<typeof Image>["src"][];
  href: string;
}> = ({ children, icon, title, src, href }) => (
  <Card appearance="outlined">
    <CardHeader icon={icon} title={title} />
    <div className="bg-surface-container">
      <Image src={src[0]} alt="" className="block dark:hidden" />
      <Image src={src[1]} alt="" className="hidden dark:block" />
    </div>
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
