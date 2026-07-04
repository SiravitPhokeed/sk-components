"use client";

import {
  MaterialIcon,
  NavBarItem,
  NavBar as SKCNavBar,
} from "@suankularb-components/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { FC } from "react";

const NavBar: FC = () => {
  const pathname = usePathname();

  return (
    <SKCNavBar>
      <NavBarItem
        icon={<MaterialIcon icon="info" />}
        label="About"
        selected={pathname === "/"}
        href="/"
        element={Link}
      />
      <NavBarItem
        icon={<MaterialIcon icon="widgets" />}
        label="Components"
        selected={pathname.startsWith("/components")}
        href="/components"
        element={Link}
      />
      <NavBarItem
        icon={<MaterialIcon icon="capture" />}
        label="Examples"
        selected={pathname.startsWith("/examples")}
        href="/examples"
        element={Link}
      />
      <NavBarItem
        icon={<MaterialIcon icon="description" />}
        label="Docs"
        selected={pathname.startsWith("/docs")}
        href="/docs"
        element={Link}
      />
    </SKCNavBar>
  );
};

export default NavBar;
