import type { Entry } from "../models/entry";
import { Status } from "../models/entry";
import type { ListStore } from "../models/list";
import classes from "./Entry.module.css";

const template = document.createElement("template");
template.innerHTML = `
<div class="${classes.entry}">
  <span class="${classes.name}"></span>
  <select class=${classes.status} aria-label="status">
    ${Object.values(Status)
      .map((status) => `<option value="${status}">${status}</option>`)
      .join("\n")}
  </select>
  <form class="${classes.episodeForm}" action="">
    <input name="episodesSeen" type="number" input-mode="numeric" required min="0" class="${
      classes.episodesSeen
    }" aria-label="episode">&nbsp;/&nbsp;<span class="${
  classes.episodeCount
}"></span>
  </form>
  <button class="${
    classes.increment
  }" aria-label="increment episode" title="increment">+</button>
  <button class="${
    classes.decrement
  }" aria-label="decrement episode" title="decrement">-</button>
  <button class="${
    classes.remove
  }" aria-label="remove entry" title="remove">x</button>
</div>
`;

export class PlanToWatchEntry extends HTMLElement {
  public static is = "ptw-entry";

  constructor() {
    super();
  }

  public entry: Entry | null = null;
  public list: ListStore | null = null;

  public connectedCallback() {
    this.appendChild(template.content.cloneNode(true));
    this.render();
    this.listenToChanges();
  }

  public disconnectedCallback() {
    for (const callback of this.unsubscribe) {
      callback();
    }
    this.unsubscribe = [];
  }

  private unsubscribe: Array<() => void> = [];

  private listenToChanges() {
    this.listenToStatus();
    this.listenToEpisodeSeen();
    this.listenToIncrement();
    this.listenToDecrement();
    this.listenToRemove();
  }

  private listenToStatus() {
    const statusElement = this.querySelector<HTMLSelectElement>(
      `.${classes.status}`
    );
    if (statusElement) {
      const callback = (e: Event) => {
        const target = e.currentTarget! as HTMLSelectElement;
        const value = target.value as Status;
        // TODO: Добавить логику
        console.log("status: ", value);
      };
      statusElement.addEventListener("change", callback);
      this.unsubscribe.push(() =>
        statusElement.removeEventListener("change", callback)
      );
    }
  }

  private listenToEpisodeSeen() {
    const episodeFormElement = this.querySelector<HTMLFormElement>(
      `.${classes.episodeForm}`
    );
    if (episodeFormElement) {
      const callback = (e: Event) => {
        e.preventDefault();
        const target = e.currentTarget! as HTMLFormElement;
        const data = new FormData(target);
        const value = data.get("episodesSeen");
        // TODO: Добавить логику
        console.log("episodesSeen:", value);
      };
      episodeFormElement.addEventListener("submit", callback);
      this.unsubscribe.push(() =>
        episodeFormElement.removeEventListener("submit", callback)
      );
    }
  }

  private listenToIncrement() {
    const incrementElement = this.querySelector<HTMLButtonElement>(
      `.${classes.increment}`
    );
    if (incrementElement) {
      const callback = () => {
        // TODO: Добавить логику
        console.log("increment");
      };
      incrementElement.addEventListener("click", callback);
      this.unsubscribe.push(() =>
        incrementElement.removeEventListener("click", callback)
      );
    }
  }

  private listenToDecrement() {
    const decrementElement = this.querySelector<HTMLButtonElement>(
      `.${classes.decrement}`
    );
    if (decrementElement) {
      const callback = () => {
        // TODO: Добавить логику
        console.log("decrement");
      };
      decrementElement.addEventListener("click", callback);
      this.unsubscribe.push(() =>
        decrementElement.removeEventListener("click", callback)
      );
    }
  }

  private listenToRemove() {
    const removeElement = this.querySelector<HTMLButtonElement>(
      `.${classes.remove}`
    );
    if (removeElement) {
      const callback = () => {
        // TODO: Добавить логику
        console.log("remove");
      };
      removeElement.addEventListener("click", callback);
      this.unsubscribe.push(() =>
        removeElement.removeEventListener("click", callback)
      );
    }
  }

  private render() {
    this.renderName();
    this.renderStatus();
    this.renderEpisodeSeen();
    this.renderEpisodeCount();
  }

  private renderName() {
    if (!this.entry) return;
    const nameElement = this.querySelector<HTMLSpanElement>(`.${classes.name}`);
    if (nameElement) {
      nameElement.textContent = this.entry.name;
    }
  }

  private renderStatus() {
    // TODO: код внутри этого метода должен вызываться автоматически при изменении значений, от которых он зависит
    if (!this.entry) return;
    const statusElement = this.querySelector<HTMLSelectElement>(
      `.${classes.status}`
    );
    if (statusElement) {
      statusElement.value = this.entry.status;
    }
  }

  private renderEpisodeSeen() {
    // TODO: код внутри этого метода должен вызываться автоматически при изменении значений, от которых он зависит
    if (!this.entry) return;
    const episodeElement = this.querySelector<HTMLInputElement>(
      `.${classes.episodesSeen}`
    );
    if (episodeElement) {
      episodeElement.value = this.entry.episodesSeen.toString();
      if (this.entry.episodeCount) {
        episodeElement.max = this.entry.episodeCount.toString();
      }
    }
  }

  private renderEpisodeCount() {
    if (!this.entry) return;
    const episodeElement = this.querySelector<HTMLSpanElement>(
      `.${classes.episodeCount}`
    );
    if (episodeElement) {
      episodeElement.textContent = this.entry.episodeCount?.toString() ?? "?";
    }
  }
}

customElements.define(PlanToWatchEntry.is, PlanToWatchEntry);
