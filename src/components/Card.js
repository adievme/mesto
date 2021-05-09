export default class Card {
  constructor({ data, handleCardClick, handleLikeClick, handleDeleteIconClick }, cardSelector, api, userId) {
    this._name = data.name;
    this._image = data.link;
    this._likes = data.likes; 
    this._id = data._id;
    this._ownerId = data.owner._id;

    this.handleCardClick = handleCardClick;
    this.handleLikeClick = handleLikeClick;
    this.handleDeleteIconClick = handleDeleteIconClick;

    this._cardSelector = cardSelector;
    this._api = api;
    this._userId = userId;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._setEventListeners();
    
    const elementImage = this._element.querySelector('.element__image');
    elementImage.src = this._image;
    elementImage.alt = this._name;
    this._element.querySelector('.element__name').textContent = this._name;
    this._element.querySelector('.element__like-count').textContent = this._likes.length;

    if(this._ownerId !== this._userId) {
      this._element.querySelector('.element__delete').classList.add('element__delete_inactive')
    }
    
    if(this._likes.find((obj) => this._userId === obj._id)) {
      this._element.querySelector('.element__like-button').classList.add('element__like-button_active')
    }

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
      this.handleLikeCard();
    });
    
    this._element.querySelector('.element__delete').addEventListener('click', () => {
      this.handleDeleteIconClick();
    });

    this._element.querySelector('.element__image').addEventListener('click', () => {
      this.handleCardClick({ name: this._name, link: this._image });
    });
  }

  handleDeleteCard() {
    this._element.closest('.element__item').remove();
  }
  
  handleLikeCard() {
    const likeButton = this._element.querySelector('.element__like-button');
    const likeCount = this._element.querySelector('.element__like-count');

    if(!(likeButton.classList.contains('element__like-button_active'))) {
      this._api.like(this._id).then((data) => {
        likeButton.classList.add('element__like-button_active');
        likeCount.textContent = data.likes.length;
      })
    } else {
      this._api.dislike(this._id).then((data) => {
        likeButton.classList.remove('element__like-button_active');
        likeCount.textContent = data.likes.length;
      })
    }
  }
}


