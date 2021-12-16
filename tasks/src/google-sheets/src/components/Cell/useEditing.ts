import { KeyboardEventHandler, useState } from "react";

export const useEditing = () => {
  const [isEditing, setEditing] = useState(false);
  const show = () => setEditing(true);
  const hide = () => setEditing(false);
  const toggle = () => setEditing((e) => !e);
  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (e) => {
    switch (e.key) {
      case "Escape":
        hide();
        break;
      case "Enter":
        toggle();
        break;
      case "ArrowDown":
      case "ArrowLeft":
      case "ArrowRight":
      case "ArrowUp":
        break;
      default:
        show();
        break;
    }
  };
  return {
    isEditing,
    hide,
    show,
    onKeyDown,
  };
};
