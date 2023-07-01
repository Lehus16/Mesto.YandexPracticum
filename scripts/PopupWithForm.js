import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._submitFormButton = this._form.querySelector('.popup__button');
  }

  _getInputValues() {
    const inputs = this._form.querySelectorAll('.popup__input');
    const inputsValues = {};
    inputs.forEach((input) => {
      inputsValues[input.name] = input.value;
    });

    return inputsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();

    this._form.reset();
  }
}
