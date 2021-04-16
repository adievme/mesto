import { closePopupByPressEsc } from '../../pages/index.js';

//Открыть попап
const openModalWindow = (modalWindow) => {
  modalWindow.classList.add('popup_active');
  document.addEventListener('keydown', closePopupByPressEsc);
}

//Закрыть попап
const closeModalWindow = (modalWindow) => {
  modalWindow.classList.remove('popup_active');
  document.removeEventListener('keydown', closePopupByPressEsc);
}

export { openModalWindow, closeModalWindow };