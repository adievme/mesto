import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  configValidation,
  buttonEdit,
  buttonAdd,  
  editFormModalWindow,
  cardFormModalWindow,
  nameInput,
  infoInput,
  titleInput,
  linkInput,
  initialCards,
  containerCardList,
  editFormSelector,
  cardFormSelector,
  previewFormSelector,
  nameProfile, 
  infoProfile
} from '../utils/constants.js';

const cardList = new Section({
  items: initialCards,
  renderer: (item) => addCardToContainer(createCard(item), true) // рендер массива карточек на страницу
}, containerCardList);

const createCard = (dataCard) => {
  const card = new Card({ 
    data: dataCard, 
    handleCardClick: () => openPopupWithImage.open({ data: dataCard })
  }, '#element');
  const cardElement = card.generateCard();
  
  return cardElement;
}

const addCardToContainer = (cardElement, toEnd) => {
  cardList.addItem(cardElement, toEnd);
}

cardList.renderItems();

const UserInfoProfile = new UserInfo({
  nameUserSelector: nameProfile, 
  infoUserSelector: infoProfile
});

const popupFormEditProfile = new PopupWithForm({
  popupSelector: editFormSelector,
  submitCallback: (formData) => {
    UserInfoProfile.setUserInfo({ data: formData });
    popupFormEditProfile.close();
  }
});

const popupFormAddCard = new PopupWithForm({
  popupSelector: cardFormSelector,
  submitCallback: (formData) => {
    addCardToContainer(createCard(formData), false); // добавить новую карточку в начало контейнера
    popupFormAddCard.close();
  }
});

const openPopupEditProfile = () => {
  const formDataUser = UserInfoProfile.getUserInfo();
  nameInput.value = formDataUser.nameUser;
  infoInput.value = formDataUser.infoUser;

  removeErrorElements(editFormModalWindow);

  const button = editFormModalWindow.querySelector('.popup__button')
  formEditValidate.activeFormButton(button, 'popup__button_disabled')

  popupFormEditProfile.open();
}

const openPopupAddCard = () => {
  const button = cardFormModalWindow.querySelector('.popup__button')
  formAddValidate.inactiveFormButton(button, 'popup__button_disabled');

  removeErrorElements(cardFormModalWindow);

  titleInput.value = '';
  linkInput.value = '';

  popupFormAddCard.open();
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

// Наложить обработчики на попапы форм
popupFormEditProfile.setEventListeners();
popupFormAddCard.setEventListeners();

// Создать экземпляр класса открытия попапа с изображением
const openPopupWithImage = new PopupWithImage(previewFormSelector);

// Создать экземпляры форм валидации
const formEditValidate = new FormValidator(configValidation, editFormModalWindow);
const formAddValidate = new FormValidator(configValidation, cardFormModalWindow);

// Включить валидацию формы
formEditValidate.enableValidation();
formAddValidate.enableValidation();

// Слушатели кнопок редактирования и добавления 
buttonEdit.addEventListener('click', openPopupEditProfile);
buttonAdd.addEventListener('click', openPopupAddCard);