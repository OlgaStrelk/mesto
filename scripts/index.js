let editProfileButton = document.querySelector(".profile__edit-button"); //кнопка редактирования профайла
let popup = document.querySelector(".popup"); //всплывающее окно с затемнением фона
let closePopupButton = document.querySelector(".popup__close"); //закрытие попапа

let NameInputPopup = document.querySelector(".popup__field_type_name"); //имя в форме
let JobInputPopup = document.querySelector(".popup__field_type_job"); //род деятельности в форме
let ProfileName = document.querySelector(".profile__name"); //имя в шапке
let ProfileJob = document.querySelector(".profile__description"); //род деятельности в шапке

//функция переключения попапа с подгрузкой имени и рода деятельности из шапки
function togglePopup() {
  if (!popup.classList.contains("popup_is-opened")) {
    NameInputPopup.value = ProfileName.textContent;
    JobInputPopup.value = ProfileJob.textContent;
  }
  popup.classList.toggle("popup_is-opened");
}

//событие переключения состояния при нажатии кнопки редактировать форму
editProfileButton.addEventListener("click", togglePopup);

//событие переключения состояния при нажатии кнопки закрыть форму
closePopupButton.addEventListener("click", togglePopup);