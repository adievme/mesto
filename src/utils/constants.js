const configValidation = ({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
});

const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const nameProfile = '.profile__name';
const infoProfile = '.profile__job';
const avatarProfile = '.profile__avatar';
const avatarEditButton = document.querySelector('profile__avatar-edit-button');

const editFormModalWindow = document.querySelector('.popup_type_edit-profile');
const cardFormModalWindow = document.querySelector('.popup_type_add-card');
const previevFormModalWindow = document.querySelector('.popup_type_preview');
const updateFormModalWindow = document.querySelector('.popup_type_update-avatar');

const editFormSelector = '.popup_type_edit-profile';
const cardFormSelector = '.popup_type_add-card';
const previewFormSelector = '.popup_type_preview';
const deleteFormSelector = '.popup_type_delete';
const updateFormSelector = '.popup_type_update-avatar';

const buttonCloseList = document.querySelectorAll('.popup__close');
const nameCard = previevFormModalWindow.querySelector('.popup__title-preview');
const imageCard = previevFormModalWindow.querySelector('.popup__image');

const popupSubmitButton = document.querySelector('.popup__button');

const formElementSave = document.querySelector('.save-info');
const formElementAdd = document.querySelector('.add-newCard');

const nameInput = document.querySelector('#input_name');
const infoInput = document.querySelector('#input_job');
const titleInput = document.querySelector('#input_title');
const linkInput = document.querySelector('#input_link');

const containerCardList = '.elements__list';

export {
  configValidation,
  buttonEdit,
  buttonAdd,
  editFormModalWindow,
  cardFormModalWindow,
  previevFormModalWindow,
  editFormSelector,
  cardFormSelector,
  previewFormSelector,
  buttonCloseList,
  nameCard,
  imageCard,
  formElementSave,
  formElementAdd,
  nameInput,
  infoInput,
  titleInput,
  linkInput,
  containerCardList,
  popupSubmitButton,
  nameProfile,
  infoProfile,
  deleteFormSelector,
  updateFormModalWindow,
  updateFormSelector,
  avatarProfile,
  avatarEditButton
};