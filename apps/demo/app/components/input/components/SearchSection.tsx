import { Columns, Header, Search, Section } from "@suankularb-components/react";
import type { FC } from "react";

const SearchSection: FC = () => {
  return (
    <Columns columns={3}>
      <Section>
        <Header>Search</Header>
        <Search hotkey />
        <p>
          Hotkey-enabled: press{" "}
          <kbd className="bg-surface-variant border-b-outline inline-block rounded border-b-2 px-1 select-none active:mb-0.5 active:translate-y-0.5 active:border-b-0">
            /
          </kbd>{" "}
          to focus Search.
        </p>
      </Section>
    </Columns>
  );
};

export default SearchSection;
