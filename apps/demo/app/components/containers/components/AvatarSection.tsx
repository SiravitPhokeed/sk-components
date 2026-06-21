import Sadudee from "@/public/images/example/sadudee.png";
import { Avatar, Header, Section } from "@suankularb-components/react";
import Image from "next/image";
import type { FC } from "react";

const AvatarSection: FC = () => (
  <Section>
    <Header>Avatar</Header>
    <div className="flex flex-row gap-2">
      <Avatar>ST</Avatar>
      <Avatar>
        <Image src={Sadudee} priority alt="" />
      </Avatar>
      <Avatar />
    </div>
  </Section>
);

export default AvatarSection;
