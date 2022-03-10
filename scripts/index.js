import { FormValidator } from './FormValidator.js'

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
const formProfileValidator = new FormValidator(validationConfig, formProfile)
const formCardValidator = new FormValidator(validationConfig, formCard)

//for profile form
const nameInputPopup = document.querySelector(".popup__field_type_name");
const jobInputPopup = document.querySelector(".popup__field_type_job");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
 
//for place form
const cardTemplate = document.querySelector("#card-template").content;
const cardsContainer = document.querySelector(".cards");
const placeInputPopup = document.querySelector("#form-field-place");
const linkInputPopup = document.querySelector("#form-field-link");

//for image enlarged
const popupImageElement = document.querySelector(".popup__image");
const popupImageCaption = document.querySelector(".popup__caption");

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

formProfileValidator.enableValidation()
formCardValidator.enableValidation()

const createCard = (data) => {
  const cardElement = cardTemplate
    .querySelector(".cards__item")
    .cloneNode(true);
  const cardImage = cardElement.querySelector(".cards__image");
  cardElement.querySelector(".cards__title").textContent = data.name;
  cardImage.src = data.link;
  cardImage.alt = data.name;

  cardElement
    .querySelector(".cards__remove")
    .addEventListener("click", (event) => {
      event.target.closest(".cards__item").remove();
    });
  cardElement
    .querySelector(".cards__like")
    .addEventListener("click", (event) => {
      event.target.classList.toggle("cards__like_is-active");
    });

  cardElement
    .querySelector(".cards__image")
    .addEventListener("click", (event) => {
      popupImageElement.src = data.link;
      popupImageElement.alt = data.name;
      popupImageCaption.textContent = data.name;
      openPopup(popupImage);
    });

  return cardElement;
};

const renderCard = (card) => {
  cardsContainer.prepend(createCard(card));
};

initialCards.forEach((card) => {
  renderCard(card);
});

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