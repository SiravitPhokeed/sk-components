import type { StyleableFC } from "@/lib/types";
import {
  Avatar,
  Card,
  CardHeader,
  MaterialIcon,
} from "@suankularb-components/react";
import Image from "next/image";
import Facebook from "@/public/images/example/social/facebook.svg";
import Line from "@/public/images/example/social/line.svg";

const AVATAR_MAP = new Map([
  ["facebook", <Image key="facebook" src={Facebook} alt="" />],
  ["line", <Image key="line" src={Line} alt="" />],
  ["email", <MaterialIcon key="email" icon="email" />],
  ["tel", <MaterialIcon key="tel" icon="phone" />],
]);
const LABEL_MAP = new Map([
  ["facebook", "Facebook"],
  ["line", "LINE"],
  ["email", "Email"],
  ["tel", "Phone"],
]);

const ContactCard: StyleableFC<{
  type: string;
  value: string;
}> = ({ type, value, className, style }) => (
  <Card
    appearance="filled"
    stateLayerEffect
    href="#"
    element={(props) => <li {...props} title={value} />}
    className={className}
    style={style}
  >
    <CardHeader
      avatar={<Avatar>{AVATAR_MAP.get(type)}</Avatar>}
      title={value}
      subtitle={LABEL_MAP.get(type) ?? "Other"}
      className="*:grid *:*:truncate"
    />
  </Card>
);

export default ContactCard;
