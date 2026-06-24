"use client";

import {
  MaterialIcon,
  NavDrawerItem,
  NavDrawerSection,
  NavDrawer as SKCNavDrawer,
  Text,
} from "@suankularb-components/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";

const NavDrawer: FC = () => {
  const pathname = usePathname();

  return (
    <SKCNavDrawer>
      {/* Top-level pages */}
      <NavDrawerSection
        header={
          <Text type="title-large" element="div">
            <span>SK</span>
            <span className="text-primary font-bold">Components</span>
          </Text>
        }
      >
        <NavDrawerItem
          icon={<MaterialIcon icon="info" />}
          label="About"
          selected={pathname === "/"}
          href="/"
          element={Link}
        />
        <NavDrawerItem
          icon={<MaterialIcon icon="widgets" />}
          label="Components"
          selected={pathname === "/components"}
          href="/components"
          element={Link}
        />
        <NavDrawerItem
          icon={<MaterialIcon icon="capture" />}
          label="Examples"
          selected={pathname.startsWith("/example")}
          href="/example"
          element={Link}
        />
        <NavDrawerItem
          icon={<MaterialIcon icon="description" />}
          label="Docs"
          onClick={() =>
            window.open(
              "https://docs.google.com/document/d/1ks5DrzfC_xLg48EFtZALoVQpJpxhsK2It3GDhAhZCcE/edit?usp=sharing",
              undefined,
              "popup",
            )
          }
        />
      </NavDrawerSection>

      {/* Components */}
      <NavDrawerSection header="Components">
        <NavDrawerItem
          icon={<MaterialIcon icon="touch_app" />}
          label="Actions"
          selected={pathname === "/components/actions"}
          href="/components/actions"
          element={Link}
        />
        <NavDrawerItem
          icon={<MaterialIcon icon="input" />}
          label="Input"
          selected={pathname === "/components/input"}
          href="/components/input"
          element={Link}
        />
        <NavDrawerItem
          icon={<MaterialIcon icon="swap_horiz" />}
          label="Communication"
          selected={pathname === "/components/communication"}
          href="/components/communication"
          element={Link}
        />
        <NavDrawerItem
          icon={<MaterialIcon icon="dashboard" />}
          label="Containers"
          selected={pathname === "/components/containers"}
          href="/components/containers"
          element={Link}
        />
      </NavDrawerSection>

      {/* Other */}
      <NavDrawerSection header="Other">
        <NavDrawerItem
          icon={<MaterialIcon icon="handshake" />}
          label="Contribute"
          href="https://github.com/suankularb-wittayalai-school/sk-components"
          element={(props) => (
            <a {...props} target="_blank">
              {props.children}
            </a>
          )}
        />
      </NavDrawerSection>
    </SKCNavDrawer>
  );
};

export default NavDrawer;
