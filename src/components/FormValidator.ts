export class FormValidator {
    private _form: HTMLFormElement;
    private _settings: any;
    private _buttonElement: any;
    private _inputList: HTMLInputElement[];
    constructor(settings, form) {
        this._form = form;
        this._settings = settings;

        this._buttonElement = this._form.querySelector(
            this._settings.submitButtonSelector
        );
        this._inputList = Array.from(
            this._form.querySelectorAll(this._settings.inputSelector)
        );
    }

    _enableSubmitButton() {
        this._buttonElement.classList.remove(
            this._settings.inactiveButtonClass
        );
        this._buttonElement.removeAttribute("disabled", true);
    }

    disableSubmitButton() {
        this._buttonElement.classList.add(this._settings.inactiveButtonClass);
        this._buttonElement.setAttribute("disabled", true);
    }

    _checkInputsContent() {
        return this._inputList.every(
            (inputElement: HTMLInputElement): boolean => {
                return inputElement.value.length === 0;
            }
        );
    }

    _hasInvalidInput() {
        return this._inputList.some(
            (inputElement: HTMLInputElement): boolean => {
                return !inputElement.validity.valid;
            }
        );
    }

    _toggleButtonState() {
        if (this._hasInvalidInput() || this._checkInputsContent()) {
            this.disableSubmitButton();
        } else {
            this._enableSubmitButton();
        }
    }

    _showError(inputElement, errorMessage) {
        const { inputErrorClass, errorClass } = this._settings;
        const errorElement = this._form.querySelector(
            `#${inputElement.id}-error`
        );
        inputElement.classList.add(inputErrorClass);
        errorElement.textContent = errorMessage;
        errorElement.classList.add(errorClass);
    }

    _hideError(inputElement) {
        const { inputErrorClass, errorClass } = this._settings;
        const errorElement = this._form.querySelector(
            `#${inputElement.id}-error`
        );
        inputElement.classList.remove(inputErrorClass);
        errorElement.textContent = "";
        errorElement.classList.remove(errorClass);
    }

    _checkInputValidity = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showError(inputElement, inputElement.validationMessage);
        } else {
            this._hideError(inputElement);
        }
    };

    _setEventListeners() {
        this._form.addEventListener("submit", (event) => {
            event.preventDefault();
        });
        this._inputList.forEach((inputElement: HTMLInputElement) => {
            inputElement.addEventListener("input", () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState();
            });
        });
        this._toggleButtonState();
    }

    enableValidation() {
        this._setEventListeners();
    }

    resetErrors() {
        this._inputList.forEach((inputElement) => {
            this._hideError(inputElement);
        });
    }
}

