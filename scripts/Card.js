import {
  escClosePopupHandler,
  popupImagePicture,
  popupImage,
  popupImageCaption,
  openPopup,
} from './index.js';

export class Card {
  constructor(data, template) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
  }

  _getTemplate() {
    const newCard = this._template.querySelector('.element').cloneNode(true);
    return newCard;
  }

  generateCard() {
    this._card = this._getTemplate();
    const cardImage = this._card.querySelector('.element__image');
    cardImage.src = this._link;
    cardImage.alt = this._name;
    this._card.querySelector('.element__paragraph').textContent = this._name;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._card
      .querySelector('.element__trash')
      .addEventListener('click', () => {
        this._cardButtonTrashHandler();
      });
    this._cardImageHandler();
    this._card
      .querySelector('.element__button')
      .addEventListener('click', () => {
        this._cardLikeButtonHandler();
      });
  }

  _cardButtonTrashHandler() {
    this._card.remove();
  }

  _cardLikeButtonHandler(e) {
    this._card
      .querySelector('.element__button')
      .classList.toggle('element__button-liked');
  }

  _cardImageHandler() {
    this._card
      .querySelector('.element__image')
      .addEventListener('click', () => {
        openPopup(popupImage);
      });

    popupImagePicture.src = this._link;
    popupImagePicture.alt = this._name;
    popupImageCaption.textContent = this._name;
  }
}
