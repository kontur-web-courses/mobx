import type { Entry, IEntry } from "../models/entry";
import { defaultList } from "../models/list";

const cacheName = "@skbkontur/mobx-course/plan-to-watch";
const dbKey = new Request("/api/list");

function randomDelay() {
  return new Promise((resolve) => {
    setTimeout(resolve, Math.floor(100 + Math.random() * 250));
  });
}

class ApiClient {
  constructor() {
    this._storage = caches.open(cacheName).then(async (cache) => {
      if (!(await cache.match(dbKey))) {
        await cache.put(
          dbKey,
          new Response(JSON.stringify(defaultList), { status: 200 })
        );
      }
      return cache;
    });
  }

  private _storage: Promise<Cache>;
  private get storage() {
    return randomDelay().then(() => this._storage);
  }

  public getList = async (): Promise<IEntry[]> => {
    const cache = await this.storage;
    const response = await cache.match(dbKey);
    const cached = await response?.json();
    return cached ?? [];
  };

  public postEntry = async (entry: Entry): Promise<void> => {
    const cache = await this.storage;
    const response = await cache.match(dbKey);
    const entries: IEntry[] = (await response?.json()) ?? [];
    entries.push(entry.makeSnapshot());
    await cache.put(
      dbKey,
      new Response(JSON.stringify(entries), { status: 200 })
    );
  };

  public patchEntry = async (entry: Entry): Promise<void> => {
    const cache = await this.storage;
    const response = await cache.match(dbKey);
    if (!response) return;
    const entries: IEntry[] = await response.json();
    const target = entries.find((e) => e.id === entry.id);
    if (!target) return;
    Object.assign(target, entry.makeSnapshot());
    await cache.put(
      dbKey,
      new Response(JSON.stringify(entries), { status: 200 })
    );
  };

  public removeEntry = async (id: Entry["id"]): Promise<void> => {
    const cache = await this.storage;
    const response = await cache.match(dbKey);
    if (!response) return;
    const entries: IEntry[] = await response.json();
    const filtered = entries.filter((e) => e.id !== id);
    await cache.put(
      dbKey,
      new Response(JSON.stringify(filtered), { status: 200 })
    );
  };
}

export const apiClient = new ApiClient();
