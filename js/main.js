import './form-master.js';
import './photo-effects.js';
//import { createDescriptionArr } from './testdata-generator.js';
import { renderThumbnails } from './thumbnails.js';
import { openBigPicture } from './thumbnails-enlarger.js';
import { closeBigPicture } from './thumbnails-enlarger.js';
import { getData } from './network-utils.js';
import {showAlert} from './utils.js';
import {setUserFormSubmit} from './form-master.js';
import {closeEditor} from './form-master.js';
let thumbnails = [];

// // генерируем тестовые данные
// const thumbnails = createDescriptionArr(26);

//хендлер на открытие модального окна по клику на миниатюре (вешаем на секцию)
const thumbnailsSection = document.querySelector('.pictures');
thumbnailsSection.addEventListener('click', openBigPicture);

//хендлер на закрытие модального окна по клику мышкой на крестик
const closeElement = document.querySelector('.big-picture__cancel');
closeElement.addEventListener('click', closeBigPicture);

getData()
  .then((photos) => {
    thumbnails = photos;
    renderThumbnails(thumbnails);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );

setUserFormSubmit(closeEditor);

export {
  thumbnails
};
