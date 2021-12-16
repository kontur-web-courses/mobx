import classes from "./Input.module.css";
import type { ListStore } from "../models/list";

const nameId = "ptw-input-name";
const episodeCountId = "ptw-input-episodeCount";

const formTemplate = document.createElement("template");
formTemplate.innerHTML = `
<form class="${classes.form}" action="">
  <label for="${nameId}">Name:</label>
  <input id="${nameId}" name="name" type="text" value="" required>
  <label for="${episodeCountId}">Episode count:</label>
  <input id="${episodeCountId}" name="episodeCount" type="number" input-mode="numeric" min="0">
  <button type="submit" class="${classes.add}">Submit</button>
</form>
`;

const buttonTemplate = document.createElement("template");
buttonTemplate.innerHTML = `
<button class="${classes.open}">Add another entry</button>
`;

export class PlanToWatchInput extends HTMLElement {
  public static is = "ptw-input";

  constructor() {
    super();
  }

  public list: ListStore | null = null;

  public connectedCallback() {
    // TODO: сделать так, чтобы этот метод звался автоматически
    this.render();
  }

  private render() {
    this.innerHTML = "";
    this.unsubscribe();
    if (this.list?.isAdding) {
      this.appendChild(formTemplate.content.cloneNode(true));
      this.listenToSubmit();
    } else {
      this.appendChild(buttonTemplate.content.cloneNode(true));
      this.listenToOpen();
    }
  }

  private unsubscribe = () => {};

  private listenToSubmit() {
    const formElement = this.querySelector<HTMLFormElement>(`.${classes.form}`);
    if (formElement) {
      const callback = (e: Event) => {
        e.preventDefault();
        const target = e.currentTarget! as HTMLFormElement;
        const data = new FormData(target);
        const name = data.get("name") as string;
        const episodeCountRaw = data.get("episodeCount") as string;
        const episodeCount = episodeCountRaw
          ? parseInt(episodeCountRaw, 10)
          : undefined;
        // TODO: Добавить логику
        console.log("new entry:", { name, episodeCount });
      };
      formElement.addEventListener("submit", callback);
      this.unsubscribe = () =>
        formElement.removeEventListener("submit", callback);
    }
  }

  private listenToOpen() {
    const buttonElement = this.querySelector<HTMLButtonElement>(
      `.${classes.open}`
    );
    if (buttonElement) {
      const callback = () => {
        // TODO: добавить логику
        console.log("open");
      };
      buttonElement.addEventListener("click", callback);
      this.unsubscribe = () =>
        buttonElement.removeEventListener("click", callback);
    }
  }
}

customElements.define(PlanToWatchInput.is, PlanToWatchInput);
