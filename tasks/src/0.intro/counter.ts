import "./intro.css";
import { box, autorun, observable } from "./mobx.js";

let counter = box(0);
function increment() {
  counter.set(counter.get() + 1);
}
function decrement() {
  counter.set(counter.get() - 1);
}

export function render(rootElement: HTMLElement) {
  const field = document.createElement("input");
  field.readOnly = true;
  field.type = "number";
  field.className = "counter";
  // TODO: избавиться от ручного обновления
  field.value = counter.get().toString();

  const inc = document.createElement("button");
  inc.innerText = "increment";
  inc.className = "increment";
  inc.addEventListener("click", () => {
    increment();
    // TODO: избавиться от ручного обновления
    field.value = counter.get().toString();
  });

  const dec = document.createElement("button");
  dec.innerText = "decrement";
  dec.className = "decrement";
  dec.addEventListener("click", () => {
    decrement();
    // TODO: избавиться от ручного обновления
    field.value = counter.get().toString();
  });

  const fragment = document.createDocumentFragment();
  fragment.appendChild(field);
  fragment.appendChild(inc);
  fragment.appendChild(dec);

  rootElement.appendChild(fragment);
}
