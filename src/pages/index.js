import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  objValidationClasses,
  btnEditProfile,
  btnAddCard,
} from "../utils/constants.js";

const user = new UserInfo(
  ".profile__name",
  ".profile__bio",
  ".profile__avatar"
);
const userInfo = user.getUserInfo();

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "d64a3265-70b5-488d-a026-a7476e12b035",
    "Content-Type": "application/json",
  },
});

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
  console.log(obj.likes.length);
  const cardElement = newCard.createCard({ likes: `${obj.likes.length}` });
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

api.getInitialCards().then((data) => {
  const cardsSection = new Section(
    {
      items: data,
      renderer: (item) => {
        renderCard(cardsSection, item, popupImg);
      },
    },
    ".elements"
  );

  cardsSection.renderItems();
});
