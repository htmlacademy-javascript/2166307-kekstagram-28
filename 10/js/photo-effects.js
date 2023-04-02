const smallerBtn = document.querySelector('.scale__control--smaller');
const biggerBtn = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');
const SCALE_STEP = 25;
const SCALE_MAX = 100;
const sliderContainer = document.querySelector('.img-upload__effect-level');
const radioContainer = document.querySelector('.effects__list');
const effectLevelInput = document.querySelector('.effect-level__value');
let currentSliderValue = 0;
let currentEffect = [];
let currentEffectIndex = 0;

const EFFECTS = [
  {
    name: 'none',
    style: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
  },
  {
    name: 'chrome',
    style: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'sepia',
    style: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
  },
  {
    name: 'marvin',
    style: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
  },
  {
    name: 'phobos',
    style: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
  },
  {
    name: 'heat',
    style: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
  },
];


//Функция отрисовки изображения с заданным масштабом (заодно приводит в соответсвие значение в инпуте)
const scaleImage = (value) => {
  imgPreview.style.transform = `scale(${value / 100})`;
  scaleInput.value = `${value}%`;
};


//Scale Хендлер на кнопку-минус
smallerBtn.addEventListener('click', () => {
  const currentScale = parseInt(scaleInput.value, 10);
  if (currentScale > SCALE_STEP) {
    const newScale = currentScale - SCALE_STEP;
    scaleImage(newScale);
  }
});


//Scale Хендлер на кнопку-плюс
biggerBtn.addEventListener('click', () => {
  const currentScale = parseInt(scaleInput.value, 10);
  if (currentScale < SCALE_MAX) {
    const newScale = currentScale + SCALE_STEP;
    scaleImage(newScale);
  }
});


//Функция сброса Scale и Scale-инпут к SCALE_MAX
// заодно скрывает контейнер слайдера
function resetScale() {
  imgPreview.style.transform = `scale(${SCALE_MAX / 100})`;
  scaleInput.value = `${SCALE_MAX}%`;
  sliderContainer.classList.add('hidden');
}


//Хендлер на радио кнопки с эффектами
radioContainer.addEventListener('change', onRadioChange);


//Функция дает hidden, если none эффект + дает изображению класс соответсвующий выбранному эффекту
// + вызывает перенастройщик слайдера
// + вызывает добавлялку style в соответствии с выбранным эффектом
function onRadioChange(evt) {
  currentEffect = evt.target.id.split('-');
  if (currentEffect[1] === 'none') {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
  imgPreview.className = 'img-upload__preview';
  imgPreview.classList.add(`${'effects__preview--'}${currentEffect[1]}`);
  updateSliderSettings(currentEffect[1]);
  updateImageStyle(currentEffect[1]);
}


//Функция сброса эффекта на none
function resetEffects() {
  imgPreview.className = 'img-upload__preview effects__preview--none';
  imgPreview.style.filter = 'none';
}


//Начальная инициализация noUiSlider
noUiSlider.create(sliderContainer, {
  range: {
    min: EFFECTS[0].min,
    max: EFFECTS[0].max,
  },
  start: EFFECTS[0].max,
  step: EFFECTS[0].step,
  connect: 'lower',
});


//Функция перенастройки слайдера в соотв. с выбранным эффектом
function updateSliderSettings(effect) {
  currentEffectIndex = EFFECTS.findIndex((type) => type.name === `${effect}`);
  sliderContainer.noUiSlider.updateOptions({
    range: {
      min: EFFECTS[currentEffectIndex].min,
      max: EFFECTS[currentEffectIndex].max,
    },
    start: EFFECTS[currentEffectIndex].max,
    step: EFFECTS[currentEffectIndex].step,
  });
}


//Функция добавляления к изображению style в соответствии с выбранным эффектом и его уровнем
function updateImageStyle(effect) {
  currentEffectIndex = EFFECTS.findIndex((type) => type.name === `${effect}`);
  if (currentEffect[1] === 'none') {
    imgPreview.style.filter = 'none';
  } else {
    imgPreview.style.filter = `${EFFECTS[currentEffectIndex].style}${'('}${currentSliderValue}${EFFECTS[currentEffectIndex].unit}${')'}`;
  }
}


// Хендлер на бегунок слайдера с функцией, передающей значение слайдера в input с уровнем эффекта
// и в style изображения
sliderContainer.noUiSlider.on('update', () => {
  effectLevelInput.value = sliderContainer.noUiSlider.get();
  currentSliderValue = sliderContainer.noUiSlider.get();
  imgPreview.style.filter = imgPreview.style.filter.replace(/ *\([^)]*\) */g, `${'('}${sliderContainer.noUiSlider.get()}${EFFECTS[currentEffectIndex].unit}${')'}`);
});


export {
  resetScale,
  resetEffects
};
