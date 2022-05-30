import { Popup } from "./Popup.js";

interface InputList extends HTMLInputElement {
    name: string;
    value: string;
}
export class PopupWithForm extends Popup {
    private _handleSubmit: (any?) => any;
    private _form: HTMLFormElement;
    private _inputList: InputList[];
    private _submitButton: Element;
    private _initialButtonText: any;
    constructor(popupSelector, handleSubmit?) {
        super(popupSelector);
        this._handleSubmit = handleSubmit;
        this._form = this._popup.querySelector(".popup__form");
        this._inputList = [
            ...this._form.querySelectorAll(".popup__field"),
        ] as HTMLInputElement[];
        this._submitButton = this._form.querySelector(".popup__submit");
        this._initialButtonText = this._submitButton.textContent;
    }
    _getInputValues() {
        const values = {};
        this._inputList.forEach((item) => {
            values[item.name] = item.value;
        });
        return values;
    }

    showLoading() {
        this._submitButton.textContent = "Сохранение...";
    }

    returnInitialButtonContent() {
        this._submitButton.textContent = this._initialButtonText;
    }

    changeSubmitHandler(newSubmitHandler) {
        this._handleSubmit = newSubmitHandler;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener("submit", (evt) => {
            evt.preventDefault();

            this._handleSubmit(this._getInputValues());
        });
    }

    close() {
        super.close();
        this._form.reset();
    }
}
