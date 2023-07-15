export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupButtonClose = this._popup.querySelector(
      `${popupSelector}__button-close`
    );
    this.__handleEscClose = this._handleEscClosePopup.bind(this);
  }

  open() {
    this._popup.classList.add('popup__openned');
    document.addEventListener('keydown', this.__handleEscClose);
  }

  close() {
    this._popup.classList.remove('popup__openned');
    document.removeEventListener('keydown', this.__handleEscClose);
  }

  _handleEscClosePopup(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (
        evt.target.classList.contains('popup-overlay') ||
        evt.target.classList.contains('popup__button-close')
      ) {
        this.close();
      }
    });
  }
}
