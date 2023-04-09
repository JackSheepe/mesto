export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._popupCloseBtn = this._popup.querySelector(".popup__close-btn");
    this._handleMouseClose = this._handleMouseClose.bind(this);
    this._handleEscClose = this._handleEscClose.bind(this);
    this.close = this.close.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this._setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this._removeEventListeners();
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleMouseClose(evt) {
    if (evt.target === evt.currentTarget) {
      this.close();
    }
  }

  _setEventListeners() {
    this._popupCloseBtn.addEventListener("click", this.close);
    this._popup.addEventListener("click", this._handleMouseClose);
    document.addEventListener("keydown", this._handleEscClose);
  }

  _removeEventListeners() {
    this._popupCloseBtn.removeEventListener("click", this.close);
    this._popup.removeEventListener("click", this._handleMouseClose);
    document.removeEventListener("keydown", this._handleEscClose);
  }
}
