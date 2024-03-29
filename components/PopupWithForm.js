import { Popup } from './Popup.js';

export class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popup.querySelector('.popup__form');
    this._submitFormButton = this._form.querySelector('.popup__button');
    this._inputs = this._form.querySelectorAll('.popup__input');
  }

  _getInputValues() {
    const inputsValues = {};
    this._inputs.forEach((input) => {
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
    this._submitFormButton.addEventListener('click', (e) => {
      this._submitFormButton.textContent = 'Сохранение...';
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  submitFormButtonTextReset(text) {
    this._submitFormButton.textContent = text;
  }
}
