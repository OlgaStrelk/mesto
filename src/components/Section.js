//const cardsContainer = document.querySelector(".cards");
//items — это массив данных, которые нужно добавить на 

export class Section {
  constructor( renderer, container) {
    this._container = container;
    this._renderer = renderer;
  }

  renderElements(items) {
    items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element); //принимает DOM-элемент и добавляет его в контейнер
  }
}
