import { makeObservable, autorun } from "mobx";

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
    makeObservable(this, {});
  }

  static compute(lhs: number, operator: Operator, rhs: number) {
    console.log(`computing: ${lhs} ${operator} ${rhs}`);
    return eval(`${lhs} ${operator} ${rhs}`);
  }
}

const calc = new Calculator();

autorun(() => {
  const result = Calculator.compute(calc.left, calc.operator, calc.right);
  console.log(`result: ${result}`);
});

// Посчитай 2 + 2

// Посчитай 2 * 2

// Посчитай 2 - 2

// Посчитай 1 / 3
