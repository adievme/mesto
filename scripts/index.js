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
      editFormModalWindow = document.querySelector('.edit-profile');
      cardFormModalWindow = document.querySelector('.add-card');
      saveFormElement = document.querySelector('.save-info');
      addFormElement = document.querySelector('.add-newCard');
      closeButton = document.querySelectorAll('.popup__close');
      
      nameInput = document.querySelector('#input_name');//ссылки на input`ы формы
      jobInput = document.querySelector('#input_job');
      titleInput = document.querySelector('#input_title');
      linkInput = document.querySelector('#input_link');

      containerListCard = document.querySelector('.elements__list');//ссылка на контейнер карточек

      templateElement = document.querySelector('#element');//ссылка на темплэйт

let modalWindow;

//Рендерить карточки из массива  на страницу 
function renderCards() {
  const result = initialCards.map(createCardDomNode);
  
  containerListCard.prepend(...result);
}

function createCardDomNode(item) {
  const newCard = templateElement.content.cloneNode(true);
  const name = newCard.querySelector('.element__name');
  const linkImage = newCard.querySelector('.element__image');
  
  name.textContent = item.name;
  linkImage.src = item.link;

  return newCard;
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

//Закрыть попап
function closeModalWindow(event) {
  event.target.closest('.popup').classList.remove('popup_active');
}

closeButton.forEach((item) => {
    item.addEventListener('click', closeModalWindow);
});

//Добавить новую карточку
function addCard(evt) {
  evt.preventDefault();
  const title = titleInput.value;
  const link = linkInput.value;
  const newCard = createCardDomNode({
    name: title,
    link: link
  });
  containerListCard.prepend(newCard);
  titleInput.value = '';
  linkInput.value = '';

  closeModalWindow(evt)
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

saveFormElement.addEventListener('submit', formSubmitHandler); 
addFormElement.addEventListener('submit', addCard);





