const fileInput = document.querySelector('#upload-file');
const closeEditorBtn = document.querySelector('.img-upload__cancel');
const overlay = document.querySelector('.img-upload__overlay');
const form = document.querySelector('.img-upload__form');
const commentInput = document.querySelector('.text__description');
const hashtagInput = document.querySelector('.text__hashtags');
const HASHTAG_ERROR_TEXT = 'Неправильно заполнены хэштеги';
const MAX_HASHTAG_COUNT = 5; // разрешенное количество хэштегов за раз
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

//Подключаем валидатор Pristine
const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error'
});

//Функция проверки количества введенных хэштегов
const hasValidCount = (tags) => tags.length <= MAX_HASHTAG_COUNT;

//Функция проверки уникальности введенных хэштегов
const hasUniqueTags = (tags) => {
  const lowerCaseTags = tags.map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

//Функция проверки введенных хэштегов на соответствие регулярному выражению
const isValidTag = (tag) => VALID_SYMBOLS.test(tag);

// Функция валидации поля c хэштегами
const validateHashTags = (field) => {
  const tags = field
    .trim()
    .split(' ')
    .filter((tag) => tag.trim().length);
  return hasValidCount(tags) && hasUniqueTags(tags) && tags.every(isValidTag);
};

// Подключаем Pristine на поле для ввода хэштегов
pristine.addValidator(
  hashtagInput,
  validateHashTags,
  HASHTAG_ERROR_TEXT
);


//Функция закрытия эдитора по нажатию Esc
const onEditorEscKeydown = (evt) => {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    form.reset();
    closeEditor();
  }
};


// Хендлер на открытие редактора
fileInput.addEventListener('change', openEditor);
function openEditor() {
  overlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onEditorEscKeydown);
}

// Хендлер на закрытие редактора
closeEditorBtn.addEventListener('click', closeEditor);
function closeEditor() {
  overlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', onEditorEscKeydown);
}

// Блокируем закрытие редактора по Esc в процессе ввода коммента или хэштега
commentInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onEditorEscKeydown);
});

commentInput.addEventListener('blur', () => {
  document.addEventListener('keydown', onEditorEscKeydown);
});

hashtagInput.addEventListener('focus', () => {
  document.removeEventListener('keydown', onEditorEscKeydown);
});

hashtagInput.addEventListener('blur', () => {
  document.addEventListener('keydown', onEditorEscKeydown);
});

//Хендлер на отправку формы (разрешаем отправку только валидной формы)
form.addEventListener('submit', validateForm);
function validateForm(evt) {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
}

