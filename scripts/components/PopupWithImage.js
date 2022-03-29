export class PopupWithImage extends Popup {
    open(url) {
      this.popup.querySelector(".popup__image").setAttribute(`src`, url);
      super.open();
      }
}