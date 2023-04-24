import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor({ submitCallback }, popupSelector) {
    super(popupSelector);
    this._submit = submitCallback;
    this.form = this._popup.querySelector(".popup__form");
    this.submitBtn = this.form.querySelector(".popup__submit-btn");
    this._onSubmit = this._onSubmit.bind(this);
    this.cardEl;
    this.cardId;
  }

  setValues(cardEl, cardId) {
    this.cardEl = cardEl;
    this.cardId = cardId;
  }

  _onSubmit(evt) {
    evt.preventDefault();
    this._submit(this.cardEl, this.cardId);
  }

  setEventListeners() {
    super.setEventListeners();

    this.form.addEventListener("submit", this._onSubmit);
  }

  close() {
    super.close();
    this.form.reset();
  }
}
