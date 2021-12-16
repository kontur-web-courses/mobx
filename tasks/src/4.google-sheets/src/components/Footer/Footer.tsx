import React, { FC } from "react";
import type { SheetStore } from "../../models/SheetStore";
import CreateSheetButton from "../CreateSheetButton/CreateSheetButton";
import SheetNavigation from "../SheetNavigation/SheetNavigation";
import classes from "./Footer.module.css";

interface FooterProps {
  store: SheetStore;
}

const Footer: FC<FooterProps> = ({ store }) => (
  <footer className={classes.footer}>
    <CreateSheetButton />
    <SheetNavigation />
  </footer>
);

export default Footer;
