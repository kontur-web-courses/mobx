import { observer } from "mobx-react-lite";
import React, { ChangeEventHandler, FC } from "react";
import type { Grid } from "../../models/Grid";
import classes from "./GridHeader.module.css";

interface GridHeaderProps {
  grid: Grid;
}

const GridHeader: FC<GridHeaderProps> = observer(({ grid }) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    grid.writeSelection(e.target.value);
  };
  return (
    <label className={classes.header}>
      <div className={classes.selection}>{grid.selectionView}</div>
      <input
        type="text"
        className={classes.cell}
        value={grid.selectedValue}
        onChange={onChange}
      />
    </label>
  );
});

export default GridHeader;
