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
      addButton = document.querySelector('.profile__add-button');
      nameProfile = document.querySelector('.profile__name');
      jobProfile = document.querySelector('.profile__job');
      
      popup = document.querySelector('.popup');//ссылки на элементы попапа
      editFormModalWindow = document.querySelector('.popup__edit-profile');
      cardFormModalWindow = document.querySelector('.popup__add-card');
      previewFormModalWindow = document.querySelector('.popup__preview');
      saveFormElement = document.querySelector('.save-info');
      addFormElement = document.querySelector('.add-newCard');
      closeButton = document.querySelectorAll('.popup__close');
      
      nameInput = document.querySelector('#input_name');//ссылки на input`ы формы
      jobInput = document.querySelector('#input_job');
      titleInput = document.querySelector('#input_title');
      linkInput = document.querySelector('#input_link');

      containerListCard = document.querySelector('.elements__list');//ссылка на контейнер карточек

      templateElement = document.querySelector('#element');//ссылка на темплэйт

      addPreview = document.querySelector('.element__image');
console.log(addPreview);
let modalWindow;

//Лайкнуть карточку
function likeCard(event) {
  event.target.classList.toggle('element__like-button_active');
}

//Удалить карточку
function deleteCard(event) {
  event.target.closest('.element__item').remove();
}
//Добавить карточкам слушатели удаления и лайка
function addCardListeners(card) {
  const deleteButton = card.querySelector('.element__delete');
  deleteButton.addEventListener('click', deleteCard);

  const likeButton = card.querySelector('.element__like-button');
  likeButton.addEventListener('click', likeCard);
}
  
  
  
//Cоздать дом нод
function createCardDomNode(item) {
  const newItem = templateElement.content.cloneNode(true);
  const name = newItem.querySelector('.element__name');
  const linkImage = newItem.querySelector('.element__image');
  name.textContent = item.name;
  linkImage.src = item.link;

  return newItem;
}

//Рендерить карточки из массива  на страницу 
function renderCards() {
  const result = initialCards.map(function(item){
    const newCard= createCardDomNode(item);
    addCardListeners(newCard);
    return newCard;
  });
  
  containerListCard.prepend(...result);
}
renderCards();

//Открыть попап
function openModalWindow(modalWindow) {
    modalWindow.classList.add('popup_active');
}
 
//Показать попап редактирования профиля 
function openPopupEditProfile() {
    openModalWindow(editFormModalWindow);
    if (popup.classList.contains('popup') ) {
        nameInput.value = nameProfile.textContent;
        jobInput.value = jobProfile.textContent;
    }
}
//Показать попап добавления нового места
function openPopupAddCard() {
    openModalWindow(cardFormModalWindow);
}
//Показать попап просмотра фото
function openPopupPreview() {
  console.log('показать');
  //openModalWindow(previewFormModalWindow);
}
//Закрыть попап
function closeModalWindow(event) {
  event.target.closest('.popup').classList.remove('popup_active');
}

closeButton.forEach((item) => {
    item.addEventListener('click', closeModalWindow);
});

//Добавить новую карточку
function addCardFornListener(evt) {
  evt.preventDefault();
  const title = titleInput.value;
  const link = linkInput.value;
  const newCard = createCardDomNode({
    name: title,
    link: link
  });

  addCardListeners(newCard);

  containerListCard.prepend(newCard);
  titleInput.value = '';
  linkInput.value = '';

  closeModalWindow(evt);
}

//Редактировать информацию профиля
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closeModalWindow(evt);
}

editButton.addEventListener('click', openPopupEditProfile);
addButton.addEventListener('click', openPopupAddCard);
addEventListener('click', openPopupPreview);

saveFormElement.addEventListener('submit', formSubmitHandler); 
addFormElement.addEventListener('submit', addCardFornListener);



