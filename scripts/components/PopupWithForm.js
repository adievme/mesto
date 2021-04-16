import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallback) {
    super(popupSelector);
    this._submitCallback = submitCallback;
  }

  _getInputValues() {
    //собирает данные всех полей формы.
  }

  setEventListeners() {
    super.setEventListeners();

    this._popup.querySelector('.popup__form').addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback();
    });
  }

  close() {
    //his._popup.querySelector('.popup__form').reset();
    
    super.close();
  }
}