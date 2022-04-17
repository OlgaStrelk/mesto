export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__error_visible",
};

export const buttonEditProfile = document.querySelector(
  ".profile__button_type_edit-description"
);
export const buttonAddCard = document.querySelector(
  ".profile__button_type_add-card"
);
export const buttonEditUserPic = document.querySelector(
  ".profile__button_type_edit-user-pic"
);
export const formProfile = document.querySelector(".popup__form_type_profile");
export const formCard = document.querySelector(".popup__form_type_add-card");
export const formUserPic = document.querySelector(
  ".popup__form_type_edit-user-pic"
);
export const nameInput = document.querySelector(".popup__field_type_name");
export const jobInput = document.querySelector(".popup__field_type_job");
export const cardsContainer = document.querySelector(".cards");
