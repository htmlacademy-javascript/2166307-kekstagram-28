
import { createDescriptionArr } from './testdata-generator.js';

const thumbnailSection = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const thumbnailsArr = createDescriptionArr(25);
const thumbnailsListFragment = document.createDocumentFragment();

thumbnailsArr.forEach((thumbnail) => {
  const thumbnailElement = thumbnailTemplate.cloneNode(true);
  thumbnailElement.querySelector('.picture__img').src = thumbnail.url;
  thumbnailElement.querySelector('.picture__comments').textContent = thumbnail.comments.length;
  thumbnailElement.querySelector('.picture__likes').textContent = thumbnail.likes;
  thumbnailsListFragment.appendChild(thumbnailElement);
});

thumbnailSection.appendChild(thumbnailsListFragment);
