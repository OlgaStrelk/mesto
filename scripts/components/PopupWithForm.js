import { Popup } from "./Popup.js";
export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {
    super(popupSelector)
    this._submitHandler = submitHandler
    this._form = this._popup.querySelector('.popup__form')
  }
  _getInputValues() {
    //собирает данные всех полей формы
  }

  _setEventListeners() {
    // добавлять обработчик сабмита формы.
    super._setEventListeners();
    this._form.addEventListener("submit", this._submitHandler)
  }

  close() {
      super.close()
      this._form.reset();
  }
}
