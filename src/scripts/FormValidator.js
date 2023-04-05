export default class FormValidator {
  constructor(data, formElement) {
    (this._form = data.formSelector),
      (this._input = data.inputSelector),
      (this._submitBtn = data.submitButtonSelector),
      (this._inactiveBtn = data.inactiveButtonClass),
      (this._inputErrorClass = data.inputErrorClass),
      (this._error = data.errorClass),
      (this._formElement = formElement),
      (this._buttonElement = this._formElement.querySelector(
        data.submitButtonSelector
      ));
  }

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._error);
  }

  _hideInputError(inputElement) {
    const errorElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  enableSubmitButton() {
    this._buttonElement.classList.remove(this._inactiveBtn);
    this._buttonElement.disabled = false;
  }

  disableSubmitButton() {
    this._buttonElement.classList.add(this._inactiveBtn);
    this._buttonElement.disabled = true;
  }

  _toggleButtonState(inputList) {
    if (this._hasInvalidInput(inputList)) {
      this.disableSubmitButton(this._buttonElement);
    } else {
      this.enableSubmitButton(this._buttonElement);
    }
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _setEventListeners() {
    const inputList = Array.from(
      this._formElement.querySelectorAll(this._input)
    );

    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState(inputList);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        // чтобы проверять его при изменении любого из полей
        this._toggleButtonState(inputList);
      });
    });
  }

  enableValidation() {
    this._formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}
