export default class Card {
  constructor(data, photoCardTemplate) {
    (this._name = data.name),
      (this._link = data.link),
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
    card.querySelector(".elements__image").addEventListener("click", (evt) => {
      document.querySelector("#image-popup").classList.add("popup_opened");
      document.querySelector(".popup__img").src = evt.target.src;
      document.querySelector(".popup__img").alt = evt.target.alt;
      document.querySelector(".popup__img-description").textContent =
        card.querySelector(".elements__name").textContent;
    });
  }

  createCard() {
    const newCard = this._getTemplate();
    const img = newCard.querySelector(".elements__image");
    newCard.querySelector(".elements__name").textContent = this._name;
    img.src = this._link;
    img.alt = this._name;

    this._addEventListeners(newCard);

    return newCard;
  }
}
