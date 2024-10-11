export class Domain extends EventTarget {
  fire(eventName, detail) {
    this.dispatchEvent(
      new CustomEvent(eventName, {
        bubbles: true,
        composed: true,
        detail: detail ?? {}
      })
    );
  }

  on(eventName, handler) {
    this.addEventListener(eventName, handler);
    return this;
  }

  off(eventName, handler) {
    this.removeEventListener(eventName, handler);
    return this;
  }
}
