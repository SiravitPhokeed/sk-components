import {
  Section,
  Header,
  NavDrawerItem,
  MaterialIcon,
} from "@suankularb-components/react";
import type { FC } from "react";

const NavDrawerSection: FC = () => {
  return (
    <Section>
      <Header>Navigation Drawer</Header>
      <ul className="w-[calc(100svw-5.5rem)] max-w-84">
        <NavDrawerItem
          icon={<MaterialIcon icon="school" />}
          label="Learn"
          selected
        />
        <NavDrawerItem icon={<MaterialIcon icon="groups" />} label="Classes" />
        <NavDrawerItem icon={<MaterialIcon icon="search" />} label="Search" />
        <NavDrawerItem icon={<MaterialIcon icon="newspaper" />} label="News" />
        <NavDrawerItem
          icon={<MaterialIcon icon="account_circle" />}
          label="Account"
        />
      </ul>
    </Section>
  );
};

export default NavDrawerSection;
