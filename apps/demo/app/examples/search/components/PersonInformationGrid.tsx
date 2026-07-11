import AgeCircle from "@/app/examples/search/components/AgeCircle";
import MultilangText from "@/app/examples/search/components/MultilangText";
import cn from "@/lib/helpers/cn";
import type { StyleableFC } from "@/lib/types";
import { Card, CardHeader, CardContent } from "@suankularb-components/react";

const PersonInformationGrid: StyleableFC = ({ className, style }) => (
  <section
    className={cn("grid gap-2 md:grid-cols-4", className)}
    style={style}
  >
    <Card appearance="filled" className="md:col-span-2">
      <CardHeader title="Full name" />
      <CardContent>
        <MultilangText
          text={{ "en-US": "Chatchai Charoen", th: "ชัชชาย เจริญ" }}
        />
      </CardContent>
    </Card>
    <Card appearance="filled">
      <CardHeader title="Nickname" />
      <CardContent>
        <MultilangText text={{ "en-US": "Apple", th: "แอปเปิ้ล" }} />
      </CardContent>
    </Card>
    <Card appearance="filled">
      <CardHeader title="Classroom" />
      <CardContent>M.604</CardContent>
    </Card>
    <Card appearance="filled" direction="row" className="items-start!">
      <CardHeader title="Birthday" subtitle="March 8" className="grow pe-0" />
      <CardContent className="py-2.5 ps-0!">
        <AgeCircle />
      </CardContent>
    </Card>
    <Card appearance="filled">
      <CardHeader title="Student ID" />
      <CardContent>60142</CardContent>
    </Card>
  </section>
);

export default PersonInformationGrid;
