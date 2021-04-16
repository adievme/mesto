export default class Section {
  constructor( { items, renderer } , containerSelector) {
    this._initialCards = items; // массив данных
    this._renderer = renderer; // функция, которая создает и отрисовывает данные на странице

    this._container = document.querySelector(containerSelector); // селектор контейнера
  }

  // отвечает за отрисовку всех элементов
  renderItems() {
    this._initialCards.forEach( (item) => {
      this._renderer(item, true);
    });
  }

  // принимает DOM-элемент и добавляет его в контейнер
  addItem(element, method) {
    this._container[method](element);
  }
}