export class PopupWithForm extends Popup {
  constructor(popupSelector, submitHandler) {}
  _getInputValues() {
    //собирает данные всех полей формы
  }

  _setEventListeners() {
    // добавлять обработчик сабмита формы.
    super._setEventListeners();
  }

  close() {
      //
      this._form.rest();
  }
}
