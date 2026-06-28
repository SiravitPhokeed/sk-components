import {
  Actions,
  Anchor,
  Button,
  Header,
  MaterialIcon,
  Menu,
  MenuItem,
  Section,
} from "@suankularb-components/react";
import type { FC } from "react";

const MenuSection: FC = () => {
  return (
    <Section>
      <Header>Menu</Header>
      <Actions align="left">
        <Anchor>
          <Button
            appearance="filled"
            icon={<MaterialIcon icon="more_vert" />}
            command="show-popover"
            commandfor="menu"
          >
            Toggle Menu
          </Button>
          <Menu id="menu">
            <MenuItem
              icon={<MaterialIcon icon="content_cut" />}
              metadata="⌘ X"
              command="hide-popover"
            >
              Cut
            </MenuItem>
            <MenuItem
              icon={<MaterialIcon icon="content_copy" />}
              metadata="⌘ C"
              command="hide-popover"
            >
              Copy
            </MenuItem>
            <MenuItem
              icon={<MaterialIcon icon="content_paste" />}
              metadata="⌘ V"
              command="hide-popover"
            >
              Paste
            </MenuItem>
          </Menu>
        </Anchor>
      </Actions>
    </Section>
  );
};

export default MenuSection;
