"use client";

import type { StyleableFC } from "@/lib/types";
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

const PageHeader: StyleableFC<
  Pick<PageHeaderProps, "children"> & Partial<PageHeaderProps>
> = (props) => (
  <SKCPageHeader
    buttonElement={Link}
    appDrawer={
      <AppDrawer>
        <AppDrawerSegment title="Demo apps">
          <AppDrawerItem logo={<Image src={SKComLogo} alt="" />} name="SKCom" />
        </AppDrawerSegment>
      </AppDrawer>
    }
    {...props}
  />
);

export default PageHeader;
