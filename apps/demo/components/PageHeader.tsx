"use client";

import SKComLogo from "@/public/images/drawer/skcom.svg";
import {
  AppDrawer,
  AppDrawerItem,
  AppDrawerSegment,
  type PageHeaderProps,
  PageHeader as SKCPageHeader,
} from "@suankularb-components/react";
import Image from "next/image";
import Link from "next/link";
import { FC, useState } from "react";

const PageHeader: FC<
  Pick<PageHeaderProps, "children"> & Partial<PageHeaderProps>
> = (props) => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      <SKCPageHeader
        buttonElement={Link}
        onNavToggle={() => setNavOpen(true)}
        appDrawer={
          <AppDrawer>
            <AppDrawerSegment title="Demo apps">
              <AppDrawerItem
                logo={<Image src={SKComLogo} alt="" />}
                name="SKCom"
              />
            </AppDrawerSegment>
          </AppDrawer>
        }
        {...props}
      />
      {/* TODO: Add Navigation Drawer */}
    </>
  );
};

export default PageHeader;
