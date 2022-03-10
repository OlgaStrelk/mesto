// const showError = (inputElement, errorElement, inputErrorClass, errorClass) => {
//   inputElement.classList.add(inputErrorClass);
//   errorElement.textContent = inputElement.validationMessage;
//   errorElement.classList.add(errorClass);
// };

// const hideError = (inputElement, errorElement, inputErrorClass, errorClass) => {
//   inputElement.classList.remove(inputErrorClass);
//   errorElement.textContent = "";
//   errorElement.classList.remove(errorClass);
// };

// const checkInputValidity = (
//   formElement,
//   inputElement,
//   inputErrorClass,
//   errorClass
// ) => {
//   const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
//   if (!inputElement.validity.valid) {
//     showError(
//       inputElement,
//       errorElement,
//       inputErrorClass,
//       errorClass
//     );
//   } else {
//     hideError(
//       inputElement,
//       errorElement,
//       inputErrorClass,
//       errorClass
//     );
//   }
// };

// const hasInvalidInput = (inputList) => {
//   return inputList.some((inputElement) => {
//     return !inputElement.validity.valid;
//   });
// };

// const disableSubmitButton = (buttonElement, inactiveButtonClass) => {
//   buttonElement.classList.add(inactiveButtonClass);
//   buttonElement.setAttribute("disabled", true);
// };

// const enableSubmitButton = (buttonElement, inactiveButtonClass) => {
//   buttonElement.classList.remove(inactiveButtonClass);
//   buttonElement.removeAttribute("disabled", true);
// };

// const checkInputsContent = (inputList) => {
//   return inputList.every((inputElement) => {
//     return inputElement.value.length === 0;
//   });
// };

// const toggleButtonState = (
//   formElement,
//   inputList,
//   submitButtonSelector,
//   inactiveButtonClass
// ) => {
//   const buttonElement = formElement.querySelector(submitButtonSelector);
//   if (hasInvalidInput(inputList) || checkInputsContent(inputList)) {
//     disableSubmitButton(buttonElement, inactiveButtonClass);
//   } else {
//     enableSubmitButton(buttonElement, inactiveButtonClass);
//   }
// };

// const setEventListeners = (
//   formElement,
//   inputSelector,
//   submitButtonSelector,
//   inputErrorClass,
//   errorClass,
//   inactiveButtonClass
// ) => {
//   formElement.addEventListener("submit", (event) => {
//     event.preventDefault();
//   });
//   const inputList = Array.from(formElement.querySelectorAll(inputSelector));
//   inputList.forEach(inputElement => {
//     inputElement.addEventListener("input", () => {
//       checkInputValidity(
//         formElement,
//         inputElement,
//         inputErrorClass,
//         errorClass
//       );
//       toggleButtonState(
//         formElement,
//         inputList,
//         submitButtonSelector,
//         inactiveButtonClass
//       );
//     });
//   });
//   toggleButtonState(
//     formElement,
//     inputList,
//     submitButtonSelector,
//     inactiveButtonClass
//   );
// };

// const enableValidation = (config) => {
//   const formList = Array.from(document.querySelectorAll(config.formSelector));
//   formList.forEach((formElement) => {
//     setEventListeners(
//       formElement,
//       config.inputSelector,
//       config.submitButtonSelector,
//       config.inputErrorClass,
//       config.errorClass,
//       config.inactiveButtonClass
//     );
//   });
// };
