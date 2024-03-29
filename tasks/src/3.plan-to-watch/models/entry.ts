import { makeObservable } from "mobx";
import { nanoid } from "nanoid";

export const ShowAllStatus = "Show all";
export type IShowAllStatus = typeof ShowAllStatus;
export enum Status {
  Watching = "Watching",
  Completed = "Completed",
  PlanToWatch = "Plan to watch",
  Dropped = "Dropped",
}

export interface IEntry {
  id: string;
  name: string;
  status: Status;
  episodesSeen: number;
  episodeCount?: number;
}

export class Entry implements IEntry {
  constructor(entry: IEntry) {
    makeObservable(this, {
      // TODO: добавь сюда немного магии
    });
    this.id = entry.id;
    this.name = entry.name;
    this.status = entry.status;
    this.episodesSeen = entry.episodesSeen;
    this.episodeCount = entry.episodeCount;
  }

  public static makeNew(entry: Pick<IEntry, "name" | "episodeCount">) {
    return new this({
      ...entry,
      id: nanoid(),
      episodesSeen: 0,
      status: Status.PlanToWatch,
    });
  }
  public makeSnapshot(): IEntry {
    return {
      id: this.id,
      name: this.name,
      status: this.status,
      episodesSeen: this.episodesSeen,
      episodeCount: this.episodeCount,
    };
  }

  public id: string = nanoid();
  public name: string = "";
  public status: Status = Status.PlanToWatch;
  public episodesSeen: number = 0;
  public episodeCount?: number = undefined;

  // TODO: допиши логику этих методов
  public incrementEpisode() {}
  public decrementEpisode() {}
  public setEpisode(newEpisode: number) {}
  public setStatus(status: Status) {}
}
