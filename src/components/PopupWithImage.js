import Popup from './Popup.js';
import { imageCard, nameCard } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }
  open(data) {
    super.open();
    
    imageCard.src = data.link;
    imageCard.alt = data.name;
    nameCard.textContent = data.name;

    super.setEventListeners();
  }
}