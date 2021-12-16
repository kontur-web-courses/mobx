import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { configure } from "mobx";
import "./index.css";
import App from "./src/components/App/App";
import { SheetStore } from "./src/models/SheetStore";

// Uncomment for helpful linting
configure({
  enforceActions: "observed",
  computedRequiresReaction: true,
  observableRequiresReaction: true,
});

ReactDOM.render(
  <StrictMode>
    <App store={new SheetStore()} />
  </StrictMode>,
  document.getElementById("root")
);
