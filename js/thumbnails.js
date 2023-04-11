import { thumbnails } from './main.js';

const QTY_OF_RANDOM_THUMBNAILS = 10;
const DEBOUNCE_TIMEOUT_DELAY = 500; // 500 миллисекунд

const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');
const allFilterButtons = document.querySelectorAll('.img-filters__button');
const thumbnailsSection = document.querySelector('.pictures');

//Функция отрисовки миниатюр, второй аргумент - опциональный
function renderThumbnails(microfotos) {
  deleteRenderedThumbnails();
  const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const thumbnailsListFragment = document.createDocumentFragment();
  let i = 0;
  microfotos.forEach((microfoto) => {
    i++;
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    thumbnailElement.querySelector('.picture__img').src = microfoto.url;
    thumbnailElement.querySelector('.picture__img').alt = microfoto.description;
    thumbnailElement.querySelector('.picture__comments').textContent = microfoto.comments.length;
    thumbnailElement.querySelector('.picture__likes').textContent = microfoto.likes;
    thumbnailElement.dataset.thumbnailId = i; // установили соответствие между DOMэлементом и элементом массива с данными
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

//Функция активации фильтра
function activateFilter() {
  const filter = document.querySelector('.img-filters');
  defaultFilterButton.addEventListener('click', sortDefault);
  randomFilterButton.addEventListener('click', sortRandom);
  discussedFilterButton.addEventListener('click', sortDiscussed);
  filter.classList.remove('img-filters--inactive');
}

//Функция сортировки по-умолчанию
function sortDefault(evt) {
  if (!defaultFilterButton.classList.contains('img-filters__button--active')) {
    showFilterButtonStatus(evt.target);
    debounce(renderThumbnails(thumbnails), DEBOUNCE_TIMEOUT_DELAY);
  }
}

//Функция рандомной сортировки, рисует QTY_OF_RANDOM_THUMBNAILS миниатюр
function sortRandom(evt) {
  if (!randomFilterButton.classList.contains('img-filters__button--active')) {
    showFilterButtonStatus(evt.target);
    let randomThumbnails = Array.from(thumbnails);
    randomThumbnails = randomThumbnails.sort(() => Math.random() - 0.5).slice(0, QTY_OF_RANDOM_THUMBNAILS) ;
    debounce(renderThumbnails(randomThumbnails), DEBOUNCE_TIMEOUT_DELAY);
    randomThumbnails = [];
  }
}

//Функция сортировки по признаку обсуждаемости: выводит на экран по убыванию количества комментариев
function sortDiscussed(evt) {
  if (!discussedFilterButton.classList.contains('img-filters__button--active')) {
    showFilterButtonStatus(evt.target);
    const discussedThumbnails = Array.from(thumbnails);
    discussedThumbnails.sort((next, prev) => prev.comments.length - next.comments.length);
    debounce(renderThumbnails(discussedThumbnails), DEBOUNCE_TIMEOUT_DELAY);
  }
}

//Функция установки active-стиля на активную кнопку фильтра
function showFilterButtonStatus(activeButton) {
  allFilterButtons.forEach((button) => {
    button.classList.remove('img-filters__button--active');
  });
  activeButton.classList.add('img-filters__button--active');
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
