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
const getSet = (setLength) => {
  const nums = new Set();
  while (nums.size !== setLength) {
    nums.add(Math.floor(Math.random() * (setLength + 100)) + 1);
  }
  const arr = Array.from(nums); // преобразуем set в массив
  return arr;
};

// //Функция блокировки кнопки submit после отправки
// const blockSubmitButton = () => {
//   submitButton.disabled = true;
// };

// //Функция разблокировки кнопки submit после отправки
// const unblockSubmitButton = () => {
//   submitButton.disabled = false;
//   alertContainer.remove();
// };


export {
  shuffleRange,
  getRandomInteger,
  getRandomArrayElement,
  getSet
};
