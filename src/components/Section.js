export default class Section {
  constructor({ items, renderer } , containerSelector) {
    this._initialCards = items; // массив данных карточек
    this._renderer = renderer; // функция, которая создает карточки и отрисовывает их на страницу

    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._initialCards.forEach( (item) => {
      this._renderer(item);
    });
  }

  // принимает DOM-элемент и добавляет его в контейнер
  addItem(element, toEnd) {
    const method = toEnd ? 'append' : 'prepend';
    this._container[method](element);
  }
}