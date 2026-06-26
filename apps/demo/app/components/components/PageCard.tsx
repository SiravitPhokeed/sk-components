"use client";

import {
  Actions,
  Button,
  Card,
  CardContent,
  CardHeader,
} from "@suankularb-components/react";
import Link from "next/link";
import type { FC, ReactElement } from "react";

const PageCard: FC<{
  icon: ReactElement;
  title: string;
  href: string;
  components: string[];
}> = ({ icon, title, href, components }) => (
  <Card appearance="outlined">
    <CardHeader icon={icon} title={title} />
    <CardContent>
      <p>{components.join(", ")}</p>
      <Actions align="full">
        <Button appearance="tonal" href={href} element={Link}>
          View showcase
        </Button>
      </Actions>
    </CardContent>
  </Card>
);

export default PageCard;
