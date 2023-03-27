
import { createDescriptionArr } from './testdata-generator.js';
import { renderThumbnails } from './thumbnails.js';
import { openThumbnail } from './thumbnails-enlarger.js';
import { closeThumbnail} from './thumbnails-enlarger.js';

// генерируем тестовые данные
const thumbnails = createDescriptionArr(26);
renderThumbnails(thumbnails);

//хендлер на открытие модального окна по клику на миниатюре (вешаем на секцию)
const thumbnailsSection = document.querySelector('.pictures');
thumbnailsSection.addEventListener('click', openThumbnail);

//хендлер на закрытие модального окна по клику мышкой на крестик
const closeElement = document.querySelector('.big-picture__cancel');
closeElement.addEventListener('click', closeThumbnail);

export {
  thumbnails
};
