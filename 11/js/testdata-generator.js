
import { shuffleRange } from './utils.js';
import { getRandomInteger } from './utils.js';
import { getRandomArrayElement } from './utils.js';
import { getSet } from './utils.js';

// Initial test-data settings
const PHOTO_DESCRIPTIONS_COUNT = 25;
const ID_RANGE = [1, PHOTO_DESCRIPTIONS_COUNT];
const URL_RANGE = [1, PHOTO_DESCRIPTIONS_COUNT];
const LIKES_RANGE = [15, 200];
const EPITHETS = ['восхитительное', 'прекрасное', 'гениальное', 'умопомрачительное', 'яркое', 'запоминающееся', 'старинное', 'незабываемое', 'неожиданное', 'красивое', 'авторское', 'редкое', 'мастерское', 'прикольное', 'забавное', 'необычайное', 'душевное', 'необычайное', 'чувственное', 'давнишнее', 'известное', 'раритетное', 'качественное', 'архивное', 'уникальное', 'памятное',];

const COMMENTS_COUNT = 20;
const AVATAR_RANGE = [1, 6];
const NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон', 'Маргарита', 'Кати', 'Рафаэль', 'Донателло', 'Микки', 'Спенсор', 'Шрейдор', 'Кренк', 'Дюк',];
const SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг', 'Де Ля Фер', 'Мюнхаузен', 'Зазнайкин', 'де Фуа', 'де Виньеро', 'дю Плесси', 'Монтермар',];
const TEXT_SOURCE = 'Всё отлично! В целом всё неплохо. Но не всё. Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше. Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!';


// Функция формирования массива объектов с комментариями юзеров
function createCommentArr(qtyOfComments) {
  const IDS_ARRAY = getSet(qtyOfComments);
  const arr = [];
  for (let i = 0; i <= qtyOfComments - 1; i++) {
    arr.push({
      id: (IDS_ARRAY[i]),
      avatar: `${'img/avatar-'}${getRandomInteger(AVATAR_RANGE[0], AVATAR_RANGE[1])}${'.svg'}`,
      // eslint-disable-next-line arrow-parens, eqeqeq, prefer-template
      message: getRandomArrayElement(TEXT_SOURCE.split('.').filter(j => j != '').map(j => j.replace(/^ +/, '')).map(j => j + '.')),
      name: `${getRandomArrayElement(NAMES)} ${getRandomArrayElement(SURNAMES)}`,
    });
  }
  return arr;
}

// FINAL: Функция формирования массива объектов с описаниями фотографий
function createDescriptionArr(qtyOfDescriptions) {
  const ID_NUMS_ARRAY = shuffleRange(ID_RANGE[0], ID_RANGE[1]);
  const URL_NUMS_ARRAY = shuffleRange(URL_RANGE[0], URL_RANGE[1]);
  const COMMENTS_ARRAY = createCommentArr(COMMENTS_COUNT * PHOTO_DESCRIPTIONS_COUNT);
  const arr = [];
  for (let i = 0; i <= qtyOfDescriptions - 1; i++) {
    arr.push({
      id: (ID_NUMS_ARRAY[i]),
      url: `${'photos/'}${URL_NUMS_ARRAY[i]}${'.jpg'}`,
      description: `${'Это'} ${getRandomArrayElement(EPITHETS)}${','} ${getRandomArrayElement(EPITHETS)} ${'и'} ${getRandomArrayElement(EPITHETS)} ${'фото.'}`,
      likes: getRandomInteger(LIKES_RANGE[0], LIKES_RANGE[1]),
      comments: COMMENTS_ARRAY.slice(COMMENTS_COUNT * i, getRandomArrayElement(shuffleRange(COMMENTS_COUNT * i, (i + 1) * COMMENTS_COUNT))),
    });
  }
  return arr;
}

export {
  createCommentArr,
  createDescriptionArr
};
