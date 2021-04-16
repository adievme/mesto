import { 
  initialCards, 
  cardFormModalWindow,
  previevFormModalWindow,
  previewFormSelector,
  nameCard,
  imageCard,
  containerCardList,
  titleInput,
  linkInput 
} from '../utils/constants.js'
import Popup from './Popup.js';

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._image = data.link; 

    this._cardSelector = cardSelector;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    
    this._element.querySelector('.element__image').src = this._image;
    this._element.querySelector('.element__image').alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;

    return this._element;
  }

  _getTemplate() {
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.element__item')
    .cloneNode(true);

    return cardElement;
  }

  _setEventListeners() {
    this._element.querySelector('.element__like-button').addEventListener('click', () => {
      this._handleLikeCard();
    });

    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this._handleDeleteCard();
    });
     
    this._element.querySelector('.element__image').addEventListener('click', () => {
      this._handleOpenPopupPreview();
    });
  }

  // Удалить карточку
  _handleDeleteCard() {
    this._element.querySelector('.element__delete').closest('.element__item').remove();
  }
  
  // Лайкнуть карточку
  _handleLikeCard() {
    this._element.querySelector('.element__like-button').classList.toggle('element__like-button_active');
  }
  
  // Показать попап просмотра фото
  _handleOpenPopupPreview() {
    imageCard.src = this._image;
    imageCard.alt = this._name;
    nameCard.textContent = this._name;

    //openPopupPreview.open();
  }
}

//const openPopupPreview = new Popup(previewFormSelector)

//openPopupPreview.setEventListeners();



// Добавить новую карточку
const addCardFormListener = (evt) => {
  evt.preventDefault();

  const title = titleInput.value;
  const link = linkInput.value;

  createCard( { name: title, link: link }, false);

  //closeModalWindow(cardFormModalWindow);
}

// Cоздать экземпляр карточки
/*
const createCard = (item, toEnd) => {
  const newCard = new Card(item, '#element');
  const cardElement = newCard.generateCard();
  
  const method = toEnd ? 'append' : 'prepend';
  containerCardList[method](cardElement);
}

initialCards.forEach( (item) => {
  createCard(item, true);
});
*/
export { addCardFormListener };


