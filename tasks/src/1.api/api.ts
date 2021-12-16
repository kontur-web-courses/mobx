import { makeObservable, autorun, observable, action, computed } from "mobx";

enum Operator {
  Addition = "+",
  Subtraction = "-",
  Multiplication = "*",
  Division = "/",
}

class Calculator {
  left = NaN;
  operator = Operator.Addition;
  right = NaN;

  constructor() {
    makeObservable(this, {
      left: observable,
      operator: observable,
      right: observable,
      input: action,
      result: computed,
    });
  }

  input(lhs: number, operator: Operator, rhs: number) {
    this.left = lhs;
    this.operator = operator;
    this.right = rhs;
  }

  get result() {
    const expression = `${this.left} ${this.operator} ${this.right}`;
    console.log(`computing: ${expression}`);
    return eval(expression);
  }
}

const calc = new Calculator();

autorun(() => {
  console.log(`result: ${calc.result}`);
});

// Посчитай 2 + 2
calc.input(2, Operator.Addition, 2);

// Посчитай 2 * 2
calc.input(2, Operator.Multiplication, 2);

// Посчитай 2 - 2
calc.input(2, Operator.Subtraction, 2);

// Посчитай 1 / 3
calc.input(1, Operator.Division, 3);
