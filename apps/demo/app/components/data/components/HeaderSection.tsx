import {
  Header,
  MaterialIcon,
  Section,
  Text,
} from "@suankularb-components/react";
import type { FC } from "react";

const HeaderSection: FC = () => (
  <Section>
    <Header level={2} icon={<MaterialIcon icon="assignment" />}>
      Header level 2
    </Header>
    <Section>
      <Header level={3} icon={<MaterialIcon icon="assignment" />}>
        Header level 3
      </Header>
      <Section>
        <Header level={4} icon={<MaterialIcon icon="assignment" />}>
          Header level 4
        </Header>
        <Section>
          <Header level={5} icon={<MaterialIcon icon="assignment" />}>
            Header level 5
          </Header>
          <Section>
            <Header level={6} icon={<MaterialIcon icon="assignment" />}>
              Header level 6
            </Header>
            <Text type="body-medium">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit.
              Molestiae recusandae voluptates dolorum natus, deserunt
              exercitationem voluptatibus numquam accusamus voluptatum, eaque
              consectetur est maxime asperiores rem deleniti accusantium iste ex
              quisquam!
            </Text>
          </Section>
        </Section>
      </Section>
    </Section>
  </Section>
);

export default HeaderSection;
