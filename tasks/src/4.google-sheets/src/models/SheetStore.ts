import { makeObservable } from "mobx";
import { Sheet } from "./Sheet";

export class SheetStore {
  public name: string = "Untitled spreadsheet";
  public sheets: Array<Sheet> = [];
  public _selected: Sheet["id"] | null = null;

  constructor() {
    // TODO: добавь здесь немного магии
  }

  public get current(): Sheet | undefined {
    // TODO: найди здесь правильный лист
    return undefined;
  }

  public createSheet(): Sheet["id"] {
    // TODO: создай новый лист и сохрани в Store, верни id нового листа
    return "new-id";
  }

  public deleteSheet(sheet: Sheet) {
    // TODO: удали лист из Store
  }

  public duplicateSheet(sheet: Sheet) {
    // TODO: Создай новый лист и скопируй туда поля .name, .favorite, и grid.values
  }

  public rename(newName: string) {
    // TODO
  }

  public changeSelected(id: Sheet["id"]) {
    // TODO
  }
}
