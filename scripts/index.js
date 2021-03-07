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

let modalWindow;

//Рендерить на страницу карточки из массива
function renderCards() {
  const result = initialCards.map(createNewCard).join('');
  containerListCard.insertAdjacentHTML('afterbegin', result);
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

//Создать новую карточку
function createNewCard(item) {
  return `
    <li class="element__item">   
      <img class="element__photo" src="${item.link}" alt="">
      <div class="element__figure">
        <h2 class="element__name">${item.name}</h2>
        <button class="element__like-button" type="button"></button>
      </div> 
    </li> 
  `; 
}

//Добавить новую карточку
function addCard(evt) {
  evt.preventDefault();
  const title = titleInput.value;
  const link = linkInput.value;
  const newCard = createNewCard({
    name: title,
    link: link
  });
  containerListCard.insertAdjacentHTML('afterbegin', newCard);
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





