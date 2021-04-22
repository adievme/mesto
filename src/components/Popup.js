export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
  }

  open() {
    this._popup.classList.add('popup_active');
    document.addEventListener('keydown', this._handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup_active');
    document.removeEventListener('keydown', this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') this.close(); 
  }

  _handleOverlayClose(evt) {
    if (evt.target.classList.contains('popup')) this.close();
  }

  setEventListeners() {
    // Слушатель закрытия попапа на крестик
    this._popup.querySelector('.popup__close')
    .addEventListener('click', () => this.close());

    // Слушатель закрытия попапа на оверлей
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup')) this.close();
    })
  }
}
