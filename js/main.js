import { setOnRadioContainerListener } from './photo-effects.js';
import { renderThumbnails, activateFilter } from './thumbnails.js';
import { onPictureContainerClick, onCloseButtonClick } from './thumbnails-enlarger.js';
import { getData } from './network-utils.js';
import { showAlert } from './utils.js';
import { setUserFormSubmit, closeEditor } from './form-master.js';

let thumbnails = [];

setOnRadioContainerListener();

onPictureContainerClick();

onCloseButtonClick();

getData()
  .then((photos) => {
    thumbnails = photos;
    renderThumbnails(photos);
    activateFilter();
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
