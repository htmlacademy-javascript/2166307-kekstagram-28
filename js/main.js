import './form-master.js';
import './photo-effects.js';
import { createDescriptionArr } from './testdata-generator.js';
import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './thumbnails-enlarger.js';
import { closeBigPicture} from './thumbnails-enlarger.js';

// генерируем тестовые данные
const thumbnails = createDescriptionArr(26);
renderThumbnails(thumbnails);

//хендлер на открытие модального окна по клику на миниатюре (вешаем на секцию)
const thumbnailsSection = document.querySelector('.pictures');
thumbnailsSection.addEventListener('click', openBigPicture);

//хендлер на закрытие модального окна по клику мышкой на крестик
const closeElement = document.querySelector('.big-picture__cancel');
closeElement.addEventListener('click', closeBigPicture);

export {
  thumbnails
};
