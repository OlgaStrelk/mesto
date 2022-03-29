import { closePopup, openPopup } from "./utils.js";
import { popupImage } from "./consts.js";
import { FormValidator } from "./FormValidator.js";
import { Card } from "./Card.js";
import { Section } from "./Section.js";


//validation config
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__error_visible",
};

//buttons
const buttonEditProfile = document.querySelector(".profile__edit-button");
const buttonAddCard = document.querySelector(".profile__add-button");
// const buttonCloseProfile = document.querySelector(".popup__close_type_profile");
// const buttonCloseCard = document.querySelector(".popup__close_type_add-card");
// const buttonCloseImg = document.querySelector(".popup__close_type_big-image");

//popups
const popupProfile = document.querySelector(".popup_type_profile");
const popupCard = document.querySelector(".popup_type_add-card");

//forms
const formProfile = document.querySelector(".popup__form_type_profile");
const formCard = document.querySelector(".popup__form_type_add-card");
const formProfileValidator = new FormValidator(validationConfig, formProfile);
const formCardValidator = new FormValidator(validationConfig, formCard);

//for profile form
const nameInput = document.querySelector(".popup__field_type_name");
const jobInput = document.querySelector(".popup__field_type_job");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

//for place form
const cardsContainer = document.querySelector(".cards");
const placeInput = document.querySelector("#form-field-place");
const linkInput = document.querySelector("#form-field-link");

//popup UX
const popupList = Array.from(document.querySelectorAll(".popup"));

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

const renderCard = (data) => {
  return cardsContainer.prepend(new Card(data, "#card-template").createCard());
};

initialCards.forEach((card) => {
  renderCard(card);
});

function closePopupByOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

function submitForm(event, popupName) {
  event.preventDefault();
  closePopup(popupName);
}

function submitCardForm(event) {
  submitForm(event, popupCard);
  renderCard({
    name: placeInput.value,
    link: linkInput.value,
  });
  event.target.reset();
}

function submitProfileForm(event) {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  submitForm(event, popupProfile);
}

function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
  openPopup(popupProfile);
}

function clearForm() {
  formCard.reset();
}

function openCardPopup() {
  formCardValidator.disableSubmitButton();
  formCardValidator.resetErrors();
  clearForm();
  openPopup(popupCard);
}

//Handlers
buttonEditProfile.addEventListener("click", openProfilePopup);

buttonAddCard.addEventListener("click", openCardPopup);

formProfile.addEventListener("submit", submitProfileForm);

formCard.addEventListener("submit", submitCardForm);

popupList.forEach((item) => {
  item.addEventListener("click", closePopupByOverlay);
});

// buttonCloseProfile.addEventListener("click", () => {
//   closePopup(popupProfile);
// });

// buttonCloseCard.addEventListener("click", () => {
//   closePopup(popupCard);
// });

// buttonCloseImg.addEventListener("click", () => {
//   closePopup(popupImage);
// });
