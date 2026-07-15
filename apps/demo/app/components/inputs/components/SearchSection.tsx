import {
  Columns,
  Header,
  Search,
  Section,
  Text,
} from "@suankularb-components/react";
import type { FC } from "react";

const SearchSection: FC = () => {
  return (
    <Columns columns={3}>
      <Section>
        <Header>Search</Header>
        <Search hotkey />
        <Text type="body-medium">
          Hotkey-enabled: press <kbd className="kbd">/</kbd> to focus Search.
        </Text>
      </Section>
    </Columns>
  );
};

export default SearchSection;
