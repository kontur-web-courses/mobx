import { makeObservable } from "mobx";
import { nanoid } from "nanoid";
import type { IEntry } from "./entry";
import { Entry, Status, ShowAllStatus, IShowAllStatus } from "./entry";

export class ListStore {
  constructor(entries: IEntry[]) {
    makeObservable(this, {
      // TODO: добавь сюда немного магии
    });
    this.entries = new Map(
      entries.map((entry) => [entry.id, new Entry(entry)])
    );
    this.showing = Array.from(this.entries.keys());
    this.total = this.showing
      .map((id) => this.entries.get(id)?.episodesSeen ?? 0)
      .reduce((x, y) => x + y);
  }

  public entries: Map<string, Entry> = new Map();
  public showing: Array<Entry["id"]> = [];
  public total: number = 0;
  public mode: Status | IShowAllStatus = ShowAllStatus;
  public isAdding: boolean = false;

  addEntry(entry: Pick<IEntry, "name" | "episodeCount">) {}
  removeEntry(id: Entry["id"]) {}
  setMode(mode: Status | IShowAllStatus) {}
  setAdding(newValue: boolean) {}
}

export const defaultList = [
  {
    id: nanoid(),
    name: "Stranger things",
    status: Status.Watching,
    episodesSeen: 3,
    episodeCount: 34,
  },
  {
    id: nanoid(),
    name: "Lost",
    status: Status.PlanToWatch,
    episodesSeen: 0,
    episodeCount: 122,
  },
  {
    id: nanoid(),
    name: "Game of Thrones",
    status: Status.Dropped,
    episodesSeen: 68,
    episodeCount: 73,
  },
  {
    id: nanoid(),
    name: "The Walking Dead",
    status: Status.PlanToWatch,
    episodesSeen: 0,
  },
  {
    id: nanoid(),
    name: "The Lord of the Rings: The Fellowship of the Ring",
    status: Status.Completed,
    episodeCount: 1,
    episodesSeen: 1,
  },
  {
    id: nanoid(),
    name: "The Lord of the Rings: The Two Towers",
    status: Status.Completed,
    episodeCount: 1,
    episodesSeen: 1,
  },
  {
    id: nanoid(),
    name: "The Lord of the Rings: The Return of the King",
    status: Status.Completed,
    episodeCount: 1,
    episodesSeen: 1,
  },
];
