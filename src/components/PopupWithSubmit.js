import Popup from "./Popup";

export default class PopupWithSubmit extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this._popupForm = this._popup.querySelector('.popup__form')

    this._popupButton = this._popupForm.querySelector('.popup__button')
    this._popupButtonText = this._popupButton.textContent
  }

  setSubmitAction(submitAction) {
    this._submitCallback = submitAction;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popupForm.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._submitCallback();
    });
  }

  renderLoadingDelete(isLoading) {
    if(isLoading) {
      this._popupButton.textContent = 'Сохранение...'
    } else {
      this._popupButton.textContent = this._popupButtonText
    }
  }
}