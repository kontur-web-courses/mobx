import { observer } from "mobx-react-lite";
import type { ChangeEventHandler, FC } from "react";
import type { Grid } from "../../models/Grid";
import classes from "./Cell.module.css";
import cs from "classnames";
import { useEditing } from "./useEditing";
import { useSelection } from "./useSelection";

interface CellProps {
  grid: Grid;
  idx: number;
}

const Cell: FC<CellProps> = ({ grid, idx }) => {
  const { isEditing, hide, show, onKeyDown } = useEditing();
  const { isSelected, select, ref } = useSelection(grid, idx, isEditing);
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    grid.write(idx, e.target.value);
  };
  return (
    <div
      ref={ref}
      tabIndex={0}
      onFocus={select}
      className={cs(classes.cell, { [classes.selected]: isSelected })}
      onDoubleClick={show}
      onKeyDownCapture={onKeyDown}
    >
      {isEditing ? (
        <input
          autoFocus
          type="text"
          value={grid.values[idx].raw}
          onChange={onChange}
          onBlur={hide}
        />
      ) : (
        grid.readIndex(idx)
      )}
    </div>
  );
};

export default Cell;
