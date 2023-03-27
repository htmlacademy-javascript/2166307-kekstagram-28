import { thumbnails } from './main.js';

const enlargedThumbnailContainer = document.querySelector('.big-picture');
const enlargedThumbnail = enlargedThumbnailContainer.querySelector('.big-picture__img').querySelector('img');
const enlargedThumbnailDescription = enlargedThumbnailContainer.querySelector('.social__caption');
const qtyOfLikes = enlargedThumbnailContainer.querySelector('.likes-count');
const qtyOfComments = enlargedThumbnailContainer.querySelector('.comments-count');
const commentsCounterSection = document.querySelector('.social__comment-count');
const commentsLoaderSection = document.querySelector('.comments-loader');
const commentsList = document.querySelector('.social__comments');

//Функция нажатия на Esc на увеличенной миниатюре
const onEnlargedTumbnailEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeThumbnail();
  }
};


//Функция открытия модального окна ('увеличения' кликнутой миниатюры)
function openThumbnail(evt) {
  //фильтруем клики, чтобы срабатывали только на миниатюрах, обернутых в ссылку
  if (evt.target.parentElement.tagName === 'A' && evt.target.parentElement.hasAttributes('data-thumbnail-id')) {
    evt.preventDefault(); //переопределяем поведение ссылки по умолчанию
    enlargedThumbnailContainer.classList.remove('hidden'); // убираем hidden с контейнера, где демонстрируется увеличенное фото
    commentsCounterSection.classList.add('hidden'); //добавляем hidden на загрузчик коментов и счетчик комментов
    commentsLoaderSection.classList.add('hidden'); //добавляем hidden на загрузчик коментов и счетчик комментов
    document.body.classList.add('modal-open'); // накидываем на body класс в соотв. с ТЗ
    enlargedThumbnail.src = evt.target.src; // берем из миниатюры src для увеличенного фото
    enlargedThumbnail.alt = evt.target.alt; // берем из миниатюры alt для увеличенного фото
    // берем из миниатюры колво лайков likes и комментов comments
    const targetParent = evt.target.parentElement;
    qtyOfLikes.textContent = targetParent.querySelector('.picture__likes').textContent;
    qtyOfComments.textContent = targetParent.querySelector('.picture__comments').textContent;
    enlargedThumbnailDescription.textContent = evt.target.alt; //берем из миниатюры description
    const comments = thumbnails[targetParent.dataset.thumbnailId - 1].comments;
    renderComments(comments);
    document.addEventListener('keydown', onEnlargedTumbnailEscKeydown); //вешаем хендлер на закрытие модального по нажатию на  Esc
  }
}


// Функция закрытия модального окна
function closeThumbnail() {
  enlargedThumbnailContainer.classList.add('hidden');
  commentsCounterSection.classList.remove('hidden');
  commentsLoaderSection.classList.remove('hidden');
  document.body.classList.remove('modal-open');
  enlargedThumbnail.src = '';
  enlargedThumbnail.alt = '';
  qtyOfLikes.textContent = '';
  qtyOfComments.textContent = '';
  document.removeEventListener('keydown', onEnlargedTumbnailEscKeydown); // чистильщик eventListener'ов
}


// Функция отрисовки комментариев
function renderComments(arr) {
  const commentsListFragment = document.createDocumentFragment();
  const commentExample = commentsList.querySelector('.social__comment');
  arr.forEach((comment) => {
    const commentElement = commentExample.cloneNode(true);
    commentElement.querySelector('.social__picture').src = comment.avatar;
    commentElement.querySelector('.social__picture').alt = comment.name;
    commentElement.querySelector('.social__text').textContent = comment.message;
    commentsListFragment.appendChild(commentElement);
  });
  commentsList.innerHTML = '';
  commentsList.appendChild(commentsListFragment);
}

export {
  openThumbnail,
  closeThumbnail
};
