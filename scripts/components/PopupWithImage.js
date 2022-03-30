import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  open(url, text) {
    const image = this._popup.querySelector(".popup__image");
    const caption = this._popup.querySelector(".popup__caption");

    image.src = url
    image.alt = text
    caption.textContent = text
    super.open();
  }
}
