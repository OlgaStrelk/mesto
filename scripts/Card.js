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

class Card {
//static _template = document.querySelector(templateSelector)
  constructor(data, config) {
    console.log('Работает')
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = config.templateSelector;
  }

  _getTemplate() {
    console.log('Работает')
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(config.cardSelector)
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    const cardImage = this._element.querySelector(config.imageSelector);
    this._element.querySelector(config.titleSelector).textContent = this._name;
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

  renderCard = (item) => {
    //this.view = Card._template.cloneNode(true).children[0];
    //document.querySelector(".cards").prepend(this._view);

    const card = new Card(item, cardConfig);
    const cardElement = card.generateCard();
    document.querySelector(".cards").prepend(cardElement);
};
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



  initialCards.forEach((card) => {
    renderCard(card);
  });

  export default Card;