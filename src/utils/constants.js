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

const profileName = document.querySelector(".profile__name"); // Выберите элементы, куда должны быть вставлены значения полей
const profileBio = document.querySelector(".profile__bio");

// Контейнер фото карточки
const photoCardContainer = document.querySelector(".elements");

// Классы и селекторы валидации
const objValidationClasses = {
  formSelector: ".popup__form",
  inputSelector: ".popup__form-text",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__form-text_invalid",
  errorClass: "popup__form-text-error_active",
};

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

export {
  btnEditProfile,
  btnAddCard,
  popups,
  popupEdit,
  cardPopup,
  imgPopup,
  btnPopupEditClose,
  btnCardPopupClose,
  btnImgPopupClose,
  formEdit,
  formCard,
  nameInput,
  bioInput,
  cardNameInput,
  linkInput,
  profileName,
  profileBio,
  photoCardContainer,
  objValidationClasses,
  initialCards,
};
