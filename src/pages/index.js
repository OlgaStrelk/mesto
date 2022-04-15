import './index.css';
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";
import {  } from "../utils/consts.js"

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
  const card = new Card(data, "#card-template", () => {
    imagePopup.open(data.link, data.name);
  });
  return card.getView();
};

const renderCard = (data) => {
  const card = createCard(data);
  cardsContainer.prepend(card);
};

const submitProfileForm = (data) => {
  const { name, occupation } = data;
  userInfo.setUserInfo(name, occupation);
  profilePopup.close();
};

const submitCardForm = (data) => {
  const card = createCard({
    link: data.link,
    name: data["place"],
  });
  section.addItem(card);
  cardPopup.close();
};

const cardPopup = new PopupWithForm(".popup_type_add-card", submitCardForm);
const profilePopup = new PopupWithForm(".popup_type_profile", submitProfileForm);
const section = new Section(
  { items: initialCards, renderer: renderCard },
  cardsContainer
);
section.renderElements();

imagePopup.setEventListeners();
cardPopup.setEventListeners();
profilePopup.setEventListeners();

function openProfilePopup() {
  const data = userInfo.getUserInfo()
  nameInput.value = data.name;
  jobInput.value = data.job;
  profilePopup.open();
}

function clearForm() {
  formCard.reset();
}

function openCardPopup() {
  formCardValidator.disableSubmitButton();
  formCardValidator.resetErrors();
  clearForm();
  cardPopup.open();
}

buttonEditProfile.addEventListener("click", openProfilePopup);

buttonAddCard.addEventListener("click", openCardPopup);
