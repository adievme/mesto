import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback;
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {}; // оббъект значений всех инпутов

    this._inputList.forEach( (input) => {
      this._formValues[input.name] = input.value; 
    });

    return this._formValues;
  }

  setEventListeners() {
    this._popup.querySelector('.popup__form')
    .addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
      this.close();
    });
    
    super.setEventListeners();
  }

  close() {
    this._popup.querySelector('.popup__form').reset();
    
    super.close();
  }
}