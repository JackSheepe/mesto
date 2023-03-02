const btnEditProfile = document.querySelector(".profile__edit-btn");
const btnAddCard = document.querySelector(".profile__add-btn");
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector("#edit-popup");
const cardPopup = document.querySelector("#card-popup");
const imgPopup = document.querySelector("#image-popup");
const btnPopupEditClose = document.querySelector("#edit-close-btn");
const btnCardPopupClose = document.querySelector("#card-close-btn");
const btnImgPopupClose = document.querySelector("#img-close-btn");

// Находим форму в DOM
const formEdit = document.querySelector("#edit-form");
const formCard = document.querySelector("#card-form");
// Находим поля формы в DOM
const nameInput = formEdit.querySelector("#name-field");
const bioInput = formEdit.querySelector("#bio-field");
const cardNameInput = formCard.querySelector("#card-name-field");
const linkInput = formCard.querySelector("#link-field");

const inputSubmitObj = {
  inputSelector: ".popup__form-text",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
};

const profileName = document.querySelector(".profile__name"); // Выберите элементы, куда должны быть вставлены значения полей
const profileBio = document.querySelector(".profile__bio");
const imgPopupSrc = document.querySelector(".popup__img");
const imgPopupDescription = document.querySelector(".popup__img-description");

// Фото-карточка
const photoCardContainer = document.querySelector(".elements");
const photoCardTemplate = document.querySelector("#photo-card").content;
const photoCard = photoCardTemplate.querySelector(".elements__element");

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

function keyHandler(evt) {
  if (evt.key === "Escape") {
    const popup = document.querySelector(".popup_opened");
    doClosePopup(popup);
  }
}

function mouseHandler(evt) {
  if (evt.target === evt.currentTarget) {
    doClosePopup(evt.currentTarget);
  }
}

function checkIsItInput(popup, obj) {
  if (!popup.classList.contains("popup_image")) {
    const inputList = Array.from(popup.querySelectorAll(obj.inputSelector));
    const buttonElement = popup.querySelector(obj.submitButtonSelector);
    toggleButtonState(inputList, buttonElement, obj);
  }
}

function doOpenPopup(popup, obj) {
  checkIsItInput(popup, obj);
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", keyHandler);
}

function doClosePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", keyHandler);
}

function openPropfilePopup(obj) {
  nameInput.value = profileName.textContent;
  bioInput.value = profileBio.textContent;
  doOpenPopup(popupEdit, obj);
}

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleformEditSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  // Так мы можем определить свою логику отправки.
  // О том, как это делать, расскажем позже.

  profileName.textContent = nameInput.value;
  profileBio.textContent = bioInput.value; // Вставьте новые значения с помощью textContent

  doClosePopup(popupEdit);
}

function handleAddFormSubmit(evt) {
  evt.preventDefault();

  const el = {
    name: cardNameInput.value,
    link: linkInput.value,
  };

  renderCard(el);

  doClosePopup(cardPopup);
}

btnEditProfile.addEventListener("click", () =>
  openPropfilePopup(inputSubmitObj)
);
btnPopupEditClose.addEventListener("click", () => doClosePopup(popupEdit));
btnCardPopupClose.addEventListener("click", () => doClosePopup(cardPopup));
btnImgPopupClose.addEventListener("click", () => doClosePopup(imgPopup));
popups.forEach((popup) => popup.addEventListener("click", mouseHandler));

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
formEdit.addEventListener("submit", handleformEditSubmit);

btnAddCard.addEventListener("click", () =>
  doOpenPopup(cardPopup, inputSubmitObj)
);
formCard.addEventListener("submit", handleAddFormSubmit);

function createCard(card) {
  const newCard = photoCard.cloneNode(true);
  const img = newCard.querySelector(".elements__image");
  newCard.querySelector(".elements__name").textContent = card.name;
  img.src = card.link;
  img.alt = card.name;
  newCard.querySelector(".elements__like").addEventListener("click", (evt) => {
    evt.target.classList.toggle("elements__like_active");
  });
  newCard.querySelector(".elements__delete").addEventListener("click", () => {
    newCard.remove();
  });
  img.addEventListener("click", (evt) => {
    doOpenPopup(imgPopup, inputSubmitObj);
    imgPopupSrc.src = evt.target.src;
    imgPopupSrc.alt = evt.target.alt;
    imgPopupDescription.textContent =
      newCard.querySelector(".elements__name").textContent;
  });

  return newCard;
}

function renderCard(card) {
  photoCardContainer.prepend(createCard(card));
}

initialCards.forEach(renderCard);
