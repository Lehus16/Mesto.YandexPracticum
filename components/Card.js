export class Card {
  constructor(data, template, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._template = template;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const newCard = this._template.querySelector('.element').cloneNode(true);
    return newCard;
  }

  generateCard() {
    this._card = this._getTemplate();
    this._cardImage = this._card.querySelector('.element__image');
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._card.querySelector('.element__paragraph').textContent = this._name;

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._cardButton = this._card.querySelector('.element__button');
    this._cardButtonTrash = this._card.querySelector('.element__trash');
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });

    this._cardButton.addEventListener('click', () => {
      this._cardLikeButtonHandler();
    });

    this._cardButtonTrash.addEventListener('click', () => {
      this._cardButtonTrashHandler();
    });
  }
  _cardButtonTrashHandler() {
    this._card.remove();
  }

  _cardLikeButtonHandler(e) {
    this._cardButton.classList.toggle('element__button-liked');
  }
  // _setEventListeners() {
  //   // this._cardCaption = this._card.querySelector('.element__caption');
  //   this._cardButton = this._card.querySelector('.element__button');
  //
  //     });

  //   this._card
  //     .querySelector('.element__image')
  //     .addEventListener('click', () => {
  //       this._cardImageHandler();
  //     });

  //
  // }

  // _cardImageHandler() {
  //   openPopup(popupImage);

  //   popupImagePicture.src = this._link;
  //   popupImagePicture.alt = this._name;
  //   popupImageCaption.textContent = this._name;
  // }
}
