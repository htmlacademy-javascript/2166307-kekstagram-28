
function renderThumbnails(thumbnails) {
  const thumbnailsSection = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const thumbnailsListFragment = document.createDocumentFragment();
  let i = 0;
  thumbnails.forEach((thumbnail) => {
    i++;
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    thumbnailElement.querySelector('.picture__img').src = thumbnail.url;
    thumbnailElement.querySelector('.picture__img').alt = thumbnail.description;
    thumbnailElement.querySelector('.picture__comments').textContent = thumbnail.comments.length;
    thumbnailElement.querySelector('.picture__likes').textContent = thumbnail.likes;
    thumbnailElement.dataset.thumbnailId = i; // установили соответствие между DOMэлементом и элементом массива с данными
    thumbnailsListFragment.appendChild(thumbnailElement);
  });
  thumbnailsSection.appendChild(thumbnailsListFragment);
}

export {
  renderThumbnails
};
