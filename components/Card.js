export class Card {
  constructor(
    data,
    template,
    handleCardClick,
    handleAddLikeClick,
    handleDeleteLikeClick,
    handleDeleteCardClick
  ) {
    this._data = data;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._cardId = data._id;
    this._template = template;
    this._currentUserID = this._handleCardClick = handleCardClick;
    this._handleAddLikeClick = handleAddLikeClick;
    this._handleDeleteLikeClick = handleDeleteLikeClick;
    this._handleDeleteCardClick = handleDeleteCardClick;
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

    this._setEventListeners();

    return this._card;
  }

  _setEventListeners() {
    this._cardButton = this._card.querySelector('.element__button');
    if (this._likes.some((item) => item._id === this._currentUserID)) {
      this._cardButton.classList.add('element__button-liked');
    }
    this._cardButtonTrash = this._card.querySelector('.element__trash');
    // if (this._userId !== '9476448d60612ba328044f44') {
    //   this._cardButtonTrash.remove();
    // }
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
      // console.log(this._cardId);
      // console.log(this._card);
      this._handleDeleteCardClick(this._cardId, this._card);
    });
  }
}
