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
  btnEditAvatar,
} from "../utils/constants.js";
import { renderLoading } from "../utils/utils.js";
import { data } from "autoprefixer";

const user = new UserInfo(
  ".profile__name",
  ".profile__bio",
  ".profile__avatar"
);

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "d64a3265-70b5-488d-a026-a7476e12b035",
    "Content-Type": "application/json",
  },
});

api.getUserInfo().then((data) => {
  user.setUserInfo({
    name: data.name,
    bio: data.about,
    avatar: data.avatar,
  });
});

const popupImg = new PopupWithImage("#image-popup");

function renderCard(section, obj, imgPopup, delPopup, userData) {
  const newCard = new Card(
    {
      data: obj,
      handleCardClick: () => {
        imgPopup.open({ data: obj });
      },
      handleDeleteCard: (data) => {
        delPopup.setInputValues(data);
        delPopup.open();
      },
      handleLikeCard: (id) => {
        api.likeCard(id).then((data) => {
          newCard.likesCount.textContent = data.likes.length;
        });
      },
      handleUnlikeCard: (id) => {
        api.unlikeCard(id).then((data) => {
          newCard.likesCount.textContent = data.likes.length;
        });
      },
      user: userData,
    },
    "#photo-card"
  );
  const cardElement = newCard.createCard();
  section.addItem(cardElement);
}

const popupEdit = new PopupWithForm(
  {
    submitCallback: (values) => {
      renderLoading({ submitBtn: popupEdit.submitBtn }, true);
      formEditValidity.disableSubmitButton();

      api.getUserInfo().then((data) => {
        user.setUserInfo({
          name: values.name,
          bio: values.bio,
          avatar: data.avatar,
        });
      });

      api.editUserInfo({ name: values.name, bio: values.bio }).finally(() => {
        renderLoading({ submitBtn: popupAvatar.submitBtn }, false);
        popupEdit.close();
      });
    },
  },
  "#edit-popup"
);
const formEdit = popupEdit.form;

const popupCard = new PopupWithForm(
  {
    submitCallback: (values) => {
      renderLoading({ submitBtn: popupCard.submitBtn }, true);
      formCardValidity.disableSubmitButton();

      api.postCard({ name: values.name, link: values.link }).finally(() => {
        renderLoading({ submitBtn: popupAvatar.submitBtn }, false);
        popupCard.close();
      });
    },
  },
  "#card-popup"
);
const formCard = popupCard.form;

const popupAvatar = new PopupWithForm(
  {
    submitCallback: (values) => {
      renderLoading({ submitBtn: popupAvatar.submitBtn }, true);
      formCardValidity.disableSubmitButton();

      api.changeAvatar({ link: values.link }).finally(() => {
        renderLoading({ submitBtn: popupAvatar.submitBtn }, false);
        popupAvatar.close();
      });
    },
  },
  "#avatar-popup"
);
const formAvatar = popupAvatar.form;

btnEditProfile.addEventListener("click", () => {
  popupEdit.open();
  popupEdit.setInputValues(user.getUserInfo());
  formEditValidity.enableSubmitButton();
});

btnAddCard.addEventListener("click", () => {
  popupCard.open();
});

btnEditAvatar.addEventListener("click", () => {
  popupAvatar.open();
});

const formEditValidity = new FormValidator(objValidationClasses, formEdit);
formEditValidity.enableValidation();
const formCardValidity = new FormValidator(objValidationClasses, formCard);
formCardValidity.enableValidation();
const formAvatarValidity = new FormValidator(objValidationClasses, formAvatar);
formAvatarValidity.enableValidation();

let cardsSection;

Promise.all([api.getUserInfo(), api.getInitialCards()]).then(
  ([userData, cardsData]) => {
    const newSection = new Section(
      {
        items: cardsData,
        renderer: (item) => {
          renderCard(cardsSection, item, popupImg, popupDel, userData);
        },
      },
      ".elements"
    );

    cardsSection = newSection;

    cardsSection.renderItems();
  }
);

const popupDel = new PopupWithForm(
  {
    submitCallback: (value) => {
      api.deleteCard(value._id);
      popupDel.close();
    },
  },
  "#delete-popup"
);
