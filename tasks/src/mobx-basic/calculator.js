import {
  observable,
  autorun,
  computed,
  runInAction,
  makeAutoObservable,
} from "mobx";

const Operation = {
  Plus: "+",
  Minus: "-",
  Multiplication: "*",
  Division: "/",
};

function makeCalculator() {
  const values = {
    lhs: 0,
    rhs: 0,
    op: Operation.Plus,
  };
  function getResult() {
    console.log("** computing result **");
    // TODO: допиши логику вычисления
    return NaN;
  }
  function reset() {
    // TODO: допиши логику обнуления
  }
  return { values, getResult, reset };
}

const calculator = makeCalculator();

// Задание:
// 1. Сделай так, чтобы значения из калькулятора стали отслеживаться с помощью mobx
//    Для этого оберни объект values в observable()
// 2. Сделай так, чтобы при изменении значений в полях обновлялись значения в объекте values
// 3. Допиши логику вычисления результата. Сделай так, чтобы значение инпута автоматические обновлялось при пересчете
//    Для этого можно воспользоваться autorun()
// 4. Сейчас, значение результата копируется в поле, даже если оно не изменилось
//    Перепеши расчет результата с использованием computed(), значение в поле все ещё обновляй с помощью autorun()
// 5. Допиши логику обнуления состояния
//    Посмотри сколько раз был вычислен результат
//    Оберни обнуление состояния в runInAction()
// 6. Оъедени хранение значений, вычиcление результата и обнуление в один объект,
//    оберни его в makeAutoObservable, чтобы полностью инкапсулировать работу с состоянием

export function render(rootElement) {
  const left = document.createElement("input");
  left.type = "number";
  left.value = calculator.values.lhs;
  left.className = "left";
  left.addEventListener("input", (e) => {
    // TODO: обнови значение
    console.log(e.target.value);
  });

  const right = document.createElement("input");
  right.type = "number";
  right.value = calculator.values.rhs;
  right.className = "right";
  right.addEventListener("input", (e) => {
    // TODO: обнови значение
    console.log(e.target.value);
  });

  const computation = document.createElement("select");
  for (const value of Object.values(Operation)) {
    const option = document.createElement("option");
    option.value = value;
    option.innerText = value;
    computation.appendChild(option);
  }
  computation.value = calculator.values.op;
  computation.className = "operation";
  computation.addEventListener("input", (e) => {
    // TODO: обнови значение
    console.log(e.target.value);
  });

  const result = document.createElement("input");
  result.type = "text";
  result.readOnly = true;
  result.value = calculator.getResult();
  result.className = "result";

  const reset = document.createElement("button");
  reset.innerText = "reset";
  reset.className = "reset";
  reset.addEventListener("click", () => {
    calculator.reset();
  });

  const fragment = document.createDocumentFragment();
  fragment.appendChild(left);
  fragment.appendChild(computation);
  fragment.appendChild(right);
  fragment.appendChild(result);
  fragment.appendChild(reset);

  rootElement.appendChild(fragment);
}
