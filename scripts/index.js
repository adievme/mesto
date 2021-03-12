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

const editButton = document.querySelector('.profile__edit-button');//cсылки на элементы профиля
const addButton = document.querySelector('.profile__add-button');
const nameProfile = document.querySelector('.profile__name');
const jobProfile = document.querySelector('.profile__job');
      
const popup = document.querySelector('.popup');//ссылки на элементы попапа
const editFormModalWindow = document.querySelector('.popup_type_edit-profile');
const cardFormModalWindow = document.querySelector('.popup_type_add-card');
const previewFormModalWindow = document.querySelector('.popup_type_preview');
const popupCloseButtonList = document.querySelectorAll('.popup__close');
const nameCard = previewFormModalWindow.querySelector('.popup__title-preview');
const imageCard = previewFormModalWindow.querySelector('.popup__image');
      
const saveFormElement = document.querySelector('.save-info');
const addFormElement = document.querySelector('.add-newCard');
      
const nameInput = document.querySelector('#input_name');//ссылки на input`ы формы
const jobInput = document.querySelector('#input_job');
const titleInput = document.querySelector('#input_title');
const linkInput = document.querySelector('#input_link');

const containerListCard = document.querySelector('.elements__list');//ссылка на контейнер карточек

const templateElement = document.querySelector('#element');//ссылка на темплэйт

//Рендерить карточки из массива на страницу 
function renderCards() {
  const result = initialCards.map(function(item){ 
    const newCard= createCardDomNode(item);
    
    return newCard;
  });
  
  containerListCard.prepend(...result);
}
renderCards();

//Открыть попап
function openModalWindow(modalWindow) {
  modalWindow.classList.add('popup_active');
}

//Закрыть попап
function closeModalWindow(modalWindow) {
  modalWindow.classList.remove('popup_active');
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
    openModalWindow(editFormModalWindow);
    nameInput.value = nameProfile.textContent;
    jobInput.value = jobProfile.textContent;
}

//Показать попап добавления нового места
function openPopupAddCard() {
    openModalWindow(cardFormModalWindow);
}

//Добавить новую карточку
function addCardFornListener(modalWindow) {
  modalWindow.preventDefault();
  const title = titleInput.value;
  const link = linkInput.value;
  const newCard = createCardDomNode({
    name: title,
    link: link
  });

  containerListCard.prepend(newCard);
  titleInput.value = '';
  linkInput.value = '';

  closeModalWindow(cardFormModalWindow);
}

//Редактировать информацию профиля
function editFormSubmitHandler(modalWindow) {
    modalWindow.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    
    closeModalWindow(editFormModalWindow);
}

//Cлушатель кнопки закрытия попапа
popupCloseButtonList.forEach( (item) => {
  item.addEventListener('click', () => closeModalWindow(item.closest('.popup') ) );
});

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

  deleteButton.addEventListener('click', deleteCard);//Слушатель удаления

  likeButton.addEventListener('click', likeCard);//Слушатель лайка

  //Слушатель открытия попапа с картинкой
  image.addEventListener('click', () => {
    openPopupPreview(item);
  })

  return newItem;  
}

editButton.addEventListener('click', openPopupEditProfile);
addButton.addEventListener('click', openPopupAddCard);

saveFormElement.addEventListener('submit', editFormSubmitHandler); 
addFormElement.addEventListener('submit', addCardFornListener);



