import { Popup } from './Popup.js';

export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._image = document.querySelector(`${popupSelector}__picture`);
    this._caption = document.querySelector(`${popupSelector}__caption`);
  }

  open(item) {
    super.open();
    this._image.src = item.link;
    this._image.alt = item.name;
    this._caption.textContent = item.name;
  }
}
