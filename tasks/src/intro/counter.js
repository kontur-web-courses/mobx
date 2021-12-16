import "./intro.css";
import { box, autorun, observable } from "./mobx.js";

let counter = 0;

function increment() {
  counter += 1;
}

function decrement() {
  counter -= 1;
}

// Задание:
// 1. Сделай так, чтобы при изменении значения counter-а не приходилось вручную обновлять состояние элемента.
//    Для этого придется написать функции box и autorun внутри файла mobx.js
// 2. Сделай так, чтобы значение хранилось внутри объекта, а измения просходили присваиванием какого-то свойтсва в нем
//    Для этого пригодится observable.

export function render(rootElement) {
  const field = document.createElement("input");
  field.readOnly = true;
  field.type = "number";
  field.className = "counter";
  // TODO: избавиться от ручного обновления
  field.value = counter;

  const inc = document.createElement("button");
  inc.innerText = "increment";
  inc.className = "increment";
  inc.addEventListener("click", () => {
    increment();
    // TODO: избавиться от ручного обновления
    field.value = counter;
  });

  const dec = document.createElement("button");
  dec.innerText = "decrement";
  dec.className = "decrement";
  dec.addEventListener("click", () => {
    decrement();
    // TODO: избавиться от ручного обновления
    field.value = counter;
  });

  const fragment = document.createDocumentFragment();
  fragment.appendChild(field);
  fragment.appendChild(inc);
  fragment.appendChild(dec);

  rootElement.appendChild(fragment);
}
