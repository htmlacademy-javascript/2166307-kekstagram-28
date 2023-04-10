import { thumbnails } from './main.js';

const QTY_OF_RANDOM_THUMBNAILS = 10;
const DEBOUNCE_TIMEOUT_DELAY = 500; // 500 миллисекунд

const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');
const thumbnailsSection = document.querySelector('.pictures');

//Функция отрисовки миниатюр, второй аргумент - опциональный
function renderThumbnails(microfotos, qtyOfMicrofotos) {
  const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const thumbnailsListFragment = document.createDocumentFragment();
  let i = 0;
  if (typeof (qtyOfMicrofotos) === 'undefined') {
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
  } else {
    for (i = 0; i <= qtyOfMicrofotos - 1; i++) {
      const thumbnailElement = thumbnailTemplate.cloneNode(true);
      thumbnailElement.querySelector('.picture__img').src = microfotos[i].url;
      thumbnailElement.querySelector('.picture__img').alt = microfotos[i].description;
      thumbnailElement.querySelector('.picture__comments').textContent = microfotos[i].comments.length;
      thumbnailElement.querySelector('.picture__likes').textContent = microfotos[i].likes;
      thumbnailElement.dataset.thumbnailId = i; // установили соответствие между DOMэлементом и элементом массива с данными
      thumbnailsListFragment.appendChild(thumbnailElement);
    }
  }
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
function sortDefault() {
  if (!defaultFilterButton.classList.contains('img-filters__button--active')) {
    deleteRenderedThumbnails();
    randomFilterButton.classList.remove('img-filters__button--active');
    discussedFilterButton.classList.remove('img-filters__button--active');
    defaultFilterButton.classList.add('img-filters__button--active');
    debounce(renderThumbnails(thumbnails), DEBOUNCE_TIMEOUT_DELAY);
  }
}

//Функция рандомной сортировки, рисует QTY_OF_RANDOM_THUMBNAILS миниатюр
function sortRandom() {
  if (!randomFilterButton.classList.contains('img-filters__button--active')) {
    deleteRenderedThumbnails();
    defaultFilterButton.classList.remove('img-filters__button--active');
    discussedFilterButton.classList.remove('img-filters__button--active');
    randomFilterButton.classList.add('img-filters__button--active');
    let randomThumbnails = Array.from(thumbnails);
    randomThumbnails.sort(() => Math.random() - 0.5);
    debounce(renderThumbnails(randomThumbnails, QTY_OF_RANDOM_THUMBNAILS),DEBOUNCE_TIMEOUT_DELAY);
    randomThumbnails = [];
  }
}

//Функция сортировки по признаку обсуждаемости: выводит на экран по убыванию количества комментариев
function sortDiscussed() {
  if (!discussedFilterButton.classList.contains('img-filters__button--active')) {
    deleteRenderedThumbnails();
    defaultFilterButton.classList.remove('img-filters__button--active');
    randomFilterButton.classList.remove('img-filters__button--active');
    discussedFilterButton.classList.add('img-filters__button--active');
    const discussedThumbnails = Array.from(thumbnails);
    discussedThumbnails.sort((next, prev) => prev.comments.length - next.comments.length);
    debounce(renderThumbnails(discussedThumbnails), DEBOUNCE_TIMEOUT_DELAY);
  }
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
