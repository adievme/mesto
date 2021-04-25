export default class FormValidator {
  constructor(config, formElement) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;

    this._formElement = formElement;
  }

  // Включить валидацию формы
  enableValidation() {
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

    this._setEventListeners(this._formElement);
  }

  activeFormButton() {
    this._buttonElement.classList.remove(this._inactiveButtonClass);
    this._buttonElement.removeAttribute('disabled');
  }

  inactiveFormButton() {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.setAttribute('disabled', true);
  }

  // Наложить обработчики лайв-ввода всем инпутам 
  _setEventListeners() {
    this._inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    this._buttonElement = this._formElement.querySelector(this._submitButtonSelector);

    this._toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }
 
  _checkInputValidity(inputElement) {
    if (inputElement.validity.valid) {
      this._hideInputError(inputElement);
    } else {
      this._showInputError(inputElement);
    }
  }

  // Переключить состояние кнопки
  _toggleButtonState() {
    if (this._hasInvalidInput(this._inputList)) {
      this.inactiveFormButton();
    } else {
      this.activeFormButton();
    }
  }

  // Проверить есть ли хоть одно невалидное поле
  _hasInvalidInput() {
    return this._inputList.some(inputElement => !inputElement.validity.valid);
  }

  // Показать ошибку и подкрашивание
  _showInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}_error`);

    this._errorElement.textContent = inputElement.validationMessage;
    this._errorElement.classList.add(this._errorClass);

    inputElement.classList.add(this._inputErrorClass);
  }

  // Убрать ошибку и подкрашивание
  _hideInputError(inputElement) {
    this._errorElement = this._formElement.querySelector(`#${inputElement.id}_error`);

    this._errorElement.textContent = '';
    this._errorElement.classList.remove(this._errorClass);

    inputElement.classList.remove(this._inputErrorClass);
  }

  // Скрыть валидацию при открытии попапов
  removeErrorElements(modalWindow) {
    // Удалить ошибки
    this._errorList = Array.from(modalWindow.querySelectorAll('.popup__error'));
    this._errorList.forEach( (error) => {
      error.classList.remove(this._errorClass);
      error.textContent = '';
    });
    // Удалить нижнее подчеркивание
    this._inputList.forEach( (input) => {
      input.classList.remove(this._inputErrorClass);
    });
  }
}
