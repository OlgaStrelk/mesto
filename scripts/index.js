const editProfileButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профайла
const addPostButton = document.querySelector('.profile__add-button'); //кнопка добавления своего места

const popupProfile = document.querySelector(".popup_type_profile"); //попап профиля
const popupPost = document.querySelector('.popup_type_add-card');

const closeProfileButton = document.querySelector(".popup__close_type_profile"); //закрытие попапа
const closePostButton = document.querySelector('.popup__close_type_add-card');

const form = document.querySelector(".popup__form"); //форма заполнения профиля

const nameInputPopup = document.querySelector(".popup__field_type_name"); //имя в форме
const jobInputPopup = document.querySelector(".popup__field_type_job"); //род деятельности в форме
const profileName = document.querySelector(".profile__title"); //имя в шапке
const profileJob = document.querySelector(".profile__description"); //род деятельности в шапке

//функция переключения попапа
function togglePopup(popupName) {
  popupName.classList.toggle("popup_is-opened");
}

//открытие с подгрузкой имени и рода деятельности из шапки и замена имени и рода деятельности после закрытия


//событие переключения состояния при нажатии кнопки редактировать форму
editProfileButton.addEventListener("click", togglePopup(popupProfile));

addPostButton.addEventListener("click", togglePopup(popupPost));

//событие переключения состояния при нажатии кнопки закрыть форму
closeProfileButton.addEventListener("click", togglePopup(popupProfile));



//отправка формы без действия по умолчанию
function formSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInputPopup.value;
  profileJob.textContent = jobInputPopup.value;
  togglePopup();
}

//заполнение профиля из инпутов при сабмите формы
form.addEventListener("submit", formSubmit);




