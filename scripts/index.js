import FormValidator from "./FormValidator.js";
import Card from "./Card.js";


//validation config
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__error_visible",
};

//cards config
const cardConfig = {
  templateSelector: "#card-template",
  cardSelector: ".cards__item",
  imageSelector: ".cards__image",
  titleSelector: ".cards__title",
  removeSelector: ".cards__remove",
  likeSelector: ".cards__like",
  activeLikeClass: "cards__like_is-active",
};

//buttons
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const closeProfileButton = document.querySelector(".popup__close_type_profile");
const closeCardButton = document.querySelector(".popup__close_type_add-card");
const closeImgButton = document.querySelector(".popup__close_type_big-image");

//popups
const popupProfile = document.querySelector(".popup_type_profile");
const popupCard = document.querySelector(".popup_type_add-card");
const popupImage = document.querySelector(".popup_type_big-image");

//forms
const formProfile = document.querySelector(".popup__form_type_profile");
const formCard = document.querySelector(".popup__form_type_add-card");

//for profile form
const nameInputPopup = document.querySelector(".popup__field_type_name");
const jobInputPopup = document.querySelector(".popup__field_type_job");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

//popup UX
const popupList = Array.from(document.querySelectorAll(".popup"));
const popupWindows = Array.from(document.querySelector(".popup__container"));

//for place form
const placeInputPopup = document.querySelector("#form-field-place");
const linkInputPopup = document.querySelector("#form-field-link");

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

function closePopupByOverlay (evt) {
  if (evt.target === evt.currentTarget) {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup)
  }
}

function openPopup(popupName) {
  document.addEventListener("keydown", closePopupByEsc);
  popupName.classList.add("popup_is-opened");
}

function closePopup(popupName) {
  document.removeEventListener("keydown", closePopupByEsc);
  popupName.classList.remove("popup_is-opened");
}

function submitForm(event, popupName) {
  event.preventDefault();
  closePopup(popupName);
}

function submitCardForm(event) {
  submitForm(event, popupCard);
  renderCard({
    name: placeInputPopup.value,
    link: linkInputPopup.value,
  });
  event.target.reset();
}

function submitProfileForm(event) {
  profileName.textContent = nameInputPopup.value;
  profileJob.textContent = jobInputPopup.value;
  submitForm(event, popupProfile);
}

function openProfilePopup() {
  nameInputPopup.value = profileName.textContent;
  jobInputPopup.value = profileJob.textContent;
  openPopup(popupProfile);
}

function openCardPopup(validationConfig) {
  const buttonElement = document
    .querySelector(".popup_type_add-card")
    .querySelector(".popup__submit");
  disableSubmitButton(buttonElement, validationConfig.inactiveButtonClass);
  openPopup(popupCard);
}

//Handlers
editProfileButton.addEventListener("click", openProfilePopup);

addCardButton.addEventListener("click", openCardPopup);

formProfile.addEventListener("submit", submitProfileForm);

formCard.addEventListener("submit", submitCardForm);

popupList.forEach((item) => {
  item.addEventListener("click", closePopupByOverlay)
});

closeProfileButton.addEventListener("click", () => {
  closePopup(popupProfile);
});

closeCardButton.addEventListener("click", () => {
  closePopup(popupCard);
});

closeImgButton.addEventListener("click", () => {
  closePopup(popupImage);
});

enableValidation(validationConfig);