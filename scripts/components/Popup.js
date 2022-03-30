import { closePopupByEsc } from '../utils/utils.js'
export class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector)
  }

  open() {
    document.addEventListener("keydown", closePopupByEsc);
    this._popup.classList.add("popup_is-opened");
  }

  close() {
    document.removeEventListener("keydown", closePopupByEsc);
    this._popup.classList.remove("popup_is-opened");
  }

  _handleEscClose() {
    if (evt.key === "Escape") {
      const openedPopup = document.querySelector(".popup_is-opened");
      this.close(openedPopup);
    }
  }

  _setEventListeners() {
    this._popup
      .querySelector(".popup__close")
      .addEventListener("click", close());
  }
}

