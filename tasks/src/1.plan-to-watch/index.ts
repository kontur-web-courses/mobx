import "./plan-to-watch.css";
import { PlanToWatchInput } from "./components/Input";
import { PlanToWatchNavigation } from "./components/Navigation";
import { PlanToWatchEntry } from "./components/Entry";
import { PlanToWatchList } from "./components/List";
import { defaultList, ListStore } from "./models/list";

function whenDefined() {
  return Promise.all([
    customElements.whenDefined(PlanToWatchInput.is),
    customElements.whenDefined(PlanToWatchNavigation.is),
    customElements.whenDefined(PlanToWatchEntry.is),
    customElements.whenDefined(PlanToWatchList.is),
  ]);
}

export async function render(rootElement: HTMLElement) {
  await whenDefined();
  const ptwList = document.createElement(PlanToWatchList.is) as PlanToWatchList;
  ptwList.list = new ListStore(defaultList);
  rootElement.appendChild(ptwList);
}
