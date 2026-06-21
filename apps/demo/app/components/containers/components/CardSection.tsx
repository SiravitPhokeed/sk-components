import Atipol from "@/public/images/example/atipol.jpg";
import {
  Actions,
  Button,
  Card,
  CardContent,
  CardHeader,
  Columns,
  Header,
  MaterialIcon,
  Section,
} from "@suankularb-components/react";
import Image from "next/image";
import type { FC } from "react";

const CardSection: FC = () => (
  <Section>
    <Header>Card</Header>
    <Columns columns={3}>
      <Card appearance="outlined">
        <CardHeader
          icon={<MaterialIcon icon="person" />}
          title="Atipol Sukrisadanon"
          subtitle="Foreign Languages teacher"
        />
        <Image
          src={Atipol}
          width={800}
          height={533}
          alt="Atipol Sukrisadanon"
          priority
          className="h-auto w-full"
        />
        <CardContent>
          <p>
            Atipol Sukrisadanon is arguably one of the teachers in Suankularb
            Wittayalai School.
          </p>
          <Actions>
            <Button appearance="filled">Learn more</Button>
          </Actions>
        </CardContent>
      </Card>
    </Columns>
  </Section>
);

export default CardSection;
