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

    this._card.querySelector('.element__image').src = this._link;
    this._card.querySelector('.element__image').alt = this._name;
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
        document.querySelector('.popup-image').classList.add('popup__openned');
        document.addEventListener('keydown', function (e) {
          if (e.key === 'Escape') {
            const currentPopup = document.querySelector('.popup__openned');
            closePopup(currentPopup);
          }
        });
        document.querySelector('.popup-image__picture').src = this._link;
        document.querySelector('.popup-image__picture').alt = this._name;
        document.querySelector('.popup-image__caption').textContent =
          this._name;
      });
  }
}
