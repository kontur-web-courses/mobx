import type { ListStore } from "../models/list";
import { PlanToWatchInput } from "./Input";
import { PlanToWatchNavigation } from "./Navigation";
import { PlanToWatchEntry } from "./Entry";
import classes from "./List.module.css";

const template = document.createElement("template");
template.innerHTML = `
<section class="${classes.root}">
  <h1>Welcome to your plan to watch list</h1>
  <slot name="input"></slot>
  <slot name="navigation"></slot>
  <div class="${classes.list}" role="list"></div>
  <div class="${classes.total}"></div>
</section>
`;

export class PlanToWatchList extends HTMLElement {
  public static is = "ptw-list";

  constructor() {
    super();
  }

  public list: ListStore | null = null;

  public connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.render();
  }

  private render() {
    this.renderInput();
    this.renderNavigation();
    this.renderList();
    this.renderTotal();
  }

  private renderNavigation() {
    const navigationSlot = this.querySelector(`slot[name="navigation"]`);
    if (!this.list || !navigationSlot) return;
    const navigation = document.createElement(
      PlanToWatchNavigation.is
    ) as PlanToWatchNavigation;
    navigation.list = this.list;
    navigationSlot.replaceWith(navigation);
  }

  private renderInput() {
    const inputSlot = this.querySelector(`slot[name="input"]`);
    if (!this.list || !inputSlot) return;
    const input = document.createElement(
      PlanToWatchInput.is
    ) as PlanToWatchInput;
    input.list = this.list;
    inputSlot.replaceWith(input);
  }

  private renderList() {
    const listElement = this.querySelector<HTMLDivElement>(`.${classes.list}`);
    if (!listElement || !this.list) return;
    listElement.innerHTML = "";
    for (const id of this.list.showing) {
      const entry = this.list.entries.get(id);
      if (entry) {
        const entryElement = document.createElement(
          PlanToWatchEntry.is
        ) as PlanToWatchEntry;
        entryElement.setAttribute("role", "listitem");
        entryElement.dataset.id = entry.id;
        entryElement.list = this.list;
        entryElement.entry = entry;
        listElement.appendChild(entryElement);
      }
    }
  }

  private renderTotal() {
    const totalElement = this.querySelector<HTMLDivElement>(
      `.${classes.total}`
    );
    if (!totalElement || !this.list) return;
    totalElement.innerText = `Total episodes seen: ${this.list.total}`;
  }
}

customElements.define(PlanToWatchList.is, PlanToWatchList);
