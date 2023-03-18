import { doOpenPopup, imgPopup } from "./index.js";

export default class Card {
  constructor(data, photoCardTemplate) {
    (this._name = data.name),
      (this._link = data.link),
      (this._cardImage = document.querySelector(".elements__image")),
      (this._template = photoCardTemplate);
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector(".elements__element")
      .cloneNode(true);

    return cardElement;
  }

  _addEventListeners(card) {
    card.querySelector(".elements__like").addEventListener("click", (evt) => {
      evt.target.classList.toggle("elements__like_active");
    });
    card.querySelector(".elements__delete").addEventListener("click", () => {
      card.remove();
    });
    this._img.addEventListener("click", (evt) => {
      doOpenPopup(imgPopup);
      document.querySelector(".popup__img").src = evt.target.src;
      document.querySelector(".popup__img").alt = evt.target.alt;
      document.querySelector(".popup__img-description").textContent =
        card.querySelector(".elements__name").textContent;
    });
  }

  createCard() {
    const newCard = this._getTemplate();
    this._img = newCard.querySelector(".elements__image");
    newCard.querySelector(".elements__name").textContent = this._name;
    this._img.src = this._link;
    this._img.alt = this._name;

    this._addEventListeners(newCard);

    return newCard;
  }
}
