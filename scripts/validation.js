const showInputError = (formElement, inputElement, errorMessage, obj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(obj.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(obj.errorClass);
};

const hideInputError = (formElement, inputElement, obj) => {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(obj.inputErrorClass);
  errorElement.classList.remove(obj.errorClass);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, obj) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      obj
    );
  } else {
    hideInputError(formElement, inputElement, obj);
  }
};

const enableSubmitButton = (obj, buttonElement) => {
  buttonElement.classList.remove(obj.inactiveButtonClass);
  buttonElement.removeAttribute("disabled", true);
};

const disableSubmitButton = (obj, buttonElement) => {
  buttonElement.classList.add(obj.inactiveButtonClass);
  buttonElement.setAttribute("disabled", true);
};

const toggleButtonState = (inputList, buttonElement, obj) => {
  if (hasInvalidInput(inputList)) {
    disableSubmitButton(obj, buttonElement);
  } else {
    enableSubmitButton(obj, buttonElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const setEventListeners = (formElement, obj) => {
  const inputList = Array.from(formElement.querySelectorAll(obj.inputSelector));
  const buttonElement = formElement.querySelector(obj.submitButtonSelector);

  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, buttonElement, obj);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, obj);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, buttonElement, obj);
    });
  });
};

const enableValidation = (obj) => {
  const formList = Array.from(document.querySelectorAll(obj.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", function (evt) {
      evt.preventDefault();
    });

    setEventListeners(formElement, obj);
  });
};

const objValidationClasses = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-text",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__form-text_invalid",
  errorClass: "popup__form-text-error_active",
};

enableValidation(objValidationClasses);
