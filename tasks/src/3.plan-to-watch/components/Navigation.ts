import { autorun } from "mobx";
import { Status, ShowAllStatus } from "../models/entry";
import type { ListStore } from "../models/list";
import classes from "./Navigation.module.css";

const template = document.createElement("template");
template.innerHTML = `
<nav class="${classes.root}">
  ${[ShowAllStatus]
    .concat(Object.values(Status))
    .map(
      (status) =>
        `<a href="#${status}" class="${classes.status}" data-id="${status}">${status}</a>`
    )
    .join("\n")}
</nav>
`;

export class PlanToWatchNavigation extends HTMLElement {
  public static is = "ptw-navigation";

  constructor() {
    super();
  }

  public list: ListStore | null = null;

  public connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.listenLinks();
    autorun(() => {
      this.renderActive();
    });
  }

  private listenLinks() {
    const links = this.querySelectorAll<HTMLAnchorElement>(
      `.${classes.status}`
    );
    for (const linkElement of links) {
      linkElement.addEventListener("click", (e) => {
        const target = e.currentTarget! as HTMLAnchorElement;
        const status = target.dataset.id as Status;
        // TODO: Добавить логику
        console.log("show: ", status);
        this.list?.setMode(status);
      });
    }
  }

  private renderActive() {
    // TODO: код внутри этого метода должен вызываться автоматически при изменении значений, от которых он зависит
    if (!this.list) return;
    const links = this.querySelectorAll<HTMLAnchorElement>(
      `.${classes.status}`
    );
    for (const linkElement of links) {
      if (linkElement.dataset.id === this.list.mode) {
        linkElement.classList.add(classes.active);
      } else {
        linkElement.classList.remove(classes.active);
      }
    }
  }
}

customElements.define(PlanToWatchNavigation.is, PlanToWatchNavigation);
