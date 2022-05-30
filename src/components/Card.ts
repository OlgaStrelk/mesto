export class Card {
  private _cardTemplate: any;
  private _name: string;
  private _link: string;
  private _likes: any;
  private _id: string;
  private _userId: string;
  private _ownerId: string;
  private _handleCardClick: any;
  private _handleDeleteClick: any;
  private _cardElement: Element;
  private _cardImage: Record<string, any>;
  private _cardLike: any;
  private _cardRemove: any;
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
    this._handleDeleteClick = handleLikeClick;
  }

  _fillCard() {
    this._cardElement.querySelector(".cards__title").textContent = this._name;
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
  }

  isLiked() {
    const userHasLikedCard = this._likes.find(
      (user) => user._id === this._userId
    );
    return userHasLikedCard;
  }

  removeCard = () => {
    this._cardElement.remove();
    this._cardElement = null;
  };

  _activateLike = () => {
    this._cardLike.classList.add("cards__like_is-active");
  };

  _removeLike = () => {
    this._cardLike.classList.remove("cards__like_is-active");
  };

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
  private _handleLikeClick(_id: string) {
    throw new Error("Method not implemented.");
  }

  countLikes(newLikes) {
    this._likes = newLikes;
    const likeCountElement =
      this._cardElement.querySelector(".cards__like-count");
    likeCountElement.textContent = this._likes.length;

    if (this.isLiked()) {
      this._activateLike();
    } else {
      this._removeLike();
    }
  }

  getView() {
    this._cardElement = this._cardTemplate
      .querySelector(".cards__item")
      .cloneNode(true);
    this._cardImage = this._cardElement.querySelector(".cards__image");
    this._fillCard();
    this._setEventListeners();

    this.countLikes(this._likes);

    if (this._ownerId !== this._userId) {
      this._cardRemove.style.display = "none";
    }

    return this._cardElement;
  }
}
