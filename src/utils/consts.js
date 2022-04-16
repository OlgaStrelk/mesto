export const validationConfig = {
    formSelector: ".popup__form",
    inputSelector: ".popup__field",
    submitButtonSelector: ".popup__submit",
    inactiveButtonClass: "popup__submit_disabled",
    inputErrorClass: "popup__field_type_error",
    errorClass: "popup__error_visible",
  };
  
  
  export const initialCards = [
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
  
  export const buttonEditProfile = document.querySelector(".profile__edit-button");
  export const buttonAddCard = document.querySelector(".profile__add-button");
  export const formProfile = document.querySelector(".popup__form_type_profile");
  export const formCard = document.querySelector(".popup__form_type_add-card");
  export const nameInput = document.querySelector(".popup__field_type_name");
  export const jobInput = document.querySelector(".popup__field_type_job");
  export const cardsContainer = document.querySelector(".cards");
