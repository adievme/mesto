enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

// Включить валидацию для всех форм
function enableValidation( { formSelector, ...rest } ) {
  const formList = Array.from(document.querySelectorAll(formSelector) );
  formList.forEach( (formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });

      setEventListeners(formElement, rest);
  });
}

// Наложить обработчики лайв-ввода всем инпутам 
function setEventListeners(formElement, { inputSelector, submitButtonSelector, ...rest } ) {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector) );
  const buttonElement = formElement.querySelector(submitButtonSelector);

  toggleButtonState(inputList, buttonElement, rest);

  inputList.forEach( (inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, rest);
      toggleButtonState(inputList, buttonElement, rest);
    });
  });
}

// Проверить валидность инпута 
function checkInputValidity(formElement, inputElement, { inputErrorClass, errorClass } ) {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, { inputErrorClass, errorClass } );
  } else {
    showInputError(formElement, inputElement, { inputErrorClass, errorClass } );
  }
}

// Переключить состояние кнопки
function toggleButtonState(inputList, buttonElement, { inactiveButtonClass } ) {
  if (hasInvalidInput(inputList) ) {
    inactiveFormButton(buttonElement, inactiveButtonClass);
  } else {
    activeFormButton(buttonElement, inactiveButtonClass);
  }
}

// Проверить есть ли хоть одно невалидное поле
function hasInvalidInput(inputList) {
  return inputList.some(inputElement => !inputElement.validity.valid);
}

// Активировать кнопку формы
function activeFormButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled');
}

// Отключить кнопку формы
function inactiveFormButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', true);
}

// Показать ошибку и подкрашивание
function showInputError(formElement, inputElement, { inputErrorClass, errorClass } ) {
  const errorElement = formElement.querySelector(`#${inputElement.id}_error`);

  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);

  inputElement.classList.add(inputErrorClass);
}

// Убрать ошибку и подкрашивание
function hideInputError(formElement, inputElement, { inputErrorClass, errorClass } ) {
  const errorElement = formElement.querySelector(`#${inputElement.id}_error`);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';

  inputElement.classList.remove(inputErrorClass);
}