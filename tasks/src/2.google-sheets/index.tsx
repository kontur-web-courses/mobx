import React, { StrictMode } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./src/components/App/App";
import { SheetStore } from "./src/models/SheetStore";

ReactDOM.render(
  <StrictMode>
    <App store={new SheetStore()} />
  </StrictMode>,
  document.getElementById("root")
);

// Hot Module Replacement (HMR) - Remove this snippet to remove HMR.
// Learn more: https://snowpack.dev/concepts/hot-module-replacement
if (import.meta.hot) {
  import.meta.hot.accept();
}
