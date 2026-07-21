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
          selected={pathname.startsWith("/examples")}
          href="/examples"
          element={Link}
        />
        <NavDrawerItem
          icon={<MaterialIcon icon="description" />}
          label="Docs"
          selected={pathname.startsWith("/docs")}
          href="/docs"
          element={Link}
        />
      </NavDrawerSection>

      {/* Components */}
      <NavDrawerSection header="Components">
        <NavDrawerItem
          icon={<MaterialIcon icon="view_quilt" directional />}
          label="Layout & navigation"
          selected={pathname === "/components/layout"}
          href="/components/layout"
          element={Link}
        />
        <NavDrawerItem
          icon={<MaterialIcon icon="input" directional />}
          label="Inputs"
          selected={pathname === "/components/inputs"}
          href="/components/inputs"
          element={Link}
        />
        <NavDrawerItem
          icon={<MaterialIcon icon="table_chart" />}
          label="Data display"
          selected={pathname === "/components/data"}
          href="/components/data"
          element={Link}
        />
        <NavDrawerItem
          icon={<MaterialIcon icon="picture_in_picture_center" />}
          label="Overlays"
          selected={pathname === "/components/overlays"}
          href="/components/overlays"
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
