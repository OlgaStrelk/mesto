//const cardsContainer = document.querySelector(".cards");
//items — это массив данных, которые нужно добавить на страницу при инициализации класса.
//Свойство renderer — это функция, которая отвечает за создание и отрисовку данных на странице.
export class Section {
 // static _container = document.querySelector(containerSelector).content;
  constructor({ items, renderer }, containerSelector)  {
    this._initialArray = items;
    this._container = document.querySelector(containerSelector);
    this._renderer = renderer
  }
  
  renderElements() {
    //отвечает за отрисовку всех элементов
  }

  addItem(element) {
    this._container.prepend(element)//принимает DOM-элемент и добавляет его в контейнер
  }

// const renderCard = (data) => {
//   return cardsContainer.prepend(new Card(data, "#card-template").createCard());
// };

// initialCards.forEach((card) => {
//   renderCard(card);
// });

//new Section({items: []}, renderer: () => {wrap.prepend(...)})