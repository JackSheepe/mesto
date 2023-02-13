const btnEdit = document.querySelector(".profile__edit-btn");
const btnAdd = document.querySelector(".profile__add-btn");
const editPopup = document.querySelector("#edit-popup");
const cardPopup = document.querySelector("#card-popup");
const imgPopup = document.querySelector("#image-popup");
const btnEditPopupClose = document.querySelector("#edit-close-btn");
const btnCardPopupClose = document.querySelector("#card-close-btn");
const btnImgPopupClose = document.querySelector("#img-close-btn");

// Находим форму в DOM
const editForm = document.querySelector("#edit-form");
const cardForm = document.querySelector("#card-form");
// Находим поля формы в DOM
const nameInput = editForm.querySelector("#name-field");
const bioInput = editForm.querySelector("#bio-field");
const cardNameInput = cardForm.querySelector("#card-name-field");
const linkInput = cardForm.querySelector("#link-field");

const profileName = document.querySelector(".profile__name"); // Выберите элементы, куда должны быть вставлены значения полей
const profileBio = document.querySelector(".profile__bio");
const imgPopupSrc = document.querySelector(".popup__img");
const imgPopupDescription = document.querySelector(".popup__img-description");

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

  const el = {
    name: cardNameInput.value,
    link: linkInput.value,
  };

  initialCards.unshift(el);
  addPhotoCard(el);

  doClosePopup(cardPopup);
}

btnEdit.addEventListener("click", () => doOpenPopup(editPopup));
btnEditPopupClose.addEventListener("click", () => doClosePopup(editPopup));
btnCardPopupClose.addEventListener("click", () => doClosePopup(cardPopup));
btnImgPopupClose.addEventListener("click", () => doClosePopup(imgPopup));
// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
editForm.addEventListener("submit", handleEditFormSubmit);

btnAdd.addEventListener("click", () => doOpenPopup(cardPopup));
cardForm.addEventListener("submit", handleAddFormSubmit);

function addPhotoCard(item) {
  let photoCard = photoCardTemplate
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
  photoCard
    .querySelector(".elements__image")
    .addEventListener("click", (evt) => {
      doOpenPopup(imgPopup);
      imgPopupSrc.src = evt.target.src;
      imgPopupSrc.alt = evt.target.alt;
      imgPopupDescription.textContent =
        photoCard.querySelector(".elements__name").textContent;
    });
  photoCardContainer.prepend(photoCard);
}

initialCards.forEach(addPhotoCard);
