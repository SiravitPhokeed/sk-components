"use client";

import ContactCard from "@/app/examples/search/components/ContactCard";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Columns, Text } from "@suankularb-components/react";

const PersonContactGrid: StyleableFC = ({ className, style }) => (
  <section style={style} className={cn("space-y-2", className)}>
    <Text type="title-medium" element="h3" className="px-3">
      Contacts
    </Text>
    <Columns
      columns={2}
      element={(props) => <ul {...props} role="list" />}
      className="gap-2!"
    >
      <ContactCard type="facebook" value="Chatchai Charoen" />
      <ContactCard type="line" value="chatchaizaza2015" />
      <ContactCard type="email" value="chatchai.cha@student.sk.ac.th" />
      <ContactCard type="tel" value="091 888 1420" />
    </Columns>
  </section>
);

export default PersonContactGrid;
