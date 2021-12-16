import {
  makeObservable,
  action,
  observable,
  flow,
  runInAction,
  autorun,
  flowResult,
  isFlowCancellationError,
} from "mobx";
import styles from "./async.module.css";

interface MaybeCancellable extends Promise<void> {
  cancel?: () => void;
}

class CatsStore {
  static defaultTag = "cute";
  static defaultText = "hello";

  constructor() {
    makeObservable(this, {});
  }

  tag: string = CatsStore.defaultTag;
  setTag(tag: string) {
    this.tag = tag || CatsStore.defaultTag;
  }

  text: string = CatsStore.defaultText;
  setText(text: string) {
    this.text = text || CatsStore.defaultText;
  }

  tags: string[] = [];
  loadingTags: boolean = false;
  async loadTags() {
    try {
      this.loadingTags = true;
      const response = await fetch("https://cataas.com/api/tags");
      const tags = await response.json();
      this.loadingTags = false;
      this.tags = tags;
    } catch (err) {
      this.loadingTags = false;
      this.tags = [];
    }
  }

  catUrl: string = "";
  loadingCat: boolean = false;
  async loadCat(tag: string, text: string, signal: AbortSignal) {
    try {
      this.loadingCat = true;
      const response: Response = await fetch(
        `https://cataas.com/cat/${encodeURIComponent(
          tag
        )}/says/${encodeURIComponent(text)}`,
        { signal }
      );
      const blob: Blob = await response.blob();
      const url = URL.createObjectURL(blob);
      this.loadingCat = false;
      this.catUrl = url;
    } catch (err) {
      if (isFlowCancellationError(err) || signal.aborted) return;
      this.loadingCat = false;
      this.catUrl = "";
    }
  }

  getCat(tag: string, text: string, signal: AbortSignal) {
    return flowResult(this.loadCat(tag, text, signal));
  }
}

function renderTags(fragment: DocumentFragment, store: CatsStore) {
  const label = document.createElement("label");
  label.innerText = "Cat";
  label.classList.add(styles.tagLabel);
  label.htmlFor = "tag";

  const tag = document.createElement("input");
  tag.id = "tag";
  tag.setAttribute("placeholder", CatsStore.defaultTag);
  tag.setAttribute("list", "tags");
  tag.classList.add(styles.tag);
  tag.addEventListener("input", (evt) => {
    const value = (evt.target as HTMLInputElement).value;
    store.setTag(value);
  });

  const tags = document.createElement("datalist");
  tags.id = "tags";
  autorun(() => {
    tags.innerHTML = store.tags.map((t) => `<option>${t}</option>`).join("");
  });
  autorun(() => {
    tag.disabled = store.loadingTags;
  });

  store.loadTags();

  fragment.appendChild(label);
  fragment.appendChild(tag);
  fragment.appendChild(tags);
}

function renderText(fragment: DocumentFragment, store: CatsStore) {
  const label = document.createElement("label");
  label.innerText = "says";
  label.classList.add(styles.textLabel);
  label.htmlFor = "text";

  const text = document.createElement("input");
  text.setAttribute("placeholder", CatsStore.defaultText);
  text.classList.add(styles.text);
  text.addEventListener("input", (evt) => {
    const value = (evt.target as HTMLInputElement).value;
    store.setText(value);
  });

  fragment.appendChild(label);
  fragment.appendChild(text);
}

function renderCat(fragment: DocumentFragment, store: CatsStore) {
  const cat = document.createElement("img");
  cat.alt = "Cute cat picture";
  cat.classList.add(styles.cat);
  autorun(() => {
    if (store.loadingCat) {
      cat.classList.add(styles.loading);
    } else {
      cat.classList.remove(styles.loading);
    }
  });
  autorun(() => {
    cat.src = store.catUrl;
  });
  fragment.appendChild(cat);
}

export function render(rootElement: HTMLElement) {
  const store = new CatsStore();
  const fragment = document.createDocumentFragment();

  renderTags(fragment, store);
  renderText(fragment, store);
  renderCat(fragment, store);

  let ac = new AbortController();
  autorun(() => {
    ac.abort();
    ac = new AbortController();
    const promise: MaybeCancellable = store.loadCat(
      store.tag,
      store.text,
      ac.signal
    );
    ac.signal.addEventListener("abort", () => promise.cancel?.(), {
      once: true,
    });
  });

  rootElement.appendChild(fragment);
}
