import { addCardFormListener } from '../scripts/components/Card.js';
import { FormValidator } from '../scripts/components/FormValidator.js';
import Section from '../scripts/components/Section.js';
import Card from '../scripts/components/Card.js';
//import Popup from './Popup.js';
//import { openModalWindow, closeModalWindow } from './utils.js';
import {
  configValidation,
  buttonEdit,
  buttonAdd,
  nameProfile,
  jobProfile,
  editFormModalWindow,
  cardFormModalWindow,
  previevFormModalWindow,
  buttonCloseList,
  formElementSave,
  formElementAdd,
  nameInput,
  jobInput,
  titleInput,
  linkInput,
  initialCards,
  containerCardList,
  editFormSelector,
  cardFormSelector,
  popupSubmitButton
} from '../scripts/utils/constants.js';
import PopupWithForm from '../scripts/components/PopupWithForm.js';

const CardList = new Section({
  items: initialCards,
  renderer: (item, toEnd) => {
      const newCard = new Card(item, '#element');
      const method = toEnd ? 'append' : 'prepend';
  
      const cardElement = newCard.generateCard();
  
      CardList.addItem(cardElement, method);
  }
}, containerCardList);

CardList.renderItems();

const popupCardForm = new PopupWithForm(cardFormSelector)


/*
//Закрыть попап нажатием на Esc
const closePopupByPressEsc = (evt) => {
  const openPopup = document.querySelector('.popup_active');
  if (evt.key === 'Escape') {
    //closeModalWindow(openPopup);
  }
}*/

//Закрыть попап кликом на оверлей
const closePopupByOverlayClick = (evt) => {
  if (evt.target.classList.contains('popup')) {
    //closeModalWindow(evt.target);
  }
}

//Показать попап редактирования профиля 
const openPopupEditProfile = () => {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  removeErrorElements(editFormModalWindow);

  const button = editFormModalWindow.querySelector('.popup__button')
  formEditValidate.activeFormButton(button, 'popup__button_disabled')

  //openModalWindow(editFormModalWindow);
}

//Показать попап добавления нового места
const openPopupAddCard = () => {
  const button = cardFormModalWindow.querySelector('.popup__button')
  formAddValidate.inactiveFormButton(button, 'popup__button_disabled');

  removeErrorElements(cardFormModalWindow);

  titleInput.value = '';
  linkInput.value = '';

  popupCardForm.open();
  //openModalWindow(cardFormModalWindow);
}

// Скрыть валидацию при открытии попапов
const removeErrorElements = (modalWindow) => {
  // Удалить ошибки
  const errorList = Array.from(modalWindow.querySelectorAll('.popup__error'));
  errorList.forEach( (error) => {
    error.classList.remove('popup__error_visible');
    error.textContent = '';
  });
  // Удалить нижнее подчеркивание
  const InputList = Array.from(modalWindow.querySelectorAll('.popup__input'));
  InputList.forEach( (input) => {
    input.classList.remove('popup__input_type_error');
  });
}

//Редактировать информацию профиля
const editFormSubmitHandler = (modalWindow) => {
  modalWindow.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  //closeModalWindow(editFormModalWindow);
}

// Создать экземпляры форм валидации
const formEditValidate = new FormValidator(configValidation, editFormModalWindow);
const formAddValidate = new FormValidator(configValidation, cardFormModalWindow);

// Включить валидацию формы
formEditValidate.enableValidation();
formAddValidate.enableValidation();

//Cлушатель для закрытия попапа на крестик
buttonCloseList.forEach( (item) => {
  item.addEventListener('click', popupCardForm.close);
});

buttonEdit.addEventListener('click', openPopupEditProfile);
buttonAdd.addEventListener('click', openPopupAddCard);

// Cлушатели для закрытия попапа на оверлей
editFormModalWindow.addEventListener('click', closePopupByOverlayClick);
cardFormModalWindow.addEventListener('click', closePopupByOverlayClick);
previevFormModalWindow.addEventListener('click', closePopupByOverlayClick);

formElementSave.addEventListener('submit', editFormSubmitHandler);
formElementAdd.addEventListener('submit', addCardFormListener);

//export { closePopupByPressEsc };


