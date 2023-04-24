export default class Card {
  constructor(
    {
      data,
      handleCardClick,
      handleDeleteCard,
      handleLikeCard,
      handleUnlikeCard,
      user,
    },
    photoCardTemplate
  ) {
    this._name = data.name;
    this._link = data.link;
    this._cardId = data._id;
    this._likes = data.likes;
    this._creatorId = data.owner._id;
    this._user = user;
    this._template = photoCardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleDeleteCard = handleDeleteCard;
    this._handleLikeCard = handleLikeCard;
    this._handleUnlikeCard = handleUnlikeCard;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._template)
      .content.querySelector(".elements__element")
      .cloneNode(true);

    return cardElement;
  }

  _addEventListeners(card) {
    this._likeBtn.addEventListener("click", (evt) => {
      evt.target.classList.toggle("elements__like_active");
      if (evt.target.classList.contains("elements__like_active")) {
        this._handleLikeCard(this._cardId);
      } else {
        this._handleUnlikeCard(this._cardId);
      }
    });
    this._delBtn.addEventListener("click", () =>
      this._handleDeleteCard(this._cardId, card)
    );
    this._img.addEventListener("click", this._handleCardClick);
  }

  _isOwner(ownerId, userId) {
    if (ownerId !== userId) {
      this._delBtn.remove();
    }
  }
  _isLiked(arr, userId, likebtn) {
    if (arr.some((obj) => obj.name === userId)) {
      likebtn.classList.add("elements__like_active");
    }
  }

  createCard() {
    const newCard = this._getTemplate();
    this._img = newCard.querySelector(".elements__image");
    newCard.querySelector(".elements__name").textContent = this._name;
    this._img.src = this._link;
    this._img.alt = this._name;
    this._likeBtn = newCard.querySelector(".elements__like");
    this.likesCount = newCard.querySelector(".elements__like-num");
    this.likesCount.textContent = this._likes.length;
    this._delBtn = newCard.querySelector(".elements__delete");
    this._isOwner(this._user._id, this._creatorId);
    this._isLiked(this._likes, this._user.name, this._likeBtn);

    this._addEventListeners(newCard);

    return newCard;
  }
}
