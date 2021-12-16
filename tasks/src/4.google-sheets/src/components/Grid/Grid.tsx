import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import type { Grid as IGrid } from "../../models/Grid";
import type { Sheet } from "../../models/Sheet";
import Cell from "../Cell/Cell";
import classes from "./Grid.module.css";

interface GridProps {
  sheet: Sheet;
}

const Grid: FC<GridProps> = observer(({ sheet }) => {
  const onKeyDown: React.KeyboardEventHandler<HTMLElement> = (e) => {
    if (document.activeElement instanceof HTMLInputElement) return;
    switch (e.key) {
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowUp":
        e.preventDefault();
        // TODO: Позови правильный метод
        break;
    }
  };
  return (
    <section className={classes.wrapper} tabIndex={0} onKeyDown={onKeyDown}>
      <div
        style={
          {
            "--width": sheet.grid.width,
            "--height": sheet.grid.height,
          } as any
        }
        className={classes.grid}
      >
        {sheet.grid.idxs.map((idx) => (
          <Cell key={getKey(sheet.grid, idx)} grid={sheet.grid} idx={idx} />
        ))}
      </div>
    </section>
  );
});

const getKey = (grid: IGrid, idx: number) =>
  `${grid.width}x${grid.height}:${idx}`;

export default Grid;
