let editBtn = document.querySelector(".profile__edit-btn");
let popup = document.querySelector(".popup");

function doOpenPopup() {
  popup.classList.add("popup_opened");
}
editBtn.addEventListener("click", doOpenPopup);

let popupCloseBtn = document.querySelector(".popup__close-btn");
function doClosePopup() {
  popup.classList.remove("popup_opened");
}

popupCloseBtn.addEventListener("click", doClosePopup);

// Находим форму в DOM
let formElement = document.querySelector(".popup__form");
// Находим поля формы в DOM
let nameInput = document.querySelector(".popup__profile-name");
let bioInput = document.querySelector(".popup__profile-bio");

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  let nameValue = nameInput.value; // Получите значение полей jobInput и nameInput из свойства value
  let bioValue = bioInput.value;

  let profileName = document.querySelector(".profile__name"); // Выберите элементы, куда должны быть вставлены значения полей
  let profileBio = document.querySelector(".profile__bio");

  profileName.textContent = nameValue;
  profileBio.textContent = bioValue; // Вставьте новые значения с помощью textContent

  nameInput.title = nameValue;
  bioInput.title = bioValue;
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formElement.addEventListener("submit", handleFormSubmit);
