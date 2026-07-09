"use client";

import {
  Header,
  MaterialIcon,
  NavBar,
  NavBarItem,
  Section,
} from "@suankularb-components/react";
import type { FC } from "react";
import { useState } from "react";

const NavBarSection: FC = () => {
  const [selected, setSelected] = useState("classes");

  return (
    <Section>
      <Header>Navigation Bar</Header>
      <NavBar className="static z-0 mx-0 h-fit *:min-h-0 sm:mx-auto!">
        <NavBarItem
          icon={<MaterialIcon icon="school" />}
          label="Learn"
          selected={selected === "learn"}
          onClick={() => setSelected("learn")}
        />
        <NavBarItem
          icon={<MaterialIcon icon="groups" />}
          label="Classes"
          selected={selected === "classes"}
          onClick={() => setSelected("classes")}
        />
        <NavBarItem
          icon={<MaterialIcon icon="search" />}
          label="Search"
          selected={selected === "search"}
          onClick={() => setSelected("search")}
        />
        <NavBarItem
          icon={<MaterialIcon icon="newspaper" />}
          label="News"
          selected={selected === "news"}
          onClick={() => setSelected("news")}
        />
        <NavBarItem
          icon={<MaterialIcon icon="account_circle" />}
          label="Account"
          selected={selected === "account"}
          onClick={() => setSelected("account")}
        />
      </NavBar>
    </Section>
  );
};

export default NavBarSection;
