const showError = (formElement, inputElement, inputErrorClass, errorClass) => {
    const errorElement = formElement.querySelector(`".$(inputElement.id)-error"`);
    inputElement.classList.add(inputErrorClass)
    errorElement.classList.add(errorClass);
};

const hideError = () => {

}

const checkInputValidity = (formElement, inputElement, inputErrorClass, errorClass) => {
    if (!inputElement.validity.valid){
inputElement.classList.add(inputErrorClass);
showError(formElement, inputElement, inputErrorClass, errorClass)

    }
    else {

    }
};

const toggleButtonState = () => {

};

const setEventListeners = (formElement, inputErrorClass, errorClass) => {
    formElement.addEventListener('submit', (event) => {
        event.preventDefault();
    });
    const inputList = Array.from(formElement.querySelectorAll(config.inputSelector));
    inputList.forEach(inputElement => {inputElement.addEventListener("input", () => {
        checkInputValidity(formElement, inputElement, inputErrorClass, errorClass);
        toggleButtonState();
    });
});
};

const enableValidation = (config) => {
    const formList = document.querySelectorAll(config.formSelector);
    formList.forEach(formElement => {
        setEventListeners(formElement, config.inputErrorClass, config.errorClass);
    })
};

enableValidation({
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit',
    inactiveButtonClass: 'popup__submit_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  });