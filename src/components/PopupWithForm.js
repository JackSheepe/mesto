import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor({ submitCallback }, popupSelector) {
    super(popupSelector);
    this._submit = submitCallback;
    this.form = this._popup.querySelector(".popup__form");
    this.submitBtn = this.form.querySelector(".popup__submit-btn");
    this._inputs = this._popup.querySelectorAll(".popup__form-text");
    this._onSubmit = this._onSubmit.bind(this);
  }

  _getInputValues() {
    const values = Array.from(this._inputs).reduce((acc, item) => {
      const obj = {
        [item.name]: item.value,
      };
      return { ...acc, ...obj };
    }, {});

    return values;
  }

  setInputValues(inputValues) {
    this._inputs.forEach((input) => {
      input.value = inputValues[input.name];
    });
  }

  _onSubmit(evt) {
    evt.preventDefault();
    this._submit(this._getInputValues());
  }

  _setEventListeners() {
    super._setEventListeners();

    this.form.addEventListener("submit", this._onSubmit);
  }

  close() {
    super.close();
    this.form.reset();
  }
}
