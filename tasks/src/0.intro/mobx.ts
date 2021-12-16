interface Observable {
  observers: Reaction[];
}

interface Reaction {
  observing: Observable[];
  run(): void;
}

let currentReaction: Reaction | null = null;

export function box<T>(initial: T) {
  let value = initial;
  return {
    observers: [],
    get() {
      if (currentReaction) currentReaction.observing.push(this);
      return value;
    },
    set(this: Observable, newValue: T) {
      value = newValue;
      const { observers } = this;
      this.observers = [];
      observers.forEach((r) => r.run());
    },
  };
}

export function autorun(effect: () => void) {
  const reaction = {
    observing: [],
    run(this: Reaction) {
      currentReaction = this;
      this.observing = [];
      effect();
      this.observing.forEach((observable) => {
        observable.observers.push(this);
      });
      currentReaction = null;
    },
  };
  return reaction.run();
}

// Скрытие реактивности за удобным взаимодействием с объектом
export function observable<T extends Record<string | symbol, unknown>>(
  object: T
): T {
  const bookmarks = Object.fromEntries(
    Object.entries(object).map(([key, value]) => [key, box(value)])
  );
  return new Proxy(object, {
    get(_, p) {
      if (!Reflect.has(bookmarks, p)) {
        Reflect.set(bookmarks, p, box(undefined));
      }
      return Reflect.get(bookmarks, p).get();
    },
    set(_, p, v) {
      if (!Reflect.has(bookmarks, p)) {
        return Reflect.set(bookmarks, p, box(v));
      }
      Reflect.get(bookmarks, p).set(v);
      return true;
    },
  });
}
