import { useLayoutEffect, useRef } from "react";
import type { Grid } from "../../models/Grid";

export const useSelection = (grid: Grid, idx: number, isEditing: boolean) => {
  const isSelected = grid.isSelected(idx);
  const select = () => grid.setSelection(idx);
  const ref = useRef<HTMLDivElement>(null);
  useLayoutEffect(() => {
    if (ref.current && isSelected && !isEditing) {
      ref.current.focus();
    }
  }, [isSelected, isEditing]);
  return {
    isSelected,
    select,
    ref,
  };
};
