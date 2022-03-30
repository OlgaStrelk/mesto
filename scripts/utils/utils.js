export function closePopup(popupName) {
  document.removeEventListener("keydown", closePopupByEsc);
  popupName.classList.remove("popup_is-opened");
}

export function openPopup(popupName) {
  document.addEventListener("keydown", closePopupByEsc);
  popupName.classList.add("popup_is-opened");
}
