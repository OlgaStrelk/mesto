//cards config
const cardConfig = {
    templateSelector: "#card-template",
    cardSelector: ".cards__item",
    imageSelector: ".cards__image",
    titleSelector: ".cards__title",
    removeSelector: ".cards__remove",
    likeSelector: ".cards__like",
    activeLikeClass: "cards__like_is-active",
  };
  
export default class Card {
  constructor(data, config) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = config.templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(config.cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(config.imageSelector);
    this._element.querySelector(titleSelector).textContent = this._name;
    cardImage.src = this._link;
    cardImage.alt = this._name;

    return this._element;
  }

  _setEventListeners() {
    this._element
      .querySelector(config.removeSelector)
      .addEventListener("click", () => {
        this._removeCard();
      });

    this._element
      .querySelector(config.likeSelector)
      .addEventListener("click", () => {
        this._likeCard();
      });

    this._element
      .querySelector(config.imageSelector)
      .addEventListener("click", () => {
        this._zoomImage();
      });
  }

  _removeCard(event) {
    event.target.closest(config.cardSelector).remove();
  }

  _likeCard(event) {
    event.target.classList.toggle(config.activeLikeClass);
  }

  _zoomImage() {
    popupImageElement.src = data.link;
    popupImageElement.alt = data.name;
    popupImageCaption.textContent = data.name;
    openPopup(popupImage);
  }
}

const initialCards = [
    {
      name: "Рейкьявик",
      link: "https://3pulse.com/uploads/photo/19/99/00/2020/01/22/0230dba935.jpg",
    },
    {
      name: "Нью-Йорк",
      link: "https://upload.wikimedia.org/wikipedia/commons/8/83/The_Vessel_%28top-down_view%29%2C_Hudson_Yards%2C_New_York_City%2C_July_2019.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Каир",
      link: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Cairo_Tower_2011.JPG/135px-Cairo_Tower_2011.JPG",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Польша",
      link: "https://a.d-cd.net/_EAAAgGPvuA-1920.jpg",
    },
  ];

  const renderCard = (item) => {
      const card = new Card(item, cardConfig);
      const cardElement = card.generateCard();
      document.querySelector(".cards").prepend(cardElement);
  };

  initialCards.forEach((card) => {
    renderCard(card);
  });
