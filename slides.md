---
title: MobX course
description: Practical introduction to MobX
theme: uncover
size: 16:9
style: |
  section {
    font-size: 2rem;
    letter-spacing: normal; 
  }
---

# **MobX**

https://github.com/kontur-courses/mobx

---

# Практические задачи

Задачки лежат в папке `tasks`, запуск сервера:

```
$ cd tasks
$ npm i
$ npm start
```

По умолчанию, сервер запустится по адресу [http://localhost:8080](http://localhost:8080)

Изменения подхватываются автоматически, перезапускать ничего не нужно

---

# Проблема

Хотим следить за изменениями нашего состояния  
и менять от этого UI

---

# Краткая история решений

- $-style: обнови состояние, затем обнови весь UI, который от него зависит
- React-style: обнови состояние, обнови всю внутреннюю модель UI, вычисли изменения, обнови настоящий UI
- Angular-style: обнови состояние, UI пусть сам следит за всеми изменениями и обновляется
- RX-style: при каждом обновлении, новое состояние доставят всем подписавшимся
- Svelte-style: на каждое изменение, сгенерируй код обновления UI

---

# Обратно к истокам

Хотим декларативный механизм, который будет звать некий код в зависимости от того, что он использует

---

# Реактивное программирование

Observable <=> Observer

<!--
Observable, следит за тем, кто его использует, и точечно сообщает им об изменениях
Observer явно рассказывает всем значениям, что они используются
-->

---

# Давайте практиковаться

Делаем задачку **intro**

---

# Что получилось

- Коробка-значение и реагирование на изменения

---

# Чего не хватает?

<!-- prettier-ignore -->
* Вычисляемые значения
* Атомарные обновления
* Структуры посложнее

---

# Суть MobX

![width:1024px](figures/action-state-view.png)

<!--
https://mobx.js.org/the-gist-of-mobx.html
Все производные обновляются автоматически и атомарно, когда состояние меняется. Нельзя увидеть промежуточные значения
Все производные обновляются синхронно, то есть после присваивания значения сразу можно его читать
Вычисляемые значения обновляются лениво. Неиспользуемые значения приостанавливаются и отдаются сборщику мусора
Вычисляемые значения должны быть чистыми и не менять состояние
-->

---

# API. Состояние

```js
class X {
  constructor() {
    makeObservable(this, {
      // аннотации (observable, action, computed)
    });
    // или с дефолтными настройками:
    makeAutoObservable(this);
  }
}
```

<!-- https://mobx.js.org/observable-state.html -->

---

# API. Состояние

```js
function createX() {
  return makeAutoObservable({
    // объект со свойствами, методами, геттерами
  });
}
```

<!-- https://mobx.js.org/observable-state.html -->

---

# API. Состояние

```js
const x = observable({
  // объект со свойствами, методами, геттерами
});
```

<!-- https://mobx.js.org/observable-state.html -->

---

# API. Действия

`action` и `action.bound` для аннотаций,  
`runInAction(() => {/*…*/})` для атомарности ручных изменений  
По умолчанию, MobX будет ругаться на изменения вне action-ов,  
подробнее будет в части о настройках

<!-- https://mobx.js.org/actions.html -->

---

# API. Вычисляемые значения

`computed` как аннотация для геттеров или  
`const x = computed(() => /*…*/)` для создания оберток

<!-- https://mobx.js.org/computeds.html -->

---

# API. Вычисляемые значения, правила

- должны быть чистыми функциями
- не стоит возвращать новые observable

<!-- https://mobx.js.org/computeds.html#rules -->

---

# API. Реакции

```js
const disposer = autorun(() => {
  /*…*/
});
```

Чтобы не получилась утечка по памяти,  
нужно звать `disposer`, когда реакция больше не нужна  
Еще есть [reaction](https://mobx.js.org/reactions.html#reaction) и [when](https://mobx.js.org/reactions.html#when), о них можно почитать отдельно

<!-- https://mobx.js.org/reactions.html -->

---

# API. Как работает отслеживание реакций

![width:1024px](figures/autorun.png)

<!--
На каждый запуск строится новый список зависимостей, когда зависимость меняется, она запускает все свои реакции
-->

<!-- https://mobx.js.org/reactions.html#how-tracking-works -->

---

# API. Реакции, правила

- Запускаются синхронно, сразу после изменения,  
  но не раньше чем самый закончится самое внешнее действие
- Отслеживается только то, что прочитано синхронно во время запуска функции
- Не отслеживается то, что прочитано внутри действия

<!-- https://mobx.js.org/reactions.html#rules -->

---

# API. Асинхронные действия

Есть несколько вариантов:

- Каждый callback в `.then()` должен быть действием
- Каждому куску кода после `await` нужно отдельное действие
- Все, что происходит в другом тике оборачивай в действие

Действие === (обернут в `action` / `runInAction`)

<!-- https://mobx.js.org/actions.html#asynchronous-actions -->

---

# API. flow()

Можно использовать `flow` вместо `async/await`:

```js
async function load(store) {
  store.loading = true;
  try {
    const result = await fetch("…");
    runInAction(() => {
      store.value = result;
    });
  } catch (e) {
    runInAction(() => {
      store.error = e;
    });
  } finally {
    runInAction(() => {
      store.loading = false;
    });
  }
}
```

<!-- https://mobx.js.org/actions.html#using-flow-instead-of-async--await- -->

---

# API. flow()

```js
// добавили flow()
const load = flow(
  // function* вместо async
  function* (store) {
    store.loading = true;
    try {
      // yield вместо await
      const result = yield fetch("…");
      store.value = result;
    } catch (e) {
      store.error = e;
    } finally {
      store.loading = false;
    }
  }
);
```

<!-- https://mobx.js.org/actions.html#using-flow-instead-of-async--await- -->

---

# Хватит разговоров, нужна практика!

Делаем задачку **plan-to-watch**
