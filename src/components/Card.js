export class Card {
  constructor(data, cardTemplateSelector, handleCardClick, handleDeleteClick) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
  }

  _fillCard() {
    this._cardElement.querySelector(".cards__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  removeCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _handleCardLike = () => {
    this._cardLike.classList.toggle("cards__like_is-active");
  };

  _setEventListeners() {
    this._cardLike = this._cardElement.querySelector(".cards__like");
    this._cardElement
      .querySelector(".cards__remove")
      .addEventListener("click", () => {this._handleDeleteClick(this._id)});

    this._cardLike.addEventListener("click", () => this._handleCardLike());

    this._cardImage.addEventListener("click", this._handleCardClick);
  }

  _countLikes() {
    const likeCountElement =
      this._cardElement.querySelector(".cards__like-count");
    likeCountElement.textContent = this._likes.length;
  }

  getView() {
    this._cardElement = this._cardTemplate
      .querySelector(".cards__item")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".cards__image");
    this._fillCard();
    this._setEventListeners();

    this._countLikes();

    return this._cardElement;
  }
}
