import './index.css';
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from "../components/PopupWithImage.js";
import { PopupWithForm } from "../components/PopupWithForm.js";
import { UserInfo } from "../components/UserInfo.js";

const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__error_visible",
};

const popupImage = document.querySelector(".popup_type_big-image"); 
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
const popupProfile = document.querySelector(".popup_type_profile");
const popupCard = document.querySelector(".popup_type_add-card");
const formProfile = document.querySelector(".popup__form_type_profile");
const formCard = document.querySelector(".popup__form_type_add-card");
const nameInput = document.querySelector(".popup__field_type_name");
const jobInput = document.querySelector(".popup__field_type_job");
const cardsContainer = document.querySelector(".cards");
const formProfileValidator = new FormValidator(validationConfig, formProfile);
const formCardValidator = new FormValidator(validationConfig, formCard);
const imagePopup = new PopupWithImage(popupImage);
const userInfo = new UserInfo({
  profileNameSelector: ".profile__title",
  profileJobSelector: ".profile__description",
});

const initialCards = [
  {
    name: "Рейкьявик",
    link: "https://3pulse.com/uploads/photo/19/99/00/2020/01/22/0230dba935.jpg",
  },
  {
    name: "Нью-Йорк",
    link: "https://upload.wikimedia.org/wikipedia/commons/8/83/The_Vessel_%28top-down_view%29%2C_Hudson_Yards%2C_New_York_City%2C_July_2019.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Каир",
    link: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Cairo_Tower_2011.JPG/135px-Cairo_Tower_2011.JPG",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Польша",
    link: "https://a.d-cd.net/_EAAAgGPvuA-1920.jpg",
  },
];

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

const cardPopup = new PopupWithForm(popupCard, submitCardForm);
const profilePopup = new PopupWithForm(popupProfile, submitProfileForm);
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
