import React, { FC } from "react";
import type { SheetStore } from "../../models/SheetStore";
import FavoriteInput from "../FavoriteInput/FavoriteInput";
import NameInput from "../NameInput/NameInput";
import classes from "./Header.module.css";

interface HeaderProps {
  store: SheetStore;
}

const Header: FC<HeaderProps> = ({ store }) => (
  <header className={classes.header}>
    <NameInput store={store} />
    <FavoriteInput />
  </header>
);

export default Header;
