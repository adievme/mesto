import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(data) {
    super.open();
    
    const imageCard = this._popup.querySelector('.popup__image');

    imageCard.src = data.link;
    imageCard.alt = data.name;
    this._popup.querySelector('.popup__title-preview').textContent = data.name;
  }
}