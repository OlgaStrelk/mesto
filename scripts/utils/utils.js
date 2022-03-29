export function closePopup(popupName) {
  document.removeEventListener("keydown", closePopupByEsc);
  popupName.classList.remove("popup_is-opened");
}

function closePopupByEsc(evt) {
  if (evt.key === "Escape") {
    const openedPopup = document.querySelector(".popup_is-opened");
    closePopup(openedPopup);
  }
}

export function openPopup(popupName) {
  document.addEventListener("keydown", closePopupByEsc);
  popupName.classList.add("popup_is-opened");
}
