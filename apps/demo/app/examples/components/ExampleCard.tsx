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
import type { FC } from "react";

const ExampleCard: FC<{
  title: string;
  description: string;
  components: string[];
  href: string;
}> = ({ title, description, components, href }) => (
  <Card appearance="outlined">
    <CardContent>
      <Header>{title}</Header>
      <Text type="headline-small">{description}</Text>
    </CardContent>
    <CardContent>
      <p>{title} showcases the following components:</p>
      <p>{components.join(", ")}</p>
      <Actions>
        <Button appearance="filled" href={href} element={Link}>
          Visit
        </Button>
      </Actions>
    </CardContent>
  </Card>
);

export default ExampleCard;
