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
  containerCardList,
  editFormSelector,
  cardFormSelector,
  previewFormSelector,
  nameProfile, 
  infoProfile,
  updateFormModalWindow,
  updateFormSelector,
  deleteFormSelector,
  avatarProfile,
} from '../utils/constants.js';

import PopupWithSubmit from '../components/PopupWithSubmit';
import Api from '../components/Api';

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-23/',
  headers: {
    authorization: '84fbe532-8273-42b1-9e94-975939efca47',
    'Content-Type': 'application/json'
  }
}); 

const userInfoProfile = new UserInfo({
  nameUserSelector: nameProfile, 
  infoUserSelector: infoProfile,
  avatarUserSelector: avatarProfile
});

const popupDeleteCard = new PopupWithSubmit(deleteFormSelector);

// рендер массива карточек
api.getInitialCards()
.then(data => cardList.renderItems(data))
.catch((err) => console.log(err))

// отобразить данные пользователя
api.getUserInfo()
.then( (data) => {
  userInfoProfile.setUserInfo(data)
  userId = data._id
})
.catch((err) => console.log(err))

const cardList = new Section({
  renderer: item => addCardToContainer(createCard(item), true) // создать карточки и отобразить их на странице
}, containerCardList)

const createCard = (data) => {
  const card = new Card({
    data: data,
    handleCardClick: () => openPopupWithImage.open(data),
    handleLikeClick: () => card.handleLikeCard(),
    handleDeleteIconClick: () => {
      popupDeleteCard.setSubmitAction( _ => {
        popupDeleteCard.renderLoadingDelete(true)
        api.deleteCard(data._id)
        .then( _ => {
          card.handleDeleteCard()
          popupDeleteCard.close()
        })
        .catch((err) => console.log(err))
        .finally( () => popupDeleteCard.renderLoadingDelete(false))
      }),

      popupDeleteCard.open()
    }
  }, '#element', api, userId);

  const cardElement = card.generateCard();
  
  return cardElement;
}

const addCardToContainer = (cardElement, toEnd) => {
  cardList.addItem(cardElement, toEnd)
}

const popupFormAddCard = new PopupWithForm({
  popupSelector: cardFormSelector,
    submitCallback: (formData) => {
      popupFormAddCard.renderLoading(true)
      api.addCard(formData) // промис данных новой карточки
      .then(cardData => addCardToContainer(createCard(cardData), false))
      .catch((err) => console.log(err))
      .finally(() => popupFormAddCard.renderLoading(false))
    }
});  

const popupFormEditProfile = new PopupWithForm({
  popupSelector: editFormSelector,
  submitCallback: (formData) => {
    popupFormEditProfile.renderLoading(true)
    api.changeUserInfo(formData) // промис обновленной информации пользователя
    .then( formData => userInfoProfile.setUserInfo(formData))
    .finally(() => popupFormEditProfile.renderLoading(false))
  }
});

const popupFormUpdateAvatar = new PopupWithForm({
  popupSelector: updateFormSelector,
  submitCallback: (formData) => {
    popupFormUpdateAvatar.renderLoading(true)
    api.changeUserAvatar(formData)
    .then((formData) => userInfoProfile.setUserAvatar(formData))
    .catch((err) => console.log(err))
    .finally(() => popupFormUpdateAvatar.renderLoading(false))
  }
});

const openPopupUpdate = () => {
  formUpdateValidate.inactiveFormButton();
  formUpdateValidate.removeErrorElements();

  popupFormUpdateAvatar.open();
}

const openPopupEditProfile = () => {
  const formDataUser = userInfoProfile.getUserInfo();
  nameInput.value = formDataUser.nameUser;
  infoInput.value = formDataUser.infoUser;

  formEditValidate.removeErrorElements();

  formEditValidate.activeFormButton();

  popupFormEditProfile.open();
}

const openPopupAddCard = () => {
  formAddValidate.inactiveFormButton();

  formAddValidate.removeErrorElements();

  titleInput.value = '';
  linkInput.value = '';

  popupFormAddCard.open();
}

let userId

api.getAllNeededData() // возвращает результат исполнения нужных промисов (карточки и информация пользователя)
  .then(( [cards, userData] ) => {
    userInfoProfile.setUserInfo(userData)
    userId = userData._id
    
    cardList.renderItems(cards)
  })
  .catch((err) => console.log(err))

const openPopupWithImage = new PopupWithImage(previewFormSelector);

// Наложить обработчики на попапы форм
popupFormEditProfile.setEventListeners();
popupFormAddCard.setEventListeners();
popupFormUpdateAvatar.setEventListeners();
popupDeleteCard.setEventListeners();
openPopupWithImage.setEventListeners();

// Создать экземпляр класса открытия попапа с изображением


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

document.querySelector('.profile__avatar-wrapper').addEventListener('click', openPopupUpdate)
