import { observer } from "mobx-react-lite";
import React, { ChangeEventHandler, FC } from "react";
import type { SheetStore } from "../../models/SheetStore";
import classes from "./FavoriteInput.module.css";

interface FavoriteInputProps {
  store: SheetStore;
}

const FavoriteInput: FC<FavoriteInputProps> = ({ store }) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log("// TODO: change favorite");
  };
  return (
    <label className={classes.favorite}>
      <input
        aria-label="favorite"
        className={classes.checkbox}
        type="checkbox"
        checked={false}
        onChange={onChange}
      />
      <span className={classes.star} />
    </label>
  );
};

export default FavoriteInput;
