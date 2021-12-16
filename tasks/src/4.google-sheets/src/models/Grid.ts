import { computed, IComputedValue, makeObservable } from "mobx";
import type { Sheet } from "./Sheet";

const toXY = (idx: number, width: number) => ({
  x: Math.trunc(idx / width),
  y: idx % width,
});
const toIdx = (x: number, y: number, width: number) => x * width + y;

const argument = "$__$";
const errorMessage = "#Error";
// Работает на темной магии регулярных выражений, мета-программировании и честном слове разработчика
// Позволяет использовать [x;y], как ссылку на ячейку, где x и y — ее координаты
const extractExpression = (value: string): ((grid: Grid) => string) => {
  const indexRegex = /\[\d+;\d+\]/gi;
  const expression = value.slice(1).replace(indexRegex, (v) => {
    const [x, y] = v.replace(/[^\d;]/gi, "").split(";");
    return `${argument}.read(${x}, ${y})`;
  });
  try {
    return new Function(argument, `return ${expression}`) as any;
  } catch (e) {
    return () => errorMessage;
  }
};

interface CellValue {
  raw: string;
  computed: null | IComputedValue<string>;
}

export class Grid {
  public sheet: Sheet;
  public readonly width: number = 8;
  public readonly height: number = 32;
  public values: Array<CellValue> = Array.from(
    Array(this.width * this.height),
    () => ({ raw: "", computed: null })
  );
  public _selection: number = 0;

  constructor(sheet: Sheet) {
    // TODO: добавь немного магии
    this.sheet = sheet;
  }

  public get idxs() {
    // TODO: верни все ключи массива
    return [];
  }

  public get selectionView() {
    const { x, y } = toXY(this._selection, this.width);
    return `[${x};${y}]`;
  }

  public get selectedValue() {
    return this.values[this._selection].raw;
  }

  public isSelected(idx: number): boolean {
    // TODO: допиши сравнение
    return false;
  }

  public readIndex(idx: number) {
    const value = this.values[idx];
    try {
      // TODO: если есть, читать из value.computed, иначе из value.raw
      return value.raw;
    } catch {
      return errorMessage;
    }
  }

  public read = (x: number, y: number) => {
    const idx = toIdx(x, y, this.width);
    return this.readIndex(idx);
  };

  public setSelection(idx: number) {
    // TODO: не забудь обработать выход за границы массива
  }

  public write(idx: number, value: string) {
    this.values[idx].raw = value;
    this.values[idx].computed = null;
    if (value.startsWith("=")) {
      // TODO: превратить значение в функцию, которая принимает this
      // и вычисляет выражение можно с помощью extractExpression
      // TODO: полученную функцию нужно обернуть в callback, который передаёт this,
      // а затем в computed, чтобы получилось вычисляемое значение
      // Полученный объект нужно положить в поле .computed
    }
  }

  public writeSelection(value: string) {
    this.write(this._selection, value);
  }

  public move(direction: "ArrowDown" | "ArrowLeft" | "ArrowRight" | "ArrowUp") {
    const { x, y } = toXY(this._selection, this.width);
    switch (direction) {
      case "ArrowDown": {
        // TODO: тут нужно изменить на 1 одну из координат
        this.setSelection(toIdx(x, y, this.width));
        break;
      }
      case "ArrowLeft": {
        // TODO: тут нужно изменить на 1 одну из координат
        this.setSelection(toIdx(x, y, this.width));
        break;
      }
      case "ArrowRight": {
        // TODO: тут нужно изменить на 1 одну из координат
        this.setSelection(toIdx(x, y, this.width));
        break;
      }
      case "ArrowUp": {
        // TODO: тут нужно изменить на 1 одну из координат
        this.setSelection(toIdx(x, y, this.width));
        break;
      }
    }
  }
}
