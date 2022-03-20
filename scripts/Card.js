import { openPopup } from "./utils.js";
import { popupImage, popupImageElement, popupImageCaption } from "./consts.js";

export class Card {
  constructor(data, cardTemplateSelector) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._name = data.name;
    this._link = data.link;
  }

  _fillCard() {
    this._cardElement.querySelector(".cards__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  _removeCardHandler = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _likeCardHandler = () => {
    this._cardLike.classList.toggle("cards__like_is-active");
  }

  _enlargeImageHandler = () => {
    popupImageElement.src = this._link;
    popupImageElement.alt = this._name;
    popupImageCaption.textContent = this._name;
    openPopup(popupImage);
  };

  _setEventListeners() {
    this._cardLike = this._cardElement.querySelector(".cards__like");
    this._cardElement
      .querySelector(".cards__remove")
      .addEventListener("click", this._removeCardHandler);

    this._cardLike.addEventListener("click", () => this._likeCardHandler());

    this._cardImage.addEventListener("click", this._enlargeImageHandler);
  }

  createCard() {
    this._cardElement = this._cardTemplate
      .querySelector(".cards__item")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".cards__image");
    this._fillCard();
    this._setEventListeners();

    return this._cardElement;
  }
}
