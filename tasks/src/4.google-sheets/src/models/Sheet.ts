import { makeObservable } from "mobx";
import { nanoid } from "nanoid";
import { Grid } from "./Grid";
import type { SheetStore } from "./SheetStore";

export class Sheet {
  public readonly id = nanoid();
  public name: string = "New Sheet";
  public store: SheetStore;
  public grid: Grid;

  constructor(store: SheetStore) {
    // TODO: добавь здесь немного магии
    this.store = store;
    this.grid = new Grid(this);
  }

  public get isSelected() {
    return this.store._selected === this.id;
  }

  public select() {
    this.store.changeSelected(this.id);
  }

  public delete() {
    this.store.deleteSheet(this);
  }

  public duplicate() {
    this.store.duplicateSheet(this);
  }

  public rename(newName: string) {
    // TODO
  }
}
