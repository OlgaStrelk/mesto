let editProfileButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профайла
let popup = document.querySelector(".popup"); //всплывающее окно с затемнением фона
let closePopupButton = document.querySelector(".popup__close"); //закрытие попапа
let form = document.querySelector(".popup__form"); //форма заполнения профиля

let nameInputPopup = document.querySelector(".popup__field_type_name"); //имя в форме
let jobInputPopup = document.querySelector(".popup__field_type_job"); //род деятельности в форме
let profileName = document.querySelector(".profile__name"); //имя в шапке
let profileJob = document.querySelector(".profile__description"); //род деятельности в шапке

//функция переключения попапа с подгрузкой имени и рода деятельности из шапки
function togglePopup() {
  if (!popup.classList.contains("popup_is-opened")) {
    nameInputPopup.value = profileName.textContent;
    jobInputPopup.value = profileJob.textContent;
  } else {
    profileName.textContent = nameInputPopup.value;
    profileJob.textContent = jobInputPopup.value;
  }
  popup.classList.toggle("popup_is-opened");
}

//событие переключения состояния при нажатии кнопки редактировать форму
editProfileButton.addEventListener("click", togglePopup);

//событие переключения состояния при нажатии кнопки закрыть форму
closePopupButton.addEventListener("click", togglePopup);

//отправка формы без действия по умолчанию
function formSubmit(event) {
  event.preventDefault();
  togglePopup();
}

//заполнение профиля из инпутов при сабмите формы
form.addEventListener("submit", formSubmit);
