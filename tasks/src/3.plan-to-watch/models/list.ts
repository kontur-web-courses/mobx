import { makeAutoObservable } from "mobx";
import { nanoid } from "nanoid";
import type { IEntry } from "./entry";
import { Entry, Status, ShowAllStatus, type IShowAllStatus } from "./entry";

export class ListStore {
  constructor(entries: IEntry[]) {
    makeAutoObservable(this);
    this.entries = new Map(
      entries.map((entry) => [entry.id, new Entry(entry)])
    );
  }

  public entries: Map<string, Entry> = new Map();
  public get showing(): Array<Entry["id"]> {
    return [...this.entries.values()]
      .filter((e) => this.mode === ShowAllStatus || e.status === this.mode)
      .map((e) => e.id);
  }
  public get total(): number {
    return this.showing
      .map((id) => this.entries.get(id)?.episodesSeen ?? 0)
      .reduce((x, y) => x + y);
  }
  public mode: Status | IShowAllStatus = ShowAllStatus;
  public isAdding: boolean = false;

  addEntry(entry: Pick<IEntry, "name" | "episodeCount">) {
    const newEntry = Entry.makeNew(entry);
    this.entries.set(newEntry.id, newEntry);
  }
  removeEntry(id: Entry["id"]) {
    this.entries.delete(id);
  }
  setMode(mode: Status | IShowAllStatus) {
    this.mode = mode;
  }
  setAdding(newValue: boolean) {
    this.isAdding = newValue;
  }
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
