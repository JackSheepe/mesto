import "./pages/index.css";
import Card from "./scripts/Card.js";
import FormValidator from "./scripts/FormValidator.js";
import Popup from "./scripts/Popup.js";
import PopupWithForm from "./scripts/PopupWithForm.js";
import PopupWithImage from "./scripts/PopupWithImage.js";
import Section from "./scripts/Section.js";
import UserInfo from "./scripts/UserInfo.js";
import {
  objValidationClasses,
  initialCards,
  btnEditProfile,
  btnAddCard,
} from "./scripts/constants.js";

const user = new UserInfo(".profile__name", ".profile__bio");
const userInfo = user.getUserInfo();

const popupImg = new PopupWithImage("#image-popup");

function renderCard(section, obj, popupClass) {
  const newCard = new Card(
    {
      data: obj,
      handleCardClick: () => {
        popupClass.open({ data: obj });
      },
    },
    "#photo-card"
  );
  const cardElement = newCard.createCard();
  section.addItem(cardElement);
}

const popupEdit = new PopupWithForm(
  {
    submitCallback: (values) => {
      formEditValidity.disableSubmitButton();

      user.setUserInfo({
        name: values.name,
        bio: values.bio,
      });
    },
  },
  "#edit-popup"
);
const formEdit = popupEdit.form;

const popupCard = new PopupWithForm(
  {
    submitCallback: (values) => {
      formCardValidity.disableSubmitButton();

      const el = {
        name: values.name,
        link: values.link,
      };

      renderCard(cardsSection, el, popupImg);
    },
  },
  "#card-popup"
);
const formCard = popupCard.form;

btnEditProfile.addEventListener("click", () => {
  popupEdit.open();
  popupEdit.setInputValues(userInfo);
  formEditValidity.enableSubmitButton();
});

btnAddCard.addEventListener("click", () => {
  popupCard.open();
});

const formEditValidity = new FormValidator(objValidationClasses, formEdit);
formEditValidity.enableValidation();
const formCardValidity = new FormValidator(objValidationClasses, formCard);
formCardValidity.enableValidation();

const cardsSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      renderCard(cardsSection, item, popupImg);
    },
  },
  ".elements"
);

cardsSection.renderItems();
