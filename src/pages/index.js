import './index.css';
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
  infoProfile,
  updateFormModalWindow,
  updateFormSelector
} from '../utils/constants.js';
import Popup from '../components/Popup';

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
  }
});

const popupFormAddCard = new PopupWithForm({
  popupSelector: cardFormSelector,
  submitCallback: (formData) => {
    addCardToContainer(createCard(formData), false); // добавить новую карточку в начало контейнера
  }
});

const openPopupEditProfile = () => {
  const formDataUser = UserInfoProfile.getUserInfo();
  nameInput.value = formDataUser.nameUser;
  infoInput.value = formDataUser.infoUser;

  formEditValidate.removeErrorElements(editFormModalWindow);

  formEditValidate.activeFormButton();

  popupFormEditProfile.open();
}

const openPopupAddCard = () => {
  formAddValidate.inactiveFormButton();

  formAddValidate.removeErrorElements(cardFormModalWindow);

  titleInput.value = '';
  linkInput.value = '';

  popupFormAddCard.open();
}

const popupFormUpdate = new Popup(updateFormSelector);

const openPopupUpdate = () => {
  formUpdateValidate.inactiveFormButton();
  formUpdateValidate.removeErrorElements(updateFormModalWindow);

  popupFormUpdate.open();
}

// Наложить обработчики на попапы форм
popupFormEditProfile.setEventListeners();
popupFormAddCard.setEventListeners();
popupFormUpdate.setEventListeners();

// Создать экземпляр класса открытия попапа с изображением
const openPopupWithImage = new PopupWithImage(previewFormSelector);



// Создать экземпляры форм валидации
const formEditValidate = new FormValidator(configValidation, editFormModalWindow);
const formAddValidate = new FormValidator(configValidation, cardFormModalWindow);
const formUpdateValidate = new FormValidator(configValidation, updateFormModalWindow);

// Включить валидацию формы
formEditValidate.enableValidation();
formAddValidate.enableValidation();
formUpdateValidate.enableValidation();

// Слушатели кнопок редактирования и добавления 
buttonEdit.addEventListener('click', openPopupEditProfile);
buttonAdd.addEventListener('click', openPopupAddCard);

document.querySelector('.profile__avatar').addEventListener('click', openPopupUpdate);