//const cardsContainer = document.querySelector(".cards");
//items — это массив данных, которые нужно добавить на страницу при инициализации класса.
//Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._initialArray = items;
    this._container = containerSelector;
    this._renderer = renderer;
  }

  renderElements() {
    this._items.forEach((data) => {
      this._renderer(data);
    });
  }

  addItem(element) {
    this._container.prepend(element); //принимает DOM-элемент и добавляет его в контейнер
  }
}
