import { 
  nameInput, 
  infoInput, 
  titleInput, 
  linkInput 
} from '../utils/constants.js';
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
      this._formValues[input.name = 'name'] = titleInput.value;
      this._formValues[input.name = 'link'] = linkInput.value;
      this._formValues[input.name = 'name_user'] = nameInput.value;
      this._formValues[input.name = 'info'] = infoInput.value;
    });

    return this._formValues;
  }

  setEventListeners() {
    this._popup.querySelector('.popup__form')
    .addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback(this._getInputValues());
    });
    
    super.setEventListeners();
  }

  close() {
    this._popup.querySelector('.popup__form').reset();
    
    super.close();
  }
}