export class Card {
  constructor(
    data,
    template,
    handleCardClick,
    handleAddLikeClick,
    handleDeleteLikeClick,
    handleDeleteCardClick
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._owner = data.owner;
    this._cardId = data._id;
    this._userId = data.owner._id;
    this._template = template;
    this._handleCardClick = handleCardClick;
    this._handleAddLikeClick = handleAddLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
    this._cardDeleteButtonHandler = this._cardDeleteButtonHandler.bind(this);
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
    this._cardLikes = this._card.querySelector('.element__likes');
    this._cardLikes.textContent = this._likes.length;
    this._cardDeletePopup = document.querySelector('.popup-delete');
    this._cardDeletePopupButton =
      this._cardDeletePopup.querySelector('.popup__button');

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._cardButton = this._card.querySelector('.element__button');
    if (this._likes.some((item) => item._id === this._owner._id)) {
      this._cardButton.classList.add('element__button-liked');
    }
    this._cardButtonTrash = this._card.querySelector('.element__trash');
    if (this._userId !== '9476448d60612ba328044f44') {
      this._cardButtonTrash.remove();
    }
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick();
    });

    this._cardButton.addEventListener('click', () => {
      if (this._cardButton.classList.contains('element__button-liked')) {
        this._cardButton.classList.remove('element__button-liked');
        this._cardLikes.textContent = parseInt(this._cardLikes.textContent) - 1;
        this._handleDeleteLikeClick();
      } else {
        this._handleAddLikeClick();
        this._cardButton.classList.add('element__button-liked');
        this._cardLikes.textContent = parseInt(this._cardLikes.textContent) + 1;
      }

      // this._cardLikeButtonHandler();
    });

    this._cardButtonTrash.addEventListener('click', () => {
      this._cardButtonTrashHandler();
    });
  }
  _cardButtonTrashHandler() {
    this._cardDeletePopup.classList.add('popup__openned');

    this._cardDeletePopupButton.addEventListener(
      'click',
      this._cardDeleteButtonHandler
    );
  }
  _cardDeleteButtonHandler() {
    this._handleDeleteCardClick();
    this._card.remove();
    this._cardDeletePopupButton.removeEventListener(
      'click',
      this._cardDeleteButtonHandler
    );
  }
  // _cardLikeButtonHandler() {
  //   this._cardButton.classList.toggle('element__button-liked');
  // }
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
