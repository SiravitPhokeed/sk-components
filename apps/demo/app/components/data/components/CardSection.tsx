import Atipol from "@/public/images/example/atipol.jpg";
import {
  Actions,
  Anchor,
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Columns,
  Divider,
  Header,
  MaterialIcon,
  Menu,
  MenuItem,
  Section,
} from "@suankularb-components/react";
import Image from "next/image";
import type { FC } from "react";

const CardSection: FC = () => (
  <Section>
    <Header>Card</Header>
    <Columns columns={3}>
      <Card appearance="outlined">
        <CardHeader
          icon={<MaterialIcon icon="person" />}
          title="Atipol Sukrisadanon"
          subtitle="Foreign Languages teacher"
        />
        <Image
          src={Atipol}
          alt="Atipol Sukrisadanon"
          priority
          className="h-auto w-full"
        />
        <CardContent>
          <p>
            Atipol Sukrisadanon is arguably one of the teachers in Suankularb
            Wittayalai School.
          </p>
          <Actions>
            <Button appearance="filled">Learn more</Button>
          </Actions>
        </CardContent>
      </Card>
      <Card appearance="outlined" direction="row" className="items-center">
        <CardHeader
          avatar={
            <Avatar>
              <Image
                src={Atipol}
                alt="Atipol Sukrisadanon"
                className="aspect-square"
              />
            </Avatar>
          }
          title="Atipol Sukrisadanon"
          subtitle="Foreign Languages teacher"
          className="grow!"
        />
        <Anchor className="mr-2">
          <Button
            appearance="text"
            icon={<MaterialIcon icon="more_vert" />}
            tooltip="Options"
            command="show-popover"
            commandfor="menu-atipol"
            className="[--_button-foreground-color:var(--on-surface-variant)]!"
          />
          <Menu id="menu-atipol">
            <MenuItem command="hide-popover">View profile</MenuItem>
            <Divider />
            <MenuItem dangerous command="hide-popover">
              Delete
            </MenuItem>
          </Menu>
        </Anchor>
      </Card>
    </Columns>
  </Section>
);

export default CardSection;
