import { thumbnails } from './main.js';

const showMoreBtn = document.querySelector('.comments-loader');
const enlargedThumbnailContainer = document.querySelector('.big-picture');
const enlargedThumbnail = enlargedThumbnailContainer.querySelector('.big-picture__img').querySelector('img');
const enlargedThumbnailDescription = enlargedThumbnailContainer.querySelector('.social__caption');
const qtyOfLikes = enlargedThumbnailContainer.querySelector('.likes-count');
const qtyOfComments = enlargedThumbnailContainer.querySelector('.comments-count');
const commentsList = document.querySelector('.social__comments');

let commentsVolume = 5;
let comments = [];

//Функция нажатия на Esc на увеличенной миниатюре
const onEnlargedTumbnailEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    closeBigPicture();
  }
};

//Функция открытия модального окна ('увеличения' кликнутой миниатюры)
function openBigPicture(evt) {
  //фильтруем клики, чтобы срабатывали только на миниатюрах, обернутых в ссылку
  if (evt.target.parentElement.tagName === 'A' && evt.target.parentElement.hasAttributes('data-thumbnail-id')) {
    evt.preventDefault(); //переопределяем поведение ссылки по умолчанию
    enlargedThumbnailContainer.classList.remove('hidden'); // убираем hidden с контейнера, где демонстрируется увеличенное фото
    document.body.classList.add('modal-open'); // накидываем на body класс в соотв. с ТЗ
    enlargedThumbnail.src = evt.target.src; // берем из миниатюры src для увеличенного фото
    enlargedThumbnail.alt = evt.target.alt; // берем из миниатюры alt для увеличенного фото
    // берем из миниатюры колво лайков likes и комментов comments
    const targetParent = evt.target.closest('.picture');
    qtyOfLikes.textContent = targetParent.querySelector('.picture__likes').textContent;
    qtyOfComments.textContent = targetParent.querySelector('.picture__comments').textContent;
    enlargedThumbnailDescription.textContent = evt.target.alt; //берем из миниатюры description
    comments = thumbnails[targetParent.dataset.thumbnailId - 1].comments;
    showMoreBtn.classList.remove('hidden');
    renderComments(comments);
    document.addEventListener('keydown', onEnlargedTumbnailEscKeydown); //вешаем хендлер на закрытие модального по нажатию на  Esc
  }
}

// Функция закрытия модального окна
function closeBigPicture() {
  enlargedThumbnailContainer.classList.add('hidden');
  document.body.classList.remove('modal-open');
  enlargedThumbnail.src = '';
  enlargedThumbnail.alt = '';
  qtyOfLikes.textContent = '';
  qtyOfComments.textContent = '';
  commentsVolume = 5; // кол-ву выведенных на экран комментов присваиваем исходное значение
  document.removeEventListener('keydown', onEnlargedTumbnailEscKeydown); // чистильщик eventListener'ов
}

// Функция отрисовки комментариев
function renderComments(remarks) {
  const commentsListFragment = document.createDocumentFragment();
  const commentExample = commentsList.querySelector('.social__comment');
  const showMoreBtnContainer = document.querySelector('.social__comment-count');

  if (remarks.length === 0) {
    showMoreBtn.classList.add('hidden');
    commentsList.classList.add('hidden');
    showMoreBtnContainer.childNodes[0].nodeValue = '0 из ';
    return;
  }
  if (remarks.length <= commentsVolume && comments.length > 0) {
    remarks.forEach((comment) => {
      commentsList.classList.remove('hidden');
      const commentElement = commentExample.cloneNode(true);
      commentElement.querySelector('.social__picture').src = comment.avatar;
      commentElement.querySelector('.social__picture').alt = comment.name;
      commentElement.querySelector('.social__text').textContent = comment.message;
      commentsListFragment.appendChild(commentElement);
    });
    showMoreBtn.classList.add('hidden');
  }
  if (remarks.length > commentsVolume) {
    for (let i = 0; i <= commentsVolume - 1; i++) {
      commentsList.classList.remove('hidden');
      const commentElement = commentExample.cloneNode(true);
      commentElement.querySelector('.social__picture').src = remarks[i].avatar;
      commentElement.querySelector('.social__picture').alt = remarks[i].name;
      commentElement.querySelector('.social__text').textContent = remarks[i].message;
      commentsListFragment.appendChild(commentElement);
    }
  }
  commentsList.innerHTML = '';
  commentsList.appendChild(commentsListFragment);
  showMoreBtnContainer.childNodes[0].nodeValue = `${commentsList.children.length}${' из '}`;
}

// Хэндлер на кнопку "Загрузить ещё комментариев.." (добавляет на экран +5комментов))
showMoreBtn.addEventListener('click', showMoreComments);
function showMoreComments() {
  commentsVolume = commentsVolume + 5;
  renderComments(comments);
}

export {
  openBigPicture,
  closeBigPicture
};
