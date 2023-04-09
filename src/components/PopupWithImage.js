import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImg = this._popup.querySelector(".popup__img");
    this._popupDescription = this._popup.querySelector(
      ".popup__img-description"
    );
  }

  open({ data }) {
    super.open();
    this._popupImg.src = data.link;
    this._popupImg.alt = data.name;
    this._popupDescription.textContent = data.name;
  }
}
