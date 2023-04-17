export default class Card {
  constructor({ data, handleCardClick }, photoCardTemplate) {
    this._name = data.name;
    this._link = data.link;
    this._template = photoCardTemplate;
    this._handleCardClick = handleCardClick;
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
    this._img.addEventListener("click", this._handleCardClick);
  }

  createCard({ likes }) {
    const newCard = this._getTemplate();
    this._img = newCard.querySelector(".elements__image");
    newCard.querySelector(".elements__name").textContent = this._name;
    this._img.src = this._link;
    this._img.alt = this._name;
    this._likes = newCard.querySelector(".elements__like-num");
    this._likes.textContent = likes;

    this._addEventListeners(newCard);

    return newCard;
  }
}
