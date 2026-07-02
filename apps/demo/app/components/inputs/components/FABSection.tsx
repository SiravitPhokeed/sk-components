import {
  Section,
  Header,
  FAB,
  MaterialIcon,
  Text,
} from "@suankularb-components/react";
import type { FC } from "react";

const FABSection: FC = () => (
  <Section>
    <Header level={3}>Floating Action Button</Header>
    <Text type="body-medium" className="hidden text-balance sm:block">
      More options are available in smaller screens. Resize the window to see
      them.
    </Text>
    <div className="flex flex-row flex-wrap items-start gap-2 *:relative! *:inset-0! *:z-0! *:transition-none!">
      <FAB
        color="primary"
        icon={<MaterialIcon icon="shopping_cart" />}
        tooltip="Go to checkout"
        className="sm:hidden!"
      >
        Checkout
      </FAB>
      <FAB
        color="surface"
        size="small"
        icon={<MaterialIcon icon="shopping_cart" />}
        tooltip="Go to checkout"
      />
      <FAB
        color="primary"
        size="small"
        icon={<MaterialIcon icon="shopping_cart" />}
        tooltip="Go to checkout"
      />
      <FAB
        color="secondary"
        icon={<MaterialIcon icon="shopping_cart" />}
        tooltip="Go to checkout"
      />
      <FAB
        color="tertiary"
        size="large"
        icon={<MaterialIcon icon="shopping_cart" />}
        tooltip="Go to checkout"
      />
    </div>
  </Section>
);

export default FABSection;
