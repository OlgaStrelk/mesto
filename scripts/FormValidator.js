export class FormValidator {
  constructor(settings, form) {
    this._form = form;
    this._settings = settings;
    this._buttonElement = this._form.querySelector(
      this._settings.submitButtonSelector
    );
    this._inputList = Array.from(
      this._form.querySelectorAll(this._settings.inputSelector)
    );

    //то что кладете в this и стрелочные функции  записываются в свойства объекта, а остальное в прототип(то есть глубже по цепочке)
  }

  _enableSubmitButton() {
    this._buttonElement.classList.remove(this._settings.inactiveButtonClass);
    this._buttonElement.removeAttribute("disabled", true);
  }

  _disableSubmitButton() {
    this._buttonElement.classList.add(this._settings.inactiveButtonClass);
    this._buttonElement.setAttribute("disabled", true);
  }

  _checkInputsContent() {
    return this._inputList.every((inputElement) => {
      return inputElement.value.length === 0;
    });
  }

  _hasInvalidInput() {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidInput() || this._checkInputsContent()) {
      this._disableSubmitButton();
    } else {
      this._enableSubmitButton();
    }
  }

  _showError(inputElement, errorElement) {
    const { inputErrorClass, errorClass } = this._settings;
    inputElement.classList.add(inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(errorClass);
  }

  _hideError(inputElement, errorElement) {
    const { inputErrorClass, errorClass } = this._settings;
    inputElement.classList.remove(inputErrorClass);
    errorElement.textContent = "";
    errorElement.classList.remove(errorClass);
  }

  _checkInputValidity(inputElement) {
    const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
    if (!inputElement.validity.valid) {
      this._showError(inputElement, errorElement);
    } else {
      this._hideError(inputElement, errorElement);
    }
  }

  _setEventListeners() {
    this._form.addEventListener("submit", (event) => {
      event.preventDefault();
    });
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity();
        this._toggleButtonState();
      });
    });
    this._toggleButtonState(formElement);
  }

  enableValidation() {
    this._setEventListeners();
  }
}

//validation config
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__submit",
  inactiveButtonClass: "popup__submit_disabled",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__error_visible",
};

//const = new FormValidator({validationConfig})
