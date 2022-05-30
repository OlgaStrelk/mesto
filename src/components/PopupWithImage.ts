import { Popup } from "./Popup.js";
export class PopupWithImage extends Popup {
  open(url: string, text: string): void {
    const image: HTMLInputElement = this._popup.querySelector(".popup__image");
    const caption = this._popup.querySelector(".popup__caption");

    image.src = url
    image.alt = text
    caption.textContent = text
    super.open();
  }
}
