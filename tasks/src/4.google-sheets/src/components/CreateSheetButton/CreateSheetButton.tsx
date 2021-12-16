import React, { FC } from "react";
import type { SheetStore } from "../../models/SheetStore";
import classes from "./CreateSheetButton.module.css";

interface CreateSheetButtonProps {
  store: SheetStore;
}

const CreateSheetButton: FC<CreateSheetButtonProps> = ({ store }) => (
  <button
    aria-label="create sheet"
    title="create sheet"
    className={classes.button}
    onClick={() => {
      // TODO: создай лист
      // TODO: сделай выбранным
    }}
  >
    +
  </button>
);

export default CreateSheetButton;
