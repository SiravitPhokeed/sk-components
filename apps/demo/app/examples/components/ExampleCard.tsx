"use client";

import {
  Actions,
  Button,
  Card,
  CardContent,
  Header,
  Text,
} from "@suankularb-components/react";
import Link from "next/link";
import type { FC, ReactNode } from "react";

const ExampleCard: FC<{
  children: ReactNode;
  title: string;
  subtitle: string;
  href: string;
}> = ({ children, title, subtitle, href }) => (
  <Card appearance="outlined" className="grid md:grid-cols-2">
    <CardContent>
      <Header>{title}</Header>
      <Text type="headline-small">{subtitle}</Text>
    </CardContent>
    <CardContent>
      {children}
      <Actions>
        <Button appearance="filled" href={href} element={Link}>
          Visit
        </Button>
      </Actions>
    </CardContent>
  </Card>
);

export default ExampleCard;
