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
  formProfile,
  formCard,
  nameInput,
  jobInput,
  cardsContainer,
} from "../utils/consts.js";
import { api } from "../components/Api.js";

let userId;

api.getProfile().then((res) => {
  userInfo.setUserInfo(res.name, res.about);

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
      ownerId: data.owner._id
    });
    section.addItem(card);
  });
});

const formProfileValidator = new FormValidator(validationConfig, formProfile);
const formCardValidator = new FormValidator(validationConfig, formCard);
const imagePopup = new PopupWithImage(".popup_type_big-image");

const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileJobSelector: ".profile__description",
});

formProfileValidator.enableValidation();
formCardValidator.enableValidation();

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
      api.addLike(id)
      .then(res => {
        alert(res)
      })
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
  const { name, occupation } = data;
  api.editProfile(name, occupation).then((res) => {
    userInfo.setUserInfo(res.name, res.about);
  });
  profilePopup.close();
};

const submitCardForm = (data) => {
  api.addCard(data["place"], data.link).then((res) => {
    const card = createCard({
      name: res.name,
      link: res.link,
      likes: res.likes,
      id: res._id,
      userId: userId,
      ownerId: res.owner._id
    });
    section.addItem(card);
    cardPopup.close();
  });
};

const cardPopup = new PopupWithForm(".popup_type_add-card", submitCardForm);
const cardDeletePopup = new PopupWithForm(".popup_type_delete-card");
const profilePopup = new PopupWithForm(
  ".popup_type_profile",
  submitProfileForm
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

function openProfilePopup() {
  const data = userInfo.getUserInfo();
  nameInput.value = data.name;
  jobInput.value = data.job;
  profilePopup.open();
}

function openCardPopup() {
  formCardValidator.disableSubmitButton();
  formCardValidator.resetErrors();
  cardPopup.open();
}

buttonEditProfile.addEventListener("click", openProfilePopup);

buttonAddCard.addEventListener("click", openCardPopup);
