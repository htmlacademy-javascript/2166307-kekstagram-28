
function renderThumbnails(thumbnails) {
  const thumbnailSection = document.querySelector('.pictures');
  const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const thumbnailsListFragment = document.createDocumentFragment();
  thumbnails.forEach((thumbnail) => {
    const thumbnailElement = thumbnailTemplate.cloneNode(true);
    thumbnailElement.querySelector('.picture__img').src = thumbnail.url;
    thumbnailElement.querySelector('.picture__comments').textContent = thumbnail.comments.length;
    thumbnailElement.querySelector('.picture__likes').textContent = thumbnail.likes;
    thumbnailsListFragment.appendChild(thumbnailElement);
  });
  thumbnailSection.appendChild(thumbnailsListFragment);
}

export {
  renderThumbnails
};
