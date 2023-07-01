export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupButtonClose = document.querySelector(
      `${popupSelector}__button-close`
    );
  }

  open() {
    this._popup.classList.add('popup__openned');
    document.addEventListener('keydown', this._handleEscClosePopup.bind(this));
  }

  close() {
    this._popup.classList.remove('popup__openned');
    document.removeEventListener('keydown', this._handleEscClosePopup.bind(this));
  }

  _handleEscClosePopup(e) {
    if (e.key === 'Escape') {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener('click', (e) => {
      if (e.target === this._popup || e.target === this._popupButtonClose) {
        this.close();
      }
    });
  }

}
