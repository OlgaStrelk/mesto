export class FormValidator {
    constructor(settings, form) {
        this._form = form
        this._settings = settings
        //то что кладете в this и стрелочные функции  записываются в свойства объекта, а остальное в прототип(то есть глубже по цепочке)
    }

    _enableSubmitButton (buttonElement) {
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
      buttonElement.removeAttribute("disabled", true);
    };

    _disableSubmitButton (buttonElement) {
      buttonElement.classList.add(this._settings.inactiveButtonClass);
      buttonElement.setAttribute("disabled", true);
    };

    _checkInputsContent (inputList) {
      return inputList.every((inputElement) => {
        return inputElement.value.length === 0;
      });
    };

    _hasInvalidInput (inputList) {
      return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
      });
    };

    _toggleButtonState (inputList) {
      const buttonElement = this._form.querySelector(this._settings.submitButtonSelector);
      if (this._hasInvalidInput(inputList) || this._checkInputsContent(inputList)) {
        this._disableSubmitButton(buttonElement);
      } else {
        this._enableSubmitButton(buttonElement);
      }
    };

    _showError (inputElement, errorElement) {
      const {inputErrorClass, errorClass} = this._settings;
      inputElement.classList.add(inputErrorClass);
      errorElement.textContent = inputElement.validationMessage;
      errorElement.classList.add(errorClass);
    };
    
    _hideError (inputElement, errorElement) {
      const {inputErrorClass, errorClass} = this._settings;
      inputElement.classList.remove(inputErrorClass);
      errorElement.textContent = "";
      errorElement.classList.remove(errorClass);
    };

    _checkInputValidity (inputElement) {
      const errorElement = this._form.querySelector(`#${inputElement.id}-error`);
      if (!inputElement.validity.valid) {
        this._showError(inputElement, errorElement);
      } else {
        this._hideError(inputElement, errorElement)
      }
    };
    
    _setEventListeners () {
        this._form.addEventListener("submit", (event) => {
          event.preventDefault();
        });
        const inputList = Array.from(this._form
            .querySelectorAll(this._settings.inputSelector));
        inputList.forEach(inputElement => {
          inputElement.addEventListener("input", () => {
            this._checkInputValidity();
            this._toggleButtonState(
              inputList);
          });
        });
        this._toggleButtonState(formElement, inputList);
      };
    
    enableValidation() {
          this._setEventListeners();
      };
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