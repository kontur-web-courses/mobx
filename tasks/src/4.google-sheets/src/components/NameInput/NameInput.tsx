import { autorun } from "mobx";
import { observer } from "mobx-react-lite";
import { ChangeEventHandler, FC, useEffect } from "react";
import type { SheetStore } from "../../models/SheetStore";
import classes from "./NameInput.module.css";

interface NameInputProps {
  store: SheetStore;
}

const NameInput: FC<NameInputProps> = observer(({ store }) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    console.log("//TODO: rename", e.target.value);
    store.rename(e.target.value);
  };
  // TODO: не забудь синхронизовать document.title
  useEffect(() => {
    return autorun(() => {
      document.title = `${store.name}`;
    });
  }, []);
  return (
    <input className={classes.title} value={store.name} onChange={onChange} />
  );
});

export default NameInput;
