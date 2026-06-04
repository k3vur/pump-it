import { NavBar } from "./nav-bar";
import { NavItem } from "./nav-item";
import { NavLinkItem } from "./nav-link-item";

export const Nav = {
  LinkItem: NavLinkItem,
  Bar: NavBar,
  Item: NavItem,
} as const;
