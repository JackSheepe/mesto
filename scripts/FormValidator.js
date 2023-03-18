export default class FormValidator {
  constructor(data, formElement) {
    (this._form = data.formSelector),
      (this._input = data.inputSelector),
      (this._submitBtn = data.submitButtonSelector),
      (this._inactiveBtn = data.inactiveButtonClass),
      (this._inputErrorClass = data.inputErrorClass),
      (this._error = data.errorClass),
      (this._formElement = formElement);
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

  _enableSubmitButton(buttonElement) {
    buttonElement.classList.remove(this._inactiveBtn);
    buttonElement.removeAttribute("disabled", true);
  }

  _disableSubmitButton(buttonElement) {
    buttonElement.classList.add(this._inactiveBtn);
    buttonElement.setAttribute("disabled", true);
  }

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableSubmitButton(buttonElement);
    } else {
      this._enableSubmitButton(buttonElement);
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
    const buttonElement = this._formElement.querySelector(this._submitBtn);

    // чтобы проверить состояние кнопки в самом начале
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        // чтобы проверять его при изменении любого из полей
        this._toggleButtonState(inputList, buttonElement);
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
