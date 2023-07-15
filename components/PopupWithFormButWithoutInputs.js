import { Popup } from './Popup.js';

export class PopupWithFormButWithoutInputs extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit(this.item, this.element);
    });
  }

  open(item, element) {
    super.open();
    this.item = item;
    this.element = element;
  }
}
