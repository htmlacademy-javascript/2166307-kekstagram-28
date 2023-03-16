
const PHOTO_DESCRIPTIONS_COUNT = 25;
const ID_RANGE = [1, PHOTO_DESCRIPTIONS_COUNT];
const URL_RANGE = [1, PHOTO_DESCRIPTIONS_COUNT];
const LIKES_RANGE = [15, 200];
const EPITHETS = ['восхитительное', 'прекрасное', 'гениальное', 'умопомрачительное', 'яркое', 'запоминающееся', 'старинное', 'незабываемое', 'неожиданное', 'красивое', 'авторское', 'редкое', 'мастерское', 'прикольное', 'забавное', 'необычайное', 'душевное', 'необычайное', 'чувственное', 'давнишнее', 'известное', 'раритетное', 'качественное', 'архивное', 'уникальное', 'памятное',];

const COMMENTS_COUNT = 3;
const AVATAR_RANGE = [1, 6];
const NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон', 'Маргарита', 'Кати', 'Рафаэль', 'Донателло', 'Микки', 'Спенсор', 'Шрейдор', 'Кренк', 'Дюк',];
const SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг', 'Де Ля Фер', 'Мюнхаузен', 'Зазнайкин', 'де Фуа', 'де Виньеро', 'дю Плесси', 'Монтермар',];
const TEXT_SOURCE = 'Всё отлично! В целом всё неплохо. Но не всё. Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально. Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше. Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше. Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!';

// функция перетасовки случайным образом порядка элементов в заданном диапазоне при помощи алгоритма Фишера-Йетса,
// возвращает перемешанный  массив
const shuffleRange = (a, b) => {
  const foo = [];
  //преобразуем диапазон в массив
  for (let i = a; i <= b; i++) {
    foo.push(i);
  }
  function shuffle(arr) {
    let j, temp;
    for (let i = arr.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      temp = arr[j];
      arr[j] = arr[i];
      arr[i] = temp;
    }
    return arr;
  }
  shuffle(foo);
  return foo;
};


// Функция получения случайного числа в заданном диапазоне
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Функция получения случайного элемента из массива
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

// Функция получения Set'a заданной длинны из случайных целых чисел (Set - массив, содержащий уникальные элементы)
// на выходе функция дает обычный массив с уникальными значениями
const getSet = (SetLength) => {
  const nums = new Set();
  while (nums.size !== SetLength) {
    nums.add(Math.floor(Math.random() * 100) + 1);
  }
  const arr = Array.from(nums); // преобразуем set в массив
  return arr;
};

// Функция формирования массива объектов с комментариями юзеров
function createCommentArr(QtyOfComments) {
  const IDS_ARRAY = getSet(QtyOfComments);
  const arr = [];
  for (let i = 0; i <= QtyOfComments - 1; i++) {
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
function createDescriptionArr(QtyOfDescriptions) {
  const ID_NUMS_ARRAY = shuffleRange(ID_RANGE[0], ID_RANGE[1]);
  const URL_NUMS_ARRAY = shuffleRange(URL_RANGE[0], URL_RANGE[1]);
  const COMMENTS_ARRAY = createCommentArr(COMMENTS_COUNT * PHOTO_DESCRIPTIONS_COUNT);
  const arr = [];
  for (let i = 0; i <= QtyOfDescriptions - 1; i++) {
    arr.push({
      id: (ID_NUMS_ARRAY[i]),
      url: `${'photos/'}${URL_NUMS_ARRAY[i]}${'.jpg'}`,
      description: `${'Это'} ${getRandomArrayElement(EPITHETS)}${','} ${getRandomArrayElement(EPITHETS)} ${'и'} ${getRandomArrayElement(EPITHETS)} ${'фото.'}`,
      likes: getRandomInteger(LIKES_RANGE[0], LIKES_RANGE[1]),
      comments: COMMENTS_ARRAY.slice(COMMENTS_COUNT * i, (i + 1) * COMMENTS_COUNT),
    });
  }
  return arr;
}

export {
  createDescriptionArr
};


