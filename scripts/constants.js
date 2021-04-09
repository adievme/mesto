const initialCards = [
  {
    name: 'Эверест',
    link: 'https://i.ibb.co/qpkfHd4/image.jpg'
  },
  {
    name: 'Канченджанга',
    link: 'https://i.ibb.co/bFpsJg8/image.jpg'
  },
  {
    name: 'Аннапурна',
    link: 'https://i.ibb.co/L9h8cz0/image.jpg'
  },
  {
    name: 'Манаслу',
    link: 'https://i.ibb.co/pWRvzg9/image.jpg'
  },
  {
    name: 'Дхаулагири',
    link: 'https://i.ibb.co/5YDJTGr/image.jpg'
  },
  {
    name: 'Чогори',
    link: 'https://i.ibb.co/4SmLZvJ/image.jpg'
  }
]

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
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');

const editFormModalWindow = document.querySelector('.popup_type_edit-profile');
const cardFormModalWindow = document.querySelector('.popup_type_add-card');
const previewFormModalWindow = document.querySelector('.popup_type_preview');

const buttonCloseList = document.querySelectorAll('.popup__close');
const nameCard = previewFormModalWindow.querySelector('.popup__title-preview');
const imageCard = previewFormModalWindow.querySelector('.popup__image');

const formElementSave = document.querySelector('.save-info');
const formElementAdd = document.querySelector('.add-newCard');

const nameInput = document.querySelector('#input_name');
const jobInput = document.querySelector('#input_job');
const titleInput = document.querySelector('#input_title');
const linkInput = document.querySelector('#input_link');

const containerListCard = document.querySelector('.elements__list');

export {
  initialCards,
  configValidation,
  buttonEdit,
  buttonAdd,
  nameProfile,
  jobProfile,
  editFormModalWindow,
  cardFormModalWindow,
  previewFormModalWindow,
  buttonCloseList,
  nameCard,
  imageCard,
  formElementSave,
  formElementAdd,
  nameInput,
  jobInput,
  titleInput,
  linkInput,
  containerListCard
};