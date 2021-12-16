import { makeAutoObservable } from "mobx";
import { Sheet } from "./Sheet";

export class SheetStore {
  public name: string = "Untitled spreadsheet";
  public sheets: Array<Sheet> = [];
  public _selected: Sheet["id"] | null = null;

  constructor() {
    // TODO: добавь здесь немного магии
    makeAutoObservable(this);
  }

  public get current(): Sheet | undefined {
    // TODO: найди здесь правильный лист
    return this.sheets.find((s) => s.id === this._selected);
  }

  public createSheet(): Sheet["id"] {
    // TODO: создай новый лист и сохрани в Store, верни id нового листа
    const sheet = new Sheet(this);
    this.sheets.push(sheet);
    return sheet.id;
  }

  public deleteSheet(sheet: Sheet) {
    // TODO: удали лист из Store
    this.sheets = this.sheets.filter((s) => s !== sheet);
  }

  public duplicateSheet(sheet: Sheet) {
    // TODO: Создай новый лист и скопируй туда поля .name и grid.values
    const copy = new Sheet(this);
    copy.name = sheet.name;
    copy.grid.values = sheet.grid.values;
    this.sheets.push(copy);
  }

  public rename(newName: string) {
    // TODO
    this.name = newName;
  }

  public changeSelected(id: Sheet["id"]) {
    // TODO
    this._selected = id;
  }
}
