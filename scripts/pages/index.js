import { openPopup } from "../utils/utils.js";
import { popupImage } from "../utils/consts.js";
import { FormValidator } from "../components/FormValidator.js";
import { Card } from "../components/Card.js";
import { Section } from "../components/Section.js";
import { PopupWithImage } from '../components/PopupWithImage.js'
import { PopupWithForm } from "../components/PopupWithForm.js";


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
    imagePopup.open(data.link, data.name)
  })
  return card.getView()
}

const renderCard = (data) => {
  const card = createCard(data)
  cardsContainer.prepend(card);
};

function submitProfileForm() {
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  profilePopup.close()}

function submitCardForm() {
  const card = createCard({
    name: placeInput.value,
    link: linkInput.value,
  });
  section.addItem(card)
  cardPopup.close();
}


const section = new Section({ items: initialCards, renderer: renderCard }, cardsContainer);
section.renderElements()
const imagePopup = new PopupWithImage(popupImage)
const cardPopup = new PopupWithForm(popupCard, submitCardForm)
const profilePopup = new PopupWithForm(popupProfile, submitProfileForm)

imagePopup.setEventListeners()
cardPopup.setEventListeners()
profilePopup.setEventListeners()

// function submitForm(event, popupName) {
//   event.preventDefault();
//   closePopup(popupName);
// }



function openProfilePopup() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileJob.textContent;
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



//Handlers
buttonEditProfile.addEventListener("click", openProfilePopup);

buttonAddCard.addEventListener("click", openCardPopup);
