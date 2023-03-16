
/* Общее: На данном этапе можно не беспокоиться о типах данных аргументов и о том, как должна вести себя функция, если ей были переданы неверные
аргументы. Задание считается выполненным, если в проекте описаны следующие функции:

/* (1)-----------------------------------------------------------------------------------
Функция для проверки длины строки. Она принимает строку, которую нужно проверить,
и максимальную длину и возвращает true, если строка меньше или равна указанной длине, и false,
если строка длиннее.  */


function checkStringLength(stringInput, maxLength) {
  if (stringInput.length <= maxLength) {
    return true;
  }
  return false;
}


/* (2)-----------------------------------------------------------------------------------
Функция для проверки, является ли строка палиндромом.
Палиндром — это слово или фраза, которые одинаково читаются и слева направо и справа налево. */


function checkPolynomial(stringInput) {
  stringInput = stringInput.toLowerCase();
  stringInput = stringInput.replaceAll(' ', '');
  let stringInputReverse = '';
  for (let i = 1; i <= stringInput.length; i++) {
    stringInputReverse = stringInputReverse + stringInput.at((i) * (-1));
  }
  if (stringInput === stringInputReverse) {
    return true;
  }
  return false;
}


/* (3)-----------------------------------------------------------------------------------
Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.
Если в строке нет ни одной цифры, функция должна вернуть NaN: */

function extractIntPositiveNumber(stringInput) {
  stringInput = String(stringInput);
  let stringInputParced = '';
  for (let i = 0; i <= stringInput.length; i++) {
    if (['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(stringInput.at(i))) {
      stringInputParced = stringInputParced + stringInput.at(i);
    }
  }
  if (isNaN(stringInputParced)) {
    return NaN;
  }
  return (parseInt(stringInputParced, 10));
}


/* (4)-----------------------------------------------------------------------------------
Функция, которая принимает три параметра:
1-исходную строку , 2-минимальную длину , 3-строку с добавочными символами.
ВОЗВРАЩАЕТ: исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки.
--> Если исходная строка превышает заданную длину, она не должна обрезаться.
--> Если «добивка» слишком длинная, она обрезается с конца.
Эта функция нам пригодится для формирования адресов файлов. */

function formFileAddress(stringInput, maxLength, stringAddition) {

  if (maxLength <= stringInput.length) {
    return stringInput;
  }

  let stringAdditionPart = '';
  let stringAdditionFull = '';

  if (maxLength > stringInput.length) {

    for (let i = 0; i <= (maxLength - stringInput.length - 1); i++) {
      if (stringAddition.at(i) === undefined) {
        maxLength = maxLength - i;
        i = 0;
        stringAdditionFull = stringAdditionPart + stringAdditionFull;
        stringAdditionPart = '';
      }
      stringAdditionPart = stringAdditionPart + stringAddition.at(i);
    }
    return (stringAdditionPart + stringAdditionFull + stringInput);
  }
}

export {
  checkStringLength,
  checkPolynomial,
  extractIntPositiveNumber,
  formFileAddress
};
