import { thumbnails } from './main.js';

const QTY_OF_RANDOM_THUMBNAILS = 10;
const DEBOUNCE_TIMEOUT_DELAY = 500; // 500 миллисекунд

const allFilterButtons = document.querySelectorAll('.img-filters__button');
const filterContainer = document.querySelector('.img-filters__form');
const thumbnailsSection = document.querySelector('.pictures');

//Функция отрисовки миниатюр, второй аргумент - опциональный
function renderThumbnails(microfotos) {
  deleteRenderedThumbnails();
  const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const thumbnailsListFragment = document.createDocumentFragment();
  microfotos.forEach((microfoto) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    thumbnailElement.querySelector('.picture__img').src = microfoto.url;
    thumbnailElement.querySelector('.picture__img').alt = microfoto.description;
    thumbnailElement.querySelector('.picture__comments').textContent = microfoto.comments.length;
    thumbnailElement.querySelector('.picture__likes').textContent = microfoto.likes;
    thumbnailElement.dataset.thumbnailId = microfoto.id; // установили соответствие между DOMэлементом и элементом массива с данными
    thumbnailsListFragment.appendChild(thumbnailElement);
  });
  thumbnailsSection.appendChild(thumbnailsListFragment);
}

//Подарочная функция от Кекса для устранения дребезга
function debounce(callback, timeoutDelay) {
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId); // Перед каждым новым вызовом удаляем предыдущий таймаут, чтобы они не накапливались
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay); // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}


//Функция фильтрациии по клику в зависимости от нажатой кнопки фильтра
function setSortingButtonsClick(callback) {
  filterContainer.addEventListener('click', (evt) => {
    showActiveButton(evt);
    if (evt.target.id === 'filter-default') {
      callback(thumbnails);
    }
    if (evt.target.id === 'filter-random') {
      callback(thumbnails.slice().sort(() => Math.random() - 0.5).slice(0, QTY_OF_RANDOM_THUMBNAILS));
    }
    if (evt.target.id === 'filter-discussed') {
      callback(thumbnails.slice().sort((next, prev) => prev.comments.length - next.comments.length));
    }
  });
}

//Функция активации фильтра
function activateFilter() {
  const filter = document.querySelector('.img-filters');
  filter.classList.remove('img-filters--inactive');
  setSortingButtonsClick(debounce(renderThumbnails, DEBOUNCE_TIMEOUT_DELAY));
}

//Функция установки active-стиля на активную кнопку фильтра
function showActiveButton(evt) {
  allFilterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
    if (button === evt.target) {
      button.classList.add('img-filters__button--active');
    }
  });
}

//Функция очистки экрана от миниатюр
function deleteRenderedThumbnails() {
  const renderedThumbnails = document.querySelectorAll('.picture');
  renderedThumbnails.forEach((renderedThumbnail) => {
    renderedThumbnail.remove();
  });
}

export {
  renderThumbnails,
  activateFilter
};
