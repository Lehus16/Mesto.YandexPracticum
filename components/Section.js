export class Section {
  constructor({renderer }, containerSelector) {
    // this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    this._items = items;
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element, method = 'append') {
    this._container[method](element);
  }

  removeItem(element) {
    element.remove();
  }
}
