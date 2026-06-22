// "use client";

import Burger from "@/public/images/example/burger.jpg";
import {
  Header,
  List,
  ListItem,
  ListItemContent,
  Section,
} from "@suankularb-components/react";
import Image from "next/image";
import type { FC } from "react";

const ListSection: FC = () => {
  // const [cart, setCart] = useState(["fish-burger"]);

  // function modifyCart(item: string) {
  //   if (cart.includes(item))
  //     setCart(cart.filter((cartItem) => item !== cartItem));
  //   else setCart([...cart, item]);
  // }

  return (
    <Section>
      <Header>List</Header>
      <List divided>
        {/* Select all */}
        <ListItem align="center" lines={1}>
          <ListItemContent title="Select all" />
          {/* <Checkbox
            value={cart.length === 3 ? true : cart.length === 0 ? false : null}
            tristate
            onChange={(value) =>
              setCart(
                value ? ["fish-burger", "pork-burger", "beef-burger"] : [],
              )
            }
            inputAttr={{ "aria-labelledby": "list-item-select-all" }}
          /> */}
        </ListItem>

        {/* Menu */}
        <ListItem align="center" lines={3}>
          <Image src={Burger} alt="" />
          <ListItemContent
            overline="Meal of the day"
            title="Fish Burger"
            desc="฿50.00 • Contains fish"
          />
          {/* <Checkbox
            value={cart.includes("fish-burger")}
            onChange={() => modifyCart("fish-burger")}
            inputAttr={{ "aria-labelledby": "list-item-fish-burger" }}
          /> */}
        </ListItem>
        <ListItem align="center" lines={2}>
          <Image src={Burger} alt="" />
          <ListItemContent title="Pork Burger" desc="฿50.00" />
          {/* <Checkbox
            value={cart.includes("pork-burger")}
            onChange={() => modifyCart("pork-burger")}
            inputAttr={{ "aria-labelledby": "list-item-pork-burger" }}
          /> */}
        </ListItem>
        <ListItem align="center" lines={2}>
          <Image src={Burger} alt="" />
          <ListItemContent title="Beef Burger" desc="฿50.00 • Contains beef" />
          {/* <Checkbox
            value={cart.includes("beef-burger")}
            onChange={() => modifyCart("beef-burger")}
            inputAttr={{ "aria-labelledby": "list-item-beef-burger" }}
          /> */}
        </ListItem>
      </List>
    </Section>
  );
};

export default ListSection;
