export class Card {
  constructor(
    data,
    cardTemplateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
  ) {
    this._cardTemplate = document.querySelector(cardTemplateSelector).content;
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this._id = data.id;
    this._userId = data.userId;
    this._ownerId = data.ownerId;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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

  // _handleCardLike = () => {
  //   this._cardLike.classList.toggle("cards__like_is-active");
  // };

  _setEventListeners() {
    this._cardLike = this._cardElement.querySelector(".cards__like");
    this._cardRemove = this._cardElement.querySelector(".cards__remove");

    this._cardRemove.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });

    this._cardLike.addEventListener("click", () =>
      this._handleLikeClick(this._id)
    );

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

    if (this._ownerId !== this._userId) {
      this._cardRemove.style.display = "none";
    }

    return this._cardElement;
  }
}
