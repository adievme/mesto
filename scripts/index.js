/* ссылки на разные картинки
https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg 
https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg
https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg
https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg
https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg
https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg
*/
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

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
   
const popup = document.querySelector('.popup');

const editFormModalWindow = document.querySelector('.popup_type_edit-profile');
const cardFormModalWindow = document.querySelector('.popup_type_add-card');
const previewFormModalWindow = document.querySelector('.popup_type_preview');

const popupCloseButtonList = document.querySelectorAll('.popup__close');
const nameCard = previewFormModalWindow.querySelector('.popup__title-preview');
const imageCard = previewFormModalWindow.querySelector('.popup__image');

const saveFormElement = document.querySelector('.save-info');
const addFormElement = document.querySelector('.add-newCard');

const nameInput = document.querySelector('#input_name');
const jobInput = document.querySelector('#input_job');
const titleInput = document.querySelector('#input_title');
const linkInput = document.querySelector('#input_link');

const containerListCard = document.querySelector('.elements__list');

const templateElement = document.querySelector('#element');

//Рендерить карточки из массива на страницу
renderCards();

function renderCards() {
  const result = initialCards.map(function (item) {
    const newCard = createCardDomNode(item);
    return newCard;
  });

  containerListCard.prepend(...result);
}

//Открыть попап
function openModalWindow(modalWindow) {
  modalWindow.classList.add('popup_active');
  document.addEventListener('keydown', closePopupByPressEsc);
}

//Закрыть попап
function closeModalWindow(modalWindow) {
  modalWindow.classList.remove('popup_active');
  document.removeEventListener('keydown', closePopupByPressEsc);
}

//Закрыть попап нажатием на Esc
function closePopupByPressEsc(evt) {
  const openPopup = document.querySelector('.popup_active');
  if (evt.key === 'Escape') {
    closeModalWindow(openPopup);
  }
}

//Закрыть попап кликом на оверлей
function closePopupByOverlayClick(evt) {
  if (evt.target.classList.contains('popup')) {
    closeModalWindow(evt.target);
  }
}

//Удалить карточку
function deleteCard(event) {
  event.target.closest('.element__item').remove();
}

//Лайкнуть карточку
function likeCard(event) {
  event.target.classList.toggle('element__like-button_active');
}

//Показать попап просмотра фото
function openPopupPreview(item) {
  nameCard.textContent = item.name;
  imageCard.src = item.link;
  imageCard.alt = item.name;

  openModalWindow(previewFormModalWindow);
}

//Показать попап редактирования профиля 
function openPopupEditProfile() {
  nameInput.value = nameProfile.textContent;
  jobInput.value = jobProfile.textContent;

  removeErrorElements(editFormModalWindow);

  const button = editFormModalWindow.querySelector('.popup__button')
  activeFormButton(button, 'popup__button_disabled')

  openModalWindow(editFormModalWindow);
}

//Показать попап добавления нового места
function openPopupAddCard() {
  const button = cardFormModalWindow.querySelector('.popup__button')
  inactiveFormButton(button, 'popup__button_disabled');

  removeErrorElements(cardFormModalWindow);

  titleInput.value = '';
  linkInput.value = '';

  openModalWindow(cardFormModalWindow);
}

// Скрыть валидацию при открытии попапов
function removeErrorElements(modalWindow) {
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

//Добавить новую карточку
function addCardFormListener(modalWindow) {
  modalWindow.preventDefault();

  const title = titleInput.value;
  const link = linkInput.value;

  const newCard = createCardDomNode({
    name: title,
    link: link
  });

  containerListCard.prepend(newCard);

  closeModalWindow(cardFormModalWindow);
}

//Редактировать информацию профиля
function editFormSubmitHandler(modalWindow) {
  modalWindow.preventDefault();

  nameProfile.textContent = nameInput.value;
  jobProfile.textContent = jobInput.value;

  closeModalWindow(editFormModalWindow);
}

//Cоздать дом нод
function createCardDomNode(item) {
  const newItem = templateElement.content.cloneNode(true);

  const likeButton = newItem.querySelector('.element__like-button');
  const deleteButton = newItem.querySelector('.element__delete');
  const name = newItem.querySelector('.element__name');
  const image = newItem.querySelector('.element__image');

  name.textContent = item.name;
  image.src = item.link;
  image.alt = item.name;

  deleteButton.addEventListener('click', deleteCard);
  likeButton.addEventListener('click', likeCard);

  //Слушатель открытия попапа с картинкой
  image.addEventListener('click', () => {
    openPopupPreview(item);
  })

  return newItem;
}

//Cлушатель для закрытия попапа на крестик
popupCloseButtonList.forEach( (item) => {
  item.addEventListener('click', () => closeModalWindow(item.closest('.popup') ) );
});

editButton.addEventListener('click', openPopupEditProfile);
addButton.addEventListener('click', openPopupAddCard);

// Cлушатели для закрытия попапа на оверлей
editFormModalWindow.addEventListener('click', closePopupByOverlayClick);
cardFormModalWindow.addEventListener('click', closePopupByOverlayClick);
previewFormModalWindow.addEventListener('click', closePopupByOverlayClick);

saveFormElement.addEventListener('submit', editFormSubmitHandler);
addFormElement.addEventListener('submit', addCardFormListener);



