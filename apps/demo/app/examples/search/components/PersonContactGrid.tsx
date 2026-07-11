"use client";

import ContactCard from "@/app/examples/search/components/ContactCard";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Text } from "@suankularb-components/react";

const PersonContactGrid: StyleableFC = ({ className, style }) => (
  <section style={style} className={cn("space-y-2", className)}>
    <Text type="title-medium" element="h3" className="px-3">
      Contacts
    </Text>
    <ul className="grid gap-2 md:grid-cols-2">
      <ContactCard type="facebook" value="Chatchai Charoen" />
      <ContactCard type="line" value="chatchaizaza2015" />
      <ContactCard type="email" value="chatchai.cha@student.sk.ac.th" />
      <ContactCard type="tel" value="091 888 1420" />
    </ul>
  </section>
);

export default PersonContactGrid;
