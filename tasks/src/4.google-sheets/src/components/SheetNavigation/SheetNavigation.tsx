import { observer } from "mobx-react-lite";
import type { FC, MouseEventHandler } from "react";
import type { Sheet } from "../../models/Sheet";
import type { SheetStore } from "../../models/SheetStore";
import classes from "./SheetNavigation.module.css";
import cs from "classnames";
import { Menu, MenuButton, MenuItem, MenuList } from "@reach/menu-button";
import "@reach/menu-button/styles.css";

interface SheetNavigationProps {
  store: SheetStore;
}

const SheetNavigation: FC<SheetNavigationProps> = observer(({ store }) => (
  <nav>
    <ul className={classes.list}>
      {/*
        Для каждого листа нарисуй <SheetButton />
      */}
      {store.sheets.map((sheet) => (
        <SheetButton key={sheet.id} sheet={sheet} />
      ))}
    </ul>
  </nav>
));

interface SheetButtonProps {
  sheet: Sheet;
}

const SheetButton: FC<SheetButtonProps> = observer(({ sheet }) => {
  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    console.log("// TODO: select");
    sheet.select();
  };
  return (
    <li className={classes.item}>
      <button
        title={sheet.name}
        className={cs(classes.button, { [classes.selected]: sheet.isSelected })}
        onClick={onClick}
      >
        {sheet.name}
      </button>
      <SheetActions sheet={sheet} />
    </li>
  );
});

interface SheetActionProps {
  sheet: Sheet;
}

const SheetActions: FC<SheetActionProps> = ({ sheet }) => {
  const onDelete = () => {
    console.log("// TODO: delete");
    sheet.delete();
  };
  const onDuplicate = () => {
    console.log("// TODO: duplicate");
    sheet.duplicate();
  };
  const onRename = () => {
    const newName = prompt("Enter new sheet name", sheet.name);
    if (newName) {
      console.log("// TODO: rename");
      sheet.rename(newName);
    }
  };
  return (
    <Menu>
      <MenuButton aria-label="Sheet menu" className={classes.menu}>
        <span aria-hidden>▾</span>
      </MenuButton>
      <MenuList>
        <MenuItem onSelect={onDelete}>Delete</MenuItem>
        <MenuItem onSelect={onDuplicate}>Duplicate</MenuItem>
        <MenuItem onSelect={onRename}>Rename</MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SheetNavigation;
