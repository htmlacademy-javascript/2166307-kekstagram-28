
import { setOnRadioContainerListener } from './photo-effects.js';
import { renderThumbnails } from './thumbnails.js';
import { openBigPicture, closeBigPicture } from './thumbnails-enlarger.js';
import { getData } from './network-utils.js';
import { showAlert } from './utils.js';
import { setUserFormSubmit, closeEditor } from './form-master.js';

let thumbnails = [];

setOnRadioContainerListener();

//хендлер на открытие модального окна по клику на миниатюре (вешаем на секцию)
const thumbnailsSection = document.querySelector('.pictures');
thumbnailsSection.addEventListener('click', openBigPicture);

//хендлер на закрытие модального окна по клику мышкой на крестик
const closeElement = document.querySelector('.big-picture__cancel');
closeElement.addEventListener('click', closeBigPicture);

getData()
  .then((photos) => {
    thumbnails = photos;
    renderThumbnails(photos);
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
