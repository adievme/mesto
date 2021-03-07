const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
      },
      {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
      },
      {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
      },
      {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
      },
      {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
      },
      {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
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

let modalWindow;

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





