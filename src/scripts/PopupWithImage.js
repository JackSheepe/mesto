import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open({ data }) {
    super.open();
    this._popup.querySelector(".popup__img").src = data.link;
    this._popup.querySelector(".popup__img").alt = data.name;
    this._popup.querySelector(".popup__img-description").textContent =
      data.name;
  }
}
