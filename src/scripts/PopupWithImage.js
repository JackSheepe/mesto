import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ data }, popupSelector) {
    super(popupSelector), (this._name = data.name), (this._link = data.link);
  }
  open() {
    super.open();
    this._popup.querySelector(".popup__img").src = this._link;
    this._popup.querySelector(".popup__img").alt = this._name;
    this._popup.querySelector(".popup__img-description").textContent =
      this._name;
  }
}
