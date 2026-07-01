import {
  Anchor,
  Button,
  Card,
  Columns,
  Header,
  MaterialIcon,
  Menu,
  MenuItem,
  Section,
  Text,
} from "@suankularb-components/react";
import type { FC } from "react";

const MenuSection: FC = () => {
  return (
    <Section>
      <Header>Menu</Header>

      <Columns columns={2}>
        <Section className="mb-2">
          <Text type="body-medium">
            Scroll down to see how Menu&rsquo;s anchor positioning adapts as the
            trigger element moves up the viewport.
          </Text>
          <Text type="body-medium">
            You may need to{" "}
            <span className="landscape:hidden">rotate your device or </span>
            resize your browser window to see the effect in action.
          </Text>
        </Section>

        <Card
          appearance="outlined"
          className="grid! h-108 place-content-center"
        >
          <Anchor>
            <Button
              appearance="outlined"
              icon={<MaterialIcon icon="more_vert" />}
              command="show-popover"
              commandfor="menu-edit"
            >
              Show Menu
            </Button>
            <Menu id="menu-edit">
              <MenuItem
                icon={
                  <MaterialIcon
                    icon="content_cut"
                    className="rtl:flip-x"
                  />
                }
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
        </Card>
      </Columns>
    </Section>
  );
};

export default MenuSection;
