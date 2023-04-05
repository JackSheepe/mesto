import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitCallback }, popupSelector) {
    super(popupSelector),
      (this._submit = submitCallback),
      (this._form = this._popup.querySelector(".popup__form")),
      (this._inputs = this._popup.querySelectorAll(".popup__form-text"));
  }

  _getInputValues() {
    const values = Array.from(this._inputs).map((el) => {
      return el.value;
    });
    return values;
  }

  _setEventListeners() {
    super._setEventListeners();

    this._form.addEventListener("submit", this._submit);
  }

  close() {
    super.close();
    this._form.reset();
    this._form.addEventListener("submit", this._submit);
  }
}
