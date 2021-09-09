const editProfileButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профайла
const addPostButton = document.querySelector('.profile__add-button'); //кнопка добавления своего места

const popupProfile = document.querySelector(".popup_type_profile"); //попап профиля
const popupPost = document.querySelector('.popup_type_add-card');

const closeProfileButton = document.querySelector(".popup__close_type_profile"); //закрытие попапа
const closePostButton = document.querySelector('.popup__close_type_add-card');

const formProfile = document.querySelector(".popup__form_type_profile"); //форма заполнения профиля
const formPost = document.querySelector(".popup__form_type_add-card");

const nameInputPopup = document.querySelector(".popup__field_type_name"); //имя в форме
const jobInputPopup = document.querySelector(".popup__field_type_job"); //род деятельности в форме
const profileName = document.querySelector(".profile__title"); //имя в шапке
const profileJob = document.querySelector(".profile__description"); //род деятельности в шапке

const postTemplate = document.querySelector("#card-template").content;
const postsElement = document.querySelector(".cards");

const initialCards = [
  {
    name: 'Рейкьявик',
    link: 'https://3pulse.com/uploads/photo/19/99/00/2020/01/22/0230dba935.jpg'
  },
  {
    name: 'Нью-Йорк',
    link: 'https://upload.wikimedia.org/wikipedia/commons/8/83/The_Vessel_%28top-down_view%29%2C_Hudson_Yards%2C_New_York_City%2C_July_2019.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Каир',
    link: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Cairo_Tower_2011.JPG/135px-Cairo_Tower_2011.JPG'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Польша',
    link: 'https://a.d-cd.net/_EAAAgGPvuA-1920.jpg'
  }
];

const addPost = (data) => {
  const postElement = postTemplate.querySelector('.cards__item').cloneNode(true);
  postElement.querySelector(".cards__title").textContent = data.name;
  postElement.querySelector(".cards__image").src = data.link;

  postsElement.prepend(postElement);
};



//функция переключения попапа
function togglePopup(popupName) {
  popupName.classList.toggle("popup_is-opened");
};

//открытие с подгрузкой имени и рода деятельности из шапки и замена имени и рода деятельности после закрытия
function OpenProfilePopup() {
  nameInputPopup.value = profileName.textContent;
  jobInputPopup.value = profileJob.textContent;
  togglePopup(popupProfile);
};

//событие переключения состояния при нажатии кнопки редактировать форму
editProfileButton.addEventListener("click", OpenProfilePopup);

addPostButton.addEventListener("click", () => togglePopup(popupPost));

//событие переключения состояния при нажатии кнопки закрыть форму
closeProfileButton.addEventListener("click", () => togglePopup(popupProfile));

closePostButton.addEventListener("click", () => togglePopup(popupPost));

//отправка формы без действия по умолчанию
function formSubmit(event) {
  event.preventDefault();
  togglePopup();
};

function formProfileSubmit = (event) => {
  profileName.textContent = nameInputPopup.value;
  profileJob.textContent = jobInputPopup.value;
  formSubmit;
}

function formPostSubmit = (event) => {   
  formSubmit;
 addPost({
  name:
  link:
});
  formPostSubmit.reset();
};

//заполнение профиля из инпутов при сабмите формы
formProfile.addEventListener("submit", formProfileSubmit);

initialCards.forEach((card) => {
  addPost(card);
});





