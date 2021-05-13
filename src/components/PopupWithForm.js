import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor({ popupSelector, submitCallback }) {
    super(popupSelector);
    this._submitCallback = submitCallback;

    this._popupForm = this._popup.querySelector('.popup__form')

    this._popupButton = this._popupForm.querySelector('.popup__button')
    this._popupButtonText = this._popupButton.textContent
  }

  _getInputValues() {
    this._inputList = this._popup.querySelectorAll('.popup__input');
    this._formValues = {}; // объект значений всех инпутов

    this._inputList.forEach( (input) => {
      this._formValues[input.name] = input.value; 
    });

    return this._formValues;
  }

  setEventListeners() {
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
    
    super.setEventListeners();
  }

  close() {
    this._popupForm.reset();
    
    super.close();
  }

  renderLoading(isLoading) {
    if(isLoading) {
      this._popupButton.textContent = 'Сохранение...'
    } else {
      this._popupButton.textContent = this._popupButtonText
    }
  }


}