// TODO: здесь будем хранить текущую реакцию
let currentlyRunning = null;

// Ячейка, которая будет хранить состояние и следить за его изменением
export function box(initial) {
  let value = initial;
  return {
    // Здесь будем хранить все наблюдатели-реакции
    observers: [],
    get() {
      // TODO: добавить ячейку в список прочитанных у текущей реакции
      return value;
    },
    set(newValue) {
      value = newValue;
      // TODO: 1. сохранить копию текущий список наблюдателей
      //       2. очистить текущий список наблюдателей
      //       3. сообщить всем скопированным наблюдателям об изменениях
    },
  };
}

// Функция, которая позволит реагировать на изменения состояния
export function autorun(effect) {
  const reaction = {
    // Здесь будем хранить все наблюдаемые значения
    observing: [],
    run() {
      // TODO: 1. сохранить текущую реакцию
      //       2. обнулить массив наблюдаемых значений
      effect();
      // TODO: 1. добавить текущую реакцию в массив наблюдателей для каждого наблюдаемого значения
      //       2. почистить текущую реакцию
    },
  };
  return reaction.run();
}

// Скрытие реактивности за удобным взаимодействием с объектом
export function observable(target) {
  const keys = Reflect.ownKeys(target);
  // Заменим все свойства объекта на обертки-ячейки
  for (const key of keys) {
    Reflect.defineProperty(target, key, {
      get: boxed.get.bind(boxed),
      set: boxed.set.bind(boxed),
    });
  }
  return target;
}
