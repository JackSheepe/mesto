let btnEdit = document.querySelector(".profile__edit-btn");
let popup = document.querySelector(".popup");
let btnPopupClose = document.querySelector(".popup__close-btn");

// Находим форму в DOM
let formElement = document.querySelector(".popup__form");
// Находим поля формы в DOM
let nameInput = document.querySelector("#name-field");
let bioInput = document.querySelector("#bio-field");

let profileName = document.querySelector(".profile__name"); // Выберите элементы, куда должны быть вставлены значения полей
let profileBio = document.querySelector(".profile__bio");

function doOpenPopup() {
  popup.classList.add("popup_opened");
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
}

function doClosePopup() {
  popup.classList.remove("popup_opened");
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value; // Вставьте новые значения с помощью textContent

  doClosePopup();
}

btnEdit.addEventListener("click", doOpenPopup);
btnPopupClose.addEventListener("click", doClosePopup);
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);
