//===================================================================
// Background
const slidePrev = document.querySelector(".slide-prev");
const slideNext = document.querySelector(".slide-next");
const inputClassic = document.querySelector(".classic-img");
const inputNature = document.querySelector(".nature");
const selectAPI = document.querySelector(".changeApi");

let hourBackground;
let random;
let apiFlag = 1; // Устанавливает "Флаг", от значения которого будет зависить, откуда взять картинку для фона(GitHub, Unsplash, Flickr)
let tagsFlag = 2; // Устанавливает "Флаг", от значения которого будет зависить, какие теги использовать для картинок

//Теги для картинок в меню настроек

function radioTegChecked() {
  if (inputClassic.checked) {
    tagsFlag = 1;
  } else if (inputNature.checked) {
    tagsFlag = 2;
  }
  background();
}

inputClassic.addEventListener("click", radioTegChecked);
inputNature.addEventListener("click", radioTegChecked);

// Получить картинку из API

async function getLinkToImageForUnsplash() {
  let url;
  if (apiFlag == 1) {
    url = `https://api.unsplash.com/photos/random?query=${hourBackground}&client_id=bWJ4Hyy12Z6BGEJgfoFc44eO7TSYHts2ZY3LxNkKlgU`;
  } else {
    url = `https://api.unsplash.com/photos/random?query=nature&client_id=bWJ4Hyy12Z6BGEJgfoFc44eO7TSYHts2ZY3LxNkKlgU`;
  }
  const res = await fetch(url);
  const data = await res.json();
  document.body.style.backgroundImage = `url(${data.urls.regular})`;
}

function getRandomNumberPicture(min, max, forFlicker = false) {
  min = Math.ceil(min);
  max = Math.floor(max);
  random = Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
  if (random < 10) {
    return forFlicker === false ? (random = `0${random}`) : random;
  } else {
    return random;
  }
}

async function getLinkToImageForFlicker() {
  let url;
  if (tagsFlag == 1) {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=275dec3e90ddf9965143583c9f747990&tags=${hourBackground}&extras=url_l&format=json&nojsoncallback=1`;
  } else {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=275dec3e90ddf9965143583c9f747990&tags=nature&extras=url_l&format=json&nojsoncallback=1`;
  }
  const res = await fetch(url);
  const data = await res.json();
  const pictureNumber = getRandomNumberPicture(1, 100, true);
  document.body.style.backgroundImage = `url(${data.photos.photo[pictureNumber].url_l})`;
}

// Картинка на фоне

function background() {
  const hours = new Date().getHours();
  const pictureNumber = getRandomNumberPicture(1, 21);
  if (hours < 6) {
    hourBackground = "night";
  } else if (hours >= 6 && hours < 12) {
    hourBackground = "morning";
  } else if (hours >= 12 && hours < 18) {
    hourBackground = "afternoon";
  } else {
    hourBackground = "evening";
  }
  if (apiFlag == 1) {
    document.body.style.backgroundImage = `url(https://raw.githubusercontent.com/Fespis/stage1-tasks/assets/images/${hourBackground}/${pictureNumber}.webp)`;
  } else if (apiFlag == 2) {
    getLinkToImageForUnsplash();
  } else if (apiFlag == 3) {
    getLinkToImageForFlicker();
  }
}

function setBg() {
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/Fespis/stage1-tasks/assets/images/${hourBackground}/${random}.webp`;
  img.onload = () => {
    document.body.style.backgroundImage = `url(https://raw.githubusercontent.com/Fespis/stage1-tasks/assets/images/${hourBackground}/${random}.webp)`;
  };
}

//Перелистывание слайдов вправо
function getSlideNext() {
  random++;
  if (random > 20) {
    random = "01";
  }
  if (random <= 9) {
    random = `0${+random}`;
  }
  if (apiFlag == 1) {
    setBg();
  } else if (apiFlag == 2) {
    background();
  } else if (apiFlag == 3) {
    background();
  }
}

//Перелистывание слайдов влево
function getSlidePrev() {
  random--;
  if (random < 1) {
    random = 20;
  }
  if (random <= 9) {
    random = `0${+random}`;
  }
  if (apiFlag == 1) {
    setBg();
  } else if (apiFlag == 2) {
    background();
  } else if (apiFlag == 3) {
    background();
  }
}

slideNext.addEventListener("click", getSlideNext);
slidePrev.addEventListener("click", getSlidePrev);
selectAPI.addEventListener("change", apiChange);

// Смена API

function apiChange() {
  if (selectAPI.value == "GitHub") {
    apiFlag = 1;
  } else if (selectAPI.value == "Unsplash API") {
    apiFlag = 2;
  } else if (selectAPI.value == "Flickr API") {
    apiFlag = 3;
  }

  background();
}

export { apiChange, radioTegChecked, background };
