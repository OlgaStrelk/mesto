import "./index.css";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {
  validationConfig,
  buttonEditProfile,
  buttonAddCard,
  buttonEditUserPic,
  formProfile,
  formCard,
  formUserPic,
  nameInput,
  jobInput,
  cardsContainer,
} from "../utils/consts.js";
import { api } from "../components/Api.js";

let userId;

api.getProfile().then((res) => {
  console.log(res.name, res.about, res.avatar);
  userInfo.setUserInfo(res.name, res.about, res.avatar);
  userId = res._id;
});

api.getInitialCards().then((cardList) => {
  cardList.forEach((data) => {
    const card = createCard({
      name: data.name,
      link: data.link,
      likes: data.likes,
      id: data._id,
      userId: userId,
      ownerId: data.owner._id,
    });
    section.addItem(card);
  });
});

const formProfileValidator = new FormValidator(validationConfig, formProfile);
const formCardValidator = new FormValidator(validationConfig, formCard);
const formUserPicValidator = new FormValidator(validationConfig, formUserPic);
const imagePopup = new PopupWithImage(".popup_type_big-image");

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileJobSelector: ".profile__description",
  userPicSelector: ".profile__user-pic",
  editUserPicButtonSelector: ".profile__button_type_edit-user-pic",
});

formProfileValidator.enableValidation();
formCardValidator.enableValidation();
formUserPicValidator.enableValidation();

const createCard = (data) => {
  const card = new Card(
    data,
    "#card-template",
    () => {
      imagePopup.open(data.link, data.name);
    },
    (id) => {
      cardDeletePopup.open();
      cardDeletePopup.changeSubmitHandler(() => {
        api.deleteCard(id).then(() => {
          card.removeCard();
          cardDeletePopup.close();
        });
      });
    },
    (id) => {
      if (card.isLiked()) {
        api.deleteLike(id).then((res) => {
          card.countLikes(res.likes);
        });
      } else {
        api.addLike(id).then((res) => {
          card.countLikes(res.likes);
        });
      }
    }
  );
  return card.getView();
};

const renderCard = (data) => {
  const card = createCard(data);
  console.log("card", card);

  section.addItem(card);
};

const submitProfileForm = (data) => {
  profilePopup.showLoading();
  const { name, occupation } = data;
  api
    .editProfile(name, occupation)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
    })
    .then(() => {
      profilePopup.close();
    });
};

const submitCardForm = (data) => {
  cardPopup.showLoading();

  api
    .addCard(data["place"], data.link)
    .then((res) => {
      const card = createCard({
        name: res.name,
        link: res.link,
        likes: res.likes,
        id: res._id,
        userId: userId,
        ownerId: res.owner._id,
      });
      section.addItem(card);
    })
    .then(() => {
      cardPopup.close();
    });
};

const submitUserPicForm = (data) => {
  userPicPopup.showLoading();
  const { link } = data;
  api
    .changeUserPic(link)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
    })
    .then(() => {
      userPicPopup.close();
    });
};

const cardPopup = new PopupWithForm(".popup_type_add-card", submitCardForm);
const cardDeletePopup = new PopupWithForm(".popup_type_delete-card");
const profilePopup = new PopupWithForm(
  ".popup_type_profile",
  submitProfileForm
);
const userPicPopup = new PopupWithForm(
  ".popup_type_edit-user-pic",
  submitUserPicForm
);

const section = new Section(
  { items: [], renderer: renderCard },
  cardsContainer
);
section.renderElements();

imagePopup.setEventListeners();
cardPopup.setEventListeners();
profilePopup.setEventListeners();
cardDeletePopup.setEventListeners();
userPicPopup.setEventListeners();
userInfo.setEventListeners();

function openProfilePopup() {
  profilePopup.returnInitialButtonContent();
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  profilePopup.open();
}

function openCardPopup() {
  cardPopup.returnInitialButtonContent();
  formCardValidator.disableSubmitButton();
  formCardValidator.resetErrors();
  cardPopup.open();
}

function openUserPicPopup() {
  userPicPopup.returnInitialButtonContent();
  formUserPicValidator.disableSubmitButton();
  formUserPicValidator.resetErrors();
  userPicPopup.open();
}

buttonEditProfile.addEventListener("click", openProfilePopup);

buttonAddCard.addEventListener("click", openCardPopup);

buttonEditUserPic.addEventListener("click", openUserPicPopup);
