import type { FC } from "react";
import type { SheetStore } from "../../models/SheetStore";
import NameInput from "../NameInput/NameInput";
import classes from "./Header.module.css";

interface HeaderProps {
  store: SheetStore;
}

const Header: FC<HeaderProps> = ({ store }) => (
  <header className={classes.header}>
    <NameInput store={store} />
  </header>
);

export default Header;
