import Popup from './Popup.js';
import { imageCard, nameCard } from './constants.js';

export default class PopupWithImage extends Popup {
  open() {
    super.open();

    imageCard.src = this._image;
    imageCard.alt = this._name;
    nameCard.textContent = this._name;
  }
}