let btnEdit = document.querySelector(".profile__edit-btn");
let btnAdd = document.querySelector(".profile__add-btn");
let editPopup = document.querySelector("#edit-popup");
let cardPopup = document.querySelector("#card-popup");
let btnEditPopupClose = document.querySelector("#edit-close-btn");
let btnCardPopupClose = document.querySelector("#card-close-btn");

// Находим форму в DOM
let editForm = document.querySelector("#edit-form");
let cardForm = document.querySelector("#card-form");
// Находим поля формы в DOM
let nameInput = editForm.querySelector("#name-field");
let bioInput = editForm.querySelector("#bio-field");
let cardNameInput = cardForm.querySelector("#card-name-field");
let linkInput = cardForm.querySelector("#link-field");

let profileName = document.querySelector(".profile__name"); // Выберите элементы, куда должны быть вставлены значения полей
let profileBio = document.querySelector(".profile__bio");

// Фото-карточка
const photoCardContainer = document.querySelector(".elements");
const photoCardTemplate = document.querySelector("#photo-card").content;

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function doOpenPopup(popup) {
  popup.classList.add("popup_opened");
  if (popup.id === "edit-popup") {
    nameInput.value = profileName.textContent;
    bioInput.value = profileBio.textContent;
  }
}

function doClosePopup(popup) {
  popup.classList.remove("popup_opened");
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleEditFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value; // Вставьте новые значения с помощью textContent

  doClosePopup(editPopup);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  let el = {
    name: cardNameInput.value,
    link: linkInput.value,
  };

  initialCards.unshift(el);
  addPhotoCard(el);

  doClosePopup(cardPopup);
}

btnEdit.addEventListener("click", () => doOpenPopup(editPopup));
btnEditPopupClose.addEventListener("click", () => doClosePopup(editPopup));
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editForm.addEventListener("submit", handleEditFormSubmit);

btnAdd.addEventListener("click", () => doOpenPopup(cardPopup));
btnCardPopupClose.addEventListener("click", () => doClosePopup(cardPopup));
cardForm.addEventListener("submit", handleAddFormSubmit);

function addPhotoCard(item) {
  const photoCard = photoCardTemplate
    .querySelector(".elements__element")
    .cloneNode(true);
  photoCard.querySelector(".elements__name").textContent = item.name;
  photoCard.querySelector(".elements__image").src = item.link;
  photoCard.querySelector(".elements__image").alt = item.name;
  photoCard
    .querySelector(".elements__like")
    .addEventListener("click", (evt) => {
      evt.target.classList.toggle("elements__like_active");
    });
  photoCard.querySelector(".elements__delete").addEventListener("click", () => {
    photoCard.remove();
  });
  photoCardContainer.prepend(photoCard);
}

initialCards.forEach(addPhotoCard);
