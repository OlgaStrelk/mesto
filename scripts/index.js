const editProfileButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профайла
const popup = document.querySelector(".popup"); //всплывающее окно с затемнением фона
const popupProfile = document.querySelector(".popup_type_profile-info"); //попап профиля
const closePopupButton = document.querySelector(".popup__close"); //закрытие попапа
const form = document.querySelector(".popup__form"); //форма заполнения профиля

const nameInputPopup = document.querySelector(".popup__field_type_name"); //имя в форме
const jobInputPopup = document.querySelector(".popup__field_type_job"); //род деятельности в форме
const profileName = document.querySelector(".profile__title"); //имя в шапке
const profileJob = document.querySelector(".profile__description"); //род деятельности в шапке

const addPostButton = document.querySelector('.profile__add-button'); //кнопка добавления своего места

//функция переключения попапа с подгрузкой имени и рода деятельности из шапки и замена имени и рода деятельности после закрытия
function togglePopup() {
  if (!popupProfile.classList.contains("popup_is-opened")) {
    nameInputPopup.value = profileName.textContent;
    jobInputPopup.value = profileJob.textContent;
  }
  popup.classList.toggle("popup_is-opened");
}

//событие переключения состояния при нажатии кнопки редактировать форму
editProfileButton.addEventListener("click", togglePopup);

addPostButton.addEventListener("click", togglePopup);

//событие переключения состояния при нажатии кнопки закрыть форму
closePopupButton.addEventListener("click", togglePopup);

//отправка формы без действия по умолчанию
function formSubmit(event) {
  event.preventDefault();
  profileName.textContent = nameInputPopup.value;
  profileJob.textContent = jobInputPopup.value;
  togglePopup();
}

//заполнение профиля из инпутов при сабмите формы
form.addEventListener("submit", formSubmit);




