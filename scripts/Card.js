class Card {
  constructor(data, cardTemplateSelector) {
    //{ name,link }, '#card-template'
  }

  _createCard = (data) => {
      //нашли
    const cardElement = cardTemplate
      .querySelector(".cards__item")
      .cloneNode(true);
    const cardImage = cardElement.querySelector(".cards__image");
//заполнение
    cardElement.querySelector(".cards__title").textContent = data.name;
    cardImage.src = data.link;
    cardImage.alt = data.name;
//обработчики
    cardElement
      .querySelector(".cards__remove")
      .addEventListener("click", (event) => {
        event.target.closest(".cards__item").remove();
      });
    cardElement
      .querySelector(".cards__like")
      .addEventListener("click", (event) => {
        event.target.classList.toggle("cards__like_is-active");
      });
    cardElement
      .querySelector(".cards__image")
      .addEventListener("click", (event) => {
        popupImageElement.src = data.link;
        popupImageElement.alt = data.name;
        popupImageCaption.textContent = data.name;
        openPopup(popupImage);
      });

    return cardElement;
  };

  render = () => {};
}
