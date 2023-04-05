import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Popup from "./Popup.js";
import PopupWithForm from "./PopupWithForm.js";
import PopupWithImage from "./PopupWithImage.js";
import Section from "./Section.js";
import UserInfo from "./UserInfo.js";
import {
  objValidationClasses,
  initialCards,
  btnEditProfile,
  btnAddCard,
} from "./constants.js";

const user = new UserInfo(".profile__name", ".profile__bio");

const formEdit = new PopupWithForm(
  {
    submitCallback: (evt) => {
      evt.preventDefault();

      formEditValidity.disableSubmitButton();

      user.setUserInfo({
        name: formEdit._getInputValues()[0],
        bio: formEdit._getInputValues()[1],
      });
      console.log(formEdit._getInputValues()[0]);
      formEdit.close();
    },
  },
  "#edit-popup"
);

const formCard = new PopupWithForm(
  {
    submitCallback: (evt) => {
      evt.preventDefault();

      formCardValidity.disableSubmitButton();

      const el = {
        name: formCard._getInputValues()[0],
        link: formCard._getInputValues()[1],
      };

      const newCard = new Card(
        {
          data: el,
          handleCardClick: () => {
            const popup = new PopupWithImage({ data: item }, "#image-popup");
            popup.open();
          },
        },
        "#photo-card"
      );
      const cardElement = newCard.createCard();
      cardsSection.addItem(cardElement);
      console.log(el);

      formCard.close();
    },
  },
  "#card-popup"
);

btnEditProfile.addEventListener("click", () => {
  formEdit.open();
  formEdit._inputs[0].value = user.getUserInfo().name;
  formEdit._inputs[1].value = user.getUserInfo().bio;
  formEditValidity.enableSubmitButton();
});

btnAddCard.addEventListener("click", () => {
  formCard.open();
});

const formEditValidity = new FormValidator(
  objValidationClasses,
  formEdit._form
);
formEditValidity.enableValidation();
const formCardValidity = new FormValidator(
  objValidationClasses,
  formCard._form
);
formCardValidity.enableValidation();

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const newCard = new Card(
        {
          data: item,
          handleCardClick: () => {
            const popup = new PopupWithImage({ data: item }, "#image-popup");
            popup.open();
          },
        },
        "#photo-card"
      );
      const cardElement = newCard.createCard();
      cardsSection.addItem(cardElement);
    },
  },
  ".elements"
);

cardsSection.renderItems();
