import "./index.css";
import { FormValidator } from "../components/FormValidator";
import { Card } from "../components/Card";
import { Section } from "../components/Section";
import { PopupWithImage } from "../components/PopupWithImage";
import { PopupWithForm } from "../components/PopupWithForm";
import { UserInfo } from "../components/UserInfo";
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
} from "../utils/consts";
import { api } from "../components/API";

let userId;

Promise.all([api.getProfile(), api.getInitialCards()])
  .then((values) => {
    userId = values[0]._id;
    let cardList = values[1].reverse();
    userInfo.setUserInfo(values[0].name, values[0].about, values[0].avatar);
    section.renderElements(cardList);
  })
  .catch((err) => console.log(`Ошибка: ${err}`));

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

type Card = { 
  name: string; 
  link: string; 
  likes?: any; 
  id?: string; 
  userId?: string; 
  ownerId?: string; 
}


const createCard = (data: Card): Element => {
    const card = new Card(
        data,
        "#card-template",
        () => {
            imagePopup.open(data.link, data.name);
        },
        (id) => {
            cardDeletePopup.open();
            cardDeletePopup.changeSubmitHandler(() => {
                api.deleteCard(id)
                    .then(() => {
                        card.removeCard();
                        cardDeletePopup.close();
                    })
                    .catch((err) => console.log(`Ошибка: ${err}`));
            });
        },
        (id) => {
            if (card.isLiked()) {
                api.deleteLike(id)
                    .then((res) => {
                        card.countLikes(res.likes);
                    })
                    .catch((err) => console.log(`Ошибка: ${err}`));
            } else {
                api.addLike(id)
                    .then((res) => {
                        card.countLikes(res.likes);
                    })
                    .catch((err) => console.log(`Ошибка: ${err}`));
            }
        }
    );
    return card.getView();
};

const renderCard = (data): void => {
  const card = createCard({
    name: data.name,
    link: data.link,
    likes: data.likes,
    id: data._id,
    userId: userId,
    ownerId: data.owner._id,
  }); 
  section.addItem(card);
};

type Profile = { 
  name: string; 
  occupation: string; }


const submitProfileForm = (data: Profile): void => {
    const { name, occupation } = data;
    api.editProfile(name, occupation)
        .then((res) => {
            userInfo.setUserInfo(res.name, res.about, res.avatar);
            profilePopup.close();
        })
        .catch((err) => console.log(`Ошибка: ${err}`))
        .finally(() => {
            profilePopup.showLoading();
        });
};

const submitCardForm = (data): void => {
  api
    .addCard(data["place"], data.link)
    .then((res) => {
      renderCard(res);
      cardPopup.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      cardPopup.showLoading();
    });
};

const submitUserPicForm = (data: { link: string; }): void => {
  const { link } = data;
  api
    .changeUserPic(link)
    .then((res) => {
      userInfo.setUserInfo(res.name, res.about, res.avatar);
      userPicPopup.close();
    })
    .catch((err) => console.log(`Ошибка: ${err}`))
    .finally(() => {
      userPicPopup.showLoading();
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

const section = new Section(renderCard, cardsContainer);

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
