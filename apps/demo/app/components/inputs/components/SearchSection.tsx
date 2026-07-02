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
          Hotkey-enabled: press{" "}
          <kbd className="bg-surface-variant border-b-outline inline-block rounded border-b-2 px-1 select-none active:mb-0.5 active:translate-y-0.5 active:border-b-0">
            /
          </kbd>{" "}
          to focus Search.
        </Text>
      </Section>
    </Columns>
  );
};

export default SearchSection;
