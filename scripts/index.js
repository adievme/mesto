const initialCards = [
  {
    name: 'Эверест',
    link: 'https://i.ibb.co/qpkfHd4/image.jpg'
    },
  {
    name: 'Чогори',
    link: 'https://i.ibb.co/4SmLZvJ/image.jpg'
    },
  {
    name: 'Канченджанга',
    link: 'https://i.ibb.co/bFpsJg8/image.jpg'
    },
  {
    name: 'Дхаулагири',
    link: 'https://i.ibb.co/5YDJTGr/image.jpg'
    },
  {
    name: 'Манаслу',
    link: 'https://i.ibb.co/pWRvzg9/image.jpg'
    },
  {
    name: 'Аннапурна',
    link: 'https://i.ibb.co/L9h8cz0/image.jpg'
    }
]

const editButton = document.querySelector('.profile__edit-button');
      addButton = document.querySelector('.profile__add-button');
      nameProfile = document.querySelector('.profile__name');
      jobProfile = document.querySelector('.profile__job');
      popup = document.querySelector('.popup');

      //likeCard = document.querySelectorAll('.elements__like-button');
      
      editFormModalWindow = document.querySelector('.edit-profile');
      cardFormModalWindow = document.querySelector('.add-card');

      closeButton = document.querySelectorAll('.popup__close');
      formElement = document.querySelector('.popup__form');

      nameInput = document.querySelector('#input_name');
      jobInput = document.querySelector('#input_job');

      containerListCard = document.querySelector('.elements__list');

let modalWindow;

function renderCards() {
  const result = initialCards.map(function(item) {
    return `
      <li class="element__item">   
        <img class="element__photo" src="${item.link}" alt="Эверест">
        <div class="element__figure">
          <h2 class="element__name">${item.name}</h2>
          <button class="element__like-button" type="button"></button>
        </div> 
      </li> 
    `; 
  }).join('');
  containerListCard.insertAdjacentHTML('afterbegin', result);
}
renderCards();

//Открыть попап
function openModalWindow(modalWindow) {
    modalWindow.classList.add('popup_active');
}
//Закрыть попап
function closeModalWindow(event) {
    event.target.closest('.popup').classList.remove('popup_active');
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
/*
function like(evt) {
    likeCard.addEventListener('click', evt.target.classList.toggle('elements__like-button_active'));
}
*/
closeButton.forEach((item) => {
    item.addEventListener('click', closeModalWindow);
});

function formSubmitHandler(evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
    closeModalWindow(evt);
}

editButton.addEventListener('click', openPopupEditProfile);
addButton.addEventListener('click', openPopupAddCard);
formElement.addEventListener('submit', formSubmitHandler); 





