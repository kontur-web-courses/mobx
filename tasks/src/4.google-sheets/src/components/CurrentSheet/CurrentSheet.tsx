import { observer } from "mobx-react-lite";
import type { FC } from "react";
import type { SheetStore } from "../../models/SheetStore";
import Grid from "../Grid/Grid";
import GridHeader from "../GridHeader/GridHeader";
import classes from "./CurrentSheet.module.css";

interface CurrentSheetProps {
  store: SheetStore;
}

const CurrentSheet: FC<CurrentSheetProps> = ({ store }) => {
  const sheet = store.current;
  return (
    <>
      {sheet ? ( // TODO
        <>
          <GridHeader grid={sheet.grid} />
          <Grid sheet={sheet} />
        </>
      ) : (
        <div className={classes.notFound}>No sheet selected</div>
      )}
    </>
  );
};

export default CurrentSheet;
