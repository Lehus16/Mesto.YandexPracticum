import {
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
    this._cardCaption = this._card.querySelector('.element__caption');
    this._cardButton = this._card.querySelector('.element__button');
    this._card
      .querySelector('.element__trash')
      .addEventListener('click', () => {
        this._cardButtonTrashHandler();
      });

      // this._card.addEventListener('mouseover', (e) => {
      //   this._cardCaption.style.top = `${e.offsetY}px`;
      //   this._cardCaption.style.left = `${e.offsetX}px`;
      //   this._cardCaption.classList.remove('element__caption-hide');
      //   this._cardCaption.textContent = this._name;
      // })

      // this._card.addEventListener('mouseout', (e) => {
      //   this._cardCaption.classList.add('element__caption-hide');
      // })

    this._card
      .querySelector('.element__image')
      .addEventListener('click', () => {
        this._cardImageHandler();
      });

    this._cardButton.addEventListener('click', () => {
      this._cardLikeButtonHandler();
    });
  }

  _cardButtonTrashHandler() {
    this._card.remove();
  }

  _cardLikeButtonHandler(e) {
    this._cardButton.classList.toggle('element__button-liked');
  }

  _cardImageHandler() {
    openPopup(popupImage);

    popupImagePicture.src = this._link;
    popupImagePicture.alt = this._name;
    popupImageCaption.textContent = this._name;
  }

}
