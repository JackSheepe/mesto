import "../pages/index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupDelete from "../components/PopupDelete.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {
  objValidationClasses,
  btnEditProfile,
  btnAddCard,
  btnEditAvatar,
} from "../utils/constants.js";
import {
  renderLoading,
  openPopup,
  openEditPopup,
  openCardPopup,
} from "../utils/utils.js";
import { data } from "autoprefixer";

const user = new UserInfo(
  ".profile__name",
  ".profile__bio",
  ".profile__avatar"
);

let initialUserData = {};

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-64",
  headers: {
    authorization: "d64a3265-70b5-488d-a026-a7476e12b035",
    "Content-Type": "application/json",
  },
});

api
  .getUserInfo()
  .then((data) => {
    user.setUserInfo({
      name: data.name,
      bio: data.about,
      avatar: data.avatar,
    });
    initialUserData = data;
  })
  .catch((err) => {
    console.log(err);
  });

const popupImg = new PopupWithImage("#image-popup");
popupImg.setEventListeners();

function renderCard(section, obj, imgPopup, delPopup, userData) {
  const newCard = new Card(
    {
      data: obj,
      handleCardClick: () => {
        imgPopup.open({ data: obj });
      },
      handleDeleteCard: (id, card) => {
        delPopup.setValues(card, id);
        delPopup.open();
      },
      handleLikeCard: (id) => {
        api
          .likeCard(id)
          .then((data) => {
            newCard.likesCount.textContent = data.likes.length;
          })
          .catch((err) => {
            console.log(err);
          });
      },
      handleUnlikeCard: (id) => {
        api
          .unlikeCard(id)
          .then((data) => {
            newCard.likesCount.textContent = data.likes.length;
          })
          .catch((err) => {
            console.log(err);
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

      api
        .editUserInfo({ name: values.name, bio: values.bio })
        .then((data) => {
          user.setUserInfo({
            name: data.name,
            bio: data.about,
            avatar: data.avatar,
          });
          popupEdit.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading({ submitBtn: popupEdit.submitBtn }, false);
        });
    },
  },
  "#edit-popup"
);
popupEdit.setEventListeners();
const formEdit = popupEdit.form;

const popupCard = new PopupWithForm(
  {
    submitCallback: (values) => {
      renderLoading({ submitBtn: popupCard.submitBtn }, true);
      formCardValidity.disableSubmitButton();

      api
        .postCard({ name: values.name, link: values.link })
        .then((data) => {
          renderCard(cardsSection, data, popupImg, popupDel, initialUserData);
          popupCard.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading({ submitBtn: popupCard.submitBtn }, false);
        });
    },
  },
  "#card-popup"
);
popupCard.setEventListeners();
const formCard = popupCard.form;

const popupAvatar = new PopupWithForm(
  {
    submitCallback: (values) => {
      renderLoading({ submitBtn: popupAvatar.submitBtn }, true);
      formCardValidity.disableSubmitButton();

      api
        .changeAvatar({ link: values.link })
        .then((data) => {
          user.setUserInfo({
            name: data.name,
            bio: data.about,
            avatar: data.avatar,
          });
          popupAvatar.close();
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          renderLoading({ submitBtn: popupAvatar.submitBtn }, false);
        });
    },
  },
  "#avatar-popup"
);
popupAvatar.setEventListeners();
const formAvatar = popupAvatar.form;

const formEditValidity = new FormValidator(objValidationClasses, formEdit);
formEditValidity.enableValidation();
const formCardValidity = new FormValidator(objValidationClasses, formCard);
formCardValidity.enableValidation();
const formAvatarValidity = new FormValidator(objValidationClasses, formAvatar);
formAvatarValidity.enableValidation();

btnEditProfile.addEventListener("click", () =>
  openEditPopup(popupEdit, user, formEditValidity)
);

btnAddCard.addEventListener("click", () =>
  openCardPopup(popupCard, formCardValidity)
);

btnEditAvatar.addEventListener("click", () => openPopup(popupAvatar));

let cardsSection;

Promise.all([api.getUserInfo(), api.getInitialCards()])
  .then(([userData, cardsData]) => {
    const newSection = new Section(
      {
        items: cardsData.reverse(),
        renderer: (item) => {
          renderCard(cardsSection, item, popupImg, popupDel, userData);
        },
      },
      ".elements"
    );

    user.setUserInfo({
      name: userData.name,
      bio: userData.about,
      avatar: userData.avatar,
    });

    cardsSection = newSection;

    cardsSection.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

const popupDel = new PopupDelete(
  {
    submitCallback: (cardEl, cardId) => {
      api
        .deleteCard(cardId)
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          cardEl.remove();
        });
      popupDel.close();
    },
  },
  "#delete-popup"
);
popupDel.setEventListeners();
