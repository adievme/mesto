let openButton = document.querySelector('.profile__edit-button');
let popup = document.querySelector('.popup');
let closeButton = document.querySelector('.popup__close');
let formElement = document.querySelector('.popup__form');
let nameInput = document.querySelector('#input_name');
let jobInput = document.querySelector('#input_job');
let nameProfile = document.querySelector('.profile__name');
let jobProfile = document.querySelector('.profile__job');
// открытие и закрытие Popup
function openPopup() {
    if (popup.classList.contains('popup')) {
        nameInput.value = nameProfile.textContent;
        jobInput.value = jobProfile.textContent;
        popup.classList.toggle('popup_active');
    }
}

openButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', openPopup);
//Сохранение изменений в поле ввода
function formSubmitHandler (evt) {
    evt.preventDefault();
    nameProfile.textContent = nameInput.value;
    jobProfile.textContent = jobInput.value;
}       
formElement.addEventListener('submit', formSubmitHandler); 
formElement.addEventListener('submit', openPopup); //закрытие попап при нажатии на "сохранить"

