export default class Section {
  constructor({ renderer } , containerSelector) {
    this._renderer = renderer; // функция, которая создает карточки и отрисовывает их на страницу
    this._container = document.querySelector(containerSelector);
  }

  renderItems(items) {
    items.forEach( (item) => {
      this._renderer(item);
    });
  }

  // принимает DOM-элемент и добавляет его в контейнер
  addItem(element, toEnd) {
    const method = toEnd ? 'append' : 'prepend';
    this._container[method](element);
  }
}